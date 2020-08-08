interface Thumbnail{
  extension: string;
  path: string;
}

interface Serie {
  name: string;
  resourceURI: string;
}

interface Series{
  items: Series;
}

interface Heroe {
  id: string;
  name: string;
  thumbnail: Thumbnail;
  description: string;
}

interface Results {
  results: Heroe[]
}
  
interface IApiResponse {
    data: Results;
}

