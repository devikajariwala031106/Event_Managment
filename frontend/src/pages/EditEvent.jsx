import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById, updateEvent } from '../services/api';

const EditEvent = () => {
    const { id } = useParams();
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
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEventById(id);
                setFormData({
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    venue: data.venue,
                    date: data.date.split('T')[0],
                    time: data.time,
                    organizer: data.organizer,
                    imageUrl: data.imageUrl || '',
                });
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setUpdating(true);
            await updateEvent(id, formData);
            setUpdating(false);
            navigate('/events');
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setUpdating(false);
        }
    };

    if (loading) return <div className="loading">Loading event details...</div>;

    return (
        <div className="container">
            <h1 className="page-title">Edit Event</h1>
            
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

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={updating}>
                        {updating ? 'Updating...' : 'Update Event'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;
