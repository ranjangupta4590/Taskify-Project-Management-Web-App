import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: String, default: 'Low' },
    deadline: { type: Date },
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;


