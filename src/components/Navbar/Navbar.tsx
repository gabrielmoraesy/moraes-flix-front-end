import { List } from "phosphor-react";
import { NavLink, Link } from "react-router-dom";
import { ModeToggle } from "../ThemeProvider/ModeToggle/mode-toggle";

interface NavbarProps {
  setMenuIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const routes = [
  { title: "Filmes", to: "/" },
  { title: "Dashboard", to: "/dashboard" },
  { title: "Criar filme", to: "/projects/create" },
  { title: "Entrar", to: "/login" },
  { title: "Saiba mais", to: "/about" },
  { title: "Sair", to: "/" },
];

export const Navbar = ({ setMenuIsVisible }: NavbarProps) => {
  return (
    <div className="w-full shadow-[0_-2px_10px_0_rgba(0,0,0,0.15)]">
      <div className="flex justify-between items-center max-w-[1270px] mx-auto p-6">
        <Link to="" className="text-2xl max-[768px]:ml-2 font-bold">
          Moraes<span className="text-[#0500f5] font-extrabold">Flix</span>
        </Link>

        <div className="flex items-center space-x-8">
          <List
            size={32}
            onClick={() => setMenuIsVisible(true)}
            className="cursor-pointer hidden max-[1023px]:block"
          />

          <ul className="hidden lg:flex items-center list-none space-x-2">
            {routes.map(route => (
              <li key={route.title}> {/* Adicionando a key aqui */}
                <NavLink
                  to={route.to}
                  className={({ isActive }) =>
                    `text-lg p-2 ${isActive ? "bg-[#1a1a1a] text-white rounded-lg" : "hover:text-[#bbb]"}`
                  }
                >
                  {route.title}
                </NavLink>
              </li>
            ))}
            <ModeToggle />
          </ul>
        </div>
      </div>
    </div>
  );
};
