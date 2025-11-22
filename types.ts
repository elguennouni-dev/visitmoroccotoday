export interface WPMedia {
  source_url: string;
  alt_text: string;
  media_details?: {
    sizes?: {
      medium?: { source_url: string };
      large?: { source_url: string };
    }
  }
}

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[];
    'author'?: Array<{ name: string; avatar_urls?: { '96': string } }>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

export enum LoadingState {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}
