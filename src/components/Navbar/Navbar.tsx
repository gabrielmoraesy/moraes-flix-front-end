import profileDefault from '@/assets/images/profileDefault.jpg';
import { useAuth } from "@/contexts/AuthContext/authContext";
import { List } from "phosphor-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ConfirmModal } from "../Modals/ConfirmModal";
import { ModeToggle } from "../ModeToggle/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NavbarProps {
  setMenuIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar = ({ setMenuIsVisible }: NavbarProps) => {
  const navigate = useNavigate()
  const { token, logout, user } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const getNavLinkClassName = (isActive: boolean) => {
    return `text-lg p-2 ${isActive ? "bg-[#1a1a1a] text-white rounded-lg" : "hover:text-[#bbb] duration-200"}`;
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="w-full shadow-[0_-2px_10px_0_rgba(0,0,0,0.15)]">
      <div className="flex justify-between items-center max-w-[1270px] mx-auto p-6">
        <Link to="/" className="text-2xl max-[768px]:ml-2 font-bold">
          Moraes<span className="text-[#0500f5] font-extrabold">Flix</span>
        </Link>

        <div className="flex items-center space-x-8">
          <List
            size={32}
            onClick={() => setMenuIsVisible(true)}
            className="cursor-pointer hidden max-[1023px]:block"
          />

          <ul className="hidden lg:flex items-center list-none space-x-2">
            <li className='mr-2'>
              {token && (
                <Link to="/account" onClick={() => setMenuIsVisible(false)} className="flex items-center gap-2">
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage src={profileDefault} className="object-cover" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-medium">{user?.name}</p>
                </Link>
              )}
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => getNavLinkClassName(isActive)}
              >
                Filmes
              </NavLink>
            </li>
            {token &&
              <li>
                <NavLink
                  to={token ? "/dashboard" : "/login"}
                  className={({ isActive }) =>
                    token ? getNavLinkClassName(isActive) : "text-lg p-2 hover:text-[#bbb] duration-200"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            }
            {token &&
              <li>
                <NavLink
                  to={token ? "/movies/create" : "/login"}
                  className={({ isActive }) =>
                    token ? getNavLinkClassName(isActive) : "text-lg p-2 hover:text-[#bbb] duration-200"
                  }
                >
                  Criar filme
                </NavLink>
              </li>
            }
            {!token &&
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => getNavLinkClassName(isActive)}
                >
                  Entrar
                </NavLink>
              </li>
            }
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => getNavLinkClassName(isActive)}
              >
                Saiba mais
              </NavLink>
            </li>
            {token &&
              <li>
                <NavLink
                  to="/login"
                  className="text-lg p-2 hover:text-[#bbb]"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Sair
                </NavLink>
              </li>
            }
            <ModeToggle />
          </ul>
        </div>
      </div>

      {showLogoutModal && (
        <ConfirmModal
          open={showLogoutModal}
          setOpen={setShowLogoutModal}
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal((prevState) => !prevState)}
          title={"Sair da conta"}
          descripion={"Tem certeza que deseja sair da sua conta?"}
        />
      )}
    </div>
  );
};
