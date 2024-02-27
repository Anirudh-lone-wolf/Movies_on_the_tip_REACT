// Interface representing the structure of a movie object
export default interface IMovie {
  id?: string;
  title: string;
  year: string;
  genres: string[];
  ratings: number[];
  poster: string;
  contentRating: string;
  duration: string;
  releaseDate: string;
  averageRating: number;
  originalTitle: string;
  storyline: string;
  actors: string[];
  imdbRating?: string | number;
  posterurl?: string;
}
