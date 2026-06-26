import { useState, useEffect } from 'react';
import { getEvents, deleteEvent } from '../services/api';
import EventCard from '../components/EventCard';

const EventListing = () => {
    const [events, setEvents] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async (searchKeyword = '') => {
        try {
            setLoading(true);
            const data = await getEvents(searchKeyword);
            setEvents(data);
            setLoading(false);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchEvents(keyword);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(id);
                setEvents(events.filter((event) => event._id !== id));
            } catch (err) {
                alert('Error deleting event');
            }
        }
    };

    return (
        <div className="container">
            <h1 className="page-title">Explore Events</h1>
            
            <form onSubmit={handleSearch} className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search events by name..." 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-btn">Search</button>
            </form>

            {loading ? (
                <div className="loading">Loading events...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : events.length === 0 ? (
                <div className="empty-state">
                    <h3>No events found.</h3>
                    <p>Try a different search term or create a new event.</p>
                </div>
            ) : (
                <div className="grid">
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventListing;
