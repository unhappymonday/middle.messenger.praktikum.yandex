export type TFormField = {
  id: string;
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
};

export type TForm = TFormField[];
