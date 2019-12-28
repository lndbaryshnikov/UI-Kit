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

// (() => {
//     const button = document.querySelector(".menu-message__header");
//     const box = document.querySelector(".menu-message");
//     const form = document.querySelector(".menu-message__message-box");
//
//     box.style.transform = "scale(1, 0)";
//
//     button.addEventListener("click", () => {
//             const bottom = box.style.bottom;
//
//             if (  )
//             box.style.bottom = bottom === "-432px" ? "0px" : "-432px";
//         }
//     )
// })();
