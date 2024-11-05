export interface FormData {
  projectName: string;
  genre: string[];
  format: string[];
  unfNumber?: string;
  country: string[];
  budget?: number;
  synopsis?: string;
}

export interface DropdownInputProps {
  text: string;
  name: string;
  placeholder: string;
  options: string[];
  value: string[];
  onChange: (name: string, selected: string[]) => void;
  onBlur?: () => void;
  error?: boolean ;
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}
