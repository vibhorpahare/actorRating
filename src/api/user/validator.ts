import Joi from "@hapi/joi";

    const createUserModel = Joi.object().keys({
        email: Joi.string().email().trim().required(),
        name: Joi.string().required(),
        password: Joi.string().trim().required()
    });
    
    const updateUserModel = Joi.object().keys({
        email: Joi.string().email().trim(),
        name: Joi.string(),
        password: Joi.string().trim()
    });
    
    const loginUserModel = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().trim().required()
    });
    
    export function loginUserValidate(payload: object){
        return this.loginUserModel.validate(payload); 
    }

    export function createUserValidate(payload: object){
        return this.createUserModel.validate(payload); 
    }

    export function updateUserValidate(payload: object){
        return this.updateUserModel.validate(payload); 
    }