import { ComboboxValue } from 'src/components/ui/ComboBox';

export type University = {
  name: string;
};

export type FormValues = {
  name: string;
  university: ComboboxValue | null;
};
