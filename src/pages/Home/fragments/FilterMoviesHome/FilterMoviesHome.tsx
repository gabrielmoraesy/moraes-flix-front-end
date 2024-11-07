import { IMovie } from "@/interfaces/IMovie";
import { SlidersHorizontal } from "lucide-react";
import PopoverFilter from "./fragments/PopoverFilter/PopoverFilter";

interface ISearchValues {
    value: string;
    label: string;
}

interface FilterMoviesHomeProps {
    movies: IMovie[];
    genreSelected: string;
    setGenreSelected: React.Dispatch<React.SetStateAction<string>>;
    releaseYearSelected: string;
    setReleaseYearSelected: React.Dispatch<React.SetStateAction<string>>;
    durationSelected: string;
    setDurationSelected: React.Dispatch<React.SetStateAction<string>>;
}

const FilterMoviesHome = ({
    movies,
    genreSelected,
    setGenreSelected,
    releaseYearSelected,
    setReleaseYearSelected,
    durationSelected,
    setDurationSelected,
}: FilterMoviesHomeProps) => {
    const uniqueGenres: ISearchValues[] = movies.reduce((acc, movie) => {
        if (movie.genre && !acc.some(genre => genre.value === movie.genre)) {
            acc.push({
                value: movie.genre,
                label: movie.genre
            });
        }
        return acc;
    }, [] as ISearchValues[]);

    const uniqueReleaseYears: ISearchValues[] = movies.reduce((acc, movie) => {
        if (!acc.some(year => year.value === movie.releaseYear.toString())) {
            acc.push({
                value: movie.releaseYear.toString(),
                label: movie.releaseYear.toString()
            });
        }
        return acc;
    }, [] as ISearchValues[]);

    const durationRanges: ISearchValues[] = movies.reduce((acc, movie) => {
        const duration = movie.duration;
        const lowerBound = Math.floor((duration - 1) / 60) * 60;
        const upperBound = lowerBound + 60;
        const rangeLabel = `${lowerBound} a ${upperBound} minutos`;

        if (!acc.some(range => range.label === rangeLabel)) {
            acc.push({
                value: rangeLabel,
                label: rangeLabel
            });
        }

        return acc;
    }, [] as ISearchValues[]);

    return (
        <div className="mx-8 my-3 flex justify-between items-center max-[660px]:flex-col max-[660px]:items-start max-[660px]:gap-2">
            <h1 className="flex gap-1 items-center text-sm">
                <SlidersHorizontal size={20} /> Filtros
            </h1>

            <div className="max-[1000px]:w-[80%] max-[660px]:w-full max-[540px]:flex-col w-[55%] flex gap-3">
                <PopoverFilter
                    variant="genre"
                    searchValues={uniqueGenres}
                    valueSelected={genreSelected}
                    setValueSelected={setGenreSelected}
                />
                <PopoverFilter
                    variant="releaseYear"
                    searchValues={uniqueReleaseYears}
                    valueSelected={releaseYearSelected}
                    setValueSelected={setReleaseYearSelected}
                />
                <PopoverFilter
                    variant="duration"
                    searchValues={durationRanges}
                    valueSelected={durationSelected}
                    setValueSelected={setDurationSelected}
                />
            </div>
        </div>
    );
};

export default FilterMoviesHome;
