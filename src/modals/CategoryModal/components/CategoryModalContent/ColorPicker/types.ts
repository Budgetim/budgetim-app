export interface ColorPickerProps {
  onChange: (color: string) => void;
  value: string | null;
  colors: string[];
}