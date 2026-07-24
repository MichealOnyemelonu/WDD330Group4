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

    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
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
  document.querySelector("h2").textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(Number(product.FinalPrice) * 0.85);

  document.getElementById("p-price").innerHTML = `<span class="discount-detail">$${product.SuggestedRetailPrice}</span> <span class="product-card__discount">%${discountPercentage(product)} OFF</span> $${product.FinalPrice}`;
  document.getElementById("p-color").textContent = product.Colors[0].ColorName;
  document.getElementById("p-description").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("add-to-cart").dataset.id = product.Id;
}

export function discountPercentage(product) {
  const retailPrice = product.SuggestedRetailPrice;
  const finalPrice = product.FinalPrice;

  if (!retailPrice || retailPrice <= 0) {
    return 0;
  }

  if (finalPrice >= retailPrice) {
    return 0;
  }

  return Math.floor(((retailPrice - finalPrice) / retailPrice) * 100);
}
