import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiFacebook, FiInstagram, FiLinkedin, FiYoutube, FiTwitter } from 'react-icons/fi';

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
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
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', phone: '', requirement: '' });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">Start Your Export Journey Today</h2>
          <p className="section-subtitle">
            Ready to take your business global? Reach out for a personalized consultation and let us help you navigate the world of international trade.
          </p>

          <div className="contact-details">
            <div className="contact-detail">
              <div className="contact-detail-icon"><FiMail /></div>
              <div>
                <div className="contact-detail-label">Email</div>
                <div className="contact-detail-value">support@kdsushma.com</div>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon"><FiPhone /></div>
              <div>
                <div className="contact-detail-label">Phone</div>
                <div className="contact-detail-value">9370054879</div>
              </div>
            </div>

            <div className="contact-socials-inline">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><FiFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FiInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FiLinkedin /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer"><FiYoutube /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"><FiTwitter /></a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="contact-form-wrapper"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h3 className="contact-form-title">Send a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+91 00000 00000"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="requirement">Your Requirement</label>
              <textarea
                id="requirement"
                name="requirement"
                placeholder="Tell us about your export-import goals..."
                value={formData.requirement}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn-primary form-submit"
              style={{ justifyContent: 'center' }}
              disabled={status.loading}
            >
              {status.loading ? 'Sending...' : status.success ? '✓ Message Sent!' : <><FiSend /> Send Message</>}
            </button>
            {status.error && <p className="error-message">{status.error}</p>}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
