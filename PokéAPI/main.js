function main() {
  /**
   * Se establece un valor por defecto, y se recoge el nombre que introduce el usuario,
   * al pulsar enter.
   */
  var pokemon_name_id = 25
  var element_name = document.getElementById('name')
  var element_id = document.querySelector('#id')

  // Función que ejecuta el evento de instroducir el nombre del pokémon.
  function insideNameEvent() {
    pokemon_name_id = element_name.value.toLowerCase()
    load()
  }

  // Función que ejecuta el evento de instroducir el id del pokémon.
  function insideIdEvent() {
    pokemon_name_id = element_id.value
    load()
  }

  // Función que ejecuta los eventos.
  function loadPokemonEvent() {
    element_name.addEventListener('change', insideNameEvent)
    element_id.addEventListener('change', insideIdEvent)
  }

  // Buscamos el nombre con la URL utilizando el endpoint pokemon.
  function load() {
    if (pokemon_name_id == '') {
      pokemon_name_id = 0
    }
    var settings = {
      'async': true,
      'type': 'GET',
      'url': 'https://pokeapi.co/api/v2/pokemon/' + pokemon_name_id,
    }
    /**
     * Se utiliza AJAX para que cuando realice la llamada invoque a una funcion con la respuesta,
     * que manejeremos con DOM para mostrar resultados.
     */
    $.ajax(settings).done(function (response) {
      console.log(response)
      document.getElementById('name').value = response.name.charAt(0).toUpperCase() + response.name.slice(1)
      document.getElementById('id').value = response.id
      document.getElementById('base_experience').innerHTML = response.base_experience
      document.getElementById('height').innerHTML = response.height + '0 cm'
      document.getElementById('weight').innerHTML = (response.weight * 0.1).toFixed(2) + ' kg'
      document.getElementById('sprite').src = response.sprites.front_default
    })
  }
  loadPokemonEvent()
  load()
}
main()