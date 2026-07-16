export default class Alert {
  constructor({ url = "/json/alerts.json", container = "body" } = {}) {
    this.url = url;
    this.container = container;
  }

  async loadAndRender() {
    try {
      const res = await fetch(this.url);
      if (!res.ok) throw new Error(`Failed to fetch alerts (${res.status})`);
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) return null;

      const section = document.createElement("section");
      section.className = "alert-list";

      data.forEach((item) => {
        if (!item) return;
        const p = document.createElement("p");
        p.textContent = item.message || "";
        if (item.background) p.style.backgroundColor = item.background;
        if (item.color) p.style.color = item.color;
        section.appendChild(p);
      });

      const containerEl = typeof this.container === "string" ? document.querySelector(this.container) : this.container;
      (containerEl || document.body).appendChild(section);

      return { section, data };
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
