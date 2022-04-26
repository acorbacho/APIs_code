function main() {
  // APY key almacenada en una variable y expresada en formato JSON.
  var apikey = {
    key: 'YOUR_API_KEY_HERE'
  }

  // Declarada una función request a la que se le pasa el metodo REST y la URL.
  function request(method, url) {
    /**
      * Dentro, devolvemos un objeto Promise, el cual representa un valor,
      * que puede estar disponible ahora, en el futuro, o nunca,
      * y se utiliza en computación asíncrona. Promise, va sucedido por una función anónima, 
      * la cual recoge la resolución o el rechazo de esa promesa.
      */
    return new Promise(function (resolve, reject) {
      /**
        * A su vez, creamos una nueva petición HTTP, con sus propiedades:
        * open(le pasamos los parametros de la función request), 
        * onload(recogerá la respuesta satisfactoria), 
        * onerror(recogerá el error en caso de que lo haya) y send(enviará la petición).
        */
      var xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.onload = resolve
      xhr.onerror = reject
      xhr.send()
    })
  }

  // Llamamos a la funcion request.
  request('GET', 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=' + apikey.key)
    /**
      * Manejamos el resolve de la Promise con .then y en su interior invocamos una función anónima,
      * en la que estará recogida la respuesta proveniente del xhr.onload,
      * y luego imprimimos los datos que deseamos, en este caso,
      * la capitalización de mercado total en USD.
      */
    .then((r1) => {
      // Recogemos la respuesta en formato texto y la parseamos a JSON.
      var x1 = JSON.parse(r1.target.responseText)
      // Imprimimos por consola la información deseada.
      console.log(x1.data.quote.USD.total_market_cap)
      /**
        * Manejamos el reject de la Promise con .catch, y en su interior invocamos una función anónima,
        * en la que estará recogida el error generado, que imprimiremos por consola.
        */
    }).catch((err) => {
      console.log(err)
    })
}
main()