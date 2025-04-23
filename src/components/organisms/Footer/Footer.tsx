import { Link } from 'react-router-dom';
// import { Heart, ShoppingCart, Menu } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import '@/components/organisms/Footer/Footer.scss';

export const Footer = () => {
  const footerItems = [
    { name: 'Github', link: 'https://github.com/' },
    { name: 'Contacts', link: 'https://github.com/' },
    { name: 'Rights', link: 'https://github.com/' },
  ];

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
            <a className="footer-items" href={item.link} key={item.name}>
              {item.name}
            </a>
          ))}
        </div>

        <div className="footer__back-to-top">
          <a className="footer-back-to-top-text">Back to top</a>
          <button className="footer__back-to-top--button">B</button>
        </div>
      </div>
    </footer>
  );
};
