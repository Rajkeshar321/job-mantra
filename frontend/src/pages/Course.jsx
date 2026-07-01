import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Users, CheckCircle, ArrowRight, Loader } from 'lucide-react';

const CoursesCard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('https://job-mantra.onrender.com/api/courses');
      const data = await response.json();
      setCourses(data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type) => {
    alert(message);
  };

  const handleEnroll = async (course) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    setEnrollingId(course.id);

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
        showToast(`✅ Enrolled in ${course.title}!`, 'success');
      } else {
        showToast(`❌ ${data.message || 'Enrollment failed'}`, 'error');
      }
    } catch (error) {
      showToast('❌ Network error', 'error');
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <Loader size={32} style={{ margin: '0 auto 1rem', display: 'block' }} />
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <section style={{ padding: '4rem 0', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '2rem' }}>
          Popular Courses
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {courses.map((course) => (
            <div key={course.id} style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <img 
                src={course.image || 'https://via.placeholder.com/400x180?text=Course'} 
                alt={course.title} 
                style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {course.title}
                </h3>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
                  <span><Star size={14} fill="#f59e0b" color="#f59e0b" /> {course.rating || '4.5'}</span>
                  <span><Users size={14} /> {course.students || 0}</span>
                  <span><Clock size={14} /> {course.duration || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {(course.features || []).map((feature, idx) => (
                    <span key={idx} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: '#d1fae5', color: '#065f46', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle size={12} /> {feature}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>
                    ₹{course.currentPrice || 0}
                  </span>
                  <button 
                    onClick={() => handleEnroll(course)}
                    disabled={enrollingId === course.id}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      background: '#2563eb', 
                      color: 'white', 
                      border: 'none', 
                      padding: '0.5rem 1rem', 
                      borderRadius: '0.5rem', 
                      fontWeight: 600,
                      cursor: enrollingId === course.id ? 'not-allowed' : 'pointer',
                      opacity: enrollingId === course.id ? '0.7' : '1'
                    }}
                  >
                    {enrollingId === course.id ? (
                      <><Loader size={16} /> Enrolling...</>
                    ) : (
                      <>Enroll Now <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { CoursesCard };