import { Link } from 'react-router-dom';
import { useBreadcrumb } from './useBreadcrumb';
import { Home, ChevronRight } from 'lucide-react';

export const Breadcrumb = ({ productName }: { productName?: string }) => {
  const breadcrumbItems = useBreadcrumb(productName);

  if (breadcrumbItems.length === 0) return null;

  return (
    <nav
      className="grid grid-cols-1 pt-6
        min-[640px]:px-8
        min-[1200px]:px-0
        min-[1200px]:max-w-[1136px] mx-auto
        text-sm text-muted-foreground"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-2">
        <li className="flex items-center gap-2">
          <Link
            to="/"
            className="text-[#F1F2F9] hover:text-[#75767F] transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
          {breadcrumbItems.length > 0 && (
            <span className="text-[#75767F]">
              {<ChevronRight className="w-4 h-4" />}
            </span>
          )}
        </li>

        {breadcrumbItems.map((crumb, index) => (
          <li key={index} className="flex items-center gap-2 capitalize">
            {!crumb.isLast ? (
              <Link
                to={crumb.path}
                className="text-[#F1F2F9] hover:text-[#75767F] transition-colors"
              >
                {crumb.name}
              </Link>
            ) : (
              <span className="text-[#75767F]">{crumb.name}</span>
            )}
            {!crumb.isLast && (
              <span className="text-[#F1F2F9]">
                {<ChevronRight className="w-4 h-4" />}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
