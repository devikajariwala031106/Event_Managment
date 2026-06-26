import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventListing from './pages/EventListing';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import EventDetails from './pages/EventDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventListing />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
