<?php
/**
**********************************************************
Nombre de archivo:	    ActionListarEmpleadoCapacitacion.php
Prop�sito:				Permite realizar el listado en tkp_empleado_Capacitacion
Tabla:					t_tkp_empleado_Capacitacion
Par�metros:				$cant
						$puntero
						$sortcol
						$sortdir
						$criterio_filtro

Valores de Retorno:    	Listado de Procesos y total de registros listados
Fecha de Creaci�n:		12-08-2010
Versi�n:				1.0.0
Autor:					Mercedes Zambrana Meneses
**********************************************************
*/
session_start();
include_once('../LibModeloKardexPersonal.php');

$Custom = new cls_CustomDBKardexPersonal();
$nombre_archivo = 'ActionListarEmpleadoCapacitacion.php';

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

	if($sort == '') $sortcol = 'id_empleado_capacitacion';
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
	if($m_id_empleado>0){
		$cond->add_criterio_extra("EMPLEA.id_empleado",$m_id_empleado);
	}
	if($m_id_persona>0){
		$cond->add_criterio_extra("PERSON.id_persona",$m_id_persona);
	}
	
	$criterio_filtro = $cond -> obtener_criterio_filtro();
	
	
	
	//Obtiene el criterio de orden de columnas
	//$crit_sort = new cls_criterio_sort($sortcol,$sortdir,'EmpleadoCapacitacion');
	//$sortcol = $crit_sort->get_criterio_sort();
	

	//Obtiene el total de los registros
	$res = $Custom -> ContarEmpleadoCapacitacion($cant ,$puntero,$sortcol,$sortdir,$criterio_filtro,$hidden_ep_id_financiador,$hidden_ep_id_regional,$hidden_ep_id_programa,$hidden_ep_id_proyecto,$hidden_ep_id_actividad);

	/*echo $criterio_filtro;
	exit;	*/
	
	if($res) $total_registros= $Custom->salida;
	
	//Obtiene el conjunto de datos de la consulta
	$res = $Custom->ListarEmpleadoCapacitacion($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$hidden_ep_id_financiador,$hidden_ep_id_regional,$hidden_ep_id_programa,$hidden_ep_id_proyecto,$hidden_ep_id_actividad);
	
	if($res)
	{
		$xml = new cls_manejo_xml('ROOT');
		$xml->add_nodo('TotalCount',$total_registros);

		foreach ($Custom->salida as $f)
		{
			$xml->add_rama('ROWS');
			$xml->add_nodo('id_empleado_capacitacion',$f["id_empleado_capacitacion"]);
			$xml->add_nodo('id_tipo_capacitacion',$f["id_tipo_capacitacion"]);
			$xml->add_nodo('descripcion',$f["descripcion"]);
			$xml->add_nodo('id_institucion',$f["id_institucion"]);
			
			$xml->add_nodo('financiado',$f["financiado"]);
			$xml->add_nodo('fecha_ini',$f["fecha_ini"]);
			$xml->add_nodo('fecha_fin',$f["fecha_fin"]);
			$xml->add_nodo('id_empleado',$f["id_empleado"]);
			$xml->add_nodo('desc_institucion',$f["desc_institucion"]);
			$xml->add_nodo('desc_empleado',$f["desc_empleado"]);
			$xml->add_nodo('desc_capacitacion',$f["desc_capacitacion"]);
			$xml->add_nodo('nombre',$f["nombre"]);
			$xml->add_nodo('nombre_institucion',$f["nombre_institucion"]);
			$xml->add_nodo('direccion_institucion',$f["direccion_institucion"]);
			$xml->add_nodo('ano_graduacion',$f["ano_graduacion"]);
			$xml->add_nodo('lugar_capacitacion',$f["lugar_capacitacion"]);
			$xml->add_nodo('id_carrera',$f["id_carrera"]);
			
			$xml->add_nodo('fecha_titulo',$f["fecha_titulo"]);
			$xml->add_nodo('carrera',$f["carrera"]);
			$xml->add_nodo('reg_profesional',$f["reg_profesional"]);
			
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