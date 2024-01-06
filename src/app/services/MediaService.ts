import { TMDB_API_READ_ACCESS_TOKEN } from "@/config/tmdb";
import defaultFetcher from "../api/apiClient";
import { MovieDetails } from "../api/models/MovieDetails";
import { EpisodeDetails } from "../api/models/EpisodeDetails";
import { TvDetails } from "../api/models/TvDetails";

export default class MediaService {
    public async getMovieDetails(type: string, id: string) {
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
            return console.log('getMovieDetails', error);
        }
    }

    public async getTvDetails(type: string, id: string) {
        try {
            const result = await defaultFetcher<TvDetails>(`/3/${type}/${id}`,
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
            console.error('Error getTvDetails:', error);
        }
    }

    public async getEpisodeDetails(type: string, id: string, season_number: number) {
        try {
            const result = await defaultFetcher<EpisodeDetails>(`/3/${type}/${id}/season/${season_number}`,
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
            console.error('Error getEpisodeDetails:', error);
        }
    }
}