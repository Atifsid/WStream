import React, { useState } from 'react'
import Image from 'next/image';
import styles from '../styles/main.module.css'
import { FaStar } from "react-icons/fa6";
import { TMDB_IMAGE_BASE_URL } from '@/config/tmdb';
import { FaCalendarDay } from "react-icons/fa6";
import { Result } from '../api/models/SearchResponse';

const Card: React.FC<Result> = (res) => {
    const fallbackSrc = '/static/no_icon.png'
    const [imgSrc, setImgSrc] = useState(`${TMDB_IMAGE_BASE_URL}w500${res.poster_path}`);

    const getAirYear = (date: string) => {
        if (date) {
            return date.split('-')[0]
        }
        return ''
    }

    return (
        <div className={`${styles.card}`}>
            <div className='p-4'>
                <Image
                    style={{
                        width: 'auto',
                        height: 'auto',
                    }}
                    className='rounded-xl'
                    src={imgSrc}
                    onLoadingComplete={(result) => {
                        if (result.naturalWidth === 0) {
                            setImgSrc(fallbackSrc);
                        }
                    }}
                    onError={() => {
                        setImgSrc(fallbackSrc);
                    }}
                    height={300}
                    width={200}
                    alt={'thumbnail'} />
                {res.title ?
                    <h2 className={`font-sans text-xl tracking-wide break-normal w-40 py-2`}>{res.title}</h2> :
                    <h2 className={`font-sans text-xl tracking-wide break-normal w-40 py-2`}>{res.name}</h2>
                }
                <div>
                    <div className='flex items-center '>
                        <FaStar color={'yellow'} />
                        <div className='mx-1'>{`${res.vote_average}`}</div>
                    </div>
                    <div className='flex items-center '>
                        <FaCalendarDay color={'#7CB9E8'} />
                        <div className='mx-1'>{res.first_air_date ? getAirYear(res.first_air_date) : ''}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;