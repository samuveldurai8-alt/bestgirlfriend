export interface ReasonItem {
  id: string;
  iconType: 'love' | 'smile' | 'patience' | 'presence' | 'royal' | 'magic';
  title: string;
  description: string;
  subtext?: string;
}

export interface LoveLetterConfig {
  salutation: string;
  paragraphs: string[];
  signoffPrefix: string;
  senderName: string;
}

export interface AwardConfig {
  awardTitle: string;
  recipientTitle: string;
  recipientSubtitle: string;
  senderName: string;
  heroQuote: string;
  reasons: ReasonItem[];
  loveLetter: LoveLetterConfig;
  universeQuoteLine1: string;
  universeQuoteLine2: string;
  universeQuoteLine3: string;
  certificate: {
    officialTitle: string;
    awardType: string;
    presentedTo: string;
    citation: string;
    signatureDate: string;
    endlessLoveText: string;
    certificateNumber: string;
  };
  finale: {
    leadIn: string;
    mainStatement: string;
    promise: string;
    gratitude: string;
  };
}
