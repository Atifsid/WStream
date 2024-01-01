"use client"
import getById from "@/app/services/getById"
import { FetchDetails } from "@/app/types/FetchDetails"
import providers from "@/app/utils/Fetcher"
import { FileBasedStream, HlsBasedStream, RunOutput, RunnerOptions } from "@movie-web/providers"
import { useEffect, useState } from "react"

export default function Watch({ params }: { params: { slug: string[] } }) {
    const [data, setData] = useState<FetchDetails>()
    const [type, setType] = useState<string>()
    const [output, setOutput] = useState<RunOutput | null>(null)
    const [fileBasedStream, setFileBasedStream] = useState<FileBasedStream>()
    const [hlsBasedStream, setHlsBasedStream] = useState<HlsBasedStream>()

    const fetchMetaData = (result: FetchDetails, type: string) => {
        if (type === 'movie') {
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
        } else {
            // providers.runAll({
            //     media: {
            //         type: 'show',
            //         tmdbId: result.id.toString(),
            //     }
            // })
        }
    }

    useEffect(() => {
        setType(params.slug[0])
        getById(params.slug[0], params.slug[1])
            .then((res) => {
                setData(res)
            })
    }, [params.slug])

    useEffect(() => {
        if (data && type) {
            fetchMetaData(data, type)
        }
    }, [data, type])

    return (
        <main className="relative h-screen overflow-hidden">
            <video
                autoPlay={true}>
                {fileBasedStream && <source src={fileBasedStream.qualities[360]?.url} />}
            </video>
        </main>
    )
}
