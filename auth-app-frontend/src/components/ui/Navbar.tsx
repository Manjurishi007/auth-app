import useAuth from "@/auth/store";
import { User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggles";


function Navbar() {
  const authStatus = useAuth((state) => state.authStatus);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="h-14 border-b border-gray-700 px-8 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 font-semibold">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-r from-primary to-primary/40 text-white">
          A
        </span>
        <span>Auth App</span>
      </Link>

      <div className="flex items-center gap-4">
        {authStatus ? (
          <>
            <NavLink
              to="/dashboard/profile"
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              <span>{user?.name}</span>
            </NavLink>

            <nav className="flex items-center justify-between">
              <h1>Auth App</h1>

              <ThemeToggle />
            </nav>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </NavLink>

            <NavLink to="/signup">
              <Button size="sm">
                Signup
              </Button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;