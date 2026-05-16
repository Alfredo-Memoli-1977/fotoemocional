export interface Photo {
  id: number;
  title: string;
  description: string;
  category: string;
  orientation: Orientation;
  preview_url: string;
  raw_url: string;
  price: number;
  available: boolean;
}

export type Orientation = "landscape" | "portrait";
