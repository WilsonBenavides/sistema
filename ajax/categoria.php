<?php  
require_once "../modelos/Categoria.php";

$categoria = new Categoria();

$idcategoria = isset($_POST["idcategoria"])? limpiarCadena($_POST["idcategoria"]):"";
$nombre = isset($_POST["nombre"])? limpiarCadena($_POST["nombre"]):"";
$descripcion = isset($_POST["descripcion"])? limpiarCadena($_POST["descripcion"]):"";

switch ($_GET["op"]) {
	case 'guardaryeditar':
		if (empty($idcategoria)) {
			$rspta = $categoria->insertar($nombre, $descripcion);
			echo $rspta ? "Categoría registrada" : "Categoría no se pudo registrar";
		} else {
			$rspta = $categoria->editar($idcategoria, $nombre, $descripcion);
			echo $rspta ? "Categoría actualizada" : "Categoría no se pudo actualizar";
		}
	break;

	case 'desactivar':
		$rspta = $categoria->desactivar($idcategoria);
		echo $rspta ? "Categoría desactivada" : "Categoría no se puede desactivar";
	break;

	case 'activar':
		$rspta = $categoria->activar($idcategoria);
		echo $rspta ? "Categoría activada" : "Categoría no se puede activar";
	break;

	case 'mostrar':
		$rspta = $categoria->mostrar($idcategoria);
		//codificar el resultado utilizando json
		echo json_encode($rspta);
	break;

	case 'listar':
		$rspta = $categoria->listar();
		//Declaramos un array
		$data = Array();

		while ($reg=$rspta->fetch_object()) {
			$data[] = array(
					"0"=>$reg->idcategoria,
					"1"=>$reg->nombre,
					"2"=>$reg->descripcion,
					"3"=>$reg->condicion
			);

		}
		$results = array(
				"sEcho"=>1, //Información para el datatable
				"iTotalRecords"=>count($data),
				"iTotalDisplayRecords"=>count($data),
				"aaData"=>$data);
		echo json_encode($results);
	break;
}
 ?>
