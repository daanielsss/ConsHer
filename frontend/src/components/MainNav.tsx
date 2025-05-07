import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import { getUserFromToken } from "../lib/auth";
import { useNavigate } from "react-router-dom";

export default function MainNav() {
  const navigate = useNavigate();
  const user = getUserFromToken();

  return (
    <span className="flex space-x-2 items-center">
      {user ? (
        <UserNameMenu />
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={() => navigate("/login")}
        >
          Iniciar sesión
        </Button>
      )}
    </span>
  );
}
