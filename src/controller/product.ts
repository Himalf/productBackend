import PRODUCT from "../model/product";
import { Request, Response } from "express";
import { supabase } from "../middleware/supabaseClient";

// create the product data
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const image = req.file;
    if (!image) {
      res.status(400).json({ error: "Image file is required" });
      return; // Exit function after sending response
    }

    const { data, error } = await supabase.storage
      .from("products")
      .upload(`${image?.originalname}`, image.buffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: image.mimetype,
      });

    if (error) {
      res.status(500).json({ error: error.message });
      return; // Exit function after sending response
    }

    const publicUrl = supabase.storage
      .from("products")
      .getPublicUrl(data?.path || "").data.publicUrl;

    if (!publicUrl) {
      res.status(500).json({ error: "Failed to generate public URL" });
      return; // Exit function after sending response
    }

    console.log(publicUrl, "hello image");
    const { title, price, description, categoryId } = req.body;

    const newProduct = new PRODUCT(
      title,
      price,
      description,
      publicUrl,
      categoryId
    );

    const result = await newProduct.createProduct();
    res.status(201).json({
      result,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      error: "Failed to create product",
    });
  }
};

// get the product data
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const limit = Number(req.query.limit) || 0;
    const sort = typeof req.query.sort === "string" ? req.query.sort : "asc";
    const products = await PRODUCT.getProducts(limit, sort);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

// get the single product
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await PRODUCT.getProductById(Number(id));
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

// update the product data
export const updateProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const image = req.file?.filename || "";
    const { id } = req.params;
    const { title, price, description, categoryId } = req.body;
    const newProduct = new PRODUCT(
      title,
      price,
      description,
      image,
      categoryId
    );
    const result = await newProduct.updateProduct(Number(id));
    res.status(201).json({
      result,
      msg: " Data Updataed succesfully",
    });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

// delete the product data
export const deleteProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleteProducts = await PRODUCT.deleteProduct(Number(id));
    res.status(200).json({
      deleteProducts,
      msg: `The product of id: ${id} deleted successfully `,
    });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
