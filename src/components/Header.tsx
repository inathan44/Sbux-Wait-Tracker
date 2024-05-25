import { Button } from "./ui/button";

const Header = () => {
  return (
    <nav className="flex justify-end border-b-2 px-8 py-5 shadow-sm">
      <div className="flex items-center gap-4">
        <p>About</p>
        <Button className="rounded-full">Logout</Button>
      </div>
    </nav>
  );
};

export default Header;
