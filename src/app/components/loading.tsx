import style from '../styles/header.module.css'
export default function Loading() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className={`${style.wStream} animate-spin inline-block w-14 h-14 border-[3px] border-current border-t-transparent rounded-full`} aria-label="loading">
                <span className="sr-only"></span>
            </div>
            <span className='mx-5 animate-pulse' >Loading...</span>
        </div>
    )
}