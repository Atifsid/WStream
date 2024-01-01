import React from 'react'
import Image from "next/image"
import { FaBars } from "react-icons/fa6";
import styles from '../styles/header.module.css'

function Header() {
    return (
        <div className="flex items-center justify-between p-10">
            <Image src={"/static/letter-w.png"} alt={"logo"} width={40} height={40} />
            <h1 className={`${styles.streamCatch}`}>I Stream, You Stream, We All Stream on <span className={`${styles.wStream}`}>W-Stream</span></h1>
            <FaBars size={30} color={'#ADFF2F'} />
        </div>
    )
}

export default Header;