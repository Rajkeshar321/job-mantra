import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, BookOpen, Users, Award, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Crack Government Exams',
      subtitle: 'SSC, Banking, Railway, UPSC & More',
      description: 'Join 10,000+ students preparing for competitive exams with expert faculty and comprehensive study material.',
      cta: 'Explore Courses',
      link: '/courses',
      stats: [
        { icon: Users, label: '10K+ Students', value: '10,000+' },
        { icon: BookOpen, label: 'Courses', value: '500+' },
        { icon: Award, label: 'Selections', value: '2,000+' },
        { icon: TrendingUp, label: 'Success Rate', value: '85%' },
      ]
    },
    {
      title: 'SSC GD 2027 बैच',
      subtitle: 'Complete Preparation for SSC Constable',
      description: 'Live classes, recorded sessions, mock tests, and study material in Hindi & English.',
      cta: 'Join Now',
      link: '/courses',
      stats: [
        { icon: Play, label: 'Live Classes', value: '200+' },
        { icon: BookOpen, label: 'Mock Tests', value: '100+' },
        { icon: Users, label: 'Faculty', value: '25+' },
        { icon: Award, label: 'PDF Notes', value: '500+' },
      ]
    },
    {
      title: 'UPSSSC Lower PCS',
      subtitle: 'उ0प्र0 अवर अधीनस्थ सेवा चयन आयोग',
      description: 'Specialized batch for UPSSSC exams with bilingual content and previous year paper analysis.',
      cta: 'Enroll Today',
      link: '/courses',
      stats: [
        { icon: Users, label: 'Batches', value: '5+' },
        { icon: BookOpen, label: 'Subjects', value: '15+' },
        { icon: Award, label: 'Doubt Sessions', value: 'Daily' },
        { icon: TrendingUp, label: 'Rating', value: '4.9/5' },
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-pattern" />
        <div className="hero-gradient" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-live">● Live Batches Available</span>
          </div>

          <h1 className="hero-title animate-fade-in-up">
            {slide.title}
          </h1>

          <h2 className="hero-subtitle">
            {slide.subtitle}
          </h2>

          <p className="hero-description">
            {slide.description}
          </p>

          <div className="hero-buttons">
            <Link to={slide.link} className="btn btn-primary hero-btn">
              {slide.cta} <ArrowRight size={20} />
            </Link>
            <Link to="/free-courses" className="btn btn-secondary hero-btn">
              <Play size={18} /> Free Demo
            </Link>
          </div>

          <div className="hero-stats">
            {slide.stats.map((stat, idx) => (
              <div key={idx} className="stat-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="stat-icon">
                  <stat.icon size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-cards">
            <div className="float-card card-1">
              <div className="float-icon">🎯</div>
              <span>SSC CGL</span>
            </div>
            <div className="float-card card-2">
              <div className="float-icon">📚</div>
              <span>Bank PO</span>
            </div>
            <div className="float-card card-3">
              <div className="float-icon">🚂</div>
              <span>Railway</span>
            </div>
            <div className="float-card card-4">
              <div className="float-icon">🏛️</div>
              <span>UPSC</span>
            </div>
            <div className="float-card card-5">
              <div className="float-icon">📝</div>
              <span>UPSSSC</span>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image">
              <div className="exam-card ssc">
                <span className="exam-tag">SSC</span>
                <span className="exam-name">SSC GD 2027</span>
              </div>
              <div className="exam-card banking">
                <span className="exam-tag">Banking</span>
                <span className="exam-name">SBI PO 2026</span>
              </div>
              <div className="exam-card railway">
                <span className="exam-tag">Railway</span>
                <span className="exam-name">RRB NTPC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="slide-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`slide-dot ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>

      <style >{`
        .hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 80px;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #eff6ff 100%);
        }

        .hero-container {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 2rem 1rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .hero-content {
          animation: fadeInUp 0.8s ease-out;
        }

        .hero-badge {
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          color: var(--text-dark);
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 1rem;
          font-family: 'Noto Sans Devanagari', sans-serif;
        }

        .hero-description {
          font-size: 1.1rem;
          color: var(--text-light);
          margin-bottom: 2rem;
          max-width: 500px;
          line-height: 1.7;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .hero-btn {
          padding: 1rem 2rem;
          font-size: 1rem;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          max-width: 400px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: white;
          border-radius: 0.75rem;
          box-shadow: var(--shadow-sm);
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }

        .stat-icon {
          width: 36px;
          height: 36px;
          background: var(--primary-light);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-dark);
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-light);
        }

        .hero-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-cards {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .float-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: white;
          border-radius: 0.75rem;
          box-shadow: var(--shadow-lg);
          font-weight: 600;
          font-size: 0.85rem;
          animation: float 3s ease-in-out infinite;
        }

        .float-icon {
          font-size: 1.25rem;
        }

        .card-1 { top: 10%; left: 10%; animation-delay: 0s; }
        .card-2 { top: 20%; right: 15%; animation-delay: 0.5s; }
        .card-3 { bottom: 30%; left: 5%; animation-delay: 1s; }
        .card-4 { bottom: 20%; right: 10%; animation-delay: 1.5s; }
        .card-5 { top: 50%; right: 5%; animation-delay: 0.8s; }

        .hero-image-wrapper {
          position: relative;
          width: 100%;
          max-width: 500px;
        }

        .hero-image {
          position: relative;
          height: 400px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
        }

        .exam-card {
          background: white;
          border-radius: 1rem;
          padding: 1.25rem 1.5rem;
          box-shadow: var(--shadow-lg);
          display: flex;
          align-items: center;
          gap: 1rem;
          animation: slideIn 0.6s ease-out forwards;
          transition: all 0.3s ease;
        }

        .exam-card:hover {
          transform: translateX(10px);
        }

        .exam-tag {
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .ssc .exam-tag { background: #dbeafe; color: #1e40af; }
        .banking .exam-tag { background: #fef3c7; color: #d97706; }
        .railway .exam-tag { background: #d1fae5; color: #059669; }

        .exam-name {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-dark);
        }

        .slide-indicators {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 2;
        }

        .slide-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: #cbd5e1;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .slide-dot.active {
          width: 30px;
          border-radius: 5px;
          background: var(--primary);
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-stats {
            margin: 0 auto;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-visual {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .hero-stats {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
