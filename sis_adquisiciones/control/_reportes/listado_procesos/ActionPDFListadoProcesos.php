<?php
/**
**********************************************************
Nombre de archivo:	    ActionPDFListadoProcesos.php
Prop�sito:				Permite realizar el reporte de prestacion de servicios
Par�metros:				$cant
						$puntero
						$sortcol
						$sortdir
						$criterio_filtro
Valores de Retorno:    	Listado de Procesos y total de registros listados
Fecha de Creaci�n:	    15/03/2010
Versi�n:				1.0.0
Autor:					Ana Maria villegas
**********************************************************
*/
session_start();
include_once("../../LibModeloAdquisiciones.php");
$Custom = new cls_CustomDBAdquisiciones();


$nombre_archivo = 'ActionPDFListadoProcesos.php';

if (!isset($_SESSION['autentificado']))
{
	$_SESSION['autentificado']='NO';
}
if($_SESSION['autentificado']=='SI')
{
//Par�metros del filtro
	if($limit == '') $cant = 30000;
	else $cant = $limit;

	if($start == '') $puntero = 0;
	else $puntero = $start;

	if($sort == '') $sortcol = 'id';
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
	
//$cond->add_criterio_extra("pro.id_depto",$departamento); ////////////////cambiar

	$_SESSION['PDF_tipo_adq']=$tipo_adquisicion;
	$tipo_adquisicion=='Todos'?$tipo_adquisicion='%':$tipo_adquisicion;
	
	$criterio_filtro = $cond -> obtener_criterio_filtro();
	$criterio_filtro = $criterio_filtro. "  and lower(codigo_proceso) like ''%$codigo_proceso%'' and p.id_depto=$id_depto
and p.gestion=$gestion and c.estado_vigente!=''anulado''
and c.id_periodo_adjudicacion>0 and tipadq.tipo_adq like ''$tipo_adquisicion'' ";
	//Obtiene el criterio de orden de columnas
	$crit_sort = new cls_criterio_sort($sortcol,$sortdir,'ListadoProcesos');
	$sortcol = $crit_sort->get_criterio_sort();
	
    //Obtiene el conjunto de datos de la consulta
    
	$res = $Custom->ListadoProcesos($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$id_financiador,$id_regional,$id_programa,$id_proyecto,$id_actividad);
		
	$_SESSION["PDF_listado_procesos"]=$Custom->salida;
	if($res) $total_registros= $Custom->salida;
	
	$_SESSION['PDF_desc_depto']=$departamento;
	$_SESSION['PDF_gestion']=$gestion;
	
	$_SESSION['PDF_codigo_proceso']=$codigo_proceso;
	
	
	if($res)
	{
		header("location: ../../../vista/_reportes/listado_procesos/PDFListadoProcesos.php");
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
	    header("HTTP/1.0 401 No autorizado");
		header('Content-Type: text/plain; charset=iso-8859-1');
		echo "No tiene los permisos necesarios ";

}?>