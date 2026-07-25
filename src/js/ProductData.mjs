const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse JSON response:", text);
    throw e;
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = category ? `../json/${category}.json` : null;
  }

  async getData(category) {
    const cat = category || this.category;
    const response = await fetch(`${baseURL}products/search/${cat}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
