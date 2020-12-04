var tecla="";
var especiales = false;
var coordenada = 0;
var padre = $("#padre");
var posicion=960;
var cinta_inicial= padre.html();

$(document).ready(function(){
    $("#input").keydown(function(event){
        tecla = String.fromCharCode(event.which);
        especiales = false;

        if(event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 37 || event.keyCode === 39){
            especiales = true;
        }
        if(tecla === 'B' || tecla === 'A' || especiales){
            $("#input").prop("readonly", false);
            $("#mensaje_error").html("<br><br>");
        }
        else{
            $("#input").prop("readonly", true);
            $("#mensaje_error").html("Solo puede ingresar 'a' o 'b'."+"<br>"
            +"Para ingresar letras nuevamente debes oprimir 'Supr'");
        }
        $("#escribe").keyup(function(){
            $("#input").prop("readonly", false);
            
        });
});
});

function asignar_cinta(){
    var cinta = $("#input").val();
    agregar_recuadros(cinta);
    var inicio_cinta = $(".inicio_cinta");
    for(var i = 0; i<cinta.length; i++){
        inicio_cinta.children('text').html(cinta[i]);
        inicio_cinta = inicio_cinta.next();  
    }
    padre.attr("transform","translate(0,10)");
    posicion = 960;
}

function desplazar(direccion){
    if(direccion === 'R'){
        coordenada = coordenada - 50;
    }
    else if (direccion === 'L'){
        coordenada = coordenada + 50;
    }
    padre.attr("transform","translate("+coordenada+",10)");
    
}

function agregar_a_cinta(translate){
    html =
        '<g class="tape-cell" transform="translate('+translate+')">'+
            '<rect width="50" height="50"></rect>'+
            '<text x="25" y="33"> </text>'+
        '</g>';
        return html;
}
function agregar_recuadros(cinta){
    var cinta_completa = "";
    for(var i = 0; i<cinta.length; i++){
        cinta_completa = cinta_completa + agregar_a_cinta(posicion);
        posicion = posicion + 50;
    }
    padre.html(cinta_inicial + cinta_completa);

}

function iniciar_maquina(){
    var casilla = $(".inicio_cinta");
    cambiar_a_por_b(casilla,"q1");
}


function cambiar_a_por_b(casilla, qx){
    var estado_qx = [qx, " "];
    var vector_casilla = [casilla, null];
    var x = casilla.children('text').html();
    var bandera = comprobar_regla(vector_casilla, estado_qx, x);

    console.log(bandera+" - "+estado_qx[0] + " - " + x + " - "+vector_casilla[0].prev().children('text').html());
    if(!bandera){
        cambiar_a_por_b(vector_casilla[0], estado_qx[0]);
        return;
    }
    return;
}

function comprobar_regla(casilla, estado_qx, x){
    if(estado_qx[0] === 'q1'){
        if(x === 'a'){
            console.log("entro a q1,a");
            casilla[0].children('text').html('a');
            casilla[0] = casilla[0].next();
            desplazar("R");
        }
        else if(x === 'b'){
            console.log("entro a q1,b");
            casilla[0].children('text').html('a');
            casilla[0] = casilla[0].next();
            desplazar("R");
        }
        else{
            console.log("entro a q1,B");
            estado_qx[0] = "q2";
            casilla[0] = casilla[0].prev();
            desplazar("L");
        }
        return false;
    }
    else if(estado_qx[0] === 'q2'){
        if(x === 'a'){
            console.log("entro a q2,a");
            casilla[0].children('text').html('a');
            casilla[0] = casilla[0].prev();
            desplazar("L");
        }
        else{
            console.log("entro a q2,B");
            estado_qx[0] = "q3";
            casilla[0] = casilla[0].next();
            desplazar("L");
        }
        return false;
    }
    else if(estado_qx[0] ==='q3'){
        desplazar("R");
        return true;
    }
}
