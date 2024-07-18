export type SelectorOptions = {
  value: string | number;
  label: string;
};

export const ratesElements = [
  {value: 'None', labelKey: 'rate_none'},
  {value: '0', labelKey: 'rate_0'},
  {value: '1', labelKey: 'rate_1'},
  {value: '2', labelKey: 'rate_2'},
  {value: '3', labelKey: 'rate_3'},
  {value: '4', labelKey: 'rate_4'},
  {value: '5', labelKey: 'rate_5'},
];

export const orderElements = [
  {value: 'None', labelKey: 'order_none'},
  {value: 'ASC', labelKey: 'order_asc'},
  {value: 'DESC', labelKey: 'order_desc'},
];

export const genreElements = [
  {value: 'Acción', labelKey: 'genre_action'},
  {value: 'Aventura', labelKey: 'genre_adventure'},
  {value: 'Animación', labelKey: 'genre_animation'},
  {value: 'Comedia', labelKey: 'genre_comedy'},
  {value: 'Crimen', labelKey: 'genre_crime'},
  {value: 'Documental', labelKey: 'genre_documentary'},
  {value: 'Drama', labelKey: 'genre_drama'},
  {value: 'Familia', labelKey: 'genre_family'},
  {value: 'Fantasía', labelKey: 'genre_fantasy'},
  {value: 'Historia', labelKey: 'genre_history'},
  {value: 'Terror', labelKey: 'genre_horror'},
  {value: 'Música', labelKey: 'genre_music'},
  {value: 'Misterio', labelKey: 'genre_mistery'},
  {value: 'Romance', labelKey: 'genre_romance'},
  {value: 'Ciencia ficción', labelKey: 'genre_sci_fi'},
  {value: 'Película de TV', labelKey: 'genre_tv_movie'},
  {value: 'Suspense', labelKey: 'genre_suspense'},
  {value: 'Bélica', labelKey: 'genre_war'},
  {value: 'Western', labelKey: 'genre_western'},
];

export const sortByElements = [
  {value: 'title', labelKey: 'title'},
  {value: 'genre', labelKey: 'genre'},
  {value: 'actor', labelKey: 'actor'},
];
