import { getParam, addProductToCart } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productID = getParam("product");

// Create the data source (no category needed)
const dataSource = new ProductData();

// Create the product details object
const product = new ProductDetails(productID, dataSource);

// Render the product details
product.init();

// Add to cart button event handler
async function addToCartHandler(e) {
  const selectedProduct = await dataSource.findProductById(
    e.target.dataset.id
  );

  addProductToCart(selectedProduct);
}

// Add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);