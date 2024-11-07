import profileDefault from '@/assets/images/profileDefault.jpg';
import { useAuth } from "@/contexts/AuthContext/authContext";
import { X } from "phosphor-react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ModeToggle } from "../ModeToggle/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NavbarProps {
  menuIsVisible: boolean;
  setMenuIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuMobile = ({
  menuIsVisible,
  setMenuIsVisible,
}: NavbarProps) => {
  const { token, logout, user } = useAuth()

  useEffect(() => {
    document.body.style.overflowY = menuIsVisible ? "hidden" : "auto";
  }, [menuIsVisible]);

  return (
    <section
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,18,17,0.4)] backdrop-blur-sm transition-all duration-500 ${menuIsVisible ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-12"
        }`}
    >
      <X
        size={32}
        onClick={() => setMenuIsVisible(false)}
        className="absolute top-12 right-12 text-white transform transition-transform duration-700 hover:rotate-45 cursor-pointer"
      />
      <nav
        className={`flex flex-col items-center gap-8 transform transition-transform duration-700 ${menuIsVisible ? "scale-100" : "scale-75"
          }`}
      >
        {token && (
          <Link to="/account" onClick={() => setMenuIsVisible(false)} className="flex items-center gap-4">
            <Avatar className="w-[48px] h-[48px]">
              <AvatarImage src={profileDefault} className="object-cover" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-2xl font-bold text-white">{user?.name}</p>
          </Link>
        )}


        <NavLink
          to="/"
          className="text-3xl text-white"
          onClick={() => setMenuIsVisible(false)}
        >
          Filmes
        </NavLink>
        {token &&
          <NavLink
            to={token ? "/dashboard" : "/login"}
            className="text-3xl text-white"
            onClick={() => setMenuIsVisible(false)}
          >
            Dashboard
          </NavLink>
        }
        {token &&
          <NavLink
            to={token ? "/movies/create" : "/login"}
            className="text-3xl text-white"
            onClick={() => { setMenuIsVisible(false) }}
          >
            Criar filme
          </NavLink>
        }
        {!token &&
          <NavLink
            to="/login"
            className="text-3xl text-white"
            onClick={() => setMenuIsVisible(false)}
          >
            Entrar
          </NavLink>}
        <NavLink
          to="/about"
          className="text-3xl text-white"
          onClick={() => setMenuIsVisible(false)}
        >
          Saiba mais
        </NavLink>
        {token &&
          <NavLink
            to="/login"
            onClick={() => {
              logout()
              setMenuIsVisible(false);
            }}
            className="text-3xl text-white"
          >
            Sair
          </NavLink>}

        <ModeToggle />
      </nav>
    </section>
  );
};
