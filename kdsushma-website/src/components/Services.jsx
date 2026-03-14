import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMessageCircle, FiTarget, FiUsers, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import ServiceInquiryModal from './ServiceInquiryModal';
import useRazorpay from '../hooks/useRazorpay';

const services = [
  {
    icon: <FiMessageCircle />,
    title: 'Export–Import 1-on-1 Consultation',
    description:
      'Get personalized expert guidance tailored to your product, market, and business goals. From documentation to logistics, we cover every aspect of starting and running a successful export-import business.',
  },
  {
    icon: <FiTarget />,
    title: 'Export Startup Mentorship',
    description:
      'A comprehensive mentorship program designed for aspiring exporters. Learn product selection, compliance, buyer identification, and market entry strategies with hands-on support from start to first order.',
  },
  {
    icon: <FiUsers />,
    title: 'Corporate Export Training',
    description:
      'Customized corporate training programs for organizations looking to expand into international markets. Build internal export capabilities with structured workshops and strategic framework development.',
  },
  {
    icon: <FiTrendingUp />,
    title: 'Market Development & Buyer Outreach Strategy',
    description:
      'Strategic market research and buyer outreach services to identify high-potential international markets. We help you craft targeted entry strategies and connect with verified buyers globally.',
  },
];

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [modal, setModal] = useState({ isOpen: false, type: '', title: '' });
  const { initiatePayment } = useRazorpay();

  const handleAction = (service, index) => {
    if (index === 0) {
      // 1-on-1 Consultation -> Razorpay
      initiatePayment({
        amount: 2999,
        itemType: 'consultation',
        itemName: service.title,
        customerDetails: { name: 'User', email: 'user@example.com', phone: '9999999999' } // Simplified
      });
    } else if (index === 1) {
      // Export Startup -> External Link
      window.open('https://ignexii.com', '_blank');
    } else {
      // Corporate / Market Dev -> Modal
      setModal({
        isOpen: true,
        type: index === 2 ? 'corporate-training' : 'market-development',
        title: service.title
      });
    }
  };

  return (
    <section className="services" id="services" ref={ref}>
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Services</span>
          <h2 className="section-title">Comprehensive Export–Import Solutions</h2>
          <p className="section-subtitle">
            From first-time exporters to established businesses, our services are designed to accelerate your global trade journey.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              <button 
                onClick={() => handleAction(service, i)} 
                className="btn-outline"
              >
                {i === 0 ? 'Book Now' : i === 1 ? 'Learn More' : 'Enquire Now'} <FiArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <ServiceInquiryModal 
        isOpen={modal.isOpen} 
        onClose={() => setModal({ ...modal, isOpen: false })}
        serviceType={modal.type}
        serviceTitle={modal.title}
      />
    </section>
  );
};

export default Services;
