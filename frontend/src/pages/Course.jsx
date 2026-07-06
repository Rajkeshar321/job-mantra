import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Users, CheckCircle, ArrowLeft, Loader, BookOpen } from 'lucide-react';

const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    // ✅ Guard: don't fetch if id is undefined
    if (!id) {
      setLoading(false);
      return;
    }
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`https://job-mantra.onrender.com/api/courses/${id}`);
      if (!response.ok) throw new Error('Course not found');
      const data = await response.json();
      setCourse(data.course || data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setEnrolling(true);
    try {
      const response = await fetch('https://job-mantra.onrender.com/api/enrollments', {
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
      const data = await response.json();
      if (response.ok) {
        alert(`✅ Enrolled in ${course.title}!`);
      } else {
        alert(`❌ ${data.message || 'Enrollment failed'}`);
      }
    } catch (error) {
      alert('❌ Network error');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <Loader size={40} style={{ marginBottom: '1rem' }} />
        <p>Loading course...</p>
      </div>
    );
  }

  if (!id || !course) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Course not found</h2>
        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Invalid or missing course ID</p>
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            marginTop: '1.5rem', 
            padding: '0.75rem 1.5rem', 
            background: '#2563eb', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0.5rem', 
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Browse Courses
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.95rem' }}
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>
      </div>

      {/* Course Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          {/* Left Column */}
          <div>
            <img 
              src={course.image || 'https://via.placeholder.com/800x400'} 
              alt={course.title} 
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '1rem', marginBottom: '1.5rem' }} 
            />
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{course.title}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', color: '#64748b', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Star size={16} fill="#f59e0b" color="#f59e0b" /> {course.rating || '4.5'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Users size={16} /> {course.students || 0} students
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={16} /> {course.duration || 'N/A'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <BookOpen size={16} /> {course.modules?.length || 0} modules
              </span>
            </div>
            <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {course.description || 'No description available.'}
            </p>

            {/* Features */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>What you'll learn</h3>
            <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
              {(course.features || ['Industry-relevant curriculum', 'Hands-on projects', 'Certificate of completion', 'Lifetime access']).map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569' }}>
                  <CheckCircle size={18} color="#10b981" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Enrollment Card */}
          <div style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
            <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2563eb', marginBottom: '0.5rem' }}>
                ₹{course.currentPrice || 0}
              </div>
              {course.originalPrice && (
                <div style={{ textDecoration: 'line-through', color: '#94a3b8', marginBottom: '1.5rem' }}>
                  ₹{course.originalPrice}
                </div>
              )}
              <button 
                onClick={handleEnroll}
                disabled={enrolling}
                style={{ 
                  width: '100%', 
                  padding: '0.875rem', 
                  background: '#2563eb', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '0.5rem', 
                  fontSize: '1rem', 
                  fontWeight: 600,
                  cursor: enrolling ? 'not-allowed' : 'pointer',
                  opacity: enrolling ? 0.7 : 1
                }}
              >
                {enrolling ? 'Enrolling...' : 'Enroll Now'}
              </button>
              <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>
                30-day money-back guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;