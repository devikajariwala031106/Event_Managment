import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEventById, deleteEvent } from '../services/api';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEventById(id);
                setEvent(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(id);
                navigate('/events');
            } catch (err) {
                alert('Error deleting event');
            }
        }
    };

    if (loading) return <div className="loading">Loading event...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!event) return <div className="empty-state">Event not found</div>;

    return (
        <div className="container">
            <Link to="/events" className="btn btn-secondary" style={{ marginBottom: '20px' }}>
                &larr; Back to Events
            </Link>
            
            <div className="event-details-container">
                <img 
                    src={event.imageUrl || 'https://via.placeholder.com/1200x400?text=No+Image'} 
                    alt={event.name} 
                    className="event-details-image"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x400?text=No+Image' }}
                />
                
                <div className="event-details-content">
                    <div className="event-details-header">
                        <div>
                            <span className="event-category">{event.category}</span>
                            <h1 style={{ color: '#2c3e50', marginTop: '10px' }}>{event.name}</h1>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Link to={`/edit-event/${event._id}`} className="btn btn-primary">
                                Edit
                            </Link>
                            <button onClick={handleDelete} className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="event-details-info">
                        <div className="event-details-info-item">
                            <span className="event-details-info-label">Date & Time</span>
                            <span className="event-details-info-value">
                                {new Date(event.date).toLocaleDateString()} at {event.time}
                            </span>
                        </div>
                        <div className="event-details-info-item">
                            <span className="event-details-info-label">Location</span>
                            <span className="event-details-info-value">{event.venue}</span>
                        </div>
                        <div className="event-details-info-item">
                            <span className="event-details-info-label">Organizer</span>
                            <span className="event-details-info-value">{event.organizer}</span>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>About this event</h3>
                        <div className="event-description">
                            {event.description.split('\n').map((paragraph, index) => (
                                <p key={index} style={{ marginBottom: '10px' }}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
