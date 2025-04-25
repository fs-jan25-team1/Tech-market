import { Link, useLocation, useParams } from 'react-router-dom';

export const Breadcrumb = () => {
  const location = useLocation();
  const { id } = useParams();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const formatSegment = (segment: string) => {
    return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

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
          {segments.length > 0 && <span className="text-[#75767F]">›</span>}
        </li>
        {segments.map((segment, index) => {
          const path = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;

          return (
            <li key={index} className="flex items-center gap-1 capitalize">
              {!isLast ? (
                <Link
                  to={path}
                  className="text-[#75767F] hover:text-[#F1F2F9] transition-colors"
                >
                  {formatSegment(segment)}
                </Link>
              ) : (
                <span className="text-[#F1F2F9]">
                  {id ? formatSegment(id) : formatSegment(segment)}
                </span>
              )}
              {!isLast && <span className="text-[#75767F]">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
