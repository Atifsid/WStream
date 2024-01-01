"use client"
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Inter } from 'next/font/google'
import styles from '../../styles/main.module.css'
import { useEffect, useState } from "react";
import providers from "@/app/utils/Fetcher";
import Header from "@/app/components/header";
import { search } from "@/app/services/route";
import { SearchResponse } from "@/app/types/SearchResponse";
import Card from "@/app/components/Card";
import useDebounce from "@/app/utils/useDebounce";
import Loading from "@/app/components/loading";

export default function Search() {
    const [isLoading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const debouncedSearch = useDebounce(searchText, 500)
    const [res, setRes] = useState<SearchResponse>()

    const test = () => {
        const output = providers.runAll({
            media: {
                type: 'movie',
                title: "Yeh Jawaani Hai Deewani",
                releaseYear: 2013,
                tmdbId: "185008"
            }
        }).then((res) => console.log(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (debouncedSearch) {
            setLoading(true)
            search(debouncedSearch)
                .then(res => {
                    setRes(res)
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }

        if (debouncedSearch === '') {
            setRes(undefined)
        }

    }, [debouncedSearch])

    return (
        <main>
            <Header />
            <div className="flex flex-col items-center justify-between p-10">
                <div className={`flex items-center bg-cyan-900 gap-4 rounded-3xl p-2 px-4`}>
                    <FaMagnifyingGlass />
                    <input
                        className={`bg-transparent px-2 py-1 ${styles.searchInput}`}
                        placeholder="I'm lookin' for ..."
                        type="text"
                        name="name"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                {!isLoading && res && <div className="grid grid-cols-4 gap-4 py-2">
                    {res.results.map(item => {
                        return (<Card {...item} />)
                    })}
                </div>}

                {isLoading && <Loading />}

                {!isLoading && res && res.results.length === 0 && <div>Nothing Found.</div>}
            </div>
        </main>
    )
}
