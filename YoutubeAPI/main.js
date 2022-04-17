// Client ID en una constante.
const client_id = 'YOUR_CLIENT_ID_HERE'
// Variables DOM.
let buttons = document.getElementsByClassName('button')
let search_area = document.getElementsByClassName('input')
let video = document.getElementsByTagName('iframe')
// Variable que recoge la consulta del usuario.
var q = ''

// Se carga la Google API Client Library for JavaScript desde la API de Google, para poder realizar una autenticación OAuth 2.0.
gapi.load('client:auth2', function () {
  // Se inicializa un objeto GoogleAuth con la client ID del desarrollador.
  gapi.auth2.init({ client_id: client_id })
})

// Manejo de eventos de los botones.
for (let i = 0; i < buttons.length; i++) {
  if (i == 0) {
    buttons[i].addEventListener('click', () => {
      authenticate()
        .then(loadClient)
    })
  } else {
    buttons[i].addEventListener('click', () => {
      q = search_area[0].value
      execute()
    })
    search_area[0].addEventListener('keypress', (evt) => {
      if (evt.key == 'Enter') {
        q = search_area[0].value
        execute()
      }
    })
  }
}

// Esta función realiza la autenticación OAuth.
function authenticate() {
  // Retorna el objeto GoogleAuth.
  return gapi.auth2.getAuthInstance()
    // Acceso a través de ssl.
    .signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
    // Devuelve por consola el inicio de sesión correcto o fallido.
    .then(function () {
      console.log('Sign-in successful')
      buttons[0].innerHTML = 'Sesión iniciada'
    },
      function (err) { console.error('Error signing in', err) })
}

// Esta función carga la API, esto sucederá una vez que el usuario esté autenticado.
function loadClient() {
  return gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
    .then(function () {
      console.log('GAPI client loaded for API')
    },
      function (err) { console.error('Error loading GAPI client for API', err) })
}

// Función que ejecuta la query a la API, y muestra los resultados en la interfaz web.
function execute() {
  // Ejecuta una llamada al endpoint search de la API.
  return gapi.client.youtube.search.list({
    'part': [
      'snippet'
    ],
    'q': q,
    'order': 'viewCount',
    'type': 'video',
    'maxResults': 1
  })
    // Manejo de respuesta y errores. Se muestran los resultados en la interfaz web, en caso de error, se muestra dicho error por consola.
    .then(function (response) {
      video[0].src = 'https://www.youtube.com/embed/' + response.result.items[0].id.videoId
      video[0].hidden = false
    }).catch(function (err) {
      console.error('Execute error', err)
    })
}