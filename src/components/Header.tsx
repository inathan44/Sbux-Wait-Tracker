import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./LogoutButton";

const Header = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-end border-b-2 px-8 py-5 shadow-sm">
      <div className="flex items-center gap-4">
        <Link to="/about">
          <p
            className={cn("text-gray-500 hover:underline", {
              "font-medium text-black hover:no-underline":
                location.pathname === "/about",
            })}
          >
            About
          </p>
        </Link>
        <Link to="/">
          <p
            className={cn("text-gray-500 hover:underline", {
              "font-medium text-black hover:no-underline":
                location.pathname === "/",
            })}
          >
            Home
          </p>
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Header;
