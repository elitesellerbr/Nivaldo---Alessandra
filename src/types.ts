export type MediaType = 'video' | 'image';

export interface Story {
  id: string;
  clientName: string;
  beforeUrl: string;
  afterUrl: string;
  type: MediaType;
  createdAt: number;
}

export interface AppSettings {
  publicLanguage: 'it' | 'pt';
  companyName: string;
}

export type Translations = {
  [key in 'it' | 'pt']: {
    before: string;
    after: string;
    client: string;
    title: string;
    admin: string;
    addStory: string;
    delete: string;
    save: string;
    settings: string;
    language: string;
    videoUrl: string;
    imageUrl: string;
    beforeUrl: string;
    afterUrl: string;
    type: string;
  };
};
