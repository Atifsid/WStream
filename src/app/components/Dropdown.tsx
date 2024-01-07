'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { FaBars, FaGithub } from "react-icons/fa6";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div className="relative inline-block">
                <button
                    type="button"
                    onClick={toggleDropdown}
                >
                    <FaBars size={30} color={'#ADFF2F'} />
                </button>

                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul>
                            <li>
                                <Link
                                    href={'https://github.com/Atifsid/WStream'}
                                    className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                                    onClick={closeDropdown}
                                >
                                    <FaGithub size={18} />
                                    <div>Github repo</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dropdown;