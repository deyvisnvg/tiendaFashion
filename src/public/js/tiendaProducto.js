let iconzoomtwo = document.querySelectorAll('.iconzoom-two')
let iconzoom = document.querySelectorAll('.iconzoom')
const modelImage = document.querySelectorAll('.modelImage');

let codigo = 0;

// ========================================================================================
function selectProducto() {
    let cod = this.dataset.codigo;
    codigo = cod;
    var detalle = document.querySelector(`.codigo${codigo}`);

    if (detalle.classList.contains('is-active')) {
        detalle.classList.remove('is-active');
    } else {
        detalle.classList.add('is-active');
    }
}

function closeFrame() {
    // console.log(this.dataset.codigo);
    let cod = this.dataset.codigo;
    var detalle = document.querySelector(`.codigo${cod}`);

    if (detalle.classList.contains('is-active')) {
        detalle.classList.remove('is-active');
    }
}

function selectModelImage() {
    // console.log("url", this.dataset.url)
    let imgPrevia = document.getElementById(`imgPrevia${codigo}`);
    imgPrevia.innerHTML = `<img src="${this.dataset.url}" alt="vista Previa">`
}
// ========================================================================================

iconzoom.forEach($iconzoom => {
    $iconzoom.addEventListener('click', selectProducto)
})

iconzoomtwo.forEach($item => {
    $item.addEventListener('click', closeFrame);
})

modelImage.forEach($model => {
    $model.addEventListener('click', selectModelImage)
})

// ========================================================================================

// $(function () {
//     console.log($(`.iconzoom`)) // Muestra el texto del 'div' de esa clase '.icozoom'
//     $('.iconzoom').each(function (indice, valor) { // Recorro cada clase '.iconzoom' de mi tabla de datos
//         // console.log($(`.iconzoom:eq(${indice}) div`).text()) // Muestra el texto del 'div' de esa clase '.icozoom'
//         $(`.iconzoom:eq(${indice})`).click(() => { // Cuando haya un evento de Click en tal índice me imprimirá solo el texto del 'div' en ese índice.
//             // console.log($(`.iconzoom:eq(${indice}) div`).text())
//             // console.log($(`.iconzoom`))
//             const cod = $(`.iconzoom:eq(${indice}) div`).text();
//             // console.log(cod)
//             // codigo = cod;

//             var detalle = document.querySelector(`.codigo${cod}`);
//             // console.log(detalle)

//             if (detalle.classList.contains('is-active')) {
//                 detalle.classList.remove('is-active');
//             } else {
//                 detalle.classList.add('is-active');
//             }

//         })
//     });
// })


// $(function () {
//     $('.iconzoom-two').each(function (indice, valor) { // Recorro cada clase '.iconzoom' de mi tabla de datos
//         $(`.iconzoom-two:eq(${indice})`).click(() => { // Cuando haya un evento de Click en tal índice me imprimirá solo el texto del 'div' en ese índice.

//             const cod = $(`.iconzoom-two:eq(${indice}) div`).text()
//             var detalle = document.querySelector(`.codigo${cod}`);

//             if (detalle.classList.contains('is-active')) {
//                 detalle.classList.remove('is-active');
//             }

//         })
//     });
// })





// var bottomzoom = document.getElementsByClassName('iconzoom');
// var detalle = document.querySelector('.container-product');
// var close = document.getElementById('bottomzoom-two')

// function closeWindow() {
//     if (detalle.classList.contains('is-active')) {
//         detalle.classList.remove('is-active');
//     }
// }

// close.addEventListener('click', closeWindow)

// function mostrarInfo() {
// if (detalle.classList.contains('is-active')) {
//     detalle.classList.remove('is-active');
// } else {
//     detalle.classList.add('is-active');
// }
// }

// for (let i in bottomzoom) {
//     bottomzoom[i].addEventListener('click', mostrarInfo)
// }