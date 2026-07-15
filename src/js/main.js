import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import loadHeaderFooter from "./src/index.html.";
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);

await productList.init();