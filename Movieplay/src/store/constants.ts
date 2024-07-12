export type SelectorOptions = {
  value: string | number;
  label: string;
};

export const ratesOptions: string[] = ['--', '0', '1', '2', '3', '4', '5'];

export const sortReleaseDateOptions: string[] = ['--', 'ASC', 'DESC'];

export const genreElements = [
  {value: 'action', labelKey: 'genre_action'},
  {value: 'adventure', labelKey: 'genre_adventure'},
  {value: 'animation', labelKey: 'genre_animation'},
  {value: 'comedy', labelKey: 'genre_comedy'},
  {value: 'crime', labelKey: 'genre_crime'},
  {value: 'documentary', labelKey: 'genre_documentary'},
  {value: 'drama', labelKey: 'genre_drama'},
  {value: 'family', labelKey: 'genre_family'},
  {value: 'fantasy', labelKey: 'genre_fantasy'},
  {value: 'history', labelKey: 'genre_history'},
  {value: 'horror', labelKey: 'genre_horror'},
  {value: 'music', labelKey: 'genre_music'},
  {value: 'mistery', labelKey: 'genre_mistery'},
  {value: 'romance', labelKey: 'genre_romance'},
  {value: 'sci-fi', labelKey: 'genre_sci_fi'},
  {value: 'tv-movie', labelKey: 'genre_tv_movie'},
  {value: 'suspense', labelKey: 'genre_suspense'},
  {value: 'war', labelKey: 'genre_war'},
  {value: 'western', labelKey: 'genre_western'},
];
