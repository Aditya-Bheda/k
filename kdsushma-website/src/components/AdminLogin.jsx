import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.data.token);
        navigate('/admin/dashboard');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-card">
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', fontFamily: 'var(--font-heading)' }}>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Email</label>
            <input 
              type="email" 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label>Password</label>
            <input 
              type="password" 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="error-message" style={{ textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
