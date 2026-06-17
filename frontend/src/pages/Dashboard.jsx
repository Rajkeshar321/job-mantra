import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch enrolled courses
  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user) return;
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/enrollments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setEnrolledCourses(data);
        }
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div style={{ paddingTop: '80px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div className="dashboard" style={{ padding: '80px 2rem 2rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Welcome, {user?.name || user?.email?.split('@')[0] || 'User'}!
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
          Email: {user?.email}
        </p>
        
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '0.6rem 1.5rem', 
            background: '#ef4444', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0.5rem', 
            marginTop: '1rem',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Logout
        </button>
      </div>

      {/* Enrolled Courses Section */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
          Your Courses
        </h2>
        
        {loading ? (
          <p>Loading your courses...</p>
        ) : enrolledCourses.length > 0 ? (
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {enrolledCourses.map((enrollment) => (
              <div 
                key={enrollment._id} 
                style={{ 
                  padding: '1.5rem', 
                  background: 'white', 
                  borderRadius: '0.75rem', 
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                  {enrollment.courseTitle}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  Status: <span style={{ color: '#10b981', fontWeight: '600' }}>{enrollment.status}</span>
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            padding: '2rem', 
            background: '#f9fafb', 
            borderRadius: '0.75rem', 
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <p>No enrolled courses yet.</p>
            <button 
              onClick={() => navigate('/courses')}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;