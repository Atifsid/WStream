import React, { useEffect, useState } from 'react'
import { PlayerProps } from '../types/PlayerProps'
import styles from '../styles/playerContainer.module.css'
import ReactPlayer from 'react-player';
import { TrackProps } from 'react-player/file';

function Player({ type, hlsBasedStream, fileBasedStream }: PlayerProps) {
    const [captions_arr, setCaptions] = useState<TrackProps[]>([]);

    return (
        <div>
            <ReactPlayer
                url={type === 'file' ? fileBasedStream?.qualities[360]?.url : hlsBasedStream?.playlist}
                // url={'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'}
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