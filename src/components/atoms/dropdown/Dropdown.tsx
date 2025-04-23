import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import './Dropdown.scss';

type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  placeholder: string;
  options: SelectOption[];
  onValueChange?: (value: string) => void;
  size: 'small' | 'medium' | 'large';
};

export const CustomDropdown: React.FC<Props> = ({
  placeholder,
  options,
  onValueChange,
  size,
}) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className={`trigger ${size}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={`content ${size}`}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="item">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
