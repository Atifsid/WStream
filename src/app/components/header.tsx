import React from 'react'
import Image from "next/image"
import styles from '../styles/header.module.css'
import Dropdown from './Dropdown';

function Header() {
    return (
        <div className="flex items-center justify-between p-10">
            <Image src={"/static/letter-w.png"} alt={"logo"} width={40} height={40} />
            <h1 className={`${styles.streamCatch}`}>I Stream, You Stream, We All Stream on <span className={`${styles.wStream}`}>W-Stream</span></h1>
            <Dropdown />
        </div>
    )
}

export default Header;