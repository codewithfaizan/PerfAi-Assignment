import express from "express";
import propertyModel from "../../models/Property.js";

import authMiddleware from "../../middlewares/authentication.js";
const router = express();

/*
METHOD : POST
PRIVATE
API Endpoint : /auth/property
ADD PROPERTY
*/
router.post('/add', authMiddleware, async (req, res) => {
    try {
        const { name, location, type } = req.body;
        if (!name || !location || !type)
            return res.status(400).json({ error: "Name, location, and type are required fields." });

        const validTypes = ['mosque', 'school', 'land'];
        if (!validTypes.includes(type.toLowerCase())) {
            return res.status(400).json({ error: "Invalid property type. Allowed values are: mosque, school, land" });
        }
        const newProperty = new propertyModel({ ...req.body, owner: req.session.userId });
        await newProperty.save();
        res.status(201).json({ success: true, message: "Property Created Successfully", newProperty });
    } catch (error) {
        res.status(500).json({ error: error.message, error: "Error creating property" });
    }
});

/*
METHOD : GET
PRIVATE
API Endpoint : /auth/property/all
GET ALL PROPERTY DETAILS
*/
router.get('/all', authMiddleware, async (req, res) => {
    try {
        const properties = await propertyModel.find({ owner: req.session.userId });
        if (properties.length === 0) {
            return res.status(404).json({ success: false, message: "No properties found" });
        }
        res.status(200).json({ success: true, message: "Properties fetched successfully", properties });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message, message: "Error fetching properties" });
    }
});

/*
METHOD : GET
PRIVATE
API Endpoint : /auth/property/:id
GET A PROPERTY DETAILS BY ID
*/
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const property = await propertyModel.findOne({ _id: id });
        // console.log();
        if (!property) return res.status(404).json({ success: false, message: "Property not found" });
        if (!property.owner.equals(req.session.userId)) {
            return res.status(403).json({ success: false, message: "Unauthorized" })
        }
        res.status(200).json({ success: true, message: "Property Details fetched", property });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, error: "Error fetching property" });
    }
});

/*
METHOD : DELETE
PRIVATE
API Endpoint : /auth/property/delete/:id
DELETE A PROPERTY BY ID
*/

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const property = await propertyModel.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }
        if (!property.owner.equals(req.session.userId)) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }
        res.status(200).json({ success: true, message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message, message: "Error deleting property" });
    }
});

export default router;