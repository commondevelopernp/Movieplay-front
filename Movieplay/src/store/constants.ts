export type SelectorOptions = {
  value: string | number;
  label: string;
};

export const ratesOptions: string[] = ['--', '0', '1', '2', '3', '4', '5'];

export const sortReleaseDateOptions: string[] = ['--', 'ASC', 'DESC'];

export const genreElements = [
  {value: 'action', labelKey: 'genre_action'},
  {value: 'comedy', labelKey: 'genre_comedy'},
  {value: 'horror', labelKey: 'genre_horror'},
  {value: 'romance', labelKey: 'genre_romance'},
  {value: 'sci-fi', labelKey: 'genre_sci_fi'},
  {value: 'documentary', labelKey: 'genre_documentary'},
];
