var tecla="";
var especiales = false;
var coordenada = -50;

$(document).ready(function(){
    $("#input").keydown(function(event){
        tecla = String.fromCharCode(event.which);
        especiales = false;

        if(event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 37 || event.keyCode === 39){
            especiales = true;
        }
        if(tecla === 'B' || tecla === 'A' || especiales){
            $("#input").prop("readonly", false);
            $("#mensaje_error").html("<br>");
        }
        else{
            $("#input").prop("readonly", true);
            $("#mensaje_error").html("Solo puede ingresar 'a' o 'b'.");
        }
        $("#escribe").keyup(function(){
            $("#input").prop("readonly", false);
            
        });
});
});

function asignar_cinta(){
    var primer_hijo = $('#primer_hijo');
   var hijos = $('#padre').children();
    for(var j = 0; j < hijos.length; j++){
        primer_hijo.children('text').html('');
        primer_hijo = primer_hijo.next();
    }
    var cinta = $("#input").val();
    var inicio_cinta = $(".inicio_cinta");
    for(var i = 0; i<cinta.length; i++){
        inicio_cinta.children('text').html(cinta[i]);
        inicio_cinta = inicio_cinta.next();
    }
    
}

function boton_inicio(){
    var padre = $("#padre");
    padre.attr("transform","translate("+coordenada+",10)");
    coordenada = coordenada -50;
}