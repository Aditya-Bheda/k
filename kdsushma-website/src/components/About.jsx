import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiUsers, FiGlobe, FiAward, FiTrendingUp } from 'react-icons/fi';

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    { icon: <FiUsers />, number: '200,000+', text: 'People Trained' },
    { icon: <FiTrendingUp />, number: '1,000+', text: 'Exporters Created' },
    { icon: <FiGlobe />, number: '10+', text: 'Countries Covered' },
    { icon: <FiAward />, number: '18+', text: 'Years Experience' },
  ];

  const gridCards = [
    { icon: '🇷🇺', title: 'Russia', subtitle: 'Trade Delegation' },
    { icon: '🇦🇪', title: 'UAE', subtitle: 'Business Mission' },
    { icon: '🇸🇦', title: 'Saudi Arabia', subtitle: 'Export Expansion' },
    { icon: '🇻🇳', title: 'Vietnam', subtitle: 'Market Access' },
  ];

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">About KDSushma</span>
          <h2 className="section-title">
            Empowering Entrepreneurs to Go Global
          </h2>
          <p className="section-subtitle">
            KDSushma is an accomplished export-import expert with over 18 years of international business experience. As the Founder of <strong>Global Fortune Mission India Pvt Ltd</strong> and <strong>IGTD EXIM Chamber of Commerce</strong>, she has dedicated her career to transforming aspiring entrepreneurs into successful global traders.
          </p>
          <p className="section-subtitle" style={{ marginTop: '16px' }}>
            With international trade delegations spanning Russia, UAE, Saudi Arabia, Vietnam, and Africa, KDSushma brings hands-on global market knowledge to every coaching session.
          </p>

          <div className="about-highlights">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                className="about-highlight-card"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <div className="about-highlight-icon">{item.icon}</div>
                <div className="about-highlight-number">{item.number}</div>
                <div className="about-highlight-text">{item.text}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about-image-section"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="about-image-grid">
            {gridCards.map((card, i) => (
              <motion.div
                key={i}
                className="about-img-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div>
                  <div className="about-img-card-icon">{card.icon}</div>
                  <div className="about-img-card-title">{card.title}</div>
                  <div className="about-img-card-subtitle">{card.subtitle}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
