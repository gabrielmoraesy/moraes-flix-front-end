import { Link } from "react-router-dom";

import { ArrowBendUpLeft } from "phosphor-react";

import profileDefault from '@/assets/images/profileDefault.jpg';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext/authContext";

export const MyAccount = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen max-w-4xl mx-auto pt-4 sm:pt-8">
      <div className="flex flex-col items-center">
        <div className="w-11/12 flex justify-between items-center border-b-2 border-gray-300 pb-1">
          <h1 className="text-lg sm:text-xl font-bold">Detalhes da conta</h1>
          <Link to="/">
            <ArrowBendUpLeft size={32} />
          </Link>
        </div>

        <div className="flex flex-col items-center mt-4 gap-2">
          <Avatar className="w-[128px] h-[128px]">
            <AvatarImage src={profileDefault} className="object-cover" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <label className="flex flex-col">
            <p className="text-lg font-semibold">Nome completo:</p>
            <input
              disabled
              value={`${user?.name}`}
              className="w-80 text-base border-b border-gray-300 bg-transparent mb-4"
            />
          </label>

          <label className="flex flex-col">
            <p className="text-lg font-semibold">E-mail:</p>
            <input
              disabled
              value={`${user?.email}`}
              className="w-80 text-base border-b border-gray-300 bg-transparent mb-4"
            />
          </label>
        </div>
      </div>
    </div >
  );
};
