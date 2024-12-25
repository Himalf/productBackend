import { error } from "console";
import CATEGORY from "../model/category";
import { Request, Response } from "express";
interface Category {
  categoryId: number;
  categoryName: string;
}

// To create or post category data
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
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// to get or display the category data
export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await CATEGORY.getCategories();
    res.status(200).json({ categories });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server Error" });
  }
};

// to get category by its ID
export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await CATEGORY.getCategoryById(Number(id));
    res.status(200).json({ category });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server Error" });
  }
};
// to update the category data
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

// to delete the category data
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
