export interface CategoryModalProps {
  category: {
    id?: number;
    description: string | null;
    title: string | null;
    color: string | null;
  }
  visible: boolean;
  setVisible: (visible: boolean) => void;
}