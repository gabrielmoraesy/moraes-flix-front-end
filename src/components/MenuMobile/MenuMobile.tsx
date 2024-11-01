import { X } from "phosphor-react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  menuIsVisible: boolean;
  setMenuIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuMobile = ({
  menuIsVisible,
  setMenuIsVisible,
}: NavbarProps) => {
  // const { signOutWithGoogle } = useAuth();
  // const { user } = useUser();

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
        {/* {user && (
          <Link to="/account" onClick={() => setMenuIsVisible(false)} className="flex items-center gap-4">
            <img
              src={user.photoURL || ""}
              alt="User Avatar"
              className="w-20 h-20 rounded-2xl"
            />
            <p className="text-2xl font-bold text-white">{user.displayName}</p>
          </Link>
        )} */}
        <NavLink
          to="/"
          className="text-3xl text-white"
          onClick={() => setMenuIsVisible(false)}
        >
          Projetos
        </NavLink>
        <NavLink
          to="/dashboard"
          className="text-3xl text-white"
          onClick={() => setMenuIsVisible(false)}
        >
          Meus Projetos
        </NavLink>
        <NavLink
          to="/projects/create"
          className="text-3xl text-white"
          onClick={() => setMenuIsVisible(false)}
        >
          Criar Projeto
        </NavLink>
        <NavLink
          to="/login"
          className="text-3xl text-white"
          onClick={() => setMenuIsVisible(false)}
        >
          Entrar
        </NavLink>
        <NavLink
          to="/about"
          className="text-3xl text-white"
          onClick={() => setMenuIsVisible(false)}
        >
          Sobre
        </NavLink>
        <NavLink
          to="/"
          onClick={() => {
            // signOutWithGoogle();
            setMenuIsVisible(false);
          }}
          className="text-3xl text-white"
        >
          Sair
        </NavLink>
      </nav>
    </section>
  );
};
