import { Genre, ProductionCompany, ProductionCountry, SpokenLanguage, ExternalIds, CreatedBy, LastEpisodeToAir, Network, Season } from "./Providers"

export interface TvDetails {
    adult?: boolean
    backdrop_path?: string
    created_by?: CreatedBy[]
    episode_run_time?: number[]
    first_air_date?: string
    genres?: Genre[]
    homepage?: string
    id?: number
    in_production?: boolean
    languages?: string[]
    last_air_date?: string
    last_episode_to_air?: LastEpisodeToAir
    name?: string
    next_episode_to_air?: any
    networks?: Network[]
    number_of_episodes?: number
    number_of_seasons?: number
    origin_country?: string[]
    original_language?: string
    original_name?: string
    overview?: string
    popularity?: number
    poster_path?: string
    production_companies?: ProductionCompany[]
    production_countries?: ProductionCountry[]
    seasons?: Season[]
    spoken_languages?: SpokenLanguage[]
    status?: string
    tagline?: string
    type?: string
    vote_average?: number
    vote_count?: number
    external_ids?: ExternalIds
}