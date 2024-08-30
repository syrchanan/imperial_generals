'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import NavLinks from "./NavLinks"
import { useState } from "react"

const nav_links: NavItem[] = [
    {
        label: "Rules",
        path: "/rules"
    },
    {
        label: "Map",
        path: "/map"
    }
]

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen)
    }
    return (
        // Entire Navbar
        <div className="p-6 flex flex-wrap justify-between align-middle items-center border-b-2">
            <div className="flex items-center space-x-10"> {/* Left Side */}
                <Link href="/">
                    <div className="flex flex-grow items-center space-x-2 bg-secondary text-secondary-foreground p-2 rounded">
                        <Image
                            src="/eagle.svg"
                            width={50}
                            height={50}
                            alt="Napoleonic Eagle"
                        />
                        <p>
                            Imperial Generals
                        </p>
                    </div>
                </Link>
                <NavLinks links={nav_links} ul_className="hidden sm:flex sm:items-center sm:space-x-10" />
            </div>
            <div> {/* Right Side */}
                <Button variant={"outline"} className="hidden sm:block bg-secondary hover:bg-primary text-secondary-foreground hover:text-primary-foreground border-2 border-solid rounded">
                    <Link href="/login">
                        Sign In
                    </Link>
                </Button>
                <div className="block sm:hidden">
                    <button onClick={handleMenuOpen} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`${menuOpen ? 'translate-x-0' : 'translate-x-full'} sm:hidden fixed inset-0 z-30 flex justify-end transition-transform ease-in-out delay-0 duration-150`}> {/* Mobile Menu */}
                <div className={`${menuOpen ? 'opacity-50' : 'opacity-0'} fixed inset-0 bg-black transition-transform ease-in-out delay-0 duration-150`}></div>
                <div className={`relative flex flex-col bg-card w-64 max-w-xs shadow-xl sm:hidden`}>
                    <button onClick={handleMenuOpen} className="self-end p-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <Button variant={"outline"} className="mx-12 my-4 bg-secondary hover:bg-primary text-secondary-foreground hover:text-primary-foreground border-2 border-solid rounded">
                        <Link href="/login">
                            Sign In
                        </Link>
                    </Button>
                    <NavLinks links={nav_links} nav_className="m-4" ul_className="flex flex-col align-middle items-center" li_className="my-2" />
                </div>
            </div>
        </div >
    )
}