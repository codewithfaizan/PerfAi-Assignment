import { body, validationResult } from "express-validator";

const userRegisterValidations = () => {
    return [
        body("userName").notEmpty().isLength({ min: 2, max: 25 }).withMessage("UserName is Required"),
        body("email", "Should be a Valid Email").isEmail(),
        body("password").notEmpty().isLength({ min: 4, max: 16 }).withMessage("Minimun 6 characters required"),
        body("confirmPassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password did Not Match"); }
            return true;
        })
    ]
};

const userLoginValidations = () => {
    return [
        body("email", "Should be a Valid Email").isEmail(),
        body("password").notEmpty().isLength({ min: 6, max: 16 }).withMessage("Minimun 6 characters required")
    ]
};

function errorMiddelware(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors["errors"] })
    }
    return next();
;}

export { userRegisterValidations, userLoginValidations, errorMiddelware }