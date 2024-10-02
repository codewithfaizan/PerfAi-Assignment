import express from "express";
import propertyModel from "../../models/Property.js"
import taskModel from "../../models/Task.js";
import authMiddleware from "../../middlewares/authentication.js";

const router = express();

/*
METHOD : POST
PRIVATE
API Endpoint : /auth/task/add
ADD TASK
*/
router.post('/add', authMiddleware, async (req, res) => {
    try {
        const { propertyId, type, dueDate } = req.body;

        const propertyExists = await propertyModel.findById(propertyId);
        if (!propertyExists) return res.status(404).json({ error: 'Property not found' });
        const newTask = new taskModel({ propertyId, type, dueDate });
        // console.log(newTask);
        const savedTask = await newTask.save();
        // res.status(201).json(savedTask);
        res.status(201).json({ message: "Task creayed successfully", task: savedTask });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, error: "Error creating property" });
    };
});

/*
METHOD : GET
PRIVATE
API Endpoint : /auth/task/getall
GET ALL TASK
*/
router.get('/getall', authMiddleware, async (req, res) => {
    try {
        const allTasks = await taskModel.find()
        res.status(200).json({message: "All Tasks Fetched",Tasks: allTasks});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, error: "Error fetching all tasks" });
    }
});

/*
METHOD : PATCH
PRIVATE
API Endpoint : /auth/task/update/:id
UPdate by TASK id
*/
router.patch('/update/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 

        const validStatuses = ['Pending', 'In Progress', 'Completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status value. Allowed values are 'Pending', 'In Progress', or 'Completed'." });
        };
        const task = await taskModel.findById(id);
        if (!task) res.status(404).json({ error: "Task not found" });
        task.status = status;
        const updatedTask = await task.save();
        res.status(200).json({ message: "Task status updated successfully", task: updatedTask });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, error: "Error" });
    }
})

export default router;