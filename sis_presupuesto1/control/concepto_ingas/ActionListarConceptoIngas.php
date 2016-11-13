<?php
/**
**********************************************************
Nombre de archivo:	    ActionListarConceptoIngas.php
Prop�sito:				Permite realizar el listado en tpr_concepto_ingas
Tabla:					t_tpr_concepto_ingas
Par�metros:				$cant
						$puntero
						$sortcol
						$sortdir
						$criterio_filtro

Valores de Retorno:    	Listado de Procesos y total de registros listados
Fecha de Creaci�n:		2008-07-07 15:19:35
Versi�n:				1.0.0
Autor:					Generado Automaticamente
**********************************************************
*/
session_start();
include_once('../LibModeloPresupuesto.php');

$Custom = new cls_CustomDBPresupuesto();
$nombre_archivo = 'ActionListarConceptoIngas.php';

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

	if($sort == '') $sortcol = 'CONING.desc_ingas_item_serv';
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
	
	$cond->add_criterio_extra("PARTID.id_partida",$m_id_partida);
	
	//para el filtro de sw SI NO----suuu
	//$cond->add_criterio_extra("sw_tesoro",$sw_tesoro);
	$criterio_filtro = $cond -> obtener_criterio_filtro();
	
	//Filtramos los conceptos de gasto que tengan sw_tesoro = si, viaticos ,6=PASAJES POR AGENCIA
	if($sw_tesoro==1){
		$criterio_filtro = $criterio_filtro." AND CONING.sw_tesoro IN (1,3,4,5,6,7)  ";
	}	
	
	//Filtramos solamente los conceptos de gasto que tienen sw_tesoro = no = 2
	if($sw_tesoro==2){
		$criterio_filtro =$criterio_filtro." AND CONING.sw_tesoro IN (2)  ";		
	}
		
	if($sw_tesoro==1 && $m_gestion !=''){
		$criterio_filtro = $criterio_filtro." AND CONING.sw_tesoro IN (1,3,4,5,6,7) AND CONING.id_partida IN (select id_partida from presto.tpr_partida 
																												where id_parametro IN (select id_parametro from presto.tpr_parametro 
						                    																							where id_gestion=$m_gestion)) ";
	}	
	
	//Filtramos solamente los conceptos de gasto que tienen sw_tesoro = no = 2 y de la gestion enviada
	if($sw_tesoro==2 && $m_gestion !='' ){
		$criterio_filtro = $criterio_filtro." AND CONING.sw_tesoro IN (2) AND CONING.id_partida IN (select id_partida from presto.tpr_partida 
																									where id_parametro IN (select id_parametro from presto.tpr_parametro 
						                    																				where id_gestion=$m_gestion)) ";
	}
	
	//Filtramos solo los conceptos de gasto que tienen sw_tesoro = viatico
	if($sw_tesoro==3){
		$criterio_filtro = $criterio_filtro." AND CONING.sw_tesoro in (3,6,7) ";
	}	
	
	//Filtramos solo los conceptos de gasto que tienen sw_tesoro = fa
	if($sw_tesoro==4){
		$criterio_filtro = $criterio_filtro." AND CONING.sw_tesoro in (4) ";
	}
	
	if($m_id_unidad_organizacional&&$m_id_presupuesto&&$m_sw_rendicion=='si'){	
		$criterio_filtro = $criterio_filtro." AND  CONING.id_concepto_ingas in 
		(select id_concepto_ingas from presto.tpr_concepto_cta  where id_unidad_organizacional=".$m_id_unidad_organizacional.")
		 AND CONING.id_partida in (select id_partida from presto.tpr_partida_presupuesto where id_presupuesto =".$m_id_presupuesto."
		 UNION 
 		 select id_partida from presto.tpr_partida where   sw_transaccional=1 and sw_movimiento=2 and id_parametro in (select id_parametro from presto.tpr_presupuesto where id_presupuesto=".$m_id_presupuesto.")
		)		
		";
	}	
	
	if($id_gestion!=''){
		$criterio_filtro.=" AND PARAME.id_gestion = $id_gestion";
		
		if($sw_tesoro==6){ // SIN w_tesoro = 6 PASAJES POR AGENCIA
			$criterio_filtro = $criterio_filtro." AND CONING.sw_tesoro NOT IN (6)";
		}
		
		if($sw_tesoro==8){ // SOLO w_tesoro = 8 RECURSOS
			$criterio_filtro = $criterio_filtro." AND CONING.sw_tesoro IN (8)";
		}
	}
	
	if($sw_tesoro==8 && $m_gestion !='' ){
		$criterio_filtro = $criterio_filtro." AND CONING.sw_tesoro IN (2) AND CONING.id_partida IN (SELECT id_partida FROM presto.tpr_partida
		WHERE tipo_partida = 1 AND id_parametro IN (SELECT id_parametro FROM presto.tpr_parametro WHERE id_gestion=$m_gestion)) ";
	}
	
	if($sw_tesoro==8 && $m_id_presupuesto){
		$criterio_filtro = $criterio_filtro." AND  CONING.id_concepto_ingas IN 
		(SELECT id_concepto_ingas FROM presto.tpr_concepto_cta WHERE id_presupuesto = ".$m_id_presupuesto.")";
	}
	
	//Obtiene el criterio de orden de columnas
	$crit_sort = new cls_criterio_sort($sortcol,$sortdir,'ConceptoIngas_01');
	$sortcol = $crit_sort->get_criterio_sort();
	

	//Obtiene el total de los registros
	$res = $Custom -> ContarConceptoIngas($cant ,$puntero,$sortcol,$sortdir,$criterio_filtro,$hidden_ep_id_financiador,$hidden_ep_id_regional,$hidden_ep_id_programa,$hidden_ep_id_proyecto,$hidden_ep_id_actividad);

	if($res) $total_registros= $Custom->salida;

	//Obtiene el conjunto de datos de la consulta
	$res = $Custom->ListarConceptoIngas($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$hidden_ep_id_financiador,$hidden_ep_id_regional,$hidden_ep_id_programa,$hidden_ep_id_proyecto,$hidden_ep_id_actividad);
	
	if($res)
	{
		$xml = new cls_manejo_xml('ROOT');
		$xml->add_nodo('TotalCount',$total_registros);

		foreach ($Custom->salida as $f)
		{
			$xml->add_rama('ROWS');
			$xml->add_nodo('id_concepto_ingas',$f["id_concepto_ingas"]);
			$xml->add_nodo('desc_ingas',$f["desc_ingas"]);
			$xml->add_nodo('id_partida',$f["id_partida"]);
			$xml->add_nodo('desc_partida',$f["desc_partida"]);
            $xml->add_nodo('id_item',$f["id_item"]);
			$xml->add_nodo('desc_item',$f["desc_item"]);
			$xml->add_nodo('id_servicio',$f["id_servicio"]);
			$xml->add_nodo('desc_servicio',$f["desc_servicio"]);
			$xml->add_nodo('desc_ingas_item_serv',$f["desc_ingas_item_serv"]);
			$xml->add_nodo('sw_tesoro',$f["sw_tesoro"]);
			$xml->add_nodo('id_oec',$f["id_oec"]);
			$xml->add_nodo('nombre_oec',$f["desc_oec"]);
			$xml->add_nodo('desc_ingas_item_serv_padre',$f["desc_ingas_item_serv_padre"]);
			$xml->add_nodo('fk_id_concepto_ingas',$f["fk_id_concepto_ingas"]);
			$xml->add_nodo('campo_doc',$f["campo_doc"]);
			$xml->add_nodo('gestion_pres',$f["gestion_pres"]);
			$xml->add_nodo('estado',$f["estado"]);
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