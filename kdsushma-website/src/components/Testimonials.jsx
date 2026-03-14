import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Slider from 'react-slick';

const testimonials = [
  {
    text: "KDSushma's guidance transformed my understanding of international trade. Within 6 months of coaching, I successfully exported my first shipment to the UAE. Her practical approach and deep knowledge made all the difference.",
    name: 'Rajesh Patel',
    role: 'Textile Exporter, Gujarat',
    initials: 'RP',
  },
  {
    text: "The Export Startup Mentorship program was exactly what I needed. KDSushma doesn't just teach theory — she walks you through every real-world challenge. I now run a profitable agricultural export business thanks to her mentorship.",
    name: 'Sunita Sharma',
    role: 'Agriculture Export Business Owner',
    initials: 'SS',
  },
  {
    text: "Our corporate team attended KDSushma's export training workshop. The content was incredibly relevant, and the strategies she shared helped us enter three new international markets within the year. Highly recommended!",
    name: 'Amit Verma',
    role: 'Director, V-Tech Industries',
    initials: 'AV',
  },
  {
    text: "I was completely new to exports when I approached KDSushma. Her 1-on-1 consultation helped me identify the right products and markets. Her step-by-step guidance on compliance and documentation was invaluable.",
    name: 'Priya Nair',
    role: 'Handicraft Exporter, Kerala',
    initials: 'PN',
  },
  {
    text: "The market development strategy KDSushma developed for our company connected us with buyers we never would have found on our own. Her global network and trade delegation experience are unmatched.",
    name: 'Deepak Joshi',
    role: 'CEO, Spice World Exports',
    initials: 'DJ',
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="testimonials" id="testimonials" ref={ref}>
      <div className="container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Real stories from entrepreneurs and businesses who transformed their export journeys with our guidance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Slider {...settings}>
            {testimonials.map((t, i) => (
              <div key={i}>
                <div className="testimonial-card">
                  <div className="testimonial-quote">"</div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{t.initials}</div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
