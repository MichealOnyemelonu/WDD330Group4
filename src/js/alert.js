function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class Alert {
  constructor(path = "/json/alerts.json") {
    this.path = path;
  }

  getAlerts() {
    return fetch(this.path).then(convertToJson);
  }

  async init() {
    const alerts = await this.getAlerts();

    if (alerts && alerts.length > 0) {
      this.renderAlerts(alerts);
    }
  }

  renderAlerts(alerts) {
    const section = document.createElement("section");
    section.classList.add("alert-list");

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    const main = document.querySelector("main");
    main.prepend(section);
  }
}