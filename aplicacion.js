// API key para acceder a la API de ExchangeRate-API
const API_KEY = '3e306de0259b45a024f216e9';

// Función para convertir la moneda
async function convertirMoneda() {
    // Obtener los valores ingresados por el usuario
    let monto = document.getElementById('monto').value;
    let monedaOrigen = document.getElementById('monedaOrigen').value;
    let monedaDestino = document.getElementById('monedaDestino').value;

    try {
        // Obtener las tasas de cambio actualizadas
        const tasas = await obtenerTasasDeCambio(monedaOrigen);

        // Calcular el monto convertido
        let montoConvertido = monto * tasas[monedaDestino];

        // Mostrar el resultado en la página
        document.getElementById('resultado').innerText = `${monto} ${monedaOrigen} = ${montoConvertido.toFixed(2)} ${monedaDestino}`;
    } catch (error) {
        // Manejar errores y mostrar un mensaje al usuario
        console.error('Error al convertir la moneda:', error);
        document.getElementById('resultado').innerText = 'Error al convertir la moneda. Por favor, intente de nuevo.';
    }
}

// Función para obtener las tasas de cambio actualizadas de la API
async function obtenerTasasDeCambio(monedaBase) {
    // Construir la URL de la API con la moneda base
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${monedaBase}`;
    
    // Realizar la petición a la API
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        throw new Error('No se pudo obtener las tasas de cambio');
    }
    // Convertir la respuesta a JSON
    const datos = await respuesta.json();
    // Devolver las tasas de conversión
    return datos.conversion_rates;
}
