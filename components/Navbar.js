"use client"
import React from 'react'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setshowdropdown] = useState(false)
    return (
        <nav className="bg-blue-950 flex justify-between md:px-4 md:h-16 items-center">
            <Link href={"/"} className="logo font-bold text-lg flex justify-center items-center">
                <Image src="../tea.gif" width={44} height={44} alt='Image of tea'/>
                <span className='text-xl md:text-base my-3 md:my-0'>Get Me a Chai!</span>
            </Link>
            <div className="relative">
                {session && <>
                    <button id="dropdownDividerButton" onBlur={() => {setTimeout(() => {
                        setshowdropdown(false)
                    }, 220);}} onClick={() => { setshowdropdown(!showdropdown) }} data-dropdown-toggle="dropdownDivider" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mx-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user?.name || 'User'} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                    </button>

                    <div id="dropdownDivider" className={`z-10 ${showdropdown ? "" : "hidden"} bg-white divide-y absolute divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                            </li>
                            <li>
                                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>
                        </ul>
                        <div className="py-2">
                            <button className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white' onClick={() => signOut({ callbackUrl: "/login" })}>Sign Out</button>
                        </div>
                    </div>
                </>}
                
                {!session && (
                    <Link href={"/login"} className='cursor-pointer text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                        Login
                    </Link>
                )}


            </div>
        </nav>
    )
}

export default Navbar
