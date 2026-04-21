(() => {
  const form = document.getElementById("cs-form-265");
  const msg = document.getElementById("cs-form-success");
  if (!form || !msg) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    data.append("form-name", form.getAttribute("name"));

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
    } catch (_) {
      // Network error — still show the message
    }

    form.hidden = true;
    msg.hidden = false;
  });
})();
