import Product from "../models/Product.js";
import { uploadImage, deleteImage } from "../librarys/cloudinary.js";
import fs from "fs-extra";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const postProduct = async (req, res) => {
  const { name, price, stock, image, category, brands, description, views } = req.body;
  let imageUploaded;
  let resultImages;
  let arrayURLS

  try {
    if (req.files) {
      if (req.files.image.length > 0) {
        resultImages = req.files.image.map(image => await uploadImage(image.tempFilePath))
        req.files.image.map(image => fs.remove(image.tempFilePath))

        const arrayPromiseURLS = await Promise.all(resultImages)
        arrayURLS = arrayPromiseURLS.map(image => {
          return imageUploaded = {
            url: image.secure_url,
            public_id: image.public_id
          }
        })
      }
      else {
        const result = await uploadImage(req.files.image.tempFilePath);
        await fs.remove(req.files.image.tempFilePath);
        imageUploaded = [{
          url: result.secure_url,
          public_id: result.public_id,
        }];
      }
    }

    const newProduct = new Product({
      name,
      price,
      stock,
      image: arrayURLS ? arrayURLS : imageUploaded ? imageUploaded : [{ url: image }],
      category,
      brands,
      description,
      views,
    });

    await newProduct.save();
    return res.json(newProduct);
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.json({ msg: "Product not found" });
    if (deletedProduct.image[0].public_id) {
      await deleteImage(deletedProduct.image[0].public_id);
    }
    if (deletedProduct.image.length > 1) {
      deletedProduct.image.map(img => deleteImage(img.public_id))
    }
    return res.json({ msg: "Product Deleted" });
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {quantity} = req.body;

  try {
    if(quantity){

      const producto = await Product.findById(id)

      producto.stock = producto.stock - quantity;
      producto.save();

      return res.send({msg: "ok"})
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) return res.json({ msg: "Product not found" });
    return res.json({ msg: "Product Updated" });
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const getDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const productDetailed = await Product.findById(id);
    return res.json(productDetailed);
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const getCategories = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) return res.json({ msg: "Categories not found" });
    const categories = products.map(e => e.category);
    let setCategories = new Set(categories);
    const allCategories = Array.from(setCategories);
    return res.json(allCategories);
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
}

export const getBrands = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) return res.json({ msg: "Brands not found" });
    const brands = products.map(e => e.brands);
    let setBrands = new Set(brands);
    const allBrands = Array.from(setBrands);
    return res.json(allBrands);
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
}

export const productComments = async (req, res) => {
  const { id, commentRating, comment, username } = req.body
  try {
    const product = await Product.findById(id)
    if (!product) {
      return res.status(407).send("Product not found /comments")
    }
    product.comments.push({
      comment,
      commentRating,
      username
    })
    const quantityOfComments = product.comments.length
    const ratingPunctuation = product.comments.reduce((acc, comment) => acc + comment.commentRating, 0)
    product.rating = ratingPunctuation / quantityOfComments
    product.save()
    return res.status(200).json(product)
  } catch (e) {
    return res.status(400).send("Ha ocurrido un error en productComments")
  }
}

