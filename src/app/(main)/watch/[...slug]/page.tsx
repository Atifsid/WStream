"use client"
import Player from "@/app/components/VideoPlayer"
import getMovieDetailsById from "@/app/services/getMovieDetailsById"
import getTvDetailsById from "@/app/services/getTvDetailsById"
import { MovieDetails } from "@/app/types/MovieDetails"
import { TvDetails } from "@/app/types/TvDetails"
import providers from "@/app/utils/Fetcher"
import { FileBasedStream, HlsBasedStream, RunOutput, RunnerOptions } from "@movie-web/providers"
import { useEffect, useState } from "react"

export default function Watch({ params }: { params: { slug: string[] } }) {
    const [movieData, setMovieData] = useState<MovieDetails>()
    const [tvData, setTvData] = useState<TvDetails>()
    const [type, setType] = useState<string>()
    const [tmdbId, setTmdbId] = useState<string>()
    const [output, setOutput] = useState<RunOutput | null>(null)
    const [fileBasedStream, setFileBasedStream] = useState<FileBasedStream>()
    const [hlsBasedStream, setHlsBasedStream] = useState<HlsBasedStream>()

    const fetchMovieData = (result: MovieDetails, type: string) => {
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

    const fetchTvData = (result: TvDetails, type: string) => {
        // providers.runAll({
        //     media: {
        //         type: 'show',
        //         episode: {
        //             number: 1,
        //             tmdbId: result.episodes![0].id?.toString()!
        //         },
        //         season:{
        //             number: result.season_number!,
        //             tmdbId: result.id?.toString()!
        //         }
        //     }
        // }).then((res) => {
        //     setOutput(res)
        //     if (res?.stream.type === 'file') {
        //         setFileBasedStream(res?.stream)
        //     } else {
        //         setHlsBasedStream(res?.stream)
        //     }
        // }).catch(err => console.log(err))
    }

    useEffect(() => {
        setType(params.slug[0])
        if (params.slug[0] === 'movie') {
            getMovieDetailsById(params.slug[0], params.slug[1])
                .then((res) => {
                    setMovieData(res)
                })
        } else {
            getTvDetailsById(params.slug[0], params.slug[1], 1)
                .then((res) => {
                    setTvData(res)
                })
        }
    }, [params.slug])

    useEffect(() => {
        if (type && type != '') {
            if (type === 'movie') {
                movieData && fetchMovieData(movieData, type)
            } else {
                tvData && fetchTvData(tvData, type)
            }
        }
    }, [movieData, tvData, type])

    return (
        <main >
            {output && output.stream.type === 'file' ?
                <Player type={"file"} fileBasedStream={fileBasedStream} />
                : <Player type={"hls"} hlsBasedStream={hlsBasedStream} />
            }
        </main>
    )
}
