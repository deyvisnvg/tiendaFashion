let outputEstado = document.getElementById("outputEstado");
let estadoConfig = document.getElementById("estadoConfig");

switch (estadoConfig.value) {

    case "ACTIVADO":
        outputEstado.innerHTML += `
            <p class="description">Estado: </p>
            <p>
                <select name="estado" required>
                    <option value="${estadoConfig.value}">${estadoConfig.value}</option>
                    <option value="DESACTIVADO">DESACTIVADO</option>
                </select>
            </p>
        `
        break;

    case "DESACTIVADO":
        outputEstado.innerHTML += `
            <p class="description">Estado: </p>
            <p>
                <select name="estado" required>
                    <option value="${estadoConfig.value}">${estadoConfig.value}</option>
                    <option value="ACTIVADO">ACTIVADO</option>
                </select>
            </p>
        `
        break;

    default:
        break;
}