import { Link } from 'react-router-dom';
import '@/components/organisms/Footer/Footer.scss';
import Button from '@/components/atoms/button/Button';
import { ButtonTypes } from '../../../types/ButtonTypes';
import { ChevronUp } from 'lucide-react';

export const Footer = () => {
  const footerItems = [
    { name: 'Github', link: 'https://github.com/' },
    { name: 'Contacts', link: 'https://github.com/' },
    { name: 'Rights', link: 'https://github.com/' },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <Link to="/" className="footer__logo--link">
            <img src="/src/assets/logo/Logo.svg" alt="Nice Gadgets" />
          </Link>
        </div>

        <div className="footer__links">
          {footerItems.map((item) => (
            <a
              className="footer-items"
              href={item.link}
              key={item.name}
              target="blank"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="footer__back-to-top" onClick={scrollToTop}>
          <a className="footer-back-to-top-text">Back to top</a>
          <Button variant={ButtonTypes.arrow} className="footer__back-to-top--button" icon={ChevronUp} />
        </div>
      </div>
    </footer>
  );
};
