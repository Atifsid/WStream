"use client"
import MediaService from "@/app/services/MediaService"
import { MovieDetails } from "@/app/api/models/MovieDetails"
import { EpisodeDetails } from "@/app/api/models/EpisodeDetails"
import providers from "@/app/utils/Fetcher"
import { FileBasedStream, HlsBasedStream, RunOutput } from "@movie-web/providers"
import { useEffect, useState } from "react"
import { TvDetails } from "@/app/api/models/TvDetails"
import { Episode, Season } from "@/app/api/models/Providers"
import Loading from "@/app/components/loading"
import Player from "@/app/components/VideoPlayer"

export default function Watch({ params }: { params: { slug: string[] } }) {
    const [loading, setLoading] = useState(false)
    const service = new MediaService();
    const [movieData, setMovieData] = useState<MovieDetails>()
    const [tvData, setTvData] = useState<TvDetails>()
    const [epData, setEpData] = useState<EpisodeDetails>()
    const [type, setType] = useState<string>()
    const [tmdbId, setTmdbId] = useState<string>()
    const [output, setOutput] = useState<RunOutput | null>(null)
    const [fileBasedStream, setFileBasedStream] = useState<FileBasedStream>()
    const [hlsBasedStream, setHlsBasedStream] = useState<HlsBasedStream>()

    const [selectedSeason, setSelectedSeason] = useState<Season>();
    const [selectedEpisode, setSelectedEpisode] = useState<Episode>()

    const fetchMovieData = (result: MovieDetails) => {
        providers.runAll({
            media: {
                type: 'movie',
                title: result?.title!,
                releaseYear: parseInt(result.release_date?.split('-')[0]!),
                tmdbId: result?.id.toString()!
            }
        }).then((res) => {
            setOutput(res)
            if (res?.stream.type === 'file') {
                setFileBasedStream(res?.stream)
            } else {
                setHlsBasedStream(res?.stream)
            }
            setLoading(false);
        }).catch(err => { })
    }

    const fetchEpisodeDetails = (data: TvDetails, season: Season, episode: Episode) => {
        providers.runAll({
            media: {
                type: 'show',
                season: {
                    number: season.season_number!,
                    tmdbId: season.id?.toString()!
                },
                episode: {
                    number: episode.episode_number!,
                    tmdbId: episode.id?.toString()!
                },
                releaseYear: parseInt(data.first_air_date?.split('-')[0]!),
                title: data.name!,
                tmdbId: data.id?.toString()!
            }
        }).then((res) => {
            if (res) {
                setOutput(res)
                if (res?.stream.type === 'file') {
                    setFileBasedStream(res?.stream)
                } else {
                    setHlsBasedStream(res?.stream)
                }
                setLoading(false);
            }
        }).catch(err => { })
    }

    useEffect(() => {
        setLoading(true);
        setType(params.slug[0])
        setTmdbId(params.slug[1])
        if (params.slug[0] === 'movie') {
            service.getMovieDetails(params.slug[0], params.slug[1])
                .then((res) => {
                    if (res) {
                        setMovieData(res)
                    }
                })
        } else {
            service.getTvDetails(params.slug[0], params.slug[1])
                .then((res) => {
                    if (res) {
                        setTvData(res)
                        if (res.seasons) {
                            setSelectedSeason(res.seasons[1])
                            fetchSeasonDetails(res, res.seasons[1])
                        }
                    }
                })
        }
    }, [params.slug])

    const fetchSeasonDetails = (data: TvDetails, season: Season) => {
        service.getEpisodeDetails('tv', data.id?.toString()!, season.season_number!)
            .then((res) => {
                if (res) {
                    setEpData(res)
                    if (res.episodes) {
                        setSelectedEpisode(res.episodes[1]);
                        fetchEpisodeDetails(data, season, res.episodes[1])
                    }
                }
            })
    }

    useEffect(() => {
        if (type && type != '') {
            if (type === 'movie') {
                movieData && fetchMovieData(movieData)
            }
        }
    }, [movieData, type])

    return (
        <main >
            {!loading && output && output.stream.type === 'file' ?
                <Player type={"file"} fileBasedStream={fileBasedStream} />
                : <Player type={"hls"} hlsBasedStream={hlsBasedStream} />
            }

            {loading && <Loading />}

            {!loading && !output && <div>Nothing Found.</div>}
        </main>
    )
}
