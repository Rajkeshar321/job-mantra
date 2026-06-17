import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Star, Clock, Users, IndianRupee, 
  CheckCircle, BookOpen, ChevronDown, Grid3X3, List, X, CreditCard, Loader
} from 'lucide-react';

const Course = () => {
  const navigate = useNavigate();
  const [enrollingId, setEnrollingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const categories = ['All', 'SSC', 'Banking', 'Railway', 'UPSC', 'State PSC', 'Defense', 'Teaching'];

  const courses = [
    {
      id: 1, title: 'SSC CGL 2026 Complete Foundation', category: 'SSC', instructor: 'Rajesh Kumar',
      rating: 4.9, students: 15420, duration: '12 Months', lectures: 400,
      originalPrice: 2499, currentPrice: 1499, discount: 40, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
      features: ['Live Classes', 'Recorded', 'Test Series', 'PDF Notes'], badge: 'BESTSELLER'
    },
    {
      id: 2, title: 'SSC CHSL 2026 Complete Batch', category: 'SSC', instructor: 'Priya Singh',
      rating: 4.8, students: 8900, duration: '8 Months', lectures: 250,
      originalPrice: 1999, currentPrice: 1299, discount: 35, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
      features: ['Bilingual', 'Mock Tests', 'Doubt Sessions'], badge: 'HOT'
    },
    {
      id: 3, title: 'Bank PO SBI/IBPS Complete Course', category: 'Banking', instructor: 'Amit Sharma',
      rating: 4.7, students: 11200, duration: '8 Months', lectures: 300,
      originalPrice: 1999, currentPrice: 1299, discount: 35, image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400',
      features: ['Prelims+Mains', 'Interview', 'GA Capsules'], badge: 'POPULAR'
    },
    {
      id: 4, title: 'Railway NTPC & Group D 2026', category: 'Railway', instructor: 'Vikram Patel',
      rating: 4.8, students: 15600, duration: '6 Months', lectures: 200,
      originalPrice: 1499, currentPrice: 999, discount: 33, image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400',
      features: ['Technical', 'Non-Technical', 'Mock Tests'], badge: 'TRENDING'
    },
    {
      id: 6, title: 'UPSSSC Lower PCS Complete', category: 'State PSC', instructor: 'Rahul Gupta',
      rating: 4.7, students: 9800, duration: '8 Months', lectures: 250,
      originalPrice: 1499, currentPrice: 799, discount: 47, image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
      features: ['Complete Syllabus', 'Hindi Medium', 'PYQs'], badge: 'HOT'
    },
    {
      id: 7, title: 'BSF RO RM संचार 2.0 Batch', category: 'Defense', instructor: 'Major Vikram',
      rating: 4.9, students: 6200, duration: '5 Months', lectures: 180,
      originalPrice: 1499, currentPrice: 999, discount: 33, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
      features: ['Technical', 'Physical', 'Interview'], badge: 'NEW'
    },
    {
      id: 8, title: 'CTET & TET Complete Preparation', category: 'Teaching', instructor: 'Neha Sharma',
      rating: 4.6, students: 7800, duration: '4 Months', lectures: 150,
      originalPrice: 1299, currentPrice: 699, discount: 46, image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
      features: ['Paper 1 & 2', 'Child Development', 'Mock Tests'], badge: 'POPULAR'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'popular') return b.students - a.students;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.currentPrice - b.currentPrice;
    if (sortBy === 'price-high') return b.currentPrice - a.currentPrice;
    return 0;
  });

  const handlePayment = async (course) => {
    const token = localStorage.getItem('jobmantra_token');
    
    console.log('Token from localStorage:', token ? 'Found' : 'Not found');
    
    if (!token) {
      navigate('/login');
      return;
    }

    setEnrollingId(course.id);

    try {
      const orderResponse = await fetch('http://localhost:5000/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: course.currentPrice,
          courseId: course.id,
          courseTitle: course.title
        })
      });

      const orderData = await orderResponse.json();
      console.log('Order response:', orderData);

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Job Mantra',
        description: course.title,
        order_id: orderData.orderId,
        handler: async function (response) {
          const verifyResponse = await fetch('http://localhost:5000/api/payments/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course.id,
              courseTitle: course.title,
              price: course.currentPrice
            })
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            showToast(`✅ Payment successful! Enrolled in ${course.title}`, 'success');
          } else {
            showToast('❌ Payment verification failed', 'error');
          }
        },
        prefill: {
          name: 'Student',
          email: 'student@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#2563eb'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on('payment.failed', function (response) {
        showToast(`❌ Payment failed: ${response.error.description}`, 'error');
        setEnrollingId(null);
      });

    } catch (error) {
      console.error('Payment error:', error);
      showToast('❌ Payment failed. Please try again.', 'error');
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <div className="courses-page">
      <div className="courses-hero">
        <div className="container">
          <h1>All Courses</h1>
          <p>Choose from 500+ courses designed for government exam success</p>
        </div>
      </div>

      <div className="container">
        <div className="courses-toolbar">
          <div className="search-box">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search courses, exams, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="toolbar-right">
            <div className="sort-dropdown">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown size={16} />
            </div>

            <div className="view-toggle">
              <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>
                <Grid3X3 size={20} />
              </button>
              <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="category-filter">
          {categories.map(cat => (
            <button 
              key={cat}
              className={selectedCategory === cat ? 'active' : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={`courses-${viewMode}`}>
          {sortedCourses.map(course => (
            <div key={course.id} className={`course-item ${viewMode}`}>
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <span className={`badge ${course.badge.toLowerCase()}`}>{course.badge}</span>
              </div>
              <div className="course-details">
                <div className="course-category">{course.category}</div>
                <h3>{course.title}</h3>
                <p className="instructor">by {course.instructor}</p>

                <div className="course-meta">
                  <span><Star size={14} fill="#f59e0b" color="#f59e0b" /> {course.rating}</span>
                  <span><Users size={14} /> {(course.students/1000).toFixed(1)}k</span>
                  <span><Clock size={14} /> {course.duration}</span>
                  <span><BookOpen size={14} /> {course.lectures} lectures</span>
                </div>

                <div className="course-features">
                  {course.features.map((f, i) => (
                    <span key={i}><CheckCircle size={12} /> {f}</span>
                  ))}
                </div>

                <div className="course-price-row">
                  <div className="price">
                    <span className="original"><IndianRupee size={14} />{course.originalPrice}</span>
                    <span className="current"><IndianRupee size={18} />{course.currentPrice}/-</span>
                    <span className="discount">{course.discount}% OFF</span>
                  </div>
                  <button 
                    className="btn btn-primary payment-btn" 
                    onClick={() => handlePayment(course)}
                    disabled={enrollingId === course.id}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    {enrollingId === course.id ? (
                      <>
                        <Loader size={16} className="spin" /> Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} /> Buy Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          <span>{toast.message}</span>
          <button onClick={() => setToast({ ...toast, show: false })} className="toast-close">
            <X size={16} />
          </button>
        </div>
      )}

      <style>{`
        .courses-page { padding-top: 80px; }
        .courses-hero { background: var(--gradient-primary); padding: 3rem 0; color: white; text-align: center; }
        .courses-hero h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
        .courses-hero p { opacity: 0.9; font-size: 1.1rem; }
        .courses-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 1.5rem 0; flex-wrap: wrap; }
        .search-box { flex: 1; min-width: 250px; display: flex; align-items: center; gap: 0.75rem; background: white; border: 2px solid var(--border); border-radius: 0.75rem; padding: 0.75rem 1rem; }
        .search-box input { border: none; outline: none; flex: 1; font-size: 0.95rem; }
        .toolbar-right { display: flex; gap: 1rem; align-items: center; }
        .sort-dropdown { position: relative; }
        .sort-dropdown select { appearance: none; padding: 0.6rem 2rem 0.6rem 1rem; border: 2px solid var(--border); border-radius: 0.5rem; background: white; font-size: 0.9rem; cursor: pointer; }
        .sort-dropdown svg { position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%); pointer-events: none; }
        .view-toggle { display: flex; border: 2px solid var(--border); border-radius: 0.5rem; overflow: hidden; }
        .view-toggle button { padding: 0.6rem; border: none; background: white; cursor: pointer; color: var(--text-light); transition: all 0.2s; }
        .view-toggle button.active { background: var(--primary); color: white; }
        .category-filter { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .category-filter button { padding: 0.5rem 1rem; border: 2px solid var(--border); border-radius: 9999px; background: white; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: all 0.2s; }
        .category-filter button.active { background: var(--primary); color: white; border-color: var(--primary); }
        .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
        .courses-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .course-item { background: white; border-radius: 1rem; overflow: hidden; box-shadow: var(--shadow-md); transition: all 0.3s ease; }
        .course-item:hover { transform: translateY(-3px); box-shadow: var(--shadow-xl); }
        .course-item.grid { display: flex; flex-direction: column; }
        .course-item.list { display: grid; grid-template-columns: 300px 1fr; }
        .course-image { position: relative; overflow: hidden; }
        .course-item.grid .course-image { height: 180px; }
        .course-item.list .course-image { height: 100%; }
        .course-image img { width: 100%; height: 100%; object-fit: cover; }
        .course-image .badge { position: absolute; top: 10px; left: 10px; padding: 0.25rem 0.75rem; border-radius: 0.5rem; font-size: 0.7rem; font-weight: 700; }
        .course-details { padding: 1.25rem; }
        .course-category { font-size: 0.75rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem; }
        .course-details h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.25rem; line-height: 1.3; }
        .instructor { font-size: 0.85rem; color: var(--text-light); margin-bottom: 0.75rem; }
        .course-meta { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.75rem; font-size: 0.8rem; color: var(--text-light); }
        .course-meta span { display: flex; align-items: center; gap: 0.25rem; }
        .course-features { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .course-features span { display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; padding: 0.25rem 0.5rem; background: var(--bg-light); border-radius: 0.25rem; color: var(--text-light); }
        .course-price-row { display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px solid var(--border); }
        .price { display: flex; align-items: center; gap: 0.5rem; }
        .original { text-decoration: line-through; color: var(--text-light); font-size: 0.9rem; }
        .current { font-size: 1.25rem; font-weight: 800; color: var(--accent); }
        .discount { font-size: 0.75rem; font-weight: 700; color: var(--success); background: #d1fae5; padding: 0.2rem 0.5rem; border-radius: 0.25rem; }
        .payment-btn { padding: 0.5rem 1.25rem; font-size: 0.85rem; }
        .payment-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .toast-notification { position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem; border-radius: 0.75rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 600; font-size: 0.9rem; z-index: 9999; animation: slideIn 0.3s ease-out; box-shadow: 0 10px 40px rgba(0,0,0,0.2); max-width: 400px; }
        .toast-notification.success { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
        .toast-notification.error { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
        .toast-close { background: none; border: none; cursor: pointer; padding: 0.25rem; display: flex; align-items: center; justify-content: center; color: inherit; opacity: 0.6; transition: opacity 0.2s; }
        .toast-close:hover { opacity: 1; }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @media (max-width: 768px) { .course-item.list { grid-template-columns: 1fr; } .course-item.list .course-image { height: 180px; } .toast-notification { left: 1rem; right: 1rem; max-width: none; } }
      `}</style>
    </div>
  );
};

export default Course;