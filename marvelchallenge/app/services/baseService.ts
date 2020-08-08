import axios from "axios";

export const baseAPI = axios.create({
  //public/characters?limit=10&apikey=bed5e75891fb78092da5ca6d11892068
  baseURL: 'https://gateway.marvel.com:443/v1/public',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },

});

export const apiKey = 'bed5e75891fb78092da5ca6d11892068';
export const apiPrivateKey = 'e9f0ac7259c4017efeb218162f26c2660c13a449';