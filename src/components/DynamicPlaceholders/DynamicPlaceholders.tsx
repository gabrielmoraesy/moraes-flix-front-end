import { IMovie } from "@/interfaces/IMovie";
import { TypeAnimation } from "react-type-animation";

interface IDynamicPlaceholders {
  movies?: IMovie[];
}

export const DynamicPlaceholders = ({ movies = [] }: IDynamicPlaceholders) => {
  const arrayTitleMovies = movies.map((movie: IMovie) => movie.title);

  const sequence = arrayTitleMovies.length > 0
    ? arrayTitleMovies.flatMap((item: string, index: number) => {
      return index === arrayTitleMovies.length - 1 ? [item] : [item, 1500];
    })
    : [];

  const finalSequence = sequence.length > 0 ? sequence : ["Pesquise pelo nome do filme...", 1500];

  return (
    <TypeAnimation
      sequence={finalSequence}
      wrapper="span"
      speed={1}
      style={{ fontSize: "16px", display: "inline-block" }}
      repeat={Infinity}
    />
  );
};
