import React, { useRef, useState } from 'react';
import { Award, Crown, Heart, Sparkles, Printer, Download, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { AwardConfig } from '../types';

interface CertificateOfLoveProps {
  certificate: AwardConfig['certificate'];
  senderName: string;
}

export const CertificateOfLove: React.FC<CertificateOfLoveProps> = ({
  certificate,
  senderName,
}) => {
  const certRef = useRef<HTMLDivElement | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingPng, setIsGeneratingPng] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => {
      setStatusMessage(null);
    }, 4000);
  };

  // Safe certificate capture function that handles modern CSS color spaces (oklab/oklch)
  const captureCertificate = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
    if (document.fonts) {
      await document.fonts.ready;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 3, // High-resolution 300DPI equivalent
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#fffdf8',
        logging: false,
        onclone: (clonedDoc) => {
          // Replace any unsupported oklab/oklch color functions in cloned style tags
          try {
            const styles = clonedDoc.querySelectorAll('style');
            styles.forEach((st) => {
              if (st.textContent && (st.textContent.includes('oklab') || st.textContent.includes('oklch'))) {
                st.textContent = st.textContent
                  .replace(/oklab\([^)]+\)/g, '#b88628')
                  .replace(/oklch\([^)]+\)/g, '#b88628');
              }
            });
          } catch (_) {}
        },
      });
      return canvas;
    } catch (canvasErr) {
      console.warn('html2canvas encountered an issue, using high-fidelity fallback capture:', canvasErr);
      const rect = element.getBoundingClientRect();
      const width = rect.width || 800;
      const height = rect.height || 600;
      const scale = 3;

      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.margin = '0';
      clone.style.transform = 'none';

      let styleText = '';
      for (let i = 0; i < document.styleSheets.length; i++) {
        try {
          const sheet = document.styleSheets[i];
          if (sheet.cssRules) {
            for (let j = 0; j < sheet.cssRules.length; j++) {
              styleText += sheet.cssRules[j].cssText + '\n';
            }
          }
        } catch (_) {}
      }

      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
              <style>${styleText.replace(/oklab\([^)]+\)/g, '#b88628').replace(/oklch\([^)]+\)/g, '#b88628')}</style>
              ${clone.outerHTML}
            </div>
          </foreignObject>
        </svg>
      `;

      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      return new Promise((resolve, reject) => {
        img.onload = () => {
          const fallbackCanvas = document.createElement('canvas');
          fallbackCanvas.width = width * scale;
          fallbackCanvas.height = height * scale;
          const ctx = fallbackCanvas.getContext('2d');
          if (!ctx) {
            URL.revokeObjectURL(url);
            return reject(new Error('Canvas context unavailable'));
          }
          ctx.scale(scale, scale);
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);
          resolve(fallbackCanvas);
        };
        img.onerror = (e) => {
          URL.revokeObjectURL(url);
          reject(e);
        };
        img.src = url;
      });
    }
  };

  const handleDownloadPdf = async () => {
    if (!certRef.current) return;
    setIsGeneratingPdf(true);
    setStatusMessage('Preparing your high-resolution Certificate PDF...');

    try {
      const canvas = await captureCertificate(certRef.current);
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Create landscape A4 PDF: 297mm x 210mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = 297;
      const pdfHeight = 210;
      const margin = 12; // 12mm margin around
      const maxW = pdfWidth - margin * 2;
      const maxH = pdfHeight - margin * 2;

      const imgRatio = canvas.width / canvas.height;
      let renderW = maxW;
      let renderH = maxW / imgRatio;

      if (renderH > maxH) {
        renderH = maxH;
        renderW = maxH * imgRatio;
      }

      const posX = (pdfWidth - renderW) / 2;
      const posY = (pdfHeight - renderH) / 2;

      pdf.addImage(imgData, 'PNG', posX, posY, renderW, renderH, undefined, 'FAST');
      
      const safeName = certificate.presentedTo.replace(/[^a-zA-Z0-9]/g, '_') || 'Princess';
      pdf.save(`Best_Girlfriend_Award_${safeName}.pdf`);
      showStatus('Certificate PDF successfully downloaded! ❤️');
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      showStatus('Opening print dialogue to save as PDF...');
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadPng = async () => {
    if (!certRef.current) return;
    setIsGeneratingPng(true);
    setStatusMessage('Rendering high-resolution Certificate image...');

    try {
      const canvas = await captureCertificate(certRef.current);
      const link = document.createElement('a');
      const safeName = certificate.presentedTo.replace(/[^a-zA-Z0-9]/g, '_') || 'Princess';
      link.download = `Best_Girlfriend_Award_${safeName}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      showStatus('High-resolution Certificate image saved! 📸✨');
    } catch (err) {
      console.error('Failed to save PNG:', err);
      showStatus('Could not export image directly. Please try printing.');
    } finally {
      setIsGeneratingPng(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="certificate"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#12020a] via-[#200513] to-[#0d0107] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-r from-[#e5c158]/15 via-[#be185d]/15 to-[#e5c158]/15 rounded-full blur-[140px] pointer-events-none print:hidden" />

      <div className="max-w-4xl mx-auto relative z-20">
        {/* Section Header */}
        <div className="text-center mb-12 print:hidden">
          <div className="inline-flex items-center gap-2 mb-2 text-[#e5c158]">
            <Award className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase">
              Official Conferment
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gold-gradient">
            Award Certificate
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#e5c158] to-transparent my-4" />
          <p className="font-cormorant italic text-lg sm:text-xl text-[#fbd5db]/90">
            A permanent testament to the love that fills my life every single day.
          </p>
        </div>

        {/* Certificate Card */}
        <div className="relative mx-auto">
          {/* Subtle outer gold glow (screen only) */}
          <div className="absolute -inset-3 bg-gradient-to-r from-[#e5c158]/35 via-[#f472b6]/25 to-[#e5c158]/35 rounded-3xl blur-2xl opacity-70 pointer-events-none print:hidden" />

          {/* Certificate Body (Parchment & Gold styling) */}
          <div
            ref={certRef}
            id="certificate-print-area"
            className="relative bg-[#fffdf8] text-[#24120e] rounded-2xl p-8 sm:p-14 lg:p-16 border-[10px] border-double border-[#d4af37] shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden"
            style={{
              backgroundColor: '#fffdf8',
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,253,248,1) 0%, rgba(253,248,236,1) 100%)',
            }}
          >
            {/* Ornate corner brackets */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#b88628] pointer-events-none" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#b88628] pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#b88628] pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#b88628] pointer-events-none" />

            {/* Inner filigree hairline border */}
            <div className="absolute inset-5 border border-[#d4af37]/50 pointer-events-none rounded-lg" />

            {/* Top Emblems: Crown & Laurels */}
            <div className="flex flex-col items-center justify-center text-center mb-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#fef0cd] to-[#e5c158] border-2 border-[#b88628] flex items-center justify-center shadow-md mb-3">
                <Crown className="w-9 h-9 text-[#500c1e]" />
              </div>
              <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-[#8c6b1e] uppercase font-bold">
                {certificate.officialTitle}
              </p>
            </div>

            {/* Award Title */}
            <div className="text-center relative z-10 my-4">
              <h3 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-black text-[#581525] tracking-tight">
                {certificate.awardType}
              </h3>
              <div className="flex items-center justify-center gap-3 my-3">
                <span className="w-16 h-px bg-[#b88628]/60" />
                <span className="font-cormorant italic text-lg sm:text-xl text-[#7c2d12]">
                  Presented to
                </span>
                <span className="w-16 h-px bg-[#b88628]/60" />
              </div>

              {/* Recipient Name in Regal Calligraphy */}
              <h1 className="font-script text-4xl sm:text-6xl lg:text-7xl text-[#881337] font-bold my-2 tracking-wide drop-shadow-sm">
                {certificate.presentedTo}
              </h1>
            </div>

            {/* Citation */}
            <div className="text-center max-w-xl mx-auto my-6 relative z-10">
              <p className="font-cormorant text-xl sm:text-2xl text-[#3d1912] leading-relaxed italic">
                “{certificate.citation}”
              </p>
            </div>

            {/* Certificate Footer / Signatures & Seal */}
            <div className="mt-12 pt-8 border-t border-[#d4af37]/40 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center sm:text-left relative z-10">
              {/* Date Column */}
              <div className="flex flex-col items-center sm:items-start">
                <p className="font-script text-2xl text-[#581525]">
                  {certificate.signatureDate}
                </p>
                <div className="w-32 h-px bg-[#8c6b1e]/60 my-1" />
                <span className="text-[10px] uppercase tracking-widest text-[#7c2d12] font-sans font-semibold">
                  Conferred Date
                </span>
              </div>

              {/* Official Gold Embossed Wax Seal */}
              <div className="flex flex-col items-center justify-center order-first sm:order-none">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ffd700] via-[#e5c158] to-[#b88628] border-2 border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center transform hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-full border border-[#8c6b1e]/40 flex flex-col items-center justify-center text-center p-1">
                      <Sparkles className="w-4 h-4 text-[#500c1e] mb-0.5" />
                      <span className="font-cinzel text-[7px] font-bold text-[#500c1e] tracking-tighter uppercase leading-tight">
                        Official Royal Seal
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-sans tracking-wider text-[#7c2d12] mt-2 font-medium">
                  {certificate.certificateNumber}
                </span>
              </div>

              {/* Presenter / Signature Column */}
              <div className="flex flex-col items-center sm:items-end">
                <p className="font-script text-3xl text-[#881337] font-semibold">
                  {senderName}
                </p>
                <div className="w-36 h-px bg-[#8c6b1e]/60 my-1" />
                <span className="text-[10px] uppercase tracking-widest text-[#7c2d12] font-sans font-semibold">
                  {certificate.endlessLoveText}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className="mt-6 flex justify-center print:hidden">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3a0820] border border-[#e5c158]/50 text-xs sm:text-sm text-[#fef0cd] shadow-lg animate-fadeIn">
              <Check className="w-4 h-4 text-[#e5c158]" />
              <span>{statusMessage}</span>
            </div>
          </div>
        )}

        {/* Certificate Actions: Download PDF, Download Image, Print */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-3 sm:gap-4 print:hidden">
          {/* Main Download PDF Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#b88628] via-[#e5c158] to-[#b88628] hover:from-[#d4af37] hover:to-[#e5c158] text-[#3d0714] text-xs sm:text-sm font-cinzel font-bold tracking-wider uppercase flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(229,193,88,0.45)] hover:shadow-[0_0_35px_rgba(229,193,88,0.7)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            {isGeneratingPdf ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#3d0714]" />
            ) : (
              <Download className="w-4 h-4 text-[#3d0714]" />
            )}
            <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download Certificate (PDF)'}</span>
          </button>

          {/* Download Image (PNG) Button */}
          <button
            onClick={handleDownloadPng}
            disabled={isGeneratingPng}
            className="px-5 py-3 rounded-full border border-[#e5c158]/60 bg-[#280617]/90 hover:bg-[#3d0923] text-[#fef0cd] text-xs sm:text-sm font-cinzel tracking-wider uppercase flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(229,193,88,0.2)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGeneratingPng ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#e5c158]" />
            ) : (
              <ImageIcon className="w-4 h-4 text-[#e5c158]" />
            )}
            <span>{isGeneratingPng ? 'Downloading PNG...' : 'Download as PNG'}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="px-5 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-[#fef0cd]/80 hover:text-white text-xs sm:text-sm font-cinzel tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#e5c158]" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </section>
  );
};
