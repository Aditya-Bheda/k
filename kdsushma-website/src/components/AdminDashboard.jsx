import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    const endpoint = activeTab === 'contacts' ? 'contact' : activeTab === 'service-requests' ? 'service-requests' : 'payments';
    
    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      } else {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)' }}>Admin Dashboard</h1>
          <button onClick={logout} className="btn-outline">Logout</button>
        </div>

        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`} onClick={() => setActiveTab('contacts')}>General Contacts</button>
          <button className={`tab-btn ${activeTab === 'service-requests' ? 'active' : ''}`} onClick={() => setActiveTab('service-requests')}>Service Inquiries</button>
          <button className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => setActiveTab('payments')}>Payments</button>
        </div>

        <div className="admin-table-wrapper">
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
          ) : (
            <table className="admin-table">
              <thead>
                {activeTab === 'contacts' && (
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Requirement</th>
                    <th>Status</th>
                  </tr>
                )}
                {activeTab === 'service-requests' && (
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Service</th>
                    <th>Details</th>
                    <th>Status</th>
                  </tr>
                )}
                {activeTab === 'payments' && (
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    {activeTab === 'contacts' && (
                      <>
                        <td><strong>{item.name}</strong><br/><small>{item.phone}</small></td>
                        <td>{item.email}</td>
                        <td>{item.requirement}</td>
                        <td><span className={`badge badge-${item.status}`}>{item.status}</span></td>
                      </>
                    )}
                    {activeTab === 'service-requests' && (
                      <>
                        <td><strong>{item.name}</strong><br/><small>{item.phone}</small></td>
                        <td><span className="badge badge-paid">{item.serviceType}</span></td>
                        <td>{item.requirement}</td>
                        <td><span className={`badge badge-${item.status}`}>{item.status}</span></td>
                      </>
                    )}
                    {activeTab === 'payments' && (
                      <>
                        <td>{item.razorpayPaymentId || item.razorpayOrderId}</td>
                        <td><strong>{item.customerName}</strong><br/><small>{item.customerEmail}</small></td>
                        <td>{item.itemName}</td>
                        <td><strong>₹{item.amount}</strong></td>
                        <td><span className={`badge badge-${item.status}`}>{item.status}</span></td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && data.length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-light)' }}>No responses found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
