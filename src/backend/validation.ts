import Joi from "joi";


export const registerValidation = (data: Joi.ValidationResult<any>) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(256).required(),
        email: Joi.string().min(6).max(256).email().required(),
        password: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])([a-zA-Z0-9]|[^a-zA-Z0-9]){12,}$")),
    });

    return schema.validate(data);
};

export const loginValidation = (data: Joi.ValidationResult<any>) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(256).required(),
        password: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])([a-zA-Z0-9]|[^a-zA-Z0-9]){12,}$")),
    });

    return schema.validate(data);
};