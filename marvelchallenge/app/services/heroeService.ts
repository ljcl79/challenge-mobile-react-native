/*
  Arquivo responsavel da gestão dos dados do heroes a partir da API
*/
import { baseAPI, apiKey, apiPrivateKey } from "./baseService";
import {Md5} from "md5-typescript";

export const getHeroes = (page: number, nameStartsWith: string): Promise<IApiResponse> => {
  const date = new Date();
  const timestamp = date.getTime();
  const hash = Md5.init(timestamp+apiPrivateKey+apiKey);
  const limit = 20;
  const offset = limit*page;

  let params = {
    ts: timestamp,
    apikey: apiKey,
    limit,
    offset,
    hash
  }

  if (nameStartsWith != '')
    Object.assign(params, {nameStartsWith});
  
  console.log(offset);
  const data = baseAPI
    .get("/characters", {
      params
    })
    .then(({ data }) => data);
  
  return data;
};

export const getHeroeDetail = (id: string): Promise<IApiResponse> => {
  const date = new Date();
  const timestamp = date.getTime();
  const hash = Md5.init(timestamp+apiPrivateKey+apiKey);
  
  let params = {
    ts: timestamp,
    apikey: apiKey,
    hash
  }

  const data = baseAPI
    .get("/characters/"+id, {
      params
    })
    .then(({ data }) => data);
  
  return data;
};

