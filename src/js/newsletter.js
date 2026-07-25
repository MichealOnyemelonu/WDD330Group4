const form = document.getElementById("newsletterForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email =
      document.getElementById("newsletterEmail").value;

    localStorage.setItem("newsletter-email", email);

    document.getElementById("newsletterMessage").textContent =
      "Thank you for subscribing to our newsletter!";

    form.reset();
  });
}