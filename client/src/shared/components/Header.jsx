import { Link } from "react-router-dom";
import Logo from "/logo.png";
import Button from "./UIElements/Button";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { userId, username } = useAuth();

  return (
    <header className="bg-primary h-16 flex items-center justify-between px-10">
      <Link to={`/`} className="flex gap-4 items-center">
        <img src={Logo} alt="Logo" className="h-12 w-12" />
        <h1 className="uppercase text-2xl text-white font-bold">
          bole<span className="text-blue-500">to</span>
        </h1>
      </Link>
      <nav className="flex items-center gap-5">
        <Link to={`/explore`} className="text-white text-lg font-semibold">
          Explore
        </Link>
        {!userId && (
          <Button to={"/signup"} variant="gradient" size="normal">
            Join Now
          </Button>
        )}
        {userId && (
          <Link className="text-white flex items-center gap-2">
            <img
              className="w-10 h-10 rounded-full"
              src="/avatar.png"
              alt="avatar"
            />
            <span>{username}</span>
          </Link>
        )}
      </nav>
    </header>
  );
};
export default Header;
