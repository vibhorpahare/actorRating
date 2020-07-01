import bcrypt from "bcrypt";
import mongoose from "mongoose";
// const MAX_LOGIN_ATTEMPTS = 5;
// const LOCK_TIME = 2 * 60 * 60 * 1000;

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    // loginAttempts: number;
    // lockuntil: number;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): boolean;
};


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    // loginAttempts: { type: Number, required: true, default: 0 },
    // lockUntil: { type: Number },
},
    {
        timestamps: true,
    });

/**
 * Password hash middleware.
 */
function hashPassword(password: string): string {
    if (!password) {
        return null;
    }
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

userSchema.pre('save', function (next) {
    const user: any = this;
    if (!user.isModified('password')) {
        return next();
    }
    user.password = hashPassword(user.password);
    return next();
});

userSchema.methods.comparePassword = function (requestPassword: string) {
    return bcrypt.compareSync(requestPassword, this.password)
}

export const userModel = mongoose.model<IUser>('User', userSchema);
