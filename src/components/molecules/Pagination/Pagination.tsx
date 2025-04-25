import React from 'react';
import Button from '../../atoms/button/Button';
import { ButtonTypes } from '@/types/ButtonTypes';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  totalPages?: number;
};

export const Pagination: React.FC<Props> = ({ totalPages = 4 }) => {
  return (
    <div className="flex gap-4 justify-center">
      <Button variant={ButtonTypes.arrow} icon={ChevronLeft} />
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <Button
              key={page}
              variant={ButtonTypes.numbered}
              content={page}
              bgColor={page === 2 ? '#9747FF' : ''}
            />
          );
        })}
      </div>
      <Button variant={ButtonTypes.arrow} icon={ChevronRight} />
    </div>
  );
};
