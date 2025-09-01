import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-title">Task Manager</h1>
        <button onClick={logout} className="btn-secondary">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
