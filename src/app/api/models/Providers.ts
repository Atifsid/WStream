export interface Genre {
    id?: number
    name?: string
}

export interface ProductionCompany {
    id?: number
    logo_path?: string
    name?: string
    origin_country?: string
}

export interface ProductionCountry {
    iso_3166_1?: string
    name?: string
}

export interface SpokenLanguage {
    english_name?: string
    iso_639_1?: string
    name?: string
}

export interface ExternalIds {
    imdb_id?: string
    wikidata_id?: any
    facebook_id?: string
    instagram_id?: any
    twitter_id?: any
}

export interface Episode {
    air_date?: string
    episode_number?: number
    episode_type?: string
    id?: number
    name?: string
    overview?: string
    production_code?: string
    runtime?: number
    season_number?: number
    show_id?: number
    still_path?: string
    vote_average?: number
    vote_count?: number
    crew?: Crew[]
    guest_stars?: GuestStar[]
}

export interface Crew {
    department?: string
    job?: string
    credit_id?: string
    adult?: boolean
    gender?: number
    id?: number
    known_for_department?: string
    name?: string
    original_name?: string
    popularity?: number
    profile_path?: string
}

export interface GuestStar {
    character?: string
    credit_id?: string
    order?: number
    adult?: boolean
    gender?: number
    id?: number
    known_for_department?: string
    name?: string
    original_name?: string
    popularity?: number
    profile_path?: string
}

export interface CreatedBy {
    id?: number
    credit_id?: string
    name?: string
    gender?: number
    profile_path?: any
}

export interface LastEpisodeToAir {
    id?: number
    name?: string
    overview?: string
    vote_average?: number
    vote_count?: number
    air_date?: string
    episode_number?: number
    episode_type?: string
    production_code?: string
    runtime?: number
    season_number?: number
    show_id?: number
    still_path?: string
}

export interface Network {
    id?: number
    logo_path?: string
    name?: string
    origin_country?: string
}

export interface Season {
    air_date?: string
    episode_count?: number
    id?: number
    name?: string
    overview?: string
    poster_path?: string
    season_number?: number
    vote_average?: number
}