document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("scrollToTopBtn");
  if (!button) return;

  function toggleButton() {
    if (window.scrollY > 200) {
      button.classList.add("is-visible");
    } else {
      button.classList.remove("is-visible");
    }
  }

  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", toggleButton);
  toggleButton();
});