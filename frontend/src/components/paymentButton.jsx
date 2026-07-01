import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Loader, X, TestTube } from 'lucide-react';

const API_BASE_URL = 'https://job-mantra.onrender.com'; // ✅ FIXED: Use deployed backend

const PaymentButton = ({ course, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // TEST MODE: Bypass Razorpay for development
  const handleTestPayment = async () => {
    const token = localStorage.getItem('token'); // ✅ FIXED: Use 'token' not 'jobmantra_token'
    if (!token) {
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/test-verify`, { // ✅ FIXED: Use deployed URL
        method: 'POST',
        credentials: 'include',
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
      if (data.success) {
        onSuccess?.(data.enrollment);
        showToast(`✅ Test payment successful! Enrolled in ${course.title}`, 'success');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      showToast(`❌ ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    const token = localStorage.getItem('token'); // ✅ FIXED: Use 'token' not 'jobmantra_token'
    
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      const orderResponse = await fetch(`${API_BASE_URL}/api/payments/create-order`, { // ✅ FIXED: Use deployed URL
        method: 'POST',
        credentials: 'include',
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
          const verifyResponse = await fetch(`${API_BASE_URL}/api/payments/verify`, { // ✅ FIXED: Use deployed URL
            method: 'POST',
            credentials: 'include',
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
            onSuccess?.(verifyData.enrollment);
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
      });

    } catch (error) {
      console.error('Payment error:', error);
      showToast(`❌ ${error.message || 'Payment failed. Please try again.'}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button 
          onClick={handlePayment}
          disabled={loading}
          className="btn btn-primary payment-btn"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {loading ? (
            <>
              <Loader size={18} className="spin" /> Processing...
            </>
          ) : (
            <>
              <CreditCard size={18} /> Buy Now ₹{course.currentPrice}
            </>
          )}
        </button>
        
        {/* TEST MODE BUTTON - Remove before production */}
        <button 
          onClick={handleTestPayment}
          disabled={loading}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          <TestTube size={18} /> Test Pay
        </button>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          <span>{toast.message}</span>
          <button onClick={() => setToast({ ...toast, show: false })} className="toast-close">
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
};

export default PaymentButton;
