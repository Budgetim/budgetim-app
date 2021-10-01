import { ReactNode } from 'react';

export interface UserProps {
  title: string;
  message: string;
  form: ReactNode;
  button: {
    text: string;
    action: () => void;
  },
  footer: ReactNode;
}