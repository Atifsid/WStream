import { TMDB_API_BASE_URL } from "@/config/tmdb";
import { FetcherOptions } from "../types/FetcherOptions";

async function defaultFetcher<T>(endpoint: string, queryParams?: Record<string, string>, options?: FetcherOptions): Promise<T> {
    const url = new URL(`${TMDB_API_BASE_URL}${endpoint}`);

    if (queryParams) {
        Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
    }

    const response = await fetch(url.toString(), options);

    if (!response.ok) {
        throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
    }

    return response.json();
}

export default defaultFetcher;