"use client"
import { CalendarDays, CalendarIcon, InfoIcon, MoveDiagonal2, Pencil, PlusIcon, Share2, Star, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader } from "./ui/sheet";
import { useEffect, useState } from "react";
import { useSheet } from "@/context/SheetContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import axios from 'axios';

const AddSheet = () => {
    const { isSheetOpen, closeSheet, initialStatus,initialTask } = useSheet();

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(initialStatus || '');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setStatus(initialStatus);
    }, [initialStatus]);
    
    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title || '');
            setStatus(initialTask.status || '');
            setPriority(initialTask.priority || '');
            setDeadline(new Date(initialTask.deadline) || new Date());
            setDescription(initialTask.description || '');
        }
    }, [initialTask]);

    if (!isMounted) {
        return null;
    }

    //create new task
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     try {
    //         const newTask = {
    //             title,
    //             status,
    //             priority,
    //             deadline,
    //             description
    //         };

    //         const response = await axios.post('/api/newTask', newTask);

    //         if (response.data.success) {
    //             closeSheet();
    //             setTitle('');
    //             setStatus('');
    //             setPriority('');
    //             setDeadline(new Date());
    //             setDescription('');
    //             setSelectedDate(new Date());
    //             setLoading(false);
    //         }
    //     } catch (error) {
    //         setLoading(false);
    //         console.error('Failed to create task:', error);
    //     }
    // };

    const resetForm = () => {
        setTitle('');
        setStatus('');
        setPriority('');
        setDeadline(new Date());
        setDescription('');
        setSelectedDate(new Date());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const taskData = {
                title,
                status,
                priority,
                deadline,
                description
            };

            if (initialTask?._id) {
                // Update existing task
                await axios.put('/api/newTask', { ...taskData, id: initialTask._id });
            } else {
                // Create new task
                await axios.post('/api/newTask', taskData);
            }

            resetForm();
            closeSheet();
        } catch (error) {
            console.error('Failed to save task:', error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            <Sheet open={isSheetOpen} onOpenChange={(open) => !open && closeSheet()} className="">
                <SheetContent side="right" className="p-0 max-w-[90rem]">
                    <SheetHeader className="">
                        <div className="absolute flex left-8 top-4 w-full justify-between">
                            <MoveDiagonal2 className="h-4 w-4 ml-2 text-zinc-500" />
                            <div className="flex mx-2 gap-2 right-10 mr-14">
                                <button className="flex p-1 text-zinc-500 bg-zinc-500/10 rounded-sm">
                                    Share <Share2 className="h-4 w-4 mt-1 ml-1" />
                                </button>
                                <button className="flex p-1 text-zinc-500 bg-zinc-500/10 rounded-sm">
                                    Favourite <Star className="h-4 w-4 mt-1 ml-1" />
                                </button>
                            </div>
                        </div>
                    </SheetHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-20">
                            <div className="mt-5">
                                <Input
                                    placeholder="Title"
                                    className={`p-4 text-3xl font-bold h-20 w-full border-none ${title ? 'text-black' : 'text-zinc-400'}`}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid gap-4 py-4 ml-5 mr-10 text-zinc-500">
                                <div className="grid grid-cols-2 items-center gap-2">
                                    <div className="flex gap-4">
                                        <Sun className="h-4 w-4" />
                                        <Label htmlFor="status" className="text-right">
                                            Status
                                        </Label>
                                    </div>
                                    <div>
                                        <Select value={status} onValueChange={(value) => setStatus(value)} required>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent required>
                                                <SelectItem value="todo" className='text-black'>To-Do</SelectItem>
                                                <SelectItem value="inprogress" className='text-black'>In Progress</SelectItem>
                                                <SelectItem value="underreview" className='text-black'>Under Review</SelectItem>
                                                <SelectItem value="completed" className='text-black'>Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 items-center gap-2">
                                    <div className="flex gap-4">
                                        <InfoIcon className="h-4 w-4" />
                                        <Label htmlFor="priority" className="text-right">
                                            Priority
                                        </Label>
                                    </div>
                                    <div>
                                        <Select onValueChange={(value) => setPriority(value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="urgent" className='text-black'>Urgent</SelectItem>
                                                <SelectItem value="medium" className='text-black'>Medium</SelectItem>
                                                <SelectItem value="low" className='text-black'>Low</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 items-center gap-2">
                                    <div className="flex gap-4">
                                        <CalendarDays className="h-4 w-4" />
                                        <Label htmlFor="deadline" className="text-right">
                                            Deadline
                                        </Label>
                                    </div>
                                    <div className="flex gap-2">
                                        <Popover>
                                            <PopoverTrigger className="flex">
                                                <Input
                                                    className={`
                                                        "w-[240px] pl-3 p-2 text-left font-normal",
                                                        ${!selectedDate && "text-muted-foreground"}
                                                    `}
                                                    value={selectedDate ? format(selectedDate, "PPP") : ""}
                                                    placeholder="Pick a date"
                                                />
                                                <CalendarIcon className="ml-2 h-6 w-6 mt-1 opacity-50" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={selectedDate}
                                                    onSelect={(date) => {
                                                        setSelectedDate(date);
                                                        setDeadline(date);
                                                    }}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 items-center gap-2">
                                    <div className="flex gap-4">
                                        <Pencil className="h-4 w-4" />
                                        <Label htmlFor="description" className="text-right">
                                            Description
                                        </Label>
                                    </div>
                                    <div className="">
                                        <textarea
                                            placeholder="Description"
                                            className="mt-3 p-2"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 ml-5 text-black mt-3">
                                <PlusIcon className="h-5 w-5" />
                                <p>Add Custom Property</p>
                            </div>
                        </div>
                        <hr className="ml-5 mr-14 pr-10 mt-8 h-px text-zinc-500 w-full" />
                        <div className="mt-8">
                            <div className="ml-5">
                                <p className="text-zinc-400">Start writing, or drag your own files here.</p>
                            </div>
                        </div>
                        <div className="bottom-0 mt-20 w-full flex justify-end ">
                            <Button
                                type="submit"
                                className={`rounded-md text-white mr-10 font-bold cursor-pointer py-2 flex items-center justify-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    initialTask ? "Update Task" : "Create Task"
                                )}
                            </Button>
                        </div>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default AddSheet;

