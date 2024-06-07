import {IMovie} from '../../store/types';

const movies: IMovie[] = [
  {
    id: '1',
    title: 'Inception',
    subtitle: 'Your mind is the scene of the crime.',
    synopsis:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    genre: 'Sci-Fi',
    images: [
      'https://m.media-amazon.com/images/I/71DwIcSgFcS.jpg', // This should be your main poster image URL.
      'https://example.com/path/to/movie/image2.jpg',
      'https://example.com/path/to/movie/image3.jpg',
    ],
    trailerVideoUrl: 'https://example.com/path/to/trailer.mp4',
    year: 2010,
    duration: 148, // in minutes
    rating: 8.8,
    ratingCount: 2000000,
    director: 'Christopher Nolan',
    cast: [
      'Leonardo DiCaprio',
      'Joseph Gordon-Levitt',
      'Elliot Page',
      'Tom Hardy',
      'Ken Watanabe',
    ],
  },
  {
    id: '2',
    title: 'The Grand Budapest Hotel',
    subtitle: 'A perfect holiday without leaving home.',
    synopsis:
      'The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.',
    genre: 'Comedy',
    images: [
      'https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_.jpg',
      'https://example.com/path/to/grandbudapest/image2.jpg',
      'https://example.com/path/to/grandbudapest/image3.jpg',
    ],
    trailerVideoUrl: 'https://example.com/path/to/grandbudapest/trailer.mp4',
    year: 2014,
    duration: 99,
    rating: 8.1,
    ratingCount: 690000,
    director: 'Wes Anderson',
    cast: ['Ralph Fiennes', 'F. Murray Abraham', 'Mathieu Amalric'],
  },
  {
    id: '3',
    title: 'Interstellar',
    subtitle: 'Mankind was born on Earth. It was never meant to die here.',
    synopsis:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: 'Sci-Fi',
    images: [
      'https://m.media-amazon.com/images/I/71dN1QYnf+L._AC_UF894,1000_QL80_.jpg',
      'https://example.com/path/to/interstellar/image2.jpg',
      'https://example.com/path/to/interstellar/image3.jpg',
    ],
    trailerVideoUrl: 'https://example.com/path/to/interstellar/trailer.mp4',
    year: 2014,
    duration: 169,
    rating: 8.6,
    ratingCount: 1500000,
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
  },
  {
    id: '4',
    title: 'Parasite',
    subtitle: 'Act like you own the place.',
    synopsis:
      'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    genre: 'Thriller',
    images: [
      'https://m.media-amazon.com/images/I/91KArYP03YL._AC_SL1500_.jpg',
      'https://example.com/path/to/parasite/image2.jpg',
      'https://example.com/path/to/parasite/image3.jpg',
    ],
    trailerVideoUrl: 'https://example.com/path/to/parasite/trailer.mp4',
    year: 2019,
    duration: 132,
    rating: 8.6,
    ratingCount: 510000,
    director: 'Bong Joon Ho',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'],
  },
  {
    id: '5',
    title: 'Black Panther',
    subtitle: 'Long live the king.',
    synopsis:
      "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
    genre: 'Action',
    images: [
      'https://m.media-amazon.com/images/I/810SlMj1+eL._AC_UF1000,1000_QL80_.jpg',
      'https://example.com/path/to/blackpanther/image2.jpg',
      'https://example.com/path/to/blackpanther/image3.jpg',
    ],
    trailerVideoUrl: 'https://example.com/path/to/blackpanther/trailer.mp4',
    year: 2018,
    duration: 134,
    rating: 7.3,
    ratingCount: 590000,
    director: 'Ryan Coogler',
    cast: ['Chadwick Boseman', 'Michael B. Jordan', "Lupita Nyong'o"],
  },
  {
    id: '6',
    title: 'Mad Max: Fury Road',
    subtitle: 'What a lovely day.',
    synopsis:
      'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshipper, and a drifter named Max.',
    genre: 'Action',
    images: [
      'https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg',
      'https://example.com/path/to/madmax/image2.jpg',
      'https://example.com/path/to/madmax/image3.jpg',
    ],
    trailerVideoUrl: 'https://example.com/path/to/madmax/trailer.mp4',
    year: 2015,
    duration: 120,
    rating: 8.1,
    ratingCount: 860000,
    director: 'George Miller',
    cast: ['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult'],
  },
  {
    id: '7',
    title: 'Inception',
    subtitle: 'Your mind is the scene of the crime.',
    synopsis:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    genre: 'Sci-Fi',
    images: [
      'https://m.media-amazon.com/images/I/71DwIcSgFcS.jpg', // This should be your main poster image URL.
      'https://example.com/path/to/movie/image2.jpg',
      'https://example.com/path/to/movie/image3.jpg',
    ],
    trailerVideoUrl: 'https://example.com/path/to/trailer.mp4',
    year: 2010,
    duration: 148, // in minutes
    rating: 8.8,
    ratingCount: 2000000,
    director: 'Christopher Nolan',
    cast: [
      'Leonardo DiCaprio',
      'Joseph Gordon-Levitt',
      'Elliot Page',
      'Tom Hardy',
      'Ken Watanabe',
    ],
  },
  {
    id: '8',
    title: 'The Grand Budapest Hotel',
    subtitle: 'A perfect holiday without leaving home.',
    synopsis:
      'The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.',
    genre: 'Comedy',
    images: [
      'https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_.jpg',
      'https://example.com/path/to/grandbudapest/image2.jpg',
      'https://example.com/path/to/grandbudapest/image3.jpg',
    ],
    trailerVideoUrl: 'https://example.com/path/to/grandbudapest/trailer.mp4',
    year: 2014,
    duration: 99,
    rating: 8.1,
    ratingCount: 690000,
    director: 'Wes Anderson',
    cast: ['Ralph Fiennes', 'F. Murray Abraham', 'Mathieu Amalric'],
  },
];

export default movies;
