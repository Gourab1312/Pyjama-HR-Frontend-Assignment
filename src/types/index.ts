export interface Note {
    id: string;
    title: string;
    content: string;
    isPinned: boolean;
    color?: string;
    image?: string | null;
  }