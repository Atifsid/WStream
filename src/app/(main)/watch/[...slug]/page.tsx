"use client"
import Player from "@/app/components/VideoPlayer"
import MediaService from "@/app/services/MediaService"
import { MovieDetails } from "@/app/api/models/MovieDetails"
import { EpisodeDetails } from "@/app/api/models/EpisodeDetails"
import providers from "@/app/utils/Fetcher"
import { FileBasedStream, HlsBasedStream, RunOutput, RunnerOptions } from "@movie-web/providers"
import { useEffect, useState } from "react"
import { TvDetails } from "@/app/api/models/TvDetails"
import { Episode, Season } from "@/app/api/models/Providers"

export default function Watch({ params }: { params: { slug: string[] } }) {
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
        }).catch(err => console.log(err))
    }

    const fetchTvEpisodeData = () => {
        if (selectedSeason && selectedEpisode && tvData && tmdbId) {
            providers.runAll({
                media: {
                    type: 'show',
                    season: {
                        number: 0,
                        tmdbId: "49019"
                    },
                    episode: {
                        number: 1,
                        tmdbId: "850674"
                    },
                    releaseYear: 2011,
                    title: "Suits",
                    tmdbId: '37680'
                }
            }).then((res) => {
                setOutput(res)
                if (res?.stream.type === 'file') {
                    setFileBasedStream(res?.stream)
                } else {
                    setHlsBasedStream(res?.stream)
                }
            }).catch(err => console.log(err))
        }
    }

    useEffect(() => {
        console.log('output', output);
    }, [output])

    useEffect(() => {
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
                        res.seasons && setSelectedSeason(res.seasons[0])
                    }
                })
        }
    }, [params.slug])

    useEffect(() => {
        if (tvData && selectedSeason) {
            service.getEpisodeDetails('tv', tvData?.id?.toString()!, selectedSeason?.season_number!)
                .then(res => {
                    if (res) {
                        setEpData(res)
                        if (res.episodes) {
                            if (res.episodes[0].name === 'Specials') {
                                setSelectedEpisode(res.episodes[1])
                            } else {
                                setSelectedEpisode(res.episodes[0])
                            }
                        }
                    }
                })
        }
    }, [selectedSeason])

    useEffect(() => {
        fetchTvEpisodeData()
    }, [selectedEpisode])

    useEffect(() => {
        if (type && type != '') {
            if (type === 'movie') {
                movieData && fetchMovieData(movieData)
            }
        }
    }, [movieData, type])

    return (
        <main >
            {output && output.stream.type === 'file' ?
                <Player type={"file"} fileBasedStream={fileBasedStream} />
                : <Player type={"hls"} hlsBasedStream={hlsBasedStream} />
            }
        </main>
    )
}
