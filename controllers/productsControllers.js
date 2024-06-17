import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Add new product
const addProduct = async (req, res) => {
  const { name, prize, category } = req.body;

  try {
    const newProduct = await prisma.products.create({
      data: {
        name,
        prize,
        category,
      },
    });

    if (newProduct)
      return res.status(201).json({
        success: "Product added successfully",
        newProduct,
      });

    return res.status(500).json({ error: "something went wrong" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//Get All products
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    if (products) return res.status(200).json(products);
    res.status(400).json({ error: "Something went wrong" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//Delete Product
const deleteProduct = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product)
      return res
        .status(400)
        .json({ error: "Product does not exit / Item not found" });

    if (product) {
      const deletedProduct = await prisma.products.delete({
        where: {
          id: productId,
        },
      });

      if (!deletedProduct)
        return res.status(500).json({ error: "something went wrong" });

      if (deletedProduct)
        return res.status(200).json({ success: "Product deleted succesfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//Update existing product
const updateProduct = async (req, res) => {
  const { name, category, prize, image } = req.body;

  console.log(name, category, prize, image);

  const id = req.params.productId;

  const data = {};

  if (name !== undefined) data.name = name;
  if (prize !== undefined) data.prize = prize;
  if (category !== undefined) data.category = category;
  if (image !== undefined) data.image = image;

  console.log(id);

  try {
    const updatedProduct = await prisma.products.update({
      where: {
        id: id,
      },
      data: data,
    });

    console.log(updatedProduct);

    if (!updatedProduct)
      return res
        .status(500)
        .json({ error: "Internal Server Error, something went wrong" });
    return res.status(200).json({ success: "Product updated", updatedProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export { addProduct, getAllProducts, deleteProduct, updateProduct };
