export interface EditPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  isLoading: boolean;
  disable: boolean;
}