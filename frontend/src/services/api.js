const API_BASE_URL = 'https://job-mantra.onrender.com'; // Change to your backend URL

// Helper to handle responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Something went wrong' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
};

// Helper to get auth token
const getToken = () => localStorage.getItem('jobmantra_token');

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

// Auth APIs
export const authAPI = {
  login: (credentials) => apiClient('/auth/login', {
    method: 'POST',
    body: credentials,
  }),
  
  register: (userData) => apiClient('/auth/register', {
    method: 'POST',
    body: userData,
  }),
  
  getMe: () => apiClient('/auth/me'),
  
  logout: () => apiClient('/auth/logout', { method: 'POST' }),
};

// Course APIs
export const courseAPI = {
  getAll: () => apiClient('/courses'),
  getById: (id) => apiClient(`/courses/${id}`),
  getFree: () => apiClient('/courses/free'),
  getLive: () => apiClient('/courses/live'),
  enroll: (courseId) => apiClient(`/courses/${courseId}/enroll`, { method: 'POST' }),
};

// Test APIs
export const testAPI = {
  getAll: () => apiClient('/tests'),
  getById: (id) => apiClient(`/tests/${id}`),
  submit: (testId, answers) => apiClient(`/tests/${testId}/submit`, {
    method: 'POST',
    body: { answers },
  }),
  getResults: () => apiClient('/tests/results'),
  getWeekly: () => apiClient('/tests/weekly'),
};

// Notes/PDF APIs
export const notesAPI = {
  getAll: () => apiClient('/notes'),
  getByCategory: (category) => apiClient(`/notes?category=${category}`),
  download: (id) => apiClient(`/notes/${id}/download`),
};

// Blog/Job Alert APIs
export const blogAPI = {
  getAll: () => apiClient('/blogs'),
  getJobAlerts: () => apiClient('/blogs/job-alerts'),
  getById: (id) => apiClient(`/blogs/${id}`),
};

// User APIs
export const userAPI = {
  getProfile: () => apiClient('/users/profile'),
  updateProfile: (data) => apiClient('/users/profile', {
    method: 'PUT',
    body: data,
  }),
  getDashboard: () => apiClient('/users/dashboard'),
  getEnrolledCourses: () => apiClient('/users/courses'),
  getTestHistory: () => apiClient('/users/tests'),
};

// ═══════════════════════════════════════════════════════════
// RAZORPAY PAYMENT APIs
// ═══════════════════════════════════════════════════════════

export const paymentAPI = {
  // Create a new order for payment
  createOrder: (amount, courseId, courseTitle) => apiClient('/payments/create-order', {
    method: 'POST',
    body: { amount, courseId, courseTitle },
  }),

  // Verify payment after Razorpay checkout
  verifyPayment: (paymentData) => apiClient('/payments/verify', {
    method: 'POST',
    body: paymentData,
  }),

  // Get payment details by order ID
  getPaymentStatus: (orderId) => apiClient(`/payments/status/${orderId}`),

  // Get all payments for current user
  getPaymentHistory: () => apiClient('/payments/history'),

  // Request refund
  requestRefund: (paymentId, reason) => apiClient('/payments/refund', {
    method: 'POST',
    body: { paymentId, reason },
  }),
};

// ═══════════════════════════════════════════════════════════
// ENROLLMENT APIs (Updated with payment tracking)
// ═══════════════════════════════════════════════════════════

export const enrollmentAPI = {
  // Get all enrolled courses with payment details
  getAll: () => apiClient('/enrollments'),

  // Get specific enrollment details
  getById: (enrollmentId) => apiClient(`/enrollments/${enrollmentId}`),

  // Get enrollment by course ID
  getByCourseId: (courseId) => apiClient(`/enrollments/course/${courseId}`),

  // Update lecture progress
  updateProgress: (enrollmentId, lectureId, progress) => apiClient(`/enrollments/${enrollmentId}/progress`, {
    method: 'PUT',
    body: { lectureId, progress },
  }),

  // Mark course as completed
  completeCourse: (enrollmentId) => apiClient(`/enrollments/${enrollmentId}/complete`, {
    method: 'PUT',
  }),

  // Check if user is enrolled in a specific course
  checkEnrollment: (courseId) => apiClient(`/enrollments/check/${courseId}`),
};

// ═══════════════════════════════════════════════════════════
// RAZORPAY CHECKOUT HELPER (Frontend Integration)
// ═══════════════════════════════════════════════════════════

/**
 * Initialize Razorpay checkout and handle payment flow
 * @param {Object} options - Payment options
 * @param {number} options.amount - Amount in rupees
 * @param {number} options.courseId - Course ID
 * @param {string} options.courseTitle - Course title
 * @param {Object} options.user - User details for prefill
 * @param {Function} options.onSuccess - Callback on successful payment
 * @param {Function} options.onError - Callback on payment failure
 * @returns {Promise} - Resolves with payment result
 */
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
      // Step 1: Create order on backend
      const orderData = await paymentAPI.createOrder(amount, courseId, courseTitle);
      
      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      // Step 2: Configure Razorpay checkout
      const razorpayOptions = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'JobMantra',
        description: `Enroll in ${courseTitle}`,
        order_id: orderData.orderId,
        image: '/logo.png', // Add your logo path
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
          color: '#2563eb', // Your brand color
        },
        modal: {
          ondismiss: () => {
            reject(new Error('Payment cancelled by user'));
          },
          animation: true,
        },
        handler: async (response) => {
          try {
            // Step 3: Verify payment on backend
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

      // Step 4: Open Razorpay checkout
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

// ═══════════════════════════════════════════════════════════
// UTILITY: Load Razorpay Script (Call before checkout)
// ═══════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════
// ADMIN APIs (For admin dashboard)
// ═══════════════════════════════════════════════════════════

export const adminAPI = {
  // Get all payments (admin only)
  getAllPayments: () => apiClient('/admin/payments'),

  // Get payment statistics
  getPaymentStats: () => apiClient('/admin/payments/stats'),

  // Get refund requests
  getRefundRequests: () => apiClient('/admin/refunds'),

  // Process refund
  processRefund: (paymentId) => apiClient(`/admin/refunds/${paymentId}/process`, {
    method: 'POST',
  }),
};

export default apiClient;