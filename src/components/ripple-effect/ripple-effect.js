(function($) {
    var elem, ink, d, x, y;
    $(".ripple").click(function(e){
        elem = $(this);

        if (elem.find(".ink").length == 0)
            elem.prepend("<span class='ink'></span>");

        ink = elem.find(".ink");
        ink.removeClass("animate");

        if(!ink.height() && !ink.width())
        {
            d = Math.max(elem.outerWidth(), elem.outerHeight());
            ink.css({height: d, width: d});
        }

        x = e.pageX - elem.offset().left - ink.width()/2;
        y = e.pageY - elem.offset().top - ink.height()/2;

        ink.css({top: y+'px', left: x+'px'}).addClass("animate");
    })
})(jQuery);
