import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.getElementById("p-brand").textContent = product.Brand.Name;
  document.getElementById("p-name").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Images.PrimaryExtraLarge || product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  const discount = discountPercentage(product);
  const priceElem = document.getElementById("productPrice");

  if (discount > 0) {
    priceElem.innerHTML = `<span class="discount-detail">$${product.SuggestedRetailPrice}</span> <span class="product-card__discount">${discount}% OFF</span> $${product.FinalPrice}`;
    document.getElementById("discountFlag").textContent = `SAVE ${discount}%`;
  } else {
    priceElem.textContent = `$${product.FinalPrice}`;
    document.getElementById("discountFlag").textContent = "";
  }
  document.getElementById("productColor").textContent = product.Colors?.[0]?.ColorName || "N/A";
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}

export function discountPercentage(product) {
  const retailPrice = product.SuggestedRetailPrice;
  const finalPrice = product.FinalPrice;

  if (!retailPrice || retailPrice <= 0) return 0;
  if (finalPrice >= retailPrice) return 0;

  return Math.floor(((retailPrice - finalPrice) / retailPrice) * 100);
}