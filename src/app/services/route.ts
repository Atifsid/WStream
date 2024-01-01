import { TMDB_API_BASE_URL, TMDB_API_READ_ACCESS_TOKEN } from "@/config/tmdb";
import { SearchResponse } from "../types/SearchResponse";

export async function search(query: string, page: number = 1): Promise<SearchResponse> {
    const res = await fetch(`${TMDB_API_BASE_URL}/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`, {
        headers: {
            'Authorization': `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`,
            'Accept': 'application/json'
        },
    })
    const resJson: SearchResponse = await res.json()
    return resJson;
}