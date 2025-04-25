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
  name: string;
};

export const CustomDropdown: React.FC<Props> = ({
  placeholder,
  options,
  onValueChange,
  size,
  name,
}) => {
  return (
    <div className="dropdown">
      <label className="dropdown__name">{name}</label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className={`dropdown__trigger ${size}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={`dropdown__content  ${size}`}>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="dropdown__item"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
