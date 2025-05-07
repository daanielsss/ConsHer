import { ArrowRightFromLine, CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../lib/auth";

export default function UserNameMenu() {
  const navigate = useNavigate();
  const user = getUserFromToken();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null; // Si no hay sesión activa, no muestra el menú

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        {user.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[220px]">
        <DropdownMenuItem className="font-semibold text-gray-700">
          Sesión iniciada
        </DropdownMenuItem>

        <Separator />

        <DropdownMenuItem>
          <Button
            className="flex items-center gap-2 font-bold text-white bg-orange-500 hover:bg-orange-600 w-full justify-center"
            onClick={handleLogout}
          >
            <ArrowRightFromLine />
            Salir
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
