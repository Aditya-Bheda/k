import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
    }),
  };

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="hero-badge-dot"></span>
            Export–Import Expert
          </motion.div>

          <motion.h1
            className="hero-title"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Build Your <span className="highlight">Global Business</span> with Expert Export–Import Guidance
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Personalized coaching and practical strategies for entrepreneurs and MSMEs to start and scale export businesses.
          </motion.p>

          <motion.div
            className="hero-buttons"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <a href="#contact" className="btn-primary">
              Book Consultation <FiArrowRight />
            </a>
            <a href="#services" className="btn-secondary">
              Explore Services
            </a>
          </motion.div>

          <motion.div
            className="hero-stats"
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div>
              <div className="hero-stat-number">200K+</div>
              <div className="hero-stat-label">People Trained</div>
            </div>
            <div>
              <div className="hero-stat-number">1000+</div>
              <div className="hero-stat-label">Exporters Created</div>
            </div>
            <div>
              <div className="hero-stat-number">18+</div>
              <div className="hero-stat-label">Years Experience</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-image"
        >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="./images/trainer.png" 
                alt="KD Sushma - Export Import Coach" 
                className="w-full h-auto object-cover max-h-[600px]"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x800?text=KD+Sushma';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
