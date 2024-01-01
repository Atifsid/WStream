import { TMDB_API_READ_ACCESS_TOKEN } from "@/config/tmdb";
import { SearchResponse } from "../types/SearchResponse";
import defaultFetcher from "../api/apiClient";

const multiSearch = async (query: string, page: number = 1) => {
    try {
        const result = await defaultFetcher<SearchResponse>('/3/search/multi',
            {
                query: query,
                include_adult: 'false',
                language: 'en-US',
                page: page.toString()
            },
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`,
                    'Accept': 'application/json'
                },
            }
        );
        return result;
    } catch (error) {
        console.error('Error multiSearch:', error);
    }
};

export default multiSearch;