let output = document.getElementById("output");
let modulo = document.getElementById("modulo");

switch (modulo.value) {

    case "SuperAdministrador":
        output.innerHTML += `
            <li class="link">
                <a href="#">Mantenimiento<i class="icon-down sub-icon"></i></a>
                <ol class="sub-menu">
                    <li><a href="/usuario">Usuarios</a></li>
                    <li><a href="/producto/product">Productos</a></li>
                    <li><a href="/categoria">Categorias</a></li>
                </ol>
            </li>
            <li class="link">
                <a href="/perfil">Perfil</a>
            </li>
            <li class="link">
                <a class="link-buttom" href="/login/logout">Cerrar Sesión</a>
            </li>
        `
        break;

    case "Administrador":
        output.innerHTML += `
            <li class="link">
                <a href="#">Mantenimiento<i class="icon-down sub-icon"></i></a>
                <ol class="sub-menu">
                    <li><a href="/usuario">Usuarios</a></li>
                    <li><a href="/producto/product">Productos</a></li>
                    <li><a href="/categoria">Categorias</a></li>
                </ol>
            </li>
            <li class="link">
                <a href="/perfil">Perfil</a>
            </li>
            <li class="link">
                <a class="link-buttom" href="/login/logout">Cerrar Sesión</a>
            </li>
        `
        break;

    case "Empleado":
        output.innerHTML += `
            <li class="link">
                <a href="/perfil">Perfil</a>
            </li>
            <li class="link">
                <a class="link-buttom" href="/login/logout">Cerrar Sesión</a>
            </li>
        `
        break;

    default:
        output.innerHTML += `
            <li class="link">
                <a href="/menuTienda">Tienda</a>
            </li>
            <li class="link">
                <a href="/login/logout">Login</a>
            </li>
        `
        break;
}