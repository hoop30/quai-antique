import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import NavBar from './components/NavBar'
import Footer from './components/Footer';
import PrivateRoute from './pages/private/PrivateRoute ';
import Admin from './pages/private/modification/Admin';
import ReservationModal from './components/ReservationModal';

function App() {

  return (
    <div className='App'>
      <SignInModal />
      <SignUpModal />
      <ReservationModal />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
