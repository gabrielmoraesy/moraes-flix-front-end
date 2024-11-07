import { DynamicPlaceholders } from "@/components/DynamicPlaceholders"
import { IMovie } from "@/interfaces/IMovie"
import { AiOutlineClose } from "react-icons/ai"
import { BiSearch } from "react-icons/bi"

interface HeaderHomeProps {
    filteredMovies: IMovie[]
    searchTitle: string
    setSearchTitle: React.Dispatch<React.SetStateAction<string>>
}

const HeaderHome = ({ filteredMovies, searchTitle, setSearchTitle }: HeaderHomeProps) => {
    return (
        <div className="relative flex justify-between items-center mx-8 group">
            <h1 className="text-xl sm:text-2xl font-bold">Filmes</h1>
            <input
                type="text"
                onChange={(e) => setSearchTitle(e.target.value)}
                value={searchTitle}
                className="relative w-2/3 text-base px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500 sm:w-2/5 group dark:text-black"
            />

            {searchTitle.length < 1 && (
                <span className="absolute left-[61%] transform text-base font-medium max-[640px]:hidden group-focus-within:hidden dark:text-black">
                    <DynamicPlaceholders movies={filteredMovies} />
                </span>
            )}

            {searchTitle.trim() === "" ? (
                <div className="absolute right-[3%] sm:right-[1%]">
                    <BiSearch size={20} color={"#000"} />
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
        </div>)
}

export default HeaderHome