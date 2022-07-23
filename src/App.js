import './App.css';
import { Routes, Route } from 'react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import SignupFrom from './components/SignupForm';
import { isLoggedIn } from './redux/login/login';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/Login" element={<LoginForm />} />
        </Route>
        <Route path="/Register" element={<SignupFrom />} />
      </Routes>
    </div>
  );
}

export default App;
