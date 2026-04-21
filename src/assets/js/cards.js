(() => {
	const group = document.querySelector("#h-services-143 .cs-card-group");
	if (!group) return;

	const items = group.querySelectorAll(".cs-item");

	// Touch support
	items.forEach((item) => {
		item.addEventListener("touchstart", (e) => {
			e.preventDefault();
			const isActive = item.classList.contains("is-active");
			items.forEach((i) => i.classList.remove("is-active"));
			if (!isActive) item.classList.add("is-active");
		}, { passive: false });
	});

	document.addEventListener("touchstart", (e) => {
		if (!group.contains(e.target)) {
			items.forEach((i) => i.classList.remove("is-active"));
		}
	});
})();
