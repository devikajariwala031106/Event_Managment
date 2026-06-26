import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <div className="hero">
                <h1>Welcome to EventHub</h1>
                <p>Discover, manage, and create amazing events all in one place. Your ultimate platform for seamless event management.</p>
                <Link to="/events" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '12px 30px' }}>
                    Browse Events
                </Link>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Simple & Powerful</h2>
                <div className="grid">
                    <div className="event-card" style={{ padding: '30px', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '15px', color: '#3498db' }}>Discover</h3>
                        <p>Find exciting events happening around you based on your interests.</p>
                    </div>
                    <div className="event-card" style={{ padding: '30px', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '15px', color: '#3498db' }}>Manage</h3>
                        <p>Keep track of all your upcoming events in one intuitive dashboard.</p>
                    </div>
                    <div className="event-card" style={{ padding: '30px', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '15px', color: '#3498db' }}>Create</h3>
                        <p>Easily publish new events and reach a wider audience instantly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
