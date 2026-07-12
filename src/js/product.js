import { getParam, addProductToCart } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

<<<<<<< HEAD
=======



>>>>>>> c0d2c5524bade7ab9ca1c5ad90f6e519a1b5d5cb
const product = new ProductDetails(productID, dataSource);
product.init();

// add to cart button event handler
async function addToCartHandler(e) {
<<<<<<< HEAD
  const selectProduct = await dataSource.findProductById(e.target.dataset.id);

  addProductToCart(selectProduct);
=======
  const selectProduct = 
    await dataSource.findProductById(e.target.dataset.id);
  
  addProductToCart(product); 
>>>>>>> c0d2c5524bade7ab9ca1c5ad90f6e519a1b5d5cb
}

// add listener to Add to Cart button
document
   .getElementById("addToCart")
   .addEventListener("click", addToCartHandler);