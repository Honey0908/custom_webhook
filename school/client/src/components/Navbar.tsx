import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/students', label: 'Students' },
];

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="navbar py-4">
      <div className="max-w-6xl mx-auto flex gap-8 items-center">
        {navLinks.map(({ to, label }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`navbar-link text-lg font-semibold transition ${
                isActive ? 'active' : ''
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
