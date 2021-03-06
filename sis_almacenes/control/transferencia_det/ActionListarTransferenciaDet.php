<?php
/**
**********************************************************
Nombre de archivo:	    ActionListarTransferenciaDet.php
Prop�sito:				Permite realizar el listado en tal_transferencia_det
Tabla:					t_tal_transferencia_det
Par�metros:				$cant
						$puntero
						$sortcol
						$sortdir
						$criterio_filtro

Valores de Retorno:    	Listado de Procesos y total de registros listados
Fecha de Creaci�n:		2007-11-21 08:51:46
Versi�n:				1.0.0
Autor:					Generado Automaticamente
**********************************************************
*/
session_start();
include_once('../LibModeloAlmacenes.php');

$Custom = new cls_CustomDBAlmacenes();
$nombre_archivo = 'ActionListarTransferenciaDet .php';

if (!isset($_SESSION['autentificado']))
{
	$_SESSION['autentificado']='NO';
}
if($_SESSION['autentificado']=='SI')
{
//Par�metros del filtro
	if($limit == '') $cant = 15;
	else $cant = $limit;

	if($start == '') $puntero = 0;
	else $puntero = $start;

	if($sort == '') $sortcol = 'id_transferencia_det';
	else $sortcol = $sort;

	if($dir == '') $sortdir = 'asc';
	else $sortdir = $dir;

	//Verifica si se har� o no la decodificaci�n(s�lo pregunta en caso del GET)
	//valores permitidos de $cod -> 'si', 'no'
	
	switch ($cod)
	{
		case 'si':
			$decodificar = true;
			break;
		case 'no':
			$decodificar = false;
			break;
		default:
			$decodificar = true;
			break;
	}

	//Verifica si se manda la cantidad de filtros
	if($CantFiltros=='') $CantFiltros = 0;

	//Se obtiene el criterio del filtro con formato sql para mandar a la BD
	$cond = new cls_criterio_filtro($decodificar);
	for($i=0;$i<$CantFiltros;$i++)
	{
		$cond->add_condicion_filtro($_POST["filterCol_$i"], $_POST["filterValue_$i"], $_POST["filterAvanzado_$i"]);
	}
	$criterio_filtro = $cond -> obtener_criterio_filtro();

	//Obtiene el criterio de orden de columnas
	$crit_sort = new cls_criterio_sort($sortcol,$sortdir,'TransferenciaDet');
	$sortcol = $crit_sort->get_criterio_sort();

	//Obtiene el total de los registros
	
	$res = $Custom -> ContarTransferenciaDet($cant ,$puntero,$sortcol,$sortdir,$criterio_filtro,$hidden_ep_id_financiador,$hidden_ep_id_regional,$hidden_ep_id_programa,$hidden_ep_id_proyecto,$hidden_ep_id_actividad);

	if($res) $total_registros= $Custom->salida;

	//Obtiene el conjunto de datos de la consulta
	
	$res = $Custom->ListarTransferenciaDet($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$hidden_ep_id_financiador,$hidden_ep_id_regional,$hidden_ep_id_programa,$hidden_ep_id_proyecto,$hidden_ep_id_actividad);
	
	if($res)
	{
		$xml = new cls_manejo_xml('ROOT');
		$xml->add_nodo('TotalCount',$total_registros);

		foreach ($Custom->salida as $f)
		{
			$xml->add_rama('ROWS');
			$xml->add_nodo('id_transferencia_det',$f["id_transferencia_det"]);
			$xml->add_nodo('cantidad',$f["cantidad"]);
			$xml->add_nodo('estado_item',$f["estado_item"]);
			$xml->add_nodo('costo',$f["costo"]);
			$xml->add_nodo('costo_unitario',$f["costo_unitario"]);
			$xml->add_nodo('precio_unitario',$f["precio_unitario"]);
			$xml->add_nodo('fecha_reg',$f["fecha_reg"]);
			$xml->add_nodo('id_item',$f["id_item"]);
			$xml->add_nodo('desc_item',$f["desc_item"]);
			$xml->add_nodo('id_transferencia',$f["id_transferencia"]);
			$xml->add_nodo('desc_transferencia',$f["desc_transferencia"]);
			$xml->add_nodo('id_unidad_constructiva',$f["id_unidad_constructiva"]);
			$xml->add_nodo('desc_unidad_constructiva',$f["desc_unidad_constructiva"]);
			$xml->add_nodo('nombre',$f["nombre"]);
			$xml->add_nodo('descripcion',$f["descripcion"]);
			$xml->add_nodo('nombre_supg',$f["nombre_supg"]);
			$xml->add_nodo('nombre_grupo',$f["nombre_grupo"]);
			$xml->add_nodo('nombre_subg',$f["nombre_subg"]);
			$xml->add_nodo('nombre_id1',$f["nombre_id1"]);
			$xml->add_nodo('nombre_id2',$f["nombre_id2"]);
			$xml->add_nodo('nombre_id3',$f["nombre_id3"]);

			$xml->fin_rama();
		}
		$xml->mostrar_xml();
	}
	else
	{
		//Se produjo un error
		$resp = new cls_manejo_mensajes(true,'406');
		$resp->mensaje_error = $Custom->salida[1];
		$resp->origen = $Custom->salida[2];
		$resp->proc = $Custom->salida[3];
		$resp->nivel = $Custom->salida[4];
		$resp->query = $Custom->query;
		echo $resp->get_mensaje();
		exit;
	}
}
else
{
	$resp = new cls_manejo_mensajes(true, "401");
	$resp->mensaje_error = 'MENSAJE ERROR = Usuario no Autentificado';
	$resp->origen = "ORIGEN = $nombre_archivo";
	$resp->proc = "PROC = $nombre_archivo";
	$resp->nivel = 'NIVEL = 3';
	echo $resp->get_mensaje();
	exit;

}?>