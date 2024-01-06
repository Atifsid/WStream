import { TMDB_API_READ_ACCESS_TOKEN } from "@/config/tmdb";
import defaultFetcher from "../api/apiClient";
import { MovieDetails } from "../types/MovieDetails";

const getMovieDetailsById = async (type: string, id: string) => {
    try {
        const result = await defaultFetcher<MovieDetails>(`/3/${type}/${id}`,
            {
                append_to_response: 'external_ids'
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
        console.error('Error getMovieDetailsById:', error);
    }
}

export default getMovieDetailsById;