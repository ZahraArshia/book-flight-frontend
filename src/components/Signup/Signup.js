import './signup.css';
import { Navigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signup, resetError } from '../../redux/auth/auth';

const Signup = () => {
  const user = useSelector((state) => state.authReducer.user);
  const error = useSelector((state) => state.authReducer.error);
  const dispatch = useDispatch();
  return (
    <>
      { user && <Navigate to="/" /> }
      {
      !user && (
      <main
        className="absolute flex flex-column w-100 justify-center items-center"
        style={{ height: '100vh', gap: '1rem' }}
        id="signup"
      >
        <div style={{ zIndex: -1 }} className="signup-background absolute w-100 h-100" />
        <h1 className="white ttu tracked" style={{ marginTop: '10rem' }}>Welcome to Flightfull!</h1>
        <input
          className="signup-input white w-20-ns w-50-m w-50 br3 ba b--white pa2 pl0 pr0 bg-transparent"
          placeholder="Username"
          type="text"
        />
        <button
          type="button"
          style={{
            color: '#ffb400',
            borderRadius: '2rem',
            padding: '1rem 3rem',
          }}
          className="pointer fw6 bg-white b--none"
          onClick={() => {
            const name = document.querySelector('.signup-input').value || '';
            dispatch(signup(name));
          }}
        >
          Sign up
        </button>
        <hr className="white w5 m0" style={{ height: '2px', background: 'white' }} />
        <NavLink
          className="white shadow-5 pa3 br3 bg-yellow"
          onClick={() => dispatch(resetError())}
          to="/login"
        >
          Login
        </NavLink>
        {error && <p className="red shadow-5 f4 pa1 fw6 b">{error}</p>}
      </main>
      )
     }
    </>
  );
};

export default Signup;
