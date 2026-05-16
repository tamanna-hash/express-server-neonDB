import type { Request, Response } from "express";
import { userService } from "./userService";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);
    res.status(201).json({
      message: "created",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      message: error.message,
      error: error,
    });
  }
};

// const get all users
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      data: result.rows,
    });
    console.log(result.rows);
  } catch (error: any) {
    console.log(error);
    res.status(505).json({
      message: error.message,
      error: error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getSingleUserFromDB(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "user retrieved successfully",
      data: result.rows[0],
    });
    // console.log(result.rows[0]);
  } catch (error: any) {
    console.log(error);
    res.status(505).json({
      message: error.message,
      error: error,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age, is_active } = req.body;
  try {
    const result = await userService.updateUserFromDB(req.body, id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: result.rows[0],
    });
    // console.log(result.rows[0]);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUserFromDB(id as string)
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "user not found!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      data: {},
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
}

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser
};
