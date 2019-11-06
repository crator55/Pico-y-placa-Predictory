const formularioContactos = document.querySelector('#contacto');
eventListeners();

function eventListeners() {
     formularioContactos.addEventListener('submit', leerFormulario);
}

function leerFormulario() {
     // Leer los datos de los inputs
     const placa = document.querySelector('#Placa').value,
           fecha = document.querySelector('#Fecha').value,
           hora = document.querySelector('#Hora').value;

     var  CDate = new Date(fecha),
          datetime = new Date('1970-01-01T' + hora + 'Z');

     if (placa === '' || fecha === '' || hora === '') {
          // 2 parametros: texto y clase
          mostrarNotificacion('Todos los Campos son Obligatorios', 'error');
     }
     else if (CDate == 'Invalid Date') {
          mostrarNotificacion('Fecha Incorrecta', 'error');
     }
     else if (datetime == 'Invalid Date') {
          mostrarNotificacion('Hora Incorrecta', 'error');
     }
     else {

          // Pasa la validación, crear llamado a Ajax
          const info_consulta = new FormData();
          info_consulta.append('Placa', placa);
          info_consulta.append('Fecha', fecha);
          info_consulta.append('Hora', hora);

          // ingresamos para la verificacion de los datos
          ApiPhp(info_consulta);
     }
}

/** Inserta  via Ajax */
function ApiPhp(datos) {
     // llamado a ajax

     // crear el objeto
     const xhr = new XMLHttpRequest();

     // abrir la conexion
     xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);

     // pasar los datos
     xhr.onload = function () {
          if (this.status === 200) {

               // leemos la respuesta de PHP
               if (JSON.parse(xhr.responseText).respuesta == 'correcto') {
                    mostrarNotificacion('habilitado', 'correcto');
               }
               else {
                    mostrarNotificacion('No habilitado', 'incorrecto');
               }
               // Resetear el formulario
               document.querySelector('form').reset();
          }
     }

     // enviar los datos
     xhr.send(datos)
}

// Notifación en pantalla
function mostrarNotificacion(mensaje, clase) {
     const notificacion = document.createElement('div');
     notificacion.classList.add(clase, 'notificacion', 'sombra');
     notificacion.textContent = mensaje;
     // formulario
     formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

     // Ocultar y Mostrar la notificacion
     setTimeout(() => {
          notificacion.classList.add('visible');
          setTimeout(() => {
               notificacion.classList.remove('visible');
               setTimeout(() => {
                    notificacion.remove();
               }, 500)
          }, 3000);
     }, 100);

}



