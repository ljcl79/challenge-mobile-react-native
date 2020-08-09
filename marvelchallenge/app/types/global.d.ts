/*
  Definição de dados (Interface) 
*/
interface Thumbnail{
  extension: string;
  path: string;
}

interface Serie {
  name: string;
  resourceURI: string;
}

interface Series{
  items: Serie[];
}

interface Comic {
  name: string;
  resourceURI: string;
}

interface Comics{
  items: Comic[];
}

interface Heroe {
  id: string;
  name: string;
  thumbnail: Thumbnail;
  description: string;
  series: Series;
  comics: Comics;
}

interface Results {
  results: Heroe[]
}
  
interface IApiResponse {
    data: Results;
}

interface FavHeroe {
  id: string
}
