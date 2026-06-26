import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="navbar-logo">
                    EventHub
                </Link>
                <div className="navbar-links">
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                        Home
                    </NavLink>
                    <NavLink to="/events" className={({ isActive }) => (isActive ? 'active' : '')}>
                        Events
                    </NavLink>
                    <NavLink to="/add-event" className={({ isActive }) => (isActive ? 'active' : '')}>
                        Create Event
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
