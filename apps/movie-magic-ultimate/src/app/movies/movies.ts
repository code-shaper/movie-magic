import type { Movie } from './Movie';

export const movies: Movie[] = [
  {
    id: 'tt0111161',
    name: 'The Shawshank Redemption',
    description:
      'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
    cast: ['Tim Robbins', 'Morgan Freeman'],
    certificate: 'R',
    genres: ['Drama'],
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
      width: 1200,
      height: 1800,
    },
    rank: 1,
    ratingsSummary: {
      aggregateRating: 9.3,
      voteCount: 2865906,
    },
    releaseYear: 1994,
    runtime: 8520,
    tagline: 'Fear can hold you prisoner. Hope can set you free.',
    isFeatured: false,
  },
  {
    id: 'tt0068646',
    name: 'The Godfather',
    description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    cast: ['Marlon Brando', 'Al Pacino'],
    certificate: 'R',
    genres: ['Crime', 'Drama'],
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      width: 1396,
      height: 1982,
    },
    rank: 2,
    ratingsSummary: {
      aggregateRating: 9.2,
      voteCount: 1996320,
    },
    releaseYear: 1972,
    runtime: 10500,
    tagline: "An offer you can't refuse.",
    isFeatured: false,
  },
  {
    id: 'tt0468569',
    name: 'The Dark Knight',
    description:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    cast: ['Christian Bale', 'Heath Ledger'],
    certificate: 'PG-13',
    genres: ['Action', 'Crime', 'Drama'],
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      width: 1383,
      height: 2048,
    },
    rank: 3,
    ratingsSummary: {
      aggregateRating: 9,
      voteCount: 2847398,
    },
    releaseYear: 2008,
    runtime: 9120,
    tagline: 'Why So Serious?',
    isFeatured: false,
  },
  {
    id: 'tt0071562',
    name: 'The Godfather Part II',
    description:
      'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
    cast: ['Al Pacino', 'Robert Duvall'],
    certificate: 'R',
    genres: ['Crime', 'Drama'],
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      width: 1791,
      height: 2552,
    },
    rank: 4,
    ratingsSummary: {
      aggregateRating: 9,
      voteCount: 1354458,
    },
    releaseYear: 1974,
    runtime: 12120,
    tagline: "All the power on earth can't change destiny.",
    isFeatured: false,
  },
  {
    id: 'tt0050083',
    name: '12 Angry Men',
    description:
      'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.',
    cast: ['Martin Balsam', 'John Fiedler'],
    certificate: 'NR',
    genres: ['Crime', 'Drama'],
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
      width: 974,
      height: 1500,
    },
    rank: 5,
    ratingsSummary: {
      aggregateRating: 9,
      voteCount: 856677,
    },
    releaseYear: 1957,
    runtime: 5760,
    tagline: 'It explodes like 12 sticks of dynamite!',
    isFeatured: false,
  },
  {
    id: 'tt0108052',
    name: "Schindler's List",
    description:
      'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    cast: ['Liam Neeson', 'Ben Kingsley'],
    certificate: 'R',
    genres: ['Biography', 'Drama', 'History'],
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
      width: 1600,
      height: 2400,
    },
    rank: 6,
    ratingsSummary: {
      aggregateRating: 9,
      voteCount: 1439587,
    },
    releaseYear: 1993,
    runtime: 11700,
    tagline: 'Whoever saves one life, saves the world entire.',
    isFeatured: false,
  },
  {
    id: 'tt0167260',
    name: 'The Lord of the Rings: The Return of the King',
    description:
      'Gandalf and Aragorn lead the World of Men against Sauron&apos;s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    cast: ['Elijah Wood', 'Sean Astin'],
    certificate: 'PG-13',
    genres: ['Action', 'Adventure', 'Drama'],
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      width: 800,
      height: 1185,
    },
    rank: 7,
    ratingsSummary: {
      aggregateRating: 9,
      voteCount: 1963008,
    },
    releaseYear: 2003,
    runtime: 12060,
    tagline: 'The eye of the enemy is moving.',
    isFeatured: true,
  },
  {
    id: 'tt0110912',
    name: 'Pulp Fiction',
    description:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    cast: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman'],
    certificate: 'R',
    genres: ['Crime', 'Drama'],
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      width: 1055,
      height: 1536,
    },
    rank: 8,
    ratingsSummary: {
      aggregateRating: 8.9,
      voteCount: 2200919,
    },
    releaseYear: 1994,
    runtime: 9240,
    tagline: "Girls like me don't make invitations like this to just anyone!",
    isFeatured: false,
  },
  {
    id: 'tt0120737',
    name: 'The Lord of the Rings: The Fellowship of the Ring',
    description:
      'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    cast: ['Elijah Wood', 'Ian McKellen'],
    certificate: 'PG-13',
    genres: ['Action', 'Adventure', 'Drama'],
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg',
      width: 1978,
      height: 2936,
    },
    rank: 9,
    ratingsSummary: {
      aggregateRating: 8.9,
      voteCount: 1990970,
    },
    releaseYear: 2001,
    runtime: 10680,
    tagline: 'The Legend Comes to Life',
    isFeatured: false,
  },
  {
    id: 'tt0060196',
    name: 'The Good, The Bad And The Ugly',
    description:
      'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.',
    cast: ['Clint Eastwood', 'Eli Wallach'],
    certificate: 'R',
    genres: ['Adventure', 'Western'],
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BNjJlYmNkZGItM2NhYy00MjlmLTk5NmQtNjg1NmM2ODU4OTMwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
      width: 2001,
      height: 3000,
    },
    rank: 10,
    ratingsSummary: {
      aggregateRating: 8.8,
      voteCount: 805769,
    },
    releaseYear: 1966,
    runtime: 10680,
    tagline:
      "They formed an alliance of hate to steal a fortune in dead man's gold",
    isFeatured: false,
  },
  {
    id: 'tt15239678',
    name: 'Dune: Part Two',
    description:
      'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
    certificate: 'PG-13',
    genres: ['Action', 'Adventure', 'Drama'],
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BODI0YjNhNjUtYjM0My00MTUwLWFlYTMtMWI2NGUzYjNjNGQzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
      width: 2764,
      height: 4096,
    },
    rank: 11,
    ratingsSummary: {
      aggregateRating: 9,
      voteCount: 113219,
    },
    releaseYear: 2024,
    runtime: 9960,
    tagline: 'Long live the fighters.',
    isFeatured: true,
  },
  {
    id: 'tt9362722',
    name: 'Spider-Man: Across the Spider-Verse',
    description:
      'Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a ...',
    cast: ['Shameik Moore', 'Hailee Steinfeld'],
    certificate: 'PG',
    genres: ['Animation', 'Action', 'Adventure'],
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg',
      width: 1299,
      height: 1929,
    },
    rank: 34,
    ratingsSummary: {
      aggregateRating: 8.6,
      voteCount: 352346,
    },
    releaseYear: 2023,
    runtime: 8400,
    isFeatured: false,
  },
  {
    id: 'tt15398776',
    name: 'Oppenheimer',
    description:
      'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon'],
    certificate: 'R',
    genres: ['Biography', 'Drama', 'History'],
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
      width: 2331,
      height: 3454,
    },
    rank: 85,
    ratingsSummary: {
      aggregateRating: 8.4,
      voteCount: 660353,
    },
    releaseYear: 2023,
    runtime: 10800,
    tagline: 'The World Forever Changes',
    isFeatured: true,
  },
];
