import { Request, Response } from "express";
import CATEGORY, { ICategory } from "../model/category";

// Create category
export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryName } = req.body;
    const newCategory = new CATEGORY(categoryName);
    const result = await newCategory.createCategory();
    res.status(201).json({
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create category",
    });
  }
};

// Get all categories
export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await CATEGORY.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch categories",
    });
  }
};

// Get category by ID
export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await CATEGORY.getCategoryById(Number(id));
    if (!category) {
      res.status(404).json({
        error: `Category with ID ${id} not found`,
      });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch category",
    });
  }
};

// Update category
export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    const category = new CATEGORY(categoryName);
    const result = await category.updateCategory(Number(id));

    res.status(200).json({
      result,
      message: "Category updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update category",
    });
  }
};

// Delete category
export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await CATEGORY.deleteCategory(Number(id));
    res.status(200).json({
      result,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete category",
    });
  }
};
