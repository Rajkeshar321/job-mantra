import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, MonitorPlay, BookOpen, FileCheck, 
  FileQuestion, FileText, BookText, Newspaper, Bell,
  ChevronLeft, ChevronRight, Play
} from 'lucide-react';

const BrowseCards = () => {
  const scrollRef = useRef(null);

  const categories = [
    {
      id: 1,
      title: 'Paid Courses',
      icon: GraduationCap,
      description: 'Premium courses with live sessions',
      count: '10+',
      color: '#2563eb',
      bgColor: '#dbeafe',
      link: '/courses'
    },
    {
      id: 2,
      title: 'Live classes',
      icon: MonitorPlay,
      description: 'Interactive live classes daily',
      count: '50+',
      color: '#dc2626',
      bgColor: '#fee2e2',
      link: '/live'
    },
    {
      id: 3,
      title: 'Free Courses',
      icon: BookOpen,
      description: 'Access free study material',
      count: '20+',
      color: '#059669',
      bgColor: '#d1fae5',
      link: '/free-courses'
    },
    {
      id: 4,
      title: 'Paid Test Series',
      icon: FileCheck,
      description: 'Mock tests with detailed analysis',
      count: '20+',
      color: '#7c3aed',
      bgColor: '#ede9fe',
      link: '/tests'
    },
    {
      id: 5,
      title: 'Free Weekly Test',
      icon: FileQuestion,
      description: 'Weekly free practice tests',
      count: 'Weekly',
      color: '#d97706',
      bgColor: '#fef3c7',
      link: '/tests'
    },
    {
      id: 6,
      title: 'Previous Papers',
      icon: FileText,
      description: 'Last 10 years solved papers',
      count: '200+',
      color: '#0891b2',
      bgColor: '#cffafe',
      link: '/notes'
    },
    {
      id: 7,
      title: 'Books',
      icon: BookText,
      description: 'Recommended study books',
      count: '50+',
      color: '#be185d',
      bgColor: '#fce7f3',
      link: '/notes'
    },
    {
      id: 8,
      title: 'Quiz',
      icon: FileQuestion,
      description: 'Daily quiz for practice',
      count: 'Daily',
      color: '#4338ca',
      bgColor: '#e0e7ff',
      link: '/tests'
    },
    {
      id: 9,
      title: 'Job Alerts',
      icon: Bell,
      description: 'Latest government job notifications',
      count: 'Live',
      color: '#ea580c',
      bgColor: '#ffedd5',
      link: '/blog'
    },
    {
      id: 10,
      title: 'Blogs',
      icon: Newspaper,
      description: 'Exam tips and strategies',
      count: '200+',
      color: '#0d9488',
      bgColor: '#ccfbf1',
      link: '/blog'
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="browse-section">
      <div className="container">
        <div className="browse-header">
          <div>
            <h2 className="section-title">Browse</h2>
            <p className="section-subtitle">Explore all our learning resources</p>
          </div>
          <div className="browse-nav">
            <button className="carousel-btn" onClick={() => scroll('left')}>
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-btn" onClick={() => scroll('right')}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="browse-cards-wrapper" ref={scrollRef}>
          {categories.map((category, idx) => (
            <Link 
              key={category.id} 
              to={category.link}
              className="browse-card"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div 
                className="browse-icon"
                style={{ backgroundColor: category.bgColor, color: category.color }}
              >
                <category.icon size={28} />
              </div>
              <h3 className="browse-title">{category.title}</h3>
              <p className="browse-desc">{category.description}</p>
              <span className="browse-count">{category.count}</span>
            </Link>
          ))}
        </div>
      </div>

      <style >{`
        .browse-section {
          padding: 3rem 0;
          background: white;
        }

        .browse-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 1.5rem;
        }

        .browse-nav {
          display: flex;
          gap: 0.5rem;
        }

        .carousel-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--border);
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-dark);
          transition: all 0.3s ease;
        }

        .carousel-btn:hover {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        .browse-cards-wrapper {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding: 0.5rem 0;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .browse-cards-wrapper::-webkit-scrollbar {
          display: none;
        }

        .browse-card {
          flex: 0 0 auto;
          width: 200px;
          padding: 1.5rem;
          background: white;
          border: 2px solid var(--border);
          border-radius: 1rem;
          text-decoration: none;
          color: var(--text-dark);
          transition: all 0.3s ease;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }

        .browse-card:hover {
          border-color: var(--primary);
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
        }

        .browse-icon {
          width: 60px;
          height: 60px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .browse-card:hover .browse-icon {
          transform: scale(1.1);
        }

        .browse-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .browse-desc {
          font-size: 0.75rem;
          color: var(--text-light);
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .browse-count {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          background: var(--bg-light);
          border-radius: 9999px;
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .browse-card {
            width: 160px;
            padding: 1rem;
          }

          .browse-icon {
            width: 50px;
            height: 50px;
          }

          .browse-icon svg {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default BrowseCards;
