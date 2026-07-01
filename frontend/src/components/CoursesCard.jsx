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

    console.log('Response status:', response.status);
    
    const data = await response.json();
    console.log('Response data:', data);

    if (response.ok) {
      showToast(`✅ Enrolled successfully in ${course.title}!`, 'success');
    } else {
      showToast(`❌ ${data.message || 'Enrollment failed'}`, 'error');
    }
  } catch (error) {
    console.error('❌ FETCH ERROR:', error);
    showToast('❌ Network error. Check console for details.', 'error');
  } finally {
    setEnrollingId(null);
  }
};