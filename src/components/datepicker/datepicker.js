$(".datepicker__datepicker-wrapper").datepicker({
    classes: {
        "ui-datepicker-current": "datepicker__today-button",
    },

    showButtonPanel: true
});

document.querySelector('.datepicker__header').innerHTML = String(new Date().getDate());
