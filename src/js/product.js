import { getParam, addProductToCart } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

// add to cart button event handler
async function addToCartHandler(e) {
  const selectProduct = await dataSource.findProductById(e.target.dataset.id);

  addProductToCart(selectProduct);
}

// add listener to Add to Cart button
document
   .getElementById("addToCart")
   .addEventListener("click", addToCartHandler);