import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Schools' },
  { to: '/register-school', label: 'Register School' },
  { to: '/students', label: 'All Students' },
];

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="navbar py-4 border-b border-secondary">
      <div className="max-w-6xl mx-auto flex gap-8 items-center">
        {navLinks.map(({ to, label }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`navbar-link text-lg font-semibold transition-colors ${
                isActive ? 'active text-accent' : 'hover:text-secondary'
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
