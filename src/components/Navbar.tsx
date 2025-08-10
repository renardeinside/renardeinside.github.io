import { Link, useLocation } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="bg-background">
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {pathname !== '/' && (
              <Link to="/">
                <div className="flex flex-row space-x-2 justify-center items-center">
                  back to the future
                </div>
              </Link>
            )}
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
