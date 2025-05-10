import { Link, useNavigate } from 'react-router-dom';
import { getUserFromToken } from '@/lib/auth';
import { LogIn, UserCircle } from 'lucide-react';

export default function Header() {
  const user = getUserFromToken();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white border-b-2 border-orange-500 py-4 px-4 pl-[4.5rem] md:pl-[14rem] transition-all duration-300 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-tight text-orange-500">
        ConsHer
      </Link>

      {user ? (
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <UserCircle className="text-orange-500" />
          {user.email}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="text-orange-500 hover:text-orange-700 flex items-center gap-1 text-sm font-medium"
        >
          <LogIn size={16} />
          Iniciar sesión
        </button>
      )}
    </header>
  );
}

