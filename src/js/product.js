import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";


// Create the data source (no category needed)

// Create the product details object
loadHeaderFooter();
const productID = getParam("product");


const dataSource = new ProductData("tents");

const product = new ProductDetails(productID, dataSource);

// Render the product details
product.init();


