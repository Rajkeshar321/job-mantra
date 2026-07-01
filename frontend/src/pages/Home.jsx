import HeroSection from '../components/HeroSection';
import BrowseCards from '../components/BrowseCards';
import {CoursesCard} from '../components/CoursesCard';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Users, Award, TrendingUp, Star, 
  CheckCircle, Play, ArrowRight, Zap, Target
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Users,
      title: 'Expert Faculty',
      description: 'Learn from experienced teachers who have cracked these exams themselves'
    },
    {
      icon: Play,
      title: 'Live + Recorded',
      description: 'Attend live classes or watch recorded sessions anytime, anywhere'
    },
    {
      icon: Target,
      title: 'Exam Focused',
      description: 'Curriculum designed specifically for Indian government exam patterns'
    },
    {
      icon: Zap,
      title: 'Doubt Resolution',
      description: 'Get your doubts cleared in real-time during live sessions'
    }
  ];

  const testimonials = [
    {
      name: 'Rahul Kumar',
      exam: 'SSC CGL 2025',
      rank: 'AIR 245',
      text: 'Job Mantra helped me crack SSC CGL in my first attempt. The live classes and test series were game-changers.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      exam: 'SBI PO 2025',
      rank: 'Selected',
      text: 'The bilingual content in Hindi and English made it easy for me to understand complex topics. Highly recommended!',
      rating: 5
    },
    {
      name: 'Amit Singh',
      exam: 'RRB NTPC',
      rank: 'Selected',
      text: 'Best platform for railway exam preparation. The previous year paper analysis helped me understand the pattern.',
      rating: 5
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Active Students', icon: Users },
    { value: '500+', label: 'Video Courses', icon: Play },
    { value: '10,000+', label: 'Mock Tests', icon: Target },
    { value: '5,000+', label: 'Success Stories', icon: Award },
  ];

  return (
    <div className="home-page">
      <HeroSection />
      <BrowseCards />
      <CoursesCard />

      {/* Why Choose Us */}
      <section className="why-section">
        <div className="container">
          <div className="why-header">
            <h2 className="section-title">Why Choose Job Mantra?</h2>
            <p className="section-subtitle">Everything you need to crack government exams</p>
          </div>
          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="feature-icon">
                  <feature.icon size={28} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-icon-large">
                  <stat.icon size={32} />
                </div>
                <span className="stat-number">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-header">
            <h2 className="section-title">Success Stories</h2>
            <p className="section-subtitle">Hear from our students who cracked their dream exams</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.name[0]}</div>
                  <div className="author-info">
                    <span className="author-name">{testimonial.name}</span>
                    <span className="author-exam">{testimonial.exam} - {testimonial.rank}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Start Your Government Exam Preparation Today</h2>
            <p>Join 50,000+ students preparing for their dream job. Get access to live classes, test series, and study material.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">
                Get Started Free <ArrowRight size={18} />
              </Link>
              <Link to="/courses" className="btn btn-secondary">
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style >{`
        .home-page {
          padding-top: 0;
        }

        .why-section {
          padding: 5rem 0;
          background: white;
        }

        .why-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          padding: 2rem;
          background: var(--bg-light);
          border-radius: 1rem;
          text-align: center;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          background: white;
        }

        .feature-icon {
          width: 64px;
          height: 64px;
          background: var(--gradient-primary);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 1rem;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-dark);
        }

        .feature-card p {
          color: var(--text-light);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .stats-section {
          padding: 4rem 0;
          background: var(--gradient-primary);
          position: relative;
          overflow: hidden;
        }

        .stats-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          position: relative;
          z-index: 1;
        }

        .stat-card {
          text-align: center;
          color: white;
          padding: 1.5rem;
        }

        .stat-icon-large {
          width: 56px;
          height: 56px;
          background: rgba(255,255,255,0.2);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          backdrop-filter: blur(10px);
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.9;
        }

        .testimonials-section {
          padding: 5rem 0;
          background: var(--bg-light);
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .testimonial-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: var(--shadow-md);
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
        }

        .testimonial-rating {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }

        .testimonial-text {
          font-size: 1rem;
          color: var(--text-dark);
          line-height: 1.7;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .author-info {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-weight: 700;
          color: var(--text-dark);
        }

        .author-exam {
          font-size: 0.85rem;
          color: var(--primary);
          font-weight: 600;
        }

        .cta-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%);
        }

        .cta-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
        }

        .cta-content p {
          font-size: 1.1rem;
          color: #94a3b8;
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-buttons .btn-secondary {
          color: white;
          border-color: rgba(255,255,255,0.3);
        }

        .cta-buttons .btn-secondary:hover {
          background: rgba(255,255,255,0.1);
        }

        @media (max-width: 768px) {
          .cta-content h2 {
            font-size: 1.75rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat-number {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;