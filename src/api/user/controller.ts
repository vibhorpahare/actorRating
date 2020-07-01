import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import boom from '@hapi/boom';
import { loginUserValidate, createUserValidate, updateUserValidate } from './validator'
import { userModel, IUser } from './model';
import { Message } from '../../util/message'

export default class userController {

    private generateToken(user: IUser) {
        const jwtSecret = process.env.JWT_SECRET;
        const jwtExpiration = process.env.JWT_EXPIRATION;
        const payload = { id: user._id };

        return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
    }

    public async loginUser(req: Request, res: Response) {
        try {
            const { value, error } = loginUserValidate(req.body);
            if (error) {
                return res.json({ Error: error.details[0].message })
            }
            const user = await userModel.findOne({ email: value.email });
            if (!user) {
                return res.json({ Message: Message.USER_NOT_EXIST });
            }
            if (!user.comparePassword(value.password)) {
                return res.json({ Message: Message.INVALID_CREDENIALS });
            }
            return { Token: this.generateToken(user) }
        } catch (error) {
            return boom.badImplementation(error);
        }
    }

    public async signupUser(req: Request, res: Response) {
        try {
            const { value, error } = createUserValidate(req.body);
            if (error) {
                return res.json({ Error: error.details[0].message })
            }
            let user = await userModel.findOne({ email: value.email });
            if (user) {
                return res.json({ Message: Message.USER_EXIST });
            }
            const newUser = new userModel({ value });
            user = await newUser.save();
            return { Message: Message.REGISTRATION_SUCESSFULL }
        } catch (error) {
            return boom.badImplementation(error);
        }
    }

    // public async getDetails(req: Request, res: Response) {
    //     try {
    //         const payload = req.payload;
    //         let user = await userModel.findOne({ _id: payload.id });
    //         if (user) {
    //             return res.json({ User: user });
    //         }
    //         return { Message: 'User Doesn\'t exist' }
    //     } catch (error) {
    //         return boom.badImplementation(error);
    //     }
    // }
    // public async deleteUser(req: Request, res: Response) {
    //     try {
    //         const payload = req.payload;
    //         let user = await userModel.deleteOne({ _id: payload.id });
    //         if (user) {
    //             return res.json({ User: user });
    //         }
    //         return { Message: 'User Doesn\'t exist' }
    //     } catch (error) {
    //         return boom.badImplementation(error);
    //     }
    // }

    // public async updateUser(req: Request, res: Response) {
    //     try {
    //         const { value, error } = updateUserValidate(req.body);
    //         if (error) {
    //             return res.json({ Error: error.details[0].message })
    //         }
    //         const user = await userModel.findOneAndUpdate({ email: value.email },);
    //         if (!user) {
    //             return res.json({ Message: 'User Doesn\'t exist' });
    //         }
    //         if (!user.comparePassword(value.password)) {
    //             return res.json({ Message: 'Password is invalid' });
    //         }
    //         return { Token: this.generateToken(user) }
    //     } catch (error) {
    //         return boom.badImplementation(error);
    //     }
    // }

}