export interface SearchResponse {
    page?: number;
    results: Result[];
    total_pages?: number;
    total_results?: number;
}

export interface Result {
    adult?: boolean;
    backdrop_path?: string;
    id?: number;
    name?: string;
    title?: string;
    original_language?: string;
    original_name?: string;
    overview?: string;
    poster_path?: string;
    media_type?: string;
    genre_ids?: number[];
    popularity?: number;
    first_air_date?: string;
    vote_average?: number;
    vote_count?: number;
    origin_country?: string[];
}