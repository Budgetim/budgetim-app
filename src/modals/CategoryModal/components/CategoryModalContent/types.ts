export interface CategoryModalContentProps {
  title: string;
  setTitle: (title: string) => void;
  description: string | null;
  setDescription: (description: string) => void;
  color: string | null;
  setColor: (color: string) => void;
}
