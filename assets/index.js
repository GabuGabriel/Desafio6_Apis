const btn = document.querySelector(".boton")
const monedaValue = document.querySelector(".select")

/* obtenerinfodelaapi */
async function infoDelaApi() {
    try {
        const data = await fetch("https://mindicador.cl/api/" + monedaValue.value);
        const json = data.json();
        return json;
    } catch (error) {
        console.log("Error en apiInfo: ", error);
        alert("Error de conexión con el servidor")
    }
}

/* eventoboton */
btn.addEventListener("click", async () => {
    const valorClp = Number(document.querySelector("#inputCLP").value)
    const resultado = document.querySelector("#resultado")
    const canvas = document.querySelector("#grafico")
    const infoApi = await infoDelaApi();
    const total = valorClp / infoApi.serie[0].valor;
    resultado.innerHTML = total.toFixed(2);

    /* creaungrafico */
    const fechas = infoApi.serie.map((elementoFecha) => elementoFecha.fecha).reverse();
    const precio = infoApi.serie.map((elementoPrecio) => elementoPrecio.valor).reverse();
    const grafica = {
        type: "line",
        data: {
            labels: fechas,
            datasets: [
                {
                    label: `${monedaValue.value}`,
                    backgroundColor: "red",
                    data: precio,
                },
            ],
        },
    };
    new Chart(canvas, grafica)
})