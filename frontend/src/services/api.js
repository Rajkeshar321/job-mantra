const API_BASE_URL = 'https://job-mantra.onrender.com'; // Change to your backend URL

// Helper to handle responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Something went wrong' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
};

// Helper to get auth token (FIXED: use 'token' to match authContext)
const getToken = () => localStorage.getItem('token');

// API client with auth
const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() && { 'Authorization': `Bearer ${getToken()}` }),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);
  return handleResponse(response);
};

// Auth APIs (FIXED: added /api prefix to all endpoints)
export const authAPI = {
  login: (credentials) => apiClient('/api/auth/login', {
    method: 'POST',
    body: credentials,
  }),
  
  register: (userData) => apiClient('/api/auth/register', {
    method: 'POST',
    body: userData,
  }),
  
  getMe: () => apiClient('/api/auth/me'),
  
  logout: () => apiClient('/api/auth/logout', { method: 'POST' }),
};

// Course APIs (FIXED: added /api prefix)
export const courseAPI = {
  getAll: () => apiClient('/api/courses'),
  getById: (id) => apiClient(`/api/courses/${id}`),
  getFree: () => apiClient('/api/courses/free'),
  getLive: () => apiClient('/api/courses/live'),
  enroll: (courseId) => apiClient(`/api/courses/${courseId}/enroll`, { method: 'POST' }),
};

// Test APIs (FIXED: added /api prefix)
export const testAPI = {
  getAll: () => apiClient('/api/tests'),
  getById: (id) => apiClient(`/api/tests/${id}`),
  submit: (testId, answers) => apiClient(`/api/tests/${testId}/submit`, {
    method: 'POST',
    body: { answers },
  }),
  getResults: () => apiClient('/api/tests/results'),
  getWeekly: () => apiClient('/api/tests/weekly'),
};

// Notes/PDF APIs (FIXED: added /api prefix)
export const notesAPI = {
  getAll: () => apiClient('/api/notes'),
  getByCategory: (category) => apiClient(`/api/notes?category=${category}`),
  download: (id) => apiClient(`/api/notes/${id}/download`),
};

// Blog/Job Alert APIs (FIXED: added /api prefix)
export const blogAPI = {
  getAll: () => apiClient('/api/blogs'),
  getJobAlerts: () => apiClient('/api/blogs/job-alerts'),
  getById: (id) => apiClient(`/api/blogs/${id}`),
};

// User APIs (FIXED: added /api prefix)
export const userAPI = {
  getProfile: () => apiClient('/api/users/profile'),
  updateProfile: (data) => apiClient('/api/users/profile', {
    method: 'PUT',
    body: data,
  }),
  getDashboard: () => apiClient('/api/users/dashboard'),
  getEnrolledCourses: () => apiClient('/api/users/courses'),
  getTestHistory: () => apiClient('/api/users/tests'),
};

// RAZORPAY PAYMENT APIs (FIXED: added /api prefix)
export const paymentAPI = {
  createOrder: (amount, courseId, courseTitle) => apiClient('/api/payments/create-order', {
    method: 'POST',
    body: { amount, courseId, courseTitle },
  }),

  verifyPayment: (paymentData) => apiClient('/api/payments/verify', {
    method: 'POST',
    body: paymentData,
  }),

  getPaymentStatus: (orderId) => apiClient(`/api/payments/status/${orderId}`),

  getPaymentHistory: () => apiClient('/api/payments/history'),

  requestRefund: (paymentId, reason) => apiClient('/api/payments/refund', {
    method: 'POST',
    body: { paymentId, reason },
  }),
};

// ENROLLMENT APIs (FIXED: added /api prefix)
export const enrollmentAPI = {
  getAll: () => apiClient('/api/enrollments'),

  getById: (enrollmentId) => apiClient(`/api/enrollments/${enrollmentId}`),

  getByCourseId: (courseId) => apiClient(`/api/enrollments/course/${courseId}`),

  updateProgress: (enrollmentId, lectureId, progress) => apiClient(`/api/enrollments/${enrollmentId}/progress`, {
    method: 'PUT',
    body: { lectureId, progress },
  }),

  completeCourse: (enrollmentId) => apiClient(`/api/enrollments/${enrollmentId}/complete`, {
    method: 'PUT',
  }),

  checkEnrollment: (courseId) => apiClient(`/api/enrollments/check/${courseId}`),
};

// Razorpay checkout helper (no changes needed)
export const initRazorpayCheckout = async ({
  amount,
  courseId,
  courseTitle,
  user = {},
  onSuccess,
  onError,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderData = await paymentAPI.createOrder(amount, courseId, courseTitle);
      
      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      const razorpayOptions = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'JobMantra',
        description: `Enroll in ${courseTitle}`,
        order_id: orderData.orderId,
        image: '/logo.png',
        prefill: {
          name: user.name || '',
          email: user.email || '',
          contact: user.phone || '',
        },
        notes: {
          courseId: courseId.toString(),
          courseTitle,
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: () => {
            reject(new Error('Payment cancelled by user'));
          },
          animation: true,
        },
        handler: async (response) => {
          try {
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const verifyResult = await paymentAPI.verifyPayment(verifyData);

            if (verifyResult.success) {
              if (onSuccess) onSuccess(verifyResult);
              resolve({
                success: true,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                enrollment: verifyResult.enrollment,
              });
            } else {
              throw new Error(verifyResult.message || 'Payment verification failed');
            }
          } catch (error) {
            if (onError) onError(error);
            reject(error);
          }
        },
      };

      const rzp = new window.Razorpay(razorpayOptions);

      rzp.on('payment.failed', (response) => {
        const error = new Error(
          response.error.description || 'Payment failed'
        );
        if (onError) onError(error);
        reject(error);
      });

      rzp.open();
    } catch (error) {
      if (onError) onError(error);
      reject(error);
    }
  });
};

// Load Razorpay Script (no changes needed)
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// ADMIN APIs (FIXED: added /api prefix)
export const adminAPI = {
  getAllPayments: () => apiClient('/api/admin/payments'),

  getPaymentStats: () => apiClient('/api/admin/payments/stats'),

  getRefundRequests: () => apiClient('/api/admin/refunds'),

  processRefund: (paymentId) => apiClient(`/api/admin/refunds/${paymentId}/process`, {
    method: 'POST',
  }),
};

export default apiClient;