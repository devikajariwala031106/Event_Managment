import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/api';

const AddEvent = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        venue: '',
        date: '',
        time: '',
        organizer: '',
        imageUrl: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createEvent(formData);
            setLoading(false);
            navigate('/events');
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="page-title">Create New Event</h1>
            
            <div className="form-container">
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Event Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="venue">Venue</label>
                        <input type="text" id="venue" name="venue" value={formData.venue} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="grid" style={{ gap: '15px' }}>
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className="form-control" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="organizer">Organizer</label>
                        <input type="text" id="organizer" name="organizer" value={formData.organizer} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL (Optional)</label>
                        <input type="url" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="form-control" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="form-control" rows="5" required></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Creating...' : 'Create Event'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;
