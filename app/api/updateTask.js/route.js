import { connectMongoDB } from '@/lib/mongodb';
import Task from '@/models/task';
import { NextResponse } from 'next/server';

// Update task
export async function PUT(req, { params }) {
    await connectMongoDB();
    try {
        const { id } = params;
        const { title, status, priority, deadline, description } = await req.json();

        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {
                title,
                status,
                priority: capitalizeFirstLetter(priority),
                deadline,
                description
            },
            { new: true }
        );

        if (!updatedTask) {
            return NextResponse.json(
                { success: false, error: 'Task not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: updatedTask }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

// Delete task
export async function DELETE(req, { params }) {
    await connectMongoDB();
    try {
        const { id } = params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
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
