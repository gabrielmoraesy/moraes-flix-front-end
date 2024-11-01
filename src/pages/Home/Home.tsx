import { useState } from "react";
import { DynamicPlaceholders } from "../../components/DynamicPlaceholders";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

export const Home = () => {
  const [searchTitle, setSearchTitle] = useState("");

  return (
    <div className={`min-h-screen`}>
      <div className="pt-4 mx-auto max-w-screen-xl text-lg">
        <div className="relative flex justify-between items-center mx-8 group">
          <h1 className="text-2xl font-bold">Filmes</h1>
          <input
            type="text"
            onChange={(e) => setSearchTitle(e.target.value)}
            value={searchTitle}
            className="relative w-2/3 text-base px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500 sm:w-3/5 group"
          />

          {/* Exibe DynamicPlaceholders quando searchTitle está vazio */}
          {searchTitle.length < 1 && (
            <span className="absolute left-[41.2%] transform text-base font-medium max-[640px]:hidden group-focus-within:hidden">
              <DynamicPlaceholders />
            </span>
          )}

          {searchTitle.trim() === "" ? (
            <div className="absolute right-[1%]">
              <BiSearch
                size={20}
                color={"#000"}
              />
            </div>
          ) : (
            <button
              className="absolute right-[1%] cursor-pointer"
              onClick={() => setSearchTitle("")}
              aria-label="Limpar"
            >
              <AiOutlineClose size={20} color={"#000"} />
            </button>
          )}
        </div>

        {/* {loading && <p className="text-lg mx-8 my-4">Carregando...</p>} */}

        {/* Renderização de projetos (código comentado mantido para referência) */}
        {/* {projects && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-8 my-8">
            {projects.projectsSearch
              ? projects.projectsSearch.map((project: any) => (
                <div
                  key={project.id}
                  className={`flex flex-col justify-between items-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow min-h-[300px] ${isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                >
                  <h2 className="text-2xl font-bold mb-4">{project.data.name}</h2>
                  <p className="text-lg mb-4">{project.data.description}</p>
                  <p className="text-lg mb-4">Tecnologias: {project.data.technologies.join(", ")}</p>
                  <Link
                    to={`/projects/${project.id}`}
                    className="w-40 py-2 text-center font-bold border-2 border-black rounded-lg transition-colors hover:bg-black hover:text-white"
                  >
                    Ver mais
                  </Link>
                </div>
              ))
              : projects.projectsAll &&
              projects.projectsAll.map((project: any) => (
                <div
                  key={project.id}
                  className={`flex flex-col justify-between items-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow min-h-[300px] ${isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                >
                  <h2 className="text-2xl font-bold mb-4">{project.data.name}</h2>
                  <p className="text-lg mb-4">{project.data.description}</p>
                  <p className="text-lg mb-4">Tecnologias: {project.data.technologies.join(", ")}</p>
                  <Link
                    to={`/projects/${project.id}`}
                    className="w-40 py-2 text-center font-bold border-2 border-black rounded-lg transition-colors hover:bg-black hover:text-white"
                  >
                    Ver mais
                  </Link>
                </div>
              ))}
          </div>
        )} */}

        {/* {!projects && !loading && (
          <div className="mt-8 flex flex-col items-center">
            <p className="text-lg">Não existem projetos em exibição.</p>
          </div>
        )} */}
      </div>
    </div>
  );
};
