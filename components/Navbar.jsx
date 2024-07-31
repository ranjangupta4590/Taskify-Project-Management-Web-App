import React from 'react'
import { Input } from './ui/input';
import { Calendar, CirclePlus, Filter, Search, Share, Share2, Sparkle } from 'lucide-react';
import { useSheet } from '@/context/SheetContext';
import { Button } from "./ui/button";


const Navbar = () => {
    const { openSheet } = useSheet();
    return (
        <div>
            <div className='flex justify-between '>
                <div className='flex border-2 rounded-sm text-zinc-400 bg-white px-2' >
                    <Input placeholder='Search' className='w-[100px] border-none' /><Search className='h-4 w-4 mt-3' />
                </div>

                <div className='flex gap-4 right-5'>

                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                        <div className=" w-full md:block md:w-auto">
                            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                                <li className='bg-zinc-500/10 rounded-sm'>
                                    <a href="#" class=" flex gap-2 py-2 px-3 text-zinc-500 rounded-sm md:bg-transparent" aria-current="page">Calendar view<Calendar className='h-4 w-4 mt-1' /></a>
                                </li>

                                <li className='bg-zinc-500/10 rounded-sm'>
                                    <a href="#" class="flex py-2 px-3 text-zinc-500 rounded-sm md:p- md:bg-transparent">Automation <Sparkle className='h-4 w-4 mt-1 mx-2' /></a>
                                </li>
                                <li className='bg-zinc-500/10 rounded-sm'>
                                    <a href="#" class="flex py-2 px-3 text-zinc-500 rounded-sm md:p- md:bg-transparent">Filter <Filter className='h-4 w-4 mt-1 mx-2' /></a>
                                </li>
                                <li className='bg-zinc-500/10 rounded-sm'>
                                    <a href="#" class="flex py-2 px-3 text-zinc-500 rounded-sm md:p- md:bg-transparent">Share <Share2 className='h-4 w-4 mt-1 mx-2' /></a>
                                </li>
                                <li>
                                    <div className="">
                                        <Button onClick={openSheet} className='bg-blue-800 text-white rounded-md w-full text-center shadow-lg '>Create new task <CirclePlus className="w-5 h-5 ml-2 text-blue-800 fill-white" /></Button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;