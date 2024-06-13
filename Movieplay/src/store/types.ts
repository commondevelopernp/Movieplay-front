export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  profileImage?: string;
  ratings: number[];
  favorited: number[]; //Fix this is wrong.
}

export interface IMovie {
  id: number;
  title: string;
  subtitle: string;
  synopsis: string;
  genre: string[];
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
