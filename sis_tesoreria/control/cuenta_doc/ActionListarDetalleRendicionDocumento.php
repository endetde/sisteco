<?php
/**
**********************************************************
Nombre de archivo:	    ActionListarDetalleRendicionDocumento.php
Prop�sito:				Permite realizar el listado en tts_cuenta_doc
Tabla:					tts_tts_cuenta_doc
Par�metros:				$cant
						$puntero
						$sortcol
						$sortdir
						$criterio_filtro

Valores de Retorno:    	Listado de Procesos y total de registros listados
Fecha de Creaci�n:		05/03/2010
Versi�n:				1.0.0
Autor:					AVQ
**********************************************************
*/
session_start();
include_once('../LibModeloTesoreria.php');

$Custom = new cls_CustomDBTesoreria();

$nombre_archivo = 'ActionListarDetalleRendicionDocumento.php';

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

	if($sort == '') $sortcol = 'id_cuenta_doc desc';
	else $sortcol = $sort;

	if($dir == '') $sortdir = 'desc';
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
	
	$criterio_filtro=$criterio_filtro." AND vredoc.id_caja=".$m_id_caja;
	
	//Obtiene el criterio de orden de columnas
	/*$crit_sort = new cls_criterio_sort($sortcol,$sortdir,'CuentaDoc');
	$sortcol = $crit_sort->get_criterio_sort();
*/
	//Obtiene el total de los registros
	
	$res = $Custom -> ContarDetalleRendicionDocumento($cant ,$puntero,$sortcol,$sortdir,$criterio_filtro,$hidden_ep_id_financiador,$hidden_ep_id_regional,$hidden_ep_id_programa,$hidden_ep_id_proyecto,$hidden_ep_id_actividad);
	if($res) $total_registros= $Custom->salida;

	//Obtiene el conjunto de datos de la consulta
	$res = $Custom->ListarDetalleRendicionDocumento($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$hidden_ep_id_financiador,$hidden_ep_id_regional,$hidden_ep_id_programa,$hidden_ep_id_proyecto,$hidden_ep_id_actividad);
	
	if($res)
	{
		$xml = new cls_manejo_xml('ROOT');
		$xml->add_nodo('TotalCount',$total_registros);
		foreach ($Custom->salida as $f)
		{
			$xml->add_rama('ROWS');
			$xml->add_nodo('id_caja',$f["id_caja"]);
			$xml->add_nodo('id_cuenta_doc',$f["id_cuenta_doc"]);
			$xml->add_nodo('id_cuenta_doc_rendicion',$f["id_cuenta_doc_rendicion"]);
			$xml->add_nodo('id_documento',$f["id_documento"]);
			$xml->add_nodo('nro_documento',$f["nro_documento"]);
			$xml->add_nodo('razon_social',$f["razon_social"]);
			$xml->add_nodo('motivo',$f["motivo"]);
			$xml->add_nodo('nro_nit',$f["nro_nit"]);
			$xml->add_nodo('factura',$f["factura"]);
			$xml->add_nodo('importe_rendicion',$f["importe_rendicion"]);
			$xml->add_nodo('importe_total',$f["importe_total"]);
			$xml->add_nodo('fk_id_cuenta_doc',$f["fk_id_cuenta_doc"]);
			$xml->add_nodo('id_subsistema',$f["id_subsistema"]);
			$xml->add_nodo('fecha',$f["fecha"]);
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