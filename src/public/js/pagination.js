setInterval(() => {
    $(function () {
        $('.current').each(function (indice, valor) {
            $(`.current:eq(${indice})`).css({ "color": "white", "background": "#0da82f" });
        });
    })
}, 300);