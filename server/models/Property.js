import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
    {
        name: {
            type: String, 
            required: true,
            trim :true
        }, 
        location: { 
            type: String, 
            required: true 
        },
        type: {
            type: String, 
            enum: ['mosque', 'school', 'land'], 
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }, { timestamps: true }
);

export default mongoose.model("Property", propertySchema, "Property");