import { Link } from 'react-router-dom';
import { 
  GraduationCap, Mail, Phone, MapPin, Facebook, 
  Twitter, Instagram, Youtube, ArrowRight,
  Heart,Smartphone
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Exams': [
      'AHC', 'UPSSSC', 'SSC GD', 'SSC MTS',
      'Bank PO', 'Bank Clerk', 'IBPS', 'SBI',
      'Railway NTPC', 'Railway Group D', 'RRB JE'
      , 'State PSC'
    ],
    'Courses': [
      'Live Classes', 'Recorded Courses', 'Test Series',
      'Previous Papers', 'Study Material', 'Current Affairs',
      'Books', 'PDF Notes', 'Syllabus', 'Mock Tests'
    ],
    'Company': [
      'About Us', 'Careers', 'Blog', 'Contact',
      'Privacy Policy', 'Terms of Service', 'Refund Policy',
      'FAQ', 'Help Center', 'Feedback'
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/share/1BmRSN5LFG', label: 'Facebook' },
    { icon: Twitter, href: 'https://t.me/jobmantra12', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/job_mantra_1?igsh=a29zNml4amY1MWNh', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/channel/UCw-gOwfk5PH_ffwn_hE4XtQ', label: 'YouTube' },
    { icon: Smartphone, href: 'https://play.google.com/store/apps/details?id=com.umjlbt.khmoqu', label: 'App' },
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <div className="footer-logo-icon">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <span className="footer-logo-title">JOB MANTRA</span>
                  <span className="footer-logo-tagline">Sarkari Exam Preparation</span>
                </div>
              </Link>
              <p className="footer-description">
                India's most trusted platform for government exam preparation. 
                We provide comprehensive courses, live classes, test series, and 
                study material for AHC, Banking, Railway, and State exams.
              </p>
              <div className="footer-contact">
                <div className="contact-item">
                  <Mail size={18} />
                  <span>support@jobmantra.in</span>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <span>+91 92503 05450</span>
                </div>
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>Allapur, Prayagraj, India</span>
                </div>
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="footer-links-col">
                <h4 className="footer-links-title">{title}</h4>
                <ul className="footer-links-list">
                  {links.map((link) => (
                    <li key={link}>
                      <Link to={`/${link.toLowerCase().replace(/\s+/g, '-')}`} className="footer-link">
                        <ArrowRight size={14} />
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  className="social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <p className="footer-copyright">
              © {currentYear} Job Mantra. Made with <Heart size={14} fill="#dc2626" color="#dc2626" /> in India
            </p>
            <div className="footer-payments">
              <span>We accept:</span>
              <div className="payment-icons">
                <span className="payment-icon">UPI</span>
                <span className="payment-icon">Paytm</span>
                <span className="payment-icon">PhonePe</span>
                <span className="payment-icon">GPay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style >{`
        .footer {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #94a3b8;
        }

        .footer-top {
          padding: 4rem 0 2rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
        }

        .footer-brand {
          max-width: 350px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          margin-bottom: 1.25rem;
        }

        .footer-logo-icon {
          width: 48px;
          height: 48px;
          background: var(--gradient-primary);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .footer-logo-title {
          display: block;
          font-size: 1.25rem;
          font-weight: 800;
          color: white;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .footer-logo-tagline {
          display: block;
          font-size: 0.7rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .footer-description {
          font-size: 0.9rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
          color: #cbd5e1;
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: #cbd5e1;
        }

        .contact-item svg {
          color: var(--primary);
        }

        .footer-links-title {
          font-size: 1rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: white;
          transform: translateX(5px);
        }

        .footer-link svg {
          color: var(--primary);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .footer-link:hover svg {
          opacity: 1;
        }

        .footer-bottom {
          border-top: 1px solid #334155;
          padding: 1.5rem 0;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-social {
          display: flex;
          gap: 0.75rem;
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-3px);
        }

        .footer-copyright {
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .footer-payments {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
        }

        .payment-icons {
          display: flex;
          gap: 0.5rem;
        }

        .payment-icon {
          padding: 0.25rem 0.5rem;
          background: #334155;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }

          .footer-brand {
            max-width: 100%;
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
