import React, { useState } from 'react';
import { X, Save, RotateCcw, Heart, Type, Sparkles, Plus, Trash2 } from 'lucide-react';
import { AwardConfig } from '../types';
import { DEFAULT_AWARD_CONFIG } from '../data/defaultConfig';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AwardConfig;
  onSave: (newConfig: AwardConfig) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<AwardConfig>(config);
  const [activeTab, setActiveTab] = useState<'names' | 'letter' | 'certificate'>('names');

  if (!isOpen) return null;

  const handleTextChange = (field: keyof AwardConfig, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLetterChange = (field: keyof AwardConfig['loveLetter'], value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      loveLetter: {
        ...prev.loveLetter,
        [field]: value,
      },
    }));
  };

  const handleParagraphChange = (idx: number, text: string) => {
    const updated = [...formData.loveLetter.paragraphs];
    updated[idx] = text;
    handleLetterChange('paragraphs', updated);
  };

  const handleAddParagraph = () => {
    handleLetterChange('paragraphs', [...formData.loveLetter.paragraphs, '']);
  };

  const handleRemoveParagraph = (idx: number) => {
    const updated = formData.loveLetter.paragraphs.filter((_, i) => i !== idx);
    handleLetterChange('paragraphs', updated);
  };

  const handleReset = () => {
    if (window.confirm('Reset all details back to the default romantic configuration?')) {
      setFormData(DEFAULT_AWARD_CONFIG);
      onSave(DEFAULT_AWARD_CONFIG);
    }
  };

  const handleSaveAndClose = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#1a040f] border border-[#e5c158]/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-[#fef0cd]">
        {/* Header */}
        <div className="p-5 border-b border-[#e5c158]/20 flex items-center justify-between bg-[#240616]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#e5c158]/20 border border-[#e5c158]/50 flex items-center justify-center text-[#e5c158]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-gold-gradient">
                Personalize Award & Letter
              </h3>
              <p className="text-[11px] text-[#f7d6dc]/70">
                Easily customize her name, your name, love letter, certificate citations & dates.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#e8d5b5]/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e5c158]/20 bg-[#16020c] px-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('names')}
            className={`px-4 py-3 text-xs font-cinzel tracking-wider border-b-2 font-medium whitespace-nowrap transition-colors ${
              activeTab === 'names'
                ? 'border-[#e5c158] text-[#e5c158]'
                : 'border-transparent text-[#e8d5b5]/60 hover:text-[#fef0cd]'
            }`}
          >
            Titles & Names
          </button>
          <button
            onClick={() => setActiveTab('letter')}
            className={`px-4 py-3 text-xs font-cinzel tracking-wider border-b-2 font-medium whitespace-nowrap transition-colors ${
              activeTab === 'letter'
                ? 'border-[#e5c158] text-[#e5c158]'
                : 'border-transparent text-[#e8d5b5]/60 hover:text-[#fef0cd]'
            }`}
          >
            Love Letter
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-4 py-3 text-xs font-cinzel tracking-wider border-b-2 font-medium whitespace-nowrap transition-colors ${
              activeTab === 'certificate'
                ? 'border-[#e5c158] text-[#e5c158]'
                : 'border-transparent text-[#e8d5b5]/60 hover:text-[#fef0cd]'
            }`}
          >
            Certificate Citation
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs sm:text-sm">
          {activeTab === 'names' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#e5c158] mb-1 font-semibold">
                  Award Title
                </label>
                <input
                  type="text"
                  value={formData.awardTitle}
                  onChange={(e) => handleTextChange('awardTitle', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#2a0719] border border-[#e5c158]/30 focus:border-[#e5c158] text-[#fef0cd] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#e5c158] mb-1 font-semibold">
                    Recipient Pet Name / Title
                  </label>
                  <input
                    type="text"
                    value={formData.recipientTitle}
                    onChange={(e) => {
                      handleTextChange('recipientTitle', e.target.value);
                      handleTextChange('recipientSubtitle', `Presented to ${e.target.value} ❤️`);
                      setFormData((p) => ({
                        ...p,
                        certificate: {
                          ...p.certificate,
                          presentedTo: `${e.target.value.toUpperCase()} ❤️`,
                        },
                      }));
                    }}
                    placeholder="e.g. My Princess"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#2a0719] border border-[#e5c158]/30 focus:border-[#e5c158] text-[#fef0cd] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#e5c158] mb-1 font-semibold">
                    Your Name / Boyfriend Signature
                  </label>
                  <input
                    type="text"
                    value={formData.senderName}
                    onChange={(e) => {
                      handleTextChange('senderName', e.target.value);
                      handleLetterChange('senderName', e.target.value);
                    }}
                    placeholder="e.g. Your Suttuumaniii ❤️"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#2a0719] border border-[#e5c158]/30 focus:border-[#e5c158] text-[#fef0cd] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#e5c158] mb-1 font-semibold">
                  Hero Quote Description
                </label>
                <textarea
                  rows={2}
                  value={formData.heroQuote}
                  onChange={(e) => handleTextChange('heroQuote', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#2a0719] border border-[#e5c158]/30 focus:border-[#e5c158] text-[#fef0cd] outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#e5c158] mb-1 font-semibold">
                  Letter Salutation
                </label>
                <input
                  type="text"
                  value={formData.loveLetter.salutation}
                  onChange={(e) => handleLetterChange('salutation', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#2a0719] border border-[#e5c158]/30 focus:border-[#e5c158] text-[#fef0cd] outline-none"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider text-[#e5c158] font-semibold">
                  Letter Paragraphs
                </label>
                {formData.loveLetter.paragraphs.map((p, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <textarea
                      rows={2}
                      value={p}
                      onChange={(e) => handleParagraphChange(idx, e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-lg bg-[#2a0719] border border-[#e5c158]/30 focus:border-[#e5c158] text-[#fef0cd] outline-none"
                    />
                    {formData.loveLetter.paragraphs.length > 1 && (
                      <button
                        onClick={() => handleRemoveParagraph(idx)}
                        className="p-2 text-rose-400 hover:text-rose-300"
                        title="Delete paragraph"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleAddParagraph}
                  className="text-xs text-[#e5c158] hover:underline flex items-center gap-1 mt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add another paragraph</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#e5c158] mb-1 font-semibold">
                    Signoff Prefix
                  </label>
                  <input
                    type="text"
                    value={formData.loveLetter.signoffPrefix}
                    onChange={(e) => handleLetterChange('signoffPrefix', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#2a0719] border border-[#e5c158]/30 focus:border-[#e5c158] text-[#fef0cd] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#e5c158] mb-1 font-semibold">
                    Signed As
                  </label>
                  <input
                    type="text"
                    value={formData.loveLetter.senderName}
                    onChange={(e) => handleLetterChange('senderName', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#2a0719] border border-[#e5c158]/30 focus:border-[#e5c158] text-[#fef0cd] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certificate' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#e5c158] mb-1 font-semibold">
                  Official Award Type
                </label>
                <input
                  type="text"
                  value={formData.certificate.awardType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      certificate: { ...prev.certificate, awardType: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#2a0719] border border-[#e5c158]/30 focus:border-[#e5c158] text-[#fef0cd] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#e5c158] mb-1 font-semibold">
                  Presented To (Regal Text)
                </label>
                <input
                  type="text"
                  value={formData.certificate.presentedTo}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      certificate: { ...prev.certificate, presentedTo: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#2a0719] border border-[#e5c158]/30 focus:border-[#e5c158] text-[#fef0cd] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#e5c158] mb-1 font-semibold">
                  Certificate Citation
                </label>
                <textarea
                  rows={3}
                  value={formData.certificate.citation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      certificate: { ...prev.certificate, citation: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-[#2a0719] border border-[#e5c158]/30 focus:border-[#e5c158] text-[#fef0cd] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#e5c158] mb-1 font-semibold">
                    Conferred Date
                  </label>
                  <input
                    type="text"
                    value={formData.certificate.signatureDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        certificate: { ...prev.certificate, signatureDate: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-[#2a0719] border border-[#e5c158]/30 focus:border-[#e5c158] text-[#fef0cd] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#e5c158] mb-1 font-semibold">
                    Endless Love Seal Text
                  </label>
                  <input
                    type="text"
                    value={formData.certificate.endlessLoveText}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        certificate: { ...prev.certificate, endlessLoveText: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-[#2a0719] border border-[#e5c158]/30 focus:border-[#e5c158] text-[#fef0cd] outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#e5c158]/20 bg-[#240616] flex items-center justify-between">
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-lg border border-white/10 hover:border-white/30 text-xs text-[#e8d5b5]/70 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-transparent hover:bg-white/10 text-xs text-[#e8d5b5]/80 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAndClose}
              className="px-5 py-2 rounded-lg font-cinzel text-xs font-bold tracking-wider uppercase bg-[#e5c158] text-[#1c0410] hover:bg-[#ffe599] transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(229,193,88,0.4)]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
