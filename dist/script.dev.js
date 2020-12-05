"use strict";

var tecla = "";
var especiales = false;
console.log("hola");
$(document).ready(function () {
  $("#input").keydown(function (event) {
    tecla = String.fromCharCode(event.which);
    especiales = false;
    console.log(event.keyCode);

    if (event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 37 || event.keyCode === 39) {
      especiales = true;
    }

    if (tecla === 'B' || tecla === 'A' || especiales) {
      $("#input").prop("readonly", false);
    } else {
      $("#input").prop("readonly", true);
    }

    $("#escribe").keyup(function () {
      $("#input").prop("readonly", false);
    });
  });
});