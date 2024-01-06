import { TMDB_API_READ_ACCESS_TOKEN } from "@/config/tmdb";
import defaultFetcher from "../api/apiClient";
import { TvDetails } from "../types/TvDetails";

const getTvDetailsById = async (type: string, id: string, season_number: number) => {
    try {
        const result = await defaultFetcher<TvDetails>(`/3/${type}/${id}/season/${season_number}`,
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
        console.error('Error getTvDetailsById:', error);
    }
}

export default getTvDetailsById;