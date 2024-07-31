"use client";
import {
    ChartLine, Settings,
    House, SquareKanban, User, CirclePlus, BellDot, Sun, ChevronsRight
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useSheet } from "@/context/SheetContext";


const routes = [
    {
        label: "Home",
        icon: House,
        href: "/dashboard",
        color: "text-zinc-500",
    },
    {
        label: "Boards",
        icon: SquareKanban,
        href: "/boards",
        color: "text-zinc-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "text-zinc-500"
    },
    {
        label: "Teams",
        icon: User,
        color: "text-zinc-700",
        href: "/teams",
    },
    {
        label: "Analytics",
        icon: ChartLine,
        color: "text-zinc-700",
        href: "/analytics",
    },

];

const Sidebar = () => {
    const { data: session, status } = useSession();
    const { openSheet } = useSheet();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }


    return (
        <>
            <div className="fixed space-y-4 py-4 flex flex-col h-full left-0 w-[250px] bg-white border-r-2 border-zinc-500 text-zinc-500">
                <div className="px-3 py-2 flex-1 h-full">
                    <Link href="/dashboard" className="flex items-center pl-3 mb-8">
                        <div className="relative flex  w-8 h-5 mr-4">
                            <Avatar className='flex'>
                                <AvatarImage src={session?.user?.image} alt="User Image" />    
                            </Avatar>
                            <h1 className="font-semibold text-black ml-2 mt-2 text-xl">{session?.user?.name}</h1>
                        </div>
                    </Link>
                    <div className="flex justify-between text-zinc-500 ml-3 mb-3 ">
                        <div className="flex">
                        <BellDot width={24} height={24} className="cursor-pointer"/>
                        <Sun width={24} height={24} className="mx-3 cursor-pointer"/>
                        <ChevronsRight width={24} height={24} className="cursor-pointer"/>
                        </div>
                        <button onClick={() => signOut()} className="text-zinc-500 bg-zinc-500/10 rounded-sm w-[60px] h-[30px] text-sm p-auto text-center">Logout</button>
                    </div>

                    <div className="space-y-1">
                        {routes.map((item) => (
                            <Link
                                href={item.href}
                                key={item.href}
                                className={`flex group p-2 w-full cursor-pointer hover:text-zinc-500 hover:bg-zinc-500/10 rounded-lg transition`}
                            >
                                <div className="flex items-center flex-1 pl-0">
                                    <item.icon className={`${item.color} mr-3`} />
                                    {item.label}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="pt-5">
                        <Button onClick={openSheet} className='bg-blue-800 text-white rounded-md w-full text-center shadow-lg '>Create new task <CirclePlus className="w-5 h-5 ml-2 text-blue-800 fill-white" /></Button>
                    </div>

                    <div className="absolute bottom-4 items-center ">
                        <Image src='/Frame 352.png' width={210} height={130} alt="frame" className="mx-auto pl-5" />
                    </div>
                </div>

            </div>

        </>
    );
};

export default Sidebar;
