"use strict";

//variables para validar lo que entra al input
var tecla = "";
var especiales = false; //variables que ayudan en la ubicacion y el movimiento de la cinta

var coordenada = 0;
var posicion = 960; //selectores para asignar a la cinta

var padre = $("#padre");
var cinta_inicial = padre.html(); //variables para el tiempo de ejecucion de la cinta

var tiempo;
var casilla;
var estado_qx; //div de los botones y el input

var input = $(".input_button");
var botones = $(".buttons"); //para validar la entrada al input

$(document).ready(function () {
  $("#input").keydown(function (event) {
    tecla = String.fromCharCode(event.which);
    especiales = false;

    if (event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 37 || event.keyCode === 39) {
      especiales = true;
    }

    if (tecla === 'B' || tecla === 'A' || especiales) {
      $("#input").prop("readonly", false);
      $("#mensaje_error").html("<br><br>");
    } else {
      $("#input").prop("readonly", true);
      $("#mensaje_error").html("Solo puede ingresar 'a' o 'b'." + "<br>" + "Para ingresar letras nuevamente debes oprimir 'Supr'");
    }

    $("#escribe").keyup(function () {
      $("#input").prop("readonly", false);
    });
  });
}); //para agregar el contenido del input a la cinta

function asignar_cinta() {
  var cinta = $("#input").val();
  agregar_recuadros(cinta);
  var inicio_cinta = $(".inicio_cinta");

  for (var i = 0; i < cinta.length; i++) {
    inicio_cinta.children('text').html(cinta[i]);
    inicio_cinta = inicio_cinta.next();
  }

  padre.attr("transform", "translate(0,10)");
  posicion = 960;
  input.attr("style", "display: none;;");
  botones.attr("style", "display: block;");
} //dezplazar la cinta, a izquierda o derecha


function desplazar(direccion) {
  if (direccion === 'R') {
    coordenada = coordenada - 50;
  } else if (direccion === 'L') {
    coordenada = coordenada + 50;
  }

  padre.attr("transform", "translate(" + coordenada + ",10)");
} //mover la cinta a una ubicacion exacta


function setCordenada(posicionx) {
  padre.attr("transform", "translate(" + posicionx + ",10)");
} //crea la etique correspondiente a un cuadro de la cinta(esto inclulle sus atributos)


function agregar_a_cinta(translate) {
  html = '<g class="tape-cell" transform="translate(' + translate + ')">' + '<rect width="50" height="50"></rect>' + '<text x="25" y="33"> </text>' + '</g>';
  return html;
} //agrega la cantidad de cuadros corespondiente a la entrada de input a la cinta


function agregar_recuadros(cinta) {
  var cinta_completa = "";

  for (var i = 0; i < cinta.length; i++) {
    cinta_completa = cinta_completa + agregar_a_cinta(posicion);
    posicion = posicion + 50;
  }

  padre.html(cinta_inicial + cinta_completa);
} //cambia las 'a' por 'b'


function cambiar_a_por_b() {
  casilla = $(".inicio_cinta");
  estado_qx = "q1";
  tiempo = setInterval(function () {
    comprobar_regla();
  }, 2000);
} //aplica la reglas a seguir para hacer el cambio de a por b


function comprobar_regla() {
  var x = casilla.children('text').html();
  console.log("x = " + x + " qx = " + estado_qx);

  if (estado_qx === 'q1') {
    if (x === 'a') {
      casilla.children('text').html('a');
      casilla = casilla.next();
      desplazar("R");
    } else if (x === 'b') {
      casilla.children('text').html('a');
      casilla = casilla.next();
      desplazar("R");
    } else {
      estado_qx = "q2";
      casilla = casilla.prev();
      desplazar("L");
    }
  } else if (estado_qx === 'q2') {
    if (x === 'a') {
      casilla.children('text').html('a');
      casilla = casilla.prev();
      desplazar("L");
    } else {
      estado_qx = "q3";
      casilla = casilla.next();
      desplazar("R");
    }
  } else if (estado_qx === 'q3') {
    clearInterval(tiempo);
  }
} // parar cinta e ingresar una nueva


function parar() {
  clearInterval(tiempo);
  input.attr("style", "display: block;");
  botones.attr("style", "display: none;");
  padre.html(cinta_inicial);
  $("#input").val("");
}