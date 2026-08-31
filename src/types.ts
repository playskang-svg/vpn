export type Language = 'ko' | 'en';

export interface VpnFeature {
  textKo: string;
  textEn: string;
}

export interface VpnItem {
  id: string;
  rank: number;
  name: string;
  logoUrl: string;
  compactLogoUrl?: string;
  score: number;
  ratingLabelKo: string;
  ratingLabelEn: string;
  highlightTagKo?: string;
  highlightTagEn?: string;
  discountTagKo: string;
  discountTagEn: string;
  descriptionKo: string;
  descriptionEn: string;
  editorsSummaryKo: string;
  editorsSummaryEn: string;
  features: VpnFeature[];
  priceMonthly: string;
  originalPrice: string;
  discountPercent: string;
  moneyBackDays: number;
  maxDevices: number | string;
  serverCount: string;
  countriesCount: string;
  jurisdiction: string;
  protocols: string[];
  auditedNoLogs: boolean;
  streamingSupport: string[];
  torrentingAllowed: boolean;
  killSwitch: boolean;
  speedScore: number; // out of 100
  prosKo: string[];
  prosEn: string[];
  consKo: string[];
  consEn: string[];
  dealUrl: string;
  category: ('all' | 'streaming' | 'speed' | 'budget' | 'security' | 'unlimited')[];
}

export interface FaqItem {
  id: string;
  questionKo: string;
  questionEn: string;
  answerKo: string;
  answerEn: string;
  highlightKo?: string;
  highlightEn?: string;
}
