import { ReactNode } from 'react';

export interface UserProps {
  title: string;
  message: string;
  form: ReactNode;
  error?: null | string;
  button: {
    text: string;
    action: () => void;
    withLoader?: boolean;
  },
  footer?: ReactNode;
}