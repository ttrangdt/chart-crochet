export interface CommentType {
  id: string;
  author: string;
  content: string;
  verified: boolean;
  rating: number;
  image?: string;
  date: string;
}

export interface Pattern {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  difficulty_stars?: number;
  image_url: string;
  img?: string;
  description: string;
  materials: string[];
  tools: string[];
  content: Record<string, string[]>;
  is_free: boolean;
}
