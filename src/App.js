import './App.css';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Homepage from './components/Homepage';
import AddItem from './components/AddItem';
import ReservationList from './components/Reservations/Reservations';
import DeleteItem from './components/DeleteItem';
import DetailsPage from './components/ItemDetails';
import AddReservation from './components/Reservations/AddReservation/AddReservation';
import { fetchUser } from './redux/auth/auth';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(fetchUser());
    if (!localStorage.token && pathname === '/login') navigate('/login');
    else if (!localStorage.token) navigate('/signup');
  }, []);

  return (
    <main className="MainSkleton">
      {localStorage.token && <Header />}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/reservations" element={<ReservationList />} />
        <Route path="/reservations/add" element={<AddReservation />} />
        <Route path="/Item_detail/:id" element={<DetailsPage />} />
        <Route path="/AddItem" element={<AddItem />} />
        <Route path="/DeleteItem" element={<DeleteItem />} />
      </Routes>
    </main>
  );
};

export default App;
