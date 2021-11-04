export interface CategoryModalContentProps {
  title: string;
  setTitle: (title: string) => void;
  description: string | null;
  setDescription: (description: string | null) => void;
  color: string | null;
  setColor: (color: string | null) => void;
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
}