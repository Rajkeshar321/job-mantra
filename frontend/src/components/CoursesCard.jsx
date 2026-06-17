import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Star, Clock, Users, BookOpen, ChevronLeft, ChevronRight,
  Play, CheckCircle, IndianRupee, Heart, Share2, X
} from 'lucide-react';

import paymentButton from './paymentButton';

const CoursesCard = () => {
  const navigate = useNavigate();
  const [enrollingId, setEnrollingId] = useState(null);
  const scrollRef = useRef(null);
  const [likedCourses, setLikedCourses] = useState(new Set());
  
  // ✅ ADD: Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // ✅ ADD: Auto-hide toast after 3 seconds
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleEnroll = async (course) => {
    console.log('🔥 ENROLL CLICKED for:', course.title);
    
    const token = localStorage.getItem('token');
    console.log('Token exists:', !!token);
    
    if (!token) {
      console.log('No token - redirecting to login');
      navigate('/login');
      return;
    }

    setEnrollingId(course.id);
    console.log('Sending enrollment request...');

    try {
      const response = await fetch('http://localhost:5000/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId: course.id,
          courseTitle: course.title,
          price: course.currentPrice
        })
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        // ✅ FIXED: Replaced alert with toast
        showToast(`✅ Enrolled successfully in ${course.title}!`, 'success');
      } else {
        // ✅ FIXED: Replaced alert with toast
        showToast(`❌ ${data.message || 'Enrollment failed'}`, 'error');
      }
    } catch (error) {
      console.error('❌ FETCH ERROR:', error);
      // ✅ FIXED: Replaced alert with toast
      showToast('❌ Network error. Check console for details.', 'error');
    } finally {
      setEnrollingId(null);
    }
  };

  const courses = [
    {
      id: 1,
      title: 'SSC GD 2027 Complete Batch',
      subtitle: 'सरकारी नौकरी की तैयारी',
      image: 'https://kimi-web-img.moonshot.cn/img/upload.wikimedia.org/8b2ed722cb12e3f23fc0a160e71f23a5d9da5f86.jpg',
      instructor: 'Rajesh Kumar',
      rating: 4.9,
      students: 12500,
      duration: '6 Months',
      lectures: 200,
      originalPrice: 999,
      currentPrice: 639,
      discount: 20,
      badge: 'BESTSELLER',
      features: ['Live Classes', 'Mock Tests', 'PDF Notes', 'Doubt Sessions'],
      examType: 'SSC'
    },
    {
      id: 2,
      title: 'Allahabad High Court 3 Peon Batch',
      subtitle: 'इलाहाबाद हाई कोर्ट ग्रुप डी',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop',
      instructor: 'Priya Singh',
      rating: 4.8,
      students: 8500,
      duration: '4 Months',
      lectures: 150,
      originalPrice: 1299,
      currentPrice: 999,
      discount: 23,
      badge: 'NEW',
      features: ['Bilingual', 'Previous Papers', 'Current Affairs', 'Practice Sets'],
      examType: 'State'
    },
    {
      id: 3,
      title: 'UPSSSC Lower PCS 2025',
      subtitle: 'अवर अधीनस्थ सेवा चयन आयोग',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
      instructor: 'Amit Sharma',
      rating: 4.7,
      students: 9800,
      duration: '8 Months',
      lectures: 250,
      originalPrice: 1499,
      currentPrice: 799,
      discount: 47,
      badge: 'HOT',
      features: ['Complete Syllabus', 'Test Series', 'Study Material', 'Live Doubts'],
      examType: 'UPSSSC'
    },
    {
      id: 4,
      title: 'BSF RO RM 2025 संचार 2.0',
      subtitle: 'Border Security Force Radio Operator',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=250&fit=crop',
      instructor: 'Vikram Patel',
      rating: 4.9,
      students: 6200,
      duration: '5 Months',
      lectures: 180,
      originalPrice: 1499,
      currentPrice: 999,
      discount: 33,
      badge: 'POPULAR',
      features: ['Technical Focus', 'Physical Training', 'Mock Tests', 'Interview Prep'],
      examType: 'Defense'
    },
    {
      id: 5,
      title: 'SSC CGL 2027 Foundation',
      subtitle: 'Combined Graduate Level Exam',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
      instructor: 'Sunita Verma',
      rating: 4.8,
      students: 15000,
      duration: '12 Months',
      lectures: 400,
      originalPrice: 2499,
      currentPrice: 1499,
      discount: 40,
      badge: 'BESTSELLER',
      features: ['Tier 1 & 2', 'English & Hindi', 'Live + Recorded', 'Doubt App'],
      examType: 'SSC'
    },
    {
      id: 6,
      title: 'Bank PO SBI/IBPS 2026',
      subtitle: 'Probationary Officer Complete Course',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop',
      instructor: 'Rahul Gupta',
      rating: 4.7,
      students: 11000,
      duration: '8 Months',
      lectures: 300,
      originalPrice: 1999,
      currentPrice: 1299,
      discount: 35,
      badge: 'TRENDING',
      features: ['Prelims + Mains', 'Interview', 'GA Capsules', 'Sectional Tests'],
      examType: 'Banking'
    }
  ];

  const toggleLike = (id, e) => {
    e.preventDefault();
    setLikedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -340 : 340,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="featured-section">
      <div className="container">
        <div className="featured-header">
          <div>
            <h2 className="section-title">Featured</h2>
            <p className="section-subtitle">Top-rated courses for government exam preparation</p>
          </div>
          <div className="featured-nav">
            <button className="carousel-btn" onClick={() => scroll('left')}>
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-btn" onClick={() => scroll('right')}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="courses-scroll" ref={scrollRef}>
          {courses.map((course, idx) => (
            <div key={course.id} className="course-card-wrapper" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="course-card">
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                  <div className={`course-badge ${course.badge.toLowerCase()}`}>
                    {course.badge}
                  </div>
                  <button 
                    className={`like-btn ${likedCourses.has(course.id) ? 'liked' : ''}`}
                    onClick={(e) => toggleLike(course.id, e)}
                  >
                    <Heart size={18} fill={likedCourses.has(course.id) ? "currentColor" : "none"} />
                  </button>
                  <div className="play-overlay">
                    <Play size={32} fill="white" />
                  </div>
                </div>

                <div className="course-content">
                  <div className="course-exam-type">{course.examType}</div>
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-subtitle hindi-text">{course.subtitle}</p>

                  <div className="course-meta">
                    <div className="meta-item">
                      <Star size={14} fill="#f59e0b" color="#f59e0b" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="meta-item">
                      <Users size={14} />
                      <span>{(course.students / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={14} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="course-features">
                    {course.features.map((feature, fidx) => (
                      <span key={fidx} className="feature-tag">
                        <CheckCircle size={10} /> {feature}
                      </span>
                    ))}
                  </div>

                  <div className="course-footer">
                    <div className="price-section">
                      <div className="price-tag">
                        <span className="price-original">
                          <IndianRupee size={12} />{course.originalPrice}
                        </span>
                        <span className="price-current">
                          <IndianRupee size={16} />{course.currentPrice}/-
                        </span>
                      </div>
                      <span className="discount">{course.discount}% OFF</span>
                    </div>
                    <button 
                      className="btn btn-primary enroll-btn" 
                      onClick={() => handleEnroll(course)}
                      disabled={enrollingId === course.id}
                    >
                      {enrollingId === course.id ? 'Enrolling...' : 'Enroll Now'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-wrapper">
          <Link to="/courses" className="btn btn-secondary view-all-btn">
            View All Courses <ChevronRight size={18} />
          </Link>
        </div>
      </div>

      {/* ✅ ADD: Toast Notification Component */}
      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          <span>{toast.message}</span>
          <button onClick={() => setToast({ ...toast, show: false })} className="toast-close">
            <X size={16} />
          </button>
        </div>
      )}

      <style>{`
        .featured-section {
          padding: 4rem 0;
          background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
          position: relative;
          overflow: hidden;
        }

        .featured-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .featured-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .featured-section .section-title {
          color: white;
        }

        .featured-section .section-title::after {
          background: white;
        }

        .featured-section .section-subtitle {
          color: rgba(255,255,255,0.8);
        }

        .featured-nav {
          display: flex;
          gap: 0.5rem;
        }

        .featured-nav .carousel-btn {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.3);
          color: white;
        }

        .featured-nav .carousel-btn:hover {
          background: white;
          color: var(--primary);
        }

        .courses-scroll {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding: 1rem 0.5rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          position: relative;
          z-index: 1;
        }

        .courses-scroll::-webkit-scrollbar {
          display: none;
        }

        .course-card-wrapper {
          flex: 0 0 auto;
          width: 340px;
          scroll-snap-align: start;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .course-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: var(--shadow-xl);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .course-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .course-image {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .course-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .course-card:hover .course-image img {
          transform: scale(1.1);
        }

        .course-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .course-badge.bestseller {
          background: #fef3c7;
          color: #d97706;
        }

        .course-badge.new {
          background: #d1fae5;
          color: #059669;
        }

        .course-badge.hot {
          background: #fee2e2;
          color: #dc2626;
        }

        .course-badge.popular {
          background: #dbeafe;
          color: #1e40af;
        }

        .course-badge.trending {
          background: #ede9fe;
          color: #7c3aed;
        }

        .like-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-light);
          transition: all 0.3s ease;
          z-index: 2;
        }

        .like-btn:hover, .like-btn.liked {
          color: #dc2626;
          background: white;
        }

        .play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
          cursor: pointer;
          pointer-events: none;
        }

        .course-card:hover .play-overlay {
          opacity: 1;
          pointer-events: auto;
        }

        .play-overlay svg {
          color: white;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }

        .course-content {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .course-exam-type {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }

        .course-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.25rem;
          line-height: 1.3;
        }

        .course-subtitle {
          font-size: 0.85rem;
          color: var(--text-light);
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .course-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .course-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }

        .feature-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.2rem 0.5rem;
          background: var(--bg-light);
          border-radius: 0.25rem;
          font-size: 0.7rem;
          color: var(--text-light);
        }

        .course-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
        }

        .price-section {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .price-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .price-original {
          display: flex;
          align-items: center;
          text-decoration: line-through;
          color: var(--text-light);
          font-size: 0.85rem;
        }

        .price-current {
          display: flex;
          align-items: center;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--accent);
        }

        .discount {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--success);
        }

        .enroll-btn {
          padding: 0.6rem 1.25rem;
          font-size: 0.85rem;
        }

        .view-all-wrapper {
          text-align: center;
          margin-top: 2rem;
          position: relative;
          z-index: 1;
        }

        .view-all-btn {
          background: white;
          color: var(--primary);
        }

        .view-all-btn:hover {
          background: var(--primary-light);
        }

        /* ✅ ADD: Toast Notification Styles */
        .toast-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          font-size: 0.9rem;
          z-index: 9999;
          animation: slideIn 0.3s ease-out;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          max-width: 400px;
        }

        .toast-notification.success {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .toast-notification.error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }

        .toast-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: inherit;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        .toast-close:hover {
          opacity: 1;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .course-card-wrapper {
            width: 300px;
          }

          .featured-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .toast-notification {
            left: 1rem;
            right: 1rem;
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
};

export default CoursesCard;