import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productInstance = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", productInstance, element);

productList.init();
