"use client"
import React from 'react'
import { useSession } from 'next-auth/react';
import { CircleHelp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import Navbar from './Navbar';


const headerCard = [
    {
        image: '/Frame1.jpg',
        heading: "Introducing tags",
        description: "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
    },
    {
        image: '/Frame2.jpg',
        heading: "Share Notes Instantly",
        description: "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
    },
    {
        image: '/Frame3.jpg',
        heading: "Access Anywhere",
        description: "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
    },
]

const Header = () => {
    const { data: session, status } = useSession();
    return (
        <div className='h-full w-full'>
            <div className='flex justify-between pt-8 mx-5'>
                <div className='flex'>
                    <p className='text-4xl font-semibold'>Good morning, {session?.user?.name}!</p>
                </div>
                <div className='flex text-black '><p className='flex'>Help & feedback <CircleHelp className='h-4 w-4 mt-1 ml-2' /></p></div>
            </div>
            <div className='grid grid-cols-3 gap-4 mx-5 mt-6'>
            
                {
                    headerCard.map((card, index) => (
                        <Card key={index} className='flex items-center'>
                            <CardContent className="flex p-2">
                                <div >
                                    <Image src={card.image} height={300} width={300} alt='framecard' className='flex items-center p-6' />
                                </div>
                                <div>
                                    <p className='text-zinc-500 font-semibold'>{card.heading}</p>
                                    <p className='text-zinc-400 text-sm'>{card.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                }

            </div>
            
            <div className='mt-6 mx-5'>
                <Navbar/>
            </div>
        </div>
    )
}

export default Header;