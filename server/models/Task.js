import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property', 
        required: true,
    },
    type: {
        type: String,
        enum: ['Collect rent', 'Maintenance', 'Legal issue'],
        required: [true, 'Task type is required'],
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    }
}, { timestamps: true }
);

export default mongoose.model("Task", taskSchema, "Task");