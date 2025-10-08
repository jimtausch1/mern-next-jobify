import cloudinary from 'cloudinary';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { formatImage } from '../middleware/multerMiddleware.js';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user?.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
export const getApplicationStats = async (req: Request, res: Response) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};
export const updateUser = async (req: Request, res: Response) => {
  const newUser = { ...req.body };
  delete newUser.password;
  delete newUser.role;

  if (req.file) {
    const file = formatImage(req.file) ?? '';
    const response = await cloudinary.v2.uploader.upload(file);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser?.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: 'update user' });
};
