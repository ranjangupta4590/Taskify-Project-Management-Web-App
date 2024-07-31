import { connectMongoDB } from "@/lib/mongodb";
import Task from '@/models/task';
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


//POST Method to create new task
export async function POST(req) {
    await connectMongoDB();
    try {
        const { title, status, priority, deadline, description } = await req.json();
        
        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        const task = new Task({
            title,
            status,
            priority: capitalizeFirstLetter(priority),
            deadline,
            description
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


//GET method to fetch task
export async function GET() {
    try {
        await connectMongoDB();
        const tasks = await Task.find({});
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


// PUT Method to update task
export async function PUT(req) {
    await connectMongoDB();
    try {
        const { id, title, status, priority, deadline, description } = await req.json();

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid task ID' },
                { status: 400 }
            );
        }

        const task = await Task.findById(id);

        if (!task) {
            return NextResponse.json(
                { success: false, error: 'Task not found' },
                { status: 404 }
            );
        }

        task.title = title;
        task.status = status;
        task.priority = priority;
        task.deadline = deadline;
        task.description = description;

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
        const { id } = await req.json();

        if (!ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: 'Invalid task ID' },
                { status: 400 }
            );
        }

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return NextResponse.json(
                { success: false, error: 'Task not found' },
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