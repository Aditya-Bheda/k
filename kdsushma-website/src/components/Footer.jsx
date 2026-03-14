import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              KD<span>Sushma</span>
            </div>
            <p className="footer-desc">
              Empowering entrepreneurs and MSMEs to build successful global export-import businesses through expert coaching, training, and strategic guidance.
            </p>
            <div className="footer-socials">
              <a href="https://facebook.com" className="footer-social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" className="footer-social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="footer-social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="https://youtube.com" className="footer-social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
              <a href="https://twitter.com" className="footer-social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-column-title">Quick Links</h4>
            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#books">Books</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="footer-column-title">Services</h4>
            <div className="footer-links">
              <a href="#services">1-on-1 Consultation</a>
              <a href="#services">Export Mentorship</a>
              <a href="#services">Corporate Training</a>
              <a href="#services">Market Development</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} KDSushma. All rights reserved.
          </p>
          <a href="mailto:support@kdsushma.com" className="footer-email">
            support@kdsushma.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
