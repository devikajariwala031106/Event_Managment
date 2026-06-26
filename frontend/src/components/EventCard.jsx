import { Link } from 'react-router-dom';

const EventCard = ({ event, onDelete }) => {
    return (
        <div className="event-card">
            <img 
                src={event.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image'} 
                alt={event.name} 
                className="event-image"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=No+Image' }}
            />
            <div className="event-content">
                <span className="event-category">{event.category}</span>
                <h3 className="event-title">{event.name}</h3>
                <div className="event-info">
                    <p>📅 {new Date(event.date).toLocaleDateString()} at {event.time}</p>
                    <p>📍 {event.venue}</p>
                </div>
                <div className="event-actions">
                    <Link to={`/events/${event._id}`} className="btn btn-secondary">
                        View
                    </Link>
                    <Link to={`/edit-event/${event._id}`} className="btn btn-primary">
                        Edit
                    </Link>
                    <button onClick={() => onDelete(event._id)} className="btn btn-danger">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
