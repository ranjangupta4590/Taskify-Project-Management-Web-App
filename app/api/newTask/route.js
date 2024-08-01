import { connectMongoDB } from "@/lib/mongodb";
import Task from '@/models/task';
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    await connectMongoDB();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }
        const { title, status, priority, deadline, description } = await req.json();

        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        const task = new Task({
            title,
            status,
            priority: capitalizeFirstLetter(priority),
            deadline,
            description,
            userId: session.user.id // Associate task with user
        });

        await task.save();

        return NextResponse.json({ success: true, data: task }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function GET(req) {
    await connectMongoDB();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.id;
        const tasks = await Task.find({ userId }); // Fetch tasks for the authenticated user
        console.log("Fetched tasks: ", tasks);
        return NextResponse.json({ success: true, data: tasks }, { status: 200 });
    } catch (error) {
        console.error("Error fetching tasks: ", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    await connectMongoDB();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }
        const { id, title, status, priority, deadline, description } = await req.json();
        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid task ID' },
                { status: 400 }
            );
        }

        const task = await Task.findOne({ _id: id, userId: session.user.id }); // Check ownership
        if (!task) {
            return NextResponse.json(
                { success: false, error: 'Task not found or not authorized' },
                { status: 404 }
            );
        }

        // task.title = title;
        // task.status = status;
        // task.priority = capitalizeFirstLetter(priority);
        // task.deadline = deadline;
        // task.description = description;
        if (status) task.status = status;
        if (title) task.title = title;
        if (priority) task.priority = capitalizeFirstLetter(priority);
        if (deadline) task.deadline = deadline;
        if (description) task.description = description;

        await task.save();

        return NextResponse.json({ success: true, data: task }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function DELETE(req) {
    await connectMongoDB();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }
        const { id } = await req.json();

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid task ID' },
                { status: 400 }
            );
        }

        const task = await Task.findOneAndDelete({ _id: id, userId: session.user.id }); // Check ownership
        if (!task) {
            return NextResponse.json(
                { success: false, error: 'Task not found or not authorized' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: 'Task deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}



//PUT Methos to update task/status
// export async function PUT(req) {
//     await connectMongoDB();
//     try {
//         const { id, status } = await req.json();

//         if (!ObjectId.isValid(id)) {
//             return NextResponse.json(
//                 { success: false, error: 'Invalid task ID' },
//                 { status: 400 }
//             );
//         }

//         const task = await Task.findById(id);
        
//         if (!task) {
//             return NextResponse.json(
//                 { success: false, error: 'Task not found' },
//                 { status: 404 }
//             );
//         }

//         task.status = status;
//         await task.save();

//         return NextResponse.json({ success: true, data: task }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json(
//             { success: false, error: error.message },
//             { status: 400 }
//         );
//     }
// }

