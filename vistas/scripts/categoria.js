var tabla;

//Función que se ejecuta al inicio
function init() {
	mostrarform(false);
	listar();
	
	$("#formulario").on("submit", function(e) {		
		guardaryeditar(e);
	})
}

//Función limpiar
function limpiar() {
	$("idcategoria").val("");
	$("nombre").val("");
	$("descripcion").val("");

}

//Función mostrar formulario
function mostrarform(flag) {
	limpiar();
	if (flag) {
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled", false);
	}
	else {
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
	}
}

//Función cancelarform
function cancelarform() {
	limpiar();
	mostrarform(false);
}

//Función listar
function listar() {
	tabla = $('#tbllistado').dataTable({
		"aProcessing": true, //Activamos el procesamiento dle datatables
		"aServerSide": true, //Paginación y filtrado realizados por el servidor
		dom: 'Bfrtip', //Definimos los elementos del contro de tabla
		buttons: [
			'copyHtml5',
			'excelHtml5',
			'csvHtml5',
			'pdf'
		],
	"ajax": 
		{
			url: '../ajax/categoria.php?op=listar',
			type : "get",
			dataType : "json",
			error: function(e) {
				console.log(e.responseText);
			}
		},
	"bDestroy" : true,
	"iDisplayLength" : 5, //Paginación
	"order" : [[ 0, "desc"]]//Ordernar (columna, orden)
	}).DataTable();
}

function guardaryeditar(e)
{
	console.log("click");
	e.preventDefault(); //No se activará la acción predeterminada del evento
	$("#btnGuardar").prop("disabled",true);
	var formData = new FormData($("#formulario")[0]);

	$.ajax({

		url: "../ajax/categoria.php?op=guardaryeditar",
	    type: "POST",
	    data: formData,
	    contentType: false,
	    processData: false,

	    success: function(datos)
	    {                    
	          bootbox.alert(datos);	          
	          mostrarform(false);
	          tabla.ajax.reload();
	    }

	});
	limpiar();
}

init();