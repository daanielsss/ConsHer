import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function MobileNavLinks() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {token && (
        <>
          <Link
            to="/admin"
            className="flex bg-white items-center font-bold hover:text-orange-500"
          >
            Panel
          </Link>
          <Button
            onClick={handleLogout}
            className="flex flex-item center px-3 font-bold hover:text-orange-500"
          >
            Salir
          </Button>
        </>
      )}
    </>
  );
}

