import Task from "../models/Task.js";
import User from "../models/User.js";

export const createTask = async (req, res) => {
    try {
        const { tittle, description } = req.body;

        if (!tittle || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required."
            });
        }

        const newTaskData = {
            tittle,
            description,
            createdAt: new Date(Date.now()),
            owner: req.user._id
        }

        const newTask = await Task.create(newTaskData);

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        user.tasks.unshift(newTask._id);

        await user.save();

        res.status(201).json({
            success: true,
            message: "Task Created Successfully!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task Not Found!"
            })
        }

        await task.deleteOne({ _id: req.params.id });

        const user = await User.findById(req.user._id);

        const taskIndex = user.tasks.indexOf(req.params._id);
        user.tasks.splice(taskIndex, 1);

        await user.save();

        res.status(201).json({
            success: true,
            message: "Task Completed Successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const showTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        if (!tasks) {
            return res.status(404).json({
                success: false,
                message: "No Tasks Found! Please Create one to show"
            })
        }

        res.status(201).json({
            success: true,
            tasks
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        const { tittle, description, isCompleted } = req.body;

        if (tittle) {
            task.tittle = tittle
        }
        if (description) {
            task.description = description
        }
        if (isCompleted) {
            task.isCompleted = isCompleted
        }

        await task.save()

        res.status(201).json({
            success: true,
            message: "Task Updated Successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}