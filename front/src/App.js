import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import Home from './pages/home/Home'
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import NavBar from './components/NavBar'

function App() {
  return (
    <div className='App'>
      <SignInModal />
      <SignUpModal />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
