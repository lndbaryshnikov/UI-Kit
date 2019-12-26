(() => {
    const button = document.querySelector(".menu-message__header");
    const box = document.querySelector(".menu-message__message-box");
    box.style.display = "none";

    button.addEventListener("click", () => {
            const display = box.style.display;

            box.style.display = display === "none" ? "block" : "none";
        }
    )
})();
