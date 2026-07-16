import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);

await productList.init();

// default: fetches '/json/alerts.json' and appends <section class="alert-list"> to document.body
const alerts = new Alert();
await alerts.loadAndRender();

// OR: render into a specific container in your page
// const alerts = new Alert({ container: '#alerts-container' });
// await alerts.loadAndRender();