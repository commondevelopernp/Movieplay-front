export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  ratings: number[];
  favorites: number[];
  nickname?: string;
}

export interface IMovie {
  id: string;
  title: string;
  subtitle: string;
  synopsis: string;
  genre: string;
  images: string[];
  trailerVideoUrl: string;
  year: number;
  duration: number;
  rating: number;
  ratingCount: number;
  director: string;
  cast: string[];
}

export interface IRate {
  rating: number;
  movieId: string;
  userId: string;
}

export enum DataLoadStatus {
  NOT_REQUESTED_YET,
  LOADING,
  SUCCESS,
  ERROR,
}
