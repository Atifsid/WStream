import { Episode } from "./Providers"

export interface TvDetails {
    _id?: string
    air_date?: string
    episodes?: Episode[]
    name?: string
    overview?: string
    id?: number
    poster_path?: string
    season_number?: number
    vote_average?: number
}