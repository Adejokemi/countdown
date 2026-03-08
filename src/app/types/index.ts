
export type EventIconType =
  | "flight"
  | "birthday"
  | "work"
  | "sports"
  | "default";

export interface EventItem {
  id: string;
  title: string;
  targetDate: string; 
  createdAt: string; 
  description: string;
  iconType: EventIconType;
  imageUrl?: string; 
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number; 
}


export interface ModalState {
  isOpen: boolean;
  eventToEdit?: EventItem;
}

export interface ThemeConfig {
  bg: string;
  text: string;
  bar: string;
  Icon: React.ElementType; 
}
