import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";


// creating an instance of the "import ProductData from productData.mjs" 
const dataSource = new ProductData();

const ListElement = document.querySelector(".product-list");

const productlist = new ProductList (
    "tents",
    dataSource,
    ListElement
);

productlist.init();