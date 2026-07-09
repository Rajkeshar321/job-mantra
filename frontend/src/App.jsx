import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Course from './pages/Course';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Notes from './pages/Notes';
import Register from './pages/Register';
import Tests from './pages/Tests';
import Blog from './pages/Blog';
import './index.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses/:id" element={<Course />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;