import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import useRazorpay from '../hooks/useRazorpay';

const books = [
  {
    title: 'Global Fortune – Export Import Guide',
    author: 'By KDSushma',
    image: '/images/book-global-fortune.png',
    description: 'A comprehensive guide covering everything from export documentation to international logistics. Master the complexities of global trade with practical insights.',
    price: 499
  },
  {
    title: 'Agriculture Export Guide',
    author: 'By KDSushma',
    image: '/images/book-agriculture.png',
    description: 'Specialized guide for agricultural product exports with market insights and compliance strategies. Learn how to tap into global food markets.',
    price: 399
  },
];

const Books = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { initiatePayment } = useRazorpay();

  const handlePurchase = (book) => {
    initiatePayment({
      amount: book.price,
      itemType: 'book',
      itemName: book.title,
      customerDetails: { name: 'User', email: 'user@example.com', phone: '9999999999' }
    });
  };

  return (
    <section className="books" id="books" ref={ref}>
      <div className="container">
        <motion.div
          className="books-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Publications</span>
          <h2 className="section-title">Essential Export–Import Guides</h2>
          <p className="section-subtitle">
            Comprehensive resources to guide your export journey, written from years of real-world international trade experience.
          </p>
        </motion.div>

        <div className="books-grid">
          {books.map((book, i) => (
            <motion.div
              key={i}
              className="book-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            >
              <div className="book-image">
                <img src={book.image} alt={book.title} />
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <p className="book-desc-text">{book.description}</p>
                <div className="book-footer">
                  <span className="book-price">₹{book.price}</span>
                  <button onClick={() => handlePurchase(book)} className="btn-outline">
                    <FiShoppingCart /> Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Books;
