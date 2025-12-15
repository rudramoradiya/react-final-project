import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../logo'

function Footer() {
    return (
        <>
        <section className="relative overflow-hidden py-10 sm:py-12 bg-gradient-to-b from-slate-900 to-slate-800 border-t border-slate-700/70">
            <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    <div>
                        <div className="flex flex-col space-y-4">
                            <div className="inline-flex items-center">
                                <Logo width="110px" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400 text-center sm:text-left leading-relaxed">
                                    &copy; Copyright 2023. All Rights Reserved by DevUI.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <div className="h-full">
                            <h3 className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-white">
                                Company
                            </h3>
                            <ul className="space-y-2.5">
                                <li>
                                    <Link
                                        className="text-sm font-normal text-slate-400 hover:text-indigo-400 transition-colors duration-200 inline-block"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-sm font-normal text-slate-400 hover:text-indigo-400 transition-colors duration-200 inline-block"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-sm font-normal text-slate-400 hover:text-indigo-400 transition-colors duration-200 inline-block"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-sm font-normal text-slate-400 hover:text-indigo-400 transition-colors duration-200 inline-block"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <div className="h-full">
                            <h3 className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-white">
                                Support
                            </h3>
                            <ul className="space-y-2.5">
                                <li>
                                    <Link
                                        className="text-sm font-normal text-slate-400 hover:text-indigo-400 transition-colors duration-200 inline-block"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-sm font-normal text-slate-400 hover:text-indigo-400 transition-colors duration-200 inline-block"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-sm font-normal text-slate-400 hover:text-indigo-400 transition-colors duration-200 inline-block"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-sm font-normal text-slate-400 hover:text-indigo-400 transition-colors duration-200 inline-block"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-2 sm:mt-0">  
                        <div className="h-full">
                            <h3 className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-white">
                                Legals
                            </h3>
                            <ul className="space-y-2.5">
                                <li>
                                    <Link
                                        className="text-sm font-normal text-slate-400 hover:text-indigo-400 transition-colors duration-200 inline-block"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-sm font-normal text-slate-400 hover:text-indigo-400 transition-colors duration-200 inline-block"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-sm font-normal text-slate-400 hover:text-indigo-400 transition-colors duration-200 inline-block"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  
        </>
    )
}

export default Footer
