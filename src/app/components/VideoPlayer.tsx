import React, { useEffect, useState } from 'react'
import { PlayerProps } from '../types/PlayerProps'
import styles from '../styles/playerContainer.module.css'
import ReactPlayer from 'react-player';
import { TrackProps } from 'react-player/file';

function Player({ type, hlsBasedStream, fileBasedStream }: PlayerProps) {
    const [captions_arr, setCaptions] = useState<TrackProps[]>([]);

    // useEffect(() => {
    //     let common;
    //     if (type === 'file') {
    //         common = fileBasedStream
    //     } else {
    //         common = hlsBasedStream
    //     }
    //     let arr = [...captions_arr]
    //     common?.captions.forEach((x, index) => {
    //         arr.push({
    //             kind: 'subtitles',
    //             src: x.url,
    //             srcLang: x.language,
    //             label: `test-${index}`
    //         })
    //     })
    //     setCaptions(arr);
    // }, [])

    // useEffect(() => {
    //     console.log(captions_arr);
    // }, [captions_arr])

    return (
        <div>
            <ReactPlayer
                url={type === 'file' ? fileBasedStream?.qualities[360]?.url : hlsBasedStream?.playlist}
                // url={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                controls={true}
                light={false}
                pip={true}
                width="100vw"
                height="100vh"
                config={{
                    file: {
                        attributes: {
                            crossOrigin: "true",
                        },
                        tracks: captions_arr,
                    }
                }}
            />
            <source
                // src={type === 'file' ? fileBasedStream?.qualities[1080]?.url : hlsBasedStream?.playlist}
                type="video/mp4" />
        </div>
    )
}

export default Player;