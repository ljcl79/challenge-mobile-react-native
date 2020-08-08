import { baseAPI, apiKey, apiPrivateKey } from "./baseService";
import { logError } from "../utilities/errorUtils";
import {Md5} from "md5-typescript";

export const getHeroes = (page: number): Promise<IApiResponse> => {
  const date = new Date();
  const timestamp = date.getTime();
  const hash = Md5.init(timestamp+apiPrivateKey+apiKey);
  const limit = 20;
  const offset = limit*page;
  
  console.log(offset);
  const data = baseAPI
    .get("/characters", {
      params: {
        ts: timestamp,
        apikey: apiKey,
        limit,
        offset,
        hash
      }
    })
    .then(({ data }) => data);
  
  return data;
};

export const favoriteHeroe = (heroeId: string): Promise<void> => {
  return baseAPI
    .get("set", {
      data: {
        
      }
    })
    .then(({ data }) => data)
    .catch(error => logError("favoriteHeroe", error));
};
