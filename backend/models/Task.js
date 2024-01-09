import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
      },
    createdAt: {
        type: Date,
        default: new Date(Date.now())
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Task = mongoose.model('Task', taskSchema);

export default Task;