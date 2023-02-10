import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import NavBar from './components/NavBar'
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <SignInModal />
      <SignUpModal />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
