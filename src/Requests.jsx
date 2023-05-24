import axios from "axios";





export const promiseSessoes = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies/ID_DO_FILME/showtimes")

export const promiseAssentos = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/showtimes/ID_DA_SESSAO/seats")