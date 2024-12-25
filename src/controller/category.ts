import CATEGORY from "../model/category";
import { Request, Response } from "express";

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryName } = req.body;
    const newCategory = new CATEGORY(categoryName);
    const createCategories = await newCategory.createCategory();
    res.json({
      createCategories,
      msg: "Categories table created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await CATEGORY.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};

export const updateCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    const newCategory = new CATEGORY(categoryName);
    const updateCategory = await newCategory.updateCategory(Number(id));
    res.status(200).json({
      updateCategory,
      msg: "Category Section Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleteCategory = await CATEGORY.deleteCategory(Number(id));
    res.status(200).json({
      deleteCategory,
      msg: `Category of id:${id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};
