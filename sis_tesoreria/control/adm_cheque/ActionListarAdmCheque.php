<?php
/**
 **********************************************************
 Nombre de archivo:	    ActionListarAdmCheque.php
 Prop�sito:				Permite realizar el listado en tts_caja
 Tabla:					tts_tts_caja
 Par�metros:				$cant
 $puntero
 $sortcol
 $sortdir
 $criterio_filtro

 Valores de Retorno:    	Listado de Procesos y total de registros listados
 Fecha de Creaci�n:		09/11/2009
 Versi�n:				1.0.0
 Autor:					RCM
 **********************************************************
 */
session_start();
include_once('../LibModeloTesoreria.php');

$Custom = new cls_CustomDBTesoreria();
$nombre_archivo = 'ActionListarAdmCheque.php';



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

	if($sort == '') $sortcol = 'fecha_cheque';
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

	if($m_id_cuenta_bancaria){
	  	$criterio_filtro=$criterio_filtro." AND id_cuenta_bancaria=".$m_id_cuenta_bancaria;	
	}
	
	//Obtiene el criterio de orden de columnas
	$crit_sort = new cls_criterio_sort($sortcol,$sortdir,'AdmChequeImp');
	$sortcol = $crit_sort->get_criterio_sort();



	//Obtiene el total de los registros
	$res = $Custom -> ContarAdmCheque($cant ,$puntero,$sortcol,$sortdir,$criterio_filtro,$hidden_ep_id_financiador,$hidden_ep_id_regional,$hidden_ep_id_programa,$hidden_ep_id_proyecto,$hidden_ep_id_actividad);

	if($res) $total_registros= $Custom->salida;

	//Obtiene el conjunto de datos de la consulta
	$res = $Custom->ListarAdmCheque($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$hidden_ep_id_financiador,$hidden_ep_id_regional,$hidden_ep_id_programa,$hidden_ep_id_proyecto,$hidden_ep_id_actividad);

	if($res)
	{
		$xml = new cls_manejo_xml('ROOT');
		$xml->add_nodo('TotalCount',$total_registros);

		foreach ($Custom->salida as $f)
		{
			$xml->add_rama('ROWS');
			$xml->add_nodo('tipo',$f["tipo"]);
			$xml->add_nodo('id_cheque',$f["id_cheque"]);
			$xml->add_nodo('id_cuenta_bancaria',$f["id_cuenta_bancaria"]);
			$xml->add_nodo('fecha_cheque',$f["fecha_cheque"]);
			$xml->add_nodo('nombre_cheque',$f["nombre_cheque"]);
			$xml->add_nodo('nro_cheque',$f["nro_cheque"]);
			$xml->add_nodo('importe_cheque',$f["importe_cheque"]);
			$xml->add_nodo('id',$f["id"]);
			$xml->add_nodo('fecha_desde',$f["fecha_desde"]);
			$xml->add_nodo('fecha_hasta',$f["fecha_hasta"]);
			$xml->add_nodo('descripcion',$f["descripcion"]);
			$xml->add_nodo('observaciones',$f["observaciones"]);
			$xml->add_nodo('id_empleado_origen',$f["id_empleado_origen"]);
			$xml->add_nodo('desc_empleado_origen',$f["desc_empleado_origen"]);
			$xml->add_nodo('codigo',$f["codigo"]);
			$xml->add_nodo('moneda',$f["moneda"]);
			$xml->add_nodo('tipo_especifico',$f["tipo_especifico"]);
			$xml->add_nodo('id_moneda',$f["id_moneda"]);
			$xml->add_nodo('banco',$f["banco"]);
			$xml->add_nodo('nro_cuenta_banco',$f["nro_cuenta_banco"]);
			$xml->add_nodo('estado',$f["estado"]);
			$xml->add_nodo('tipo_largo',$f["tipo_largo"]);
			$xml->add_nodo('id_depto',$f["id_depto"]);
			$xml->add_nodo('nombre_depto',$f["nombre_depto"]);
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