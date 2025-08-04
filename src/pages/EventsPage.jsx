import React, { useState, useEffect } from 'react';
import { getEvents, getFallbackEvents } from '../services/api';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'workshop',
    capacity: 50,
    status: 'upcoming'
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        // Enhance data with default values
        const enhancedData = data.map(event => ({
          ...event,
          id: event.id || Date.now().toString(),
          title: event.title || 'Sample Event',
          description: event.description || 'Event description',
          date: event.date || '2024-02-15',
          time: event.time || '10:00 AM',
          location: event.location || 'Main Hall',
          type: event.type || 'workshop',
          capacity: event.capacity || 50,
          attendees: event.attendees || Math.floor(Math.random() * 30) + 5,
          status: event.status || 'upcoming'
        }));
        setEvents(enhancedData);
        setFilteredEvents(enhancedData);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to mock data if API fails
        try {
          const fallbackData = await getFallbackEvents();
          const enhancedFallbackData = fallbackData.map(event => ({
            ...event,
            id: event.id || Date.now().toString(),
            title: event.title || 'Sample Event',
            description: event.description || 'Event description',
            date: event.date || '2024-02-15',
            time: event.time || '10:00 AM',
            location: event.location || 'Main Hall',
            type: event.type || 'workshop',
            capacity: event.capacity || 50,
            attendees: event.attendees || Math.floor(Math.random() * 30) + 5,
            status: event.status || 'upcoming'
          }));
          setEvents(enhancedFallbackData);
          setFilteredEvents(enhancedFallbackData);
        } catch (fallbackError) {
          console.error('Fallback data also failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    switch (activeTab) {
      case 'upcoming':
        filtered = events.filter(event => event.status === 'upcoming');
        break;
      case 'ongoing':
        filtered = events.filter(event => event.status === 'ongoing');
        break;
      case 'completed':
        filtered = events.filter(event => event.status === 'completed');
        break;
      default:
        break;
    }

    setFilteredEvents(filtered);
  }, [events, activeTab]);

  const eventTypes = ['workshop', 'seminar', 'meeting', 'training', 'social', 'other'];
  const eventStatuses = ['upcoming', 'ongoing', 'completed', 'cancelled'];

  const EventCard = ({ event }) => (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h5 style={{ margin: 0, color: 'var(--text-primary)' }}>{event.title}</h5>
            <p style={{ margin: '0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {event.description}
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                📅 {event.date} at {event.time}
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                📍 {event.location}
              </span>
              <span style={{
                background: event.status === 'upcoming' ? 'var(--primary-teal)' :
                           event.status === 'ongoing' ? 'var(--primary-sage-green)' :
                           event.status === 'completed' ? 'var(--primary-orange)' : 'var(--primary-reddish-pink)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.8rem'
              }}>
                {event.status}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                👥 {event.attendees}/{event.capacity} attendees
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                🏷️ {event.type}
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right', marginLeft: '1rem' }}>
            <button 
              className="btn btn-secondary btn-sm" 
              style={{ marginBottom: '0.5rem' }}
              onClick={() => {
                setSelectedEvent(event);
                setEventForm({
                  title: event.title,
                  description: event.description,
                  date: event.date,
                  time: event.time,
                  location: event.location,
                  type: event.type,
                  capacity: event.capacity,
                  status: event.status
                });
                setShowEditModal(true);
              }}
            >
              Edit
            </button>
            <br />
            <button className="btn btn-primary btn-sm">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const handleCreateEvent = () => {
    if (eventForm.title && eventForm.date) {
      const newEvent = {
        id: Date.now().toString(),
        ...eventForm,
        attendees: 0
      };
      
      setEvents([...events, newEvent]);
      console.log('Created new event:', newEvent);
      
      // Clean up form state
      setEventForm({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        type: 'workshop',
        capacity: 50,
        status: 'upcoming'
      });
      setShowCreateModal(false);
    }
  };

  const handleEditEvent = () => {
    if (selectedEvent && eventForm.title) {
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, ...eventForm }
          : event
      );
      
      setEvents(updatedEvents);
      console.log('Updated event:', selectedEvent.title, 'with:', eventForm);
      
      // Clean up form state
      setEventForm({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        type: 'workshop',
        capacity: 50,
        status: 'upcoming'
      });
      setShowEditModal(false);
      setSelectedEvent(null);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
      setEvents(updatedEvents);
      console.log('Deleted event:', selectedEvent.title);
      
      setShowEditModal(false);
      setSelectedEvent(null);
      setEventForm({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        type: 'workshop',
        capacity: 50,
        status: 'upcoming'
      });
    }
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
        <div>Loading events...</div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1 style={{ color: 'var(--text-primary)', margin: 0 }}>📅 Events Management</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Event
          </button>
        </div>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Manage and track all events in your internship program
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row" style={{ marginBottom: '2rem' }}>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', color: 'var(--primary-teal)', marginBottom: '0.5rem' }}>📅</div>
              <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>{events.length}</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Total Events</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', color: 'var(--primary-sage-green)', marginBottom: '0.5rem' }}>⏰</div>
              <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>
                {events.filter(e => e.status === 'upcoming').length}
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Upcoming</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', color: 'var(--primary-orange)', marginBottom: '0.5rem' }}>🎯</div>
              <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>
                {events.filter(e => e.status === 'ongoing').length}
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Ongoing</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', color: 'var(--primary-purple)', marginBottom: '0.5rem' }}>✅</div>
              <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>
                {events.filter(e => e.status === 'completed').length}
              </h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="card">
        <div className="card-body">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
                role="tab"
              >
                Upcoming
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'ongoing' ? 'active' : ''}`}
                onClick={() => setActiveTab('ongoing')}
                role="tab"
              >
                Ongoing
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveTab('completed')}
                role="tab"
              >
                Completed
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
                role="tab"
              >
                All Events
              </button>
            </li>
          </ul>

          <div className="tab-content" style={{ paddingTop: '2rem' }}>
            <div className="tab-pane fade show active">
              <h3>Events ({filteredEvents.length})</h3>
              
              {filteredEvents.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '3rem', 
                  color: 'var(--text-secondary)' 
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                  <h4>No events found</h4>
                  <p>Create your first event to get started</p>
                </div>
              ) : (
                <div>
                  {filteredEvents.map((event, index) => (
                    <EventCard key={event.id || index} event={event} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

             {/* Create Event Modal */}
       {showCreateModal && (
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
           <div className="card" style={{ width: '350px', maxWidth: '90vw' }}>
            <div className="card-body">
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Create New Event
              </h4>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Event Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                  placeholder="Enter event title"
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                  placeholder="Enter event description"
                />
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                  placeholder="Enter event location"
                />
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Event Type</label>
                    <select
                      className="form-control"
                      value={eventForm.type}
                      onChange={(e) => setEventForm({...eventForm, type: e.target.value})}
                    >
                      {eventTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Capacity</label>
                    <input
                      type="number"
                      className="form-control"
                      value={eventForm.capacity}
                      onChange={(e) => setEventForm({...eventForm, capacity: parseInt(e.target.value)})}
                      min="1"
                      max="1000"
                    />
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  value={eventForm.status}
                  onChange={(e) => setEventForm({...eventForm, status: e.target.value})}
                >
                  {eventStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEventForm({
                      title: '',
                      description: '',
                      date: '',
                      time: '',
                      location: '',
                      type: 'workshop',
                      capacity: 50,
                      status: 'upcoming'
                    });
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleCreateEvent}
                  disabled={!eventForm.title || !eventForm.date}
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

             {/* Edit Event Modal */}
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
                Edit Event
              </h4>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Event Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                  placeholder="Enter event title"
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="1"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                  placeholder="Enter event description"
                />
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                  placeholder="Enter event location"
                />
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </button>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedEvent(null);
                      setEventForm({
                        title: '',
                        description: '',
                        date: '',
                        time: '',
                        location: '',
                        type: 'workshop',
                        capacity: 50,
                        status: 'upcoming'
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={handleEditEvent}
                    disabled={!eventForm.title}
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

export default EventsPage; 