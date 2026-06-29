import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import {
  Search, User, ChevronDown, Menu, X, BookOpen,
  FileQuestion, Newspaper, Bell, BookText, GraduationCap,
  MonitorPlay, FileCheck, Home, FileText, LogOut
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const moreDropdownRef = useRef(null);
  const allDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setIsMoreDropdownOpen(false);
      }
      if (allDropdownRef.current && !allDropdownRef.current.contains(event.target)) {
        setIsAllDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu and search on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsMoreDropdownOpen(false);
    setIsAllDropdownOpen(false);
    setIsUserDropdownOpen(false);
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        setIsMoreDropdownOpen(false);
        setIsAllDropdownOpen(false);
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/courses', label: 'Paid Courses', icon: GraduationCap },
    { path: '/live', label: 'Live', icon: MonitorPlay },
    { path: '/free-courses', label: 'Free Courses', icon: BookOpen },
    { path: '/test-series', label: 'Paid Test Series', icon: FileCheck },
  ];

  const moreLinks = [
    { path: '/weekly-tests', label: 'Free Weekly Test', icon: FileQuestion },
    { path: '/previous-papers', label: "Previous Years' Papers", icon: FileText },
    { path: '/books', label: 'Books', icon: BookText },
    { path: '/books-demo', label: 'Books Demo', icon: BookOpen },
    { path: '/quiz', label: 'Quiz', icon: FileQuestion },
    { path: '/job-alerts', label: 'Job Alerts', icon: Bell },
    { path: '/blogs', label: 'Blogs', icon: Newspaper },
    { path: '/pdf-notes', label: 'PDF Class Notes', icon: FileText },
    { path: '/syllabus', label: 'Syllabus', icon: BookText },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/" className="logo">
              <div className="logo-icon">
                <GraduationCap size={28} />
              </div>
              <div className="logo-text">
                <span className="logo-title">JOB MANTRA</span>
                <span className="logo-tagline">Sarkari Exam Prep</span>
              </div>
            </Link>
          </div>

          <div className="navbar-center desktop-only">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}

            <div className="dropdown" ref={moreDropdownRef}>
              <button
                className="nav-link dropdown-toggle"
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                aria-expanded={isMoreDropdownOpen}
                aria-haspopup="true"
              >
                More <ChevronDown size={16} className={`chevron ${isMoreDropdownOpen ? 'rotate' : ''}`} />
              </button>
              {isMoreDropdownOpen && (
                <div className="dropdown-menu mega-menu">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="dropdown-item"
                      onClick={() => setIsMoreDropdownOpen(false)}
                    >
                      <link.icon size={18} />
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="navbar-right">
            <button
              className="icon-btn search-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>

            <div className="dropdown desktop-only" ref={allDropdownRef}>
              <button
                className="icon-btn all-btn"
                onClick={() => setIsAllDropdownOpen(!isAllDropdownOpen)}
                aria-expanded={isAllDropdownOpen}
                aria-haspopup="true"
              >
                <span className="all-text">All</span>
                <ChevronDown size={16} />
              </button>
              {isAllDropdownOpen && (
                <div className="dropdown-menu all-menu">
                  <Link to="/courses" className="dropdown-item" onClick={() => setIsAllDropdownOpen(false)}>All Courses</Link>
                  <Link to="/test-series" className="dropdown-item" onClick={() => setIsAllDropdownOpen(false)}>All Tests</Link>
                  <Link to="/pdf-notes" className="dropdown-item" onClick={() => setIsAllDropdownOpen(false)}>All Notes</Link>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="dropdown" ref={userDropdownRef}>
                <button
                  className="icon-btn user-btn"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  aria-expanded={isUserDropdownOpen}
                  aria-haspopup="true"
                  style={{ background: '#10b981' }}
                >
                  <User size={20} />
                </button>
                {isUserDropdownOpen && (
                  <div className="dropdown-menu all-menu">
                    <Link
                      to="/dashboard"
                      className="dropdown-item"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        handleLogout();
                      }}
                      style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="icon-btn user-btn" aria-label="Login">
                <User size={20} />
              </Link>
            )}

            <button
              className="icon-btn mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="search-bar">
            <div className="container">
              <div className="search-input-wrapper">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for SSC, Banking, Railway, UPSC courses..."
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="mobile-menu-content"
            ref={mobileMenuRef}
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}
            <div className="mobile-divider" />
            {moreLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}
            <div className="mobile-divider" />
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={20} />
                  Dashboard
                </Link>
                <button
                  className="mobile-nav-link"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={20} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: white;
          transition: all 0.3s ease;
        }

        .navbar.scrolled {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .navbar-left {
          display: flex;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #2563eb;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .logo-tagline {
          font-size: 0.65rem;
          color: #6b7280;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .navbar-center {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.75rem;
          color: #1f2937;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          background: #eff6ff;
          color: #2563eb;
        }

        .nav-link.active {
          background: #eff6ff;
          color: #2563eb;
        }

        .dropdown {
          position: relative;
        }

        .dropdown-toggle {
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        .chevron {
          transition: transform 0.2s ease;
        }

        .chevron.rotate {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          margin-top: 0.5rem;
          z-index: 1001;
          animation: slideDown 0.2s ease;
        }

        .mega-menu {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.25rem;
          padding: 0.75rem;
          min-width: 320px;
          left: 50%;
          right: auto;
          transform: translateX(-50%);
        }

        .all-menu {
          min-width: 180px;
          padding: 0.5rem;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 0.75rem;
          color: #374151;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 0.5rem;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .dropdown-item:hover {
          background: #eff6ff;
          color: #2563eb;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #374151;
          transition: all 0.2s ease;
        }

        .icon-btn:hover {
          background: #eff6ff;
          color: #2563eb;
        }

        .search-btn {
          background: #f1f5f9;
        }

        .all-btn {
          width: auto;
          padding: 0 0.75rem;
          gap: 0.25rem;
        }

        .all-text {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .user-btn {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
        }

        .user-btn:hover {
          background: #1d4ed8;
          color: white;
        }

        .mobile-menu-btn {
          display: none;
        }

        .search-bar {
          background: white;
          border-top: 1px solid #e5e7eb;
          padding: 1rem 0;
          animation: slideDown 0.3s ease;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .search-input-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #f1f5f9;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
        }

        .search-input-wrapper input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 1rem;
          outline: none;
          color: #1f2937;
        }

        .search-input-wrapper input::placeholder {
          color: #9ca3af;
        }

        .search-icon {
          color: #9ca3af;
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 999;
          animation: fadeIn 0.2s ease;
        }

        .mobile-menu-content {
          position: absolute;
          top: 70px;
          left: 0;
          right: 0;
          background: white;
          max-height: calc(100vh - 70px);
          overflow-y: auto;
          padding: 1rem;
          border-radius: 0 0 1rem 1rem;
          animation: slideDown 0.3s ease;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          color: #1f2937;
          text-decoration: none;
          font-weight: 500;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          background: #eff6ff;
          color: #2563eb;
        }

        .mobile-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 0.5rem 0;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 1024px) {
          .navbar-center {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .desktop-only {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .logo-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;