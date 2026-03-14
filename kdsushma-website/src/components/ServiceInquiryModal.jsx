import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend } from 'react-icons/fi';

const ServiceInquiryModal = ({ isOpen, onClose, serviceType, serviceTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: '',
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('http://localhost:5000/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, serviceType }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ loading: false, success: true, error: null });
        setTimeout(() => {
          onClose();
          setStatus({ loading: false, success: false, error: null });
          setFormData({ name: '', email: '', phone: '', requirement: '' });
        }, 3000);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <motion.div
            className="modal-container"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div className="modal-header">
              <h3>Inquiry: {serviceTitle}</h3>
              <button className="modal-close" onClick={onClose}><FiX /></button>
            </div>
            <div className="modal-body">
              {status.success ? (
                <div className="modal-success">
                  <div className="success-icon">✓</div>
                  <h4>Thank You!</h4>
                  <p>Your inquiry for {serviceTitle} has been received. We will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Your contact number" />
                  </div>
                  <div className="form-group">
                    <label>Your Requirement</label>
                    <textarea name="requirement" value={formData.requirement} onChange={handleChange} required placeholder="Tell us about your needs..." />
                  </div>
                  <button type="submit" className="btn-primary" disabled={status.loading} style={{ width: '100%', justifyContent: 'center' }}>
                    {status.loading ? 'Sending...' : <><FiSend /> Send Inquiry</>}
                  </button>
                  {status.error && <p className="error-message">{status.error}</p>}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServiceInquiryModal;
