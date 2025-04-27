import { Link } from 'react-router-dom';
import { useBreadcrumb } from './useBreadcrumb';

export const Breadcrumb = ({ productName }: { productName?: string }) => {
  const breadcrumbItems = useBreadcrumb(productName);

  if (breadcrumbItems.length === 0) return null;

  return (
    <nav
      className="text-sm text-muted-foreground py-4 px-4"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-1">
        <li className="flex items-center gap-1">
          <Link
            to="/"
            className="text-[#75767F] hover:text-[#F1F2F9] transition-colors"
          >
            Home
          </Link>
          {breadcrumbItems.length > 0 && <span className="text-[#75767F]">›</span>}
        </li>

        {breadcrumbItems.map((crumb, index) => (
          <li key={index} className="flex items-center gap-1 capitalize">
            {!crumb.isLast ? (
              <Link
                to={crumb.path}
                className="text-[#75767F] hover:text-[#F1F2F9] transition-colors"
              >
                {crumb.name}
              </Link>
            ) : (
              <span className="text-[#F1F2F9]">{crumb.name}</span>
            )}
            {!crumb.isLast && <span className="text-[#75767F]">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
