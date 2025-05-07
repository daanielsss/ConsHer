import { CircleUserRound, Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../lib/auth";

export default function MobileNav() {
    const navigate = useNavigate();
    const user = getUserFromToken();

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-500" />
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {user ? (
                        <span className="flex items-center font-bold gap-2">
                            <CircleUserRound className="text-orange-500" />
                            {user.email}
                        </span>
                    ) : (
                        <span>Bienvenido a ConsHer</span>
                    )}
                </SheetTitle>

                <Separator />

                <SheetDescription className="flex flex-col gap-4">
                    {user ? (
                        <MobileNavLinks />
                    ) : (
                        <Button
                            onClick={handleLogin}
                            className="flex-1 font-bold bg-orange-500"
                        >
                            Iniciar sesión
                        </Button>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}
