import React, { useState, useEffect } from 'react';
import { getAllInterns, getFallbackInterns } from '../services/api';

const InternsPage = () => {
  const [interns, setInterns] = useState([]);
  const [filteredInterns, setFilteredInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    department: '',
    status: 'Active',
    phone: '',
    startDate: ''
  });

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const data = await getAllInterns();
        // Enhance data with default values
        const enhancedData = data.map(intern => ({
          ...intern,
          email: intern.email || `${intern.name.toLowerCase().replace(' ', '.')}@intern.com`,
          department: intern.department || 'General',
          status: intern.status || 'Active',
          phone: intern.phone || '+1 (555) 123-4567',
          startDate: intern.startDate || '2024-01-15',
          achievements: intern.achievements || Math.floor(Math.random() * 10) + 1
        }));
        setInterns(enhancedData);
        setFilteredInterns(enhancedData);
      } catch (error) {
        console.error('Error fetching interns:', error);
        // Fallback to mock data if API fails
        try {
          const fallbackData = await getFallbackInterns();
          const enhancedFallbackData = fallbackData.map(intern => ({
            ...intern,
            email: intern.email || `${intern.name.toLowerCase().replace(' ', '.')}@intern.com`,
            department: intern.department || 'General',
            status: intern.status || 'Active',
            phone: intern.phone || '+1 (555) 123-4567',
            startDate: intern.startDate || '2024-01-15',
            achievements: intern.achievements || Math.floor(Math.random() * 10) + 1
          }));
          setInterns(enhancedFallbackData);
          setFilteredInterns(enhancedFallbackData);
        } catch (fallbackError) {
          console.error('Fallback data also failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInterns();
  }, []);

  useEffect(() => {
    let filtered = interns;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(intern =>
        intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply department filter
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(intern => intern.department === selectedDepartment);
    }

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(intern => intern.status === selectedStatus);
    }

    setFilteredInterns(filtered);
  }, [interns, searchTerm, selectedDepartment, selectedStatus]);

  const departments = ['Engineering', 'Marketing', 'Sales', 'Design', 'Finance', 'HR'];
  const statuses = ['Active', 'Inactive', 'Graduated', 'On Leave'];

  const InternCard = ({ intern }) => (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="card-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem'
          }}>
            {intern.name.charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            <h5 style={{ margin: 0, color: 'var(--text-primary)' }}>{intern.name}</h5>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {intern.email} • {intern.department}
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <span style={{
                background: intern.status === 'Active' ? 'var(--primary-sage-green)' : 
                           intern.status === 'Graduated' ? 'var(--primary-teal)' :
                           intern.status === 'On Leave' ? 'var(--primary-orange)' : 'var(--primary-reddish-pink)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.8rem'
              }}>
                {intern.status}
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                ${intern.donations?.toLocaleString() || 0} raised
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button 
              className="btn btn-secondary btn-sm" 
              style={{ marginBottom: '0.5rem' }}
              onClick={() => {
                setSelectedIntern(intern);
                setEditForm({
                  name: intern.name,
                  email: intern.email,
                  department: intern.department,
                  status: intern.status,
                  phone: intern.phone,
                  startDate: intern.startDate
                });
                setShowEditModal(true);
              }}
            >
              Edit
            </button>
            <br />
            <button className="btn btn-primary btn-sm">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const handleEditIntern = () => {
    if (selectedIntern && editForm.name) {
      // Update intern data
      const updatedInterns = interns.map(intern => 
        intern.id === selectedIntern.id 
          ? { ...intern, ...editForm }
          : intern
      );
      
      setInterns(updatedInterns);
      console.log('Updated intern:', selectedIntern.name, 'with:', editForm);
      
      // Clean up form state
      setEditForm({
        name: '',
        email: '',
        department: '',
        status: 'Active',
        phone: '',
        startDate: ''
      });
      setShowEditModal(false);
      setSelectedIntern(null);
    }
  };

  const handleDeleteIntern = () => {
    if (selectedIntern) {
      const updatedInterns = interns.filter(intern => intern.id !== selectedIntern.id);
      setInterns(updatedInterns);
      console.log('Deleted intern:', selectedIntern.name);
      
      setShowEditModal(false);
      setSelectedIntern(null);
      setEditForm({
        name: '',
        email: '',
        department: '',
        status: 'Active',
        phone: '',
        startDate: ''
      });
    }
  };

  const handleAddIntern = () => {
    // Create new intern record
    const newIntern = {
      id: Date.now().toString(),
      name: 'New Intern',
      email: 'new.intern@intern.com',
      department: 'General',
      status: 'Active',
      donations: 0,
      achievements: 0,
      phone: '+1 (555) 123-4567',
      startDate: new Date().toISOString().split('T')[0]
    };
    
    setInterns([...interns, newIntern]);
    console.log('Added new intern:', newIntern);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        color: 'var(--text-primary)'
      }}>
        <div>Loading interns...</div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>👥 Interns Management</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Manage and track all interns in your program
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row" style={{ marginBottom: '2rem' }}>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', color: 'var(--primary-teal)', marginBottom: '0.5rem' }}>👥</div>
              <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>{interns.length}</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Total Interns</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', color: 'var(--primary-sage-green)', marginBottom: '0.5rem' }}>✅</div>
              <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>
                {interns.filter(i => i.status === 'Active').length}
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Active</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', color: 'var(--primary-teal)', marginBottom: '0.5rem' }}>🎓</div>
              <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>
                {interns.filter(i => i.status === 'Graduated').length}
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Graduated</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', color: 'var(--primary-sage-green)', marginBottom: '0.5rem' }}>💰</div>
              <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>
                ${interns.reduce((sum, i) => sum + (i.donations || 0), 0).toLocaleString()}
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Total Raised</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <label className="form-label">Search Interns</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Department</label>
              <select
                className="form-control"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Status</label>
              <select
                className="form-control"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">&nbsp;</label>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleAddIntern}>
                Add Intern
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interns List */}
      <div className="card">
        <div className="card-body">
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Interns ({filteredInterns.length})
          </h3>
          
          {filteredInterns.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              color: 'var(--text-secondary)' 
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h4>No interns found</h4>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <div>
              {filteredInterns.map((intern, index) => (
                <InternCard key={intern.id || index} intern={intern} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Intern Modal */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '300px', maxWidth: '90vw' }}>
            <div className="card-body">
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Edit Intern
              </h4>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Department</label>
                <select
                  className="form-control"
                  value={editForm.department}
                  onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  value={editForm.status}
                  onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={handleDeleteIntern}
                >
                  Delete
                </button>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedIntern(null);
                      setEditForm({
                        name: '',
                        email: '',
                        department: '',
                        status: 'Active',
                        phone: '',
                        startDate: ''
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={handleEditIntern}
                    disabled={!editForm.name}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternsPage; 