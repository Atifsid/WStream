import React, { useEffect, useRef, useState } from 'react'
import { PlayerProps } from '../types/PlayerProps'
import styles from '../styles/playerContainer.module.css'
import ReactPlayer from 'react-player';
import { TrackProps } from 'react-player/file';

function Player({ type, hlsBasedStream, fileBasedStream }: PlayerProps) {
    const [subs, setSubs] = useState<TrackProps[]>([]);

    useEffect(() => {
        let x: TrackProps[] = []
        if (type === 'hls') {
            hlsBasedStream?.captions.forEach((sub, index) => {
                x.push({ kind: 'subtitles', src: sub.url, label: `sub-${index}`, srcLang: sub.language, default: index === 0 })
            })
        } else {
            fileBasedStream?.captions.forEach((sub, index) => {
                x.push({ kind: 'subtitles', src: sub.url, label: `sub-${index}`, srcLang: sub.language, default: index === 0 })
            })
        }
        setSubs(x)
    }, [])

    return (
        <div className={styles.playerWrapper}>
            <ReactPlayer
                className={styles.player}
                url={type === "hls" ? hlsBasedStream?.playlist : fileBasedStream?.qualities[360]?.url}
                controls={true}
                pip={true}
                width="100%"
                height="100%"
            />
        </div>
    )
}

export default Player;