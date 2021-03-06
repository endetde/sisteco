<?php
/**
**********************************************************
Nombre de archivo:	    ActionListarEPusuario.php
Prop�sito:				Permite realizar el listado en tsg_asignacion_estructura
Tabla:					t_tsg_asignacion_estructura
Par�metros:				$cant
						$puntero
						$sortcol
						$sortdir
						$criterio_filtro

Valores de Retorno:    	Listado de Procesos y total de registros listados
Fecha de Creaci�n:		2007-10-31 11:34:02
Versi�n:				RCM
**********************************************************
*/
session_start();
include_once('../LibModeloSeguridad.php');

$Custom = new cls_CustomDBSeguridad();
$nombre_archivo = 'ActionListarEPusuarioSCI.php';

if (!isset($_SESSION['autentificado']))
{
	$_SESSION['autentificado']='NO';
}
if($_SESSION['autentificado']=='SI')
{
	//Par�metros del filtro
	if($limit == ''){ $cant = 15;}
	else {$cant = $limit;};

	 
	
	
	if($start == '') $puntero = 0;
	else $puntero = $start;

	if($sort == '') $sortcol = 'FRPPA.desc_epe';
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
	
	if($sw_reg_comp=='si' &&$m_id_fuente_financiamiento&&$m_id_parametro_conta&&$m_sw_ingreso ){	
		$criterio_filtro=$criterio_filtro." and  FRPPA.id_fina_regi_prog_proy_acti in  (
		select id_fina_regi_prog_proy_acti 
		from presto.tpr_presupuesto 
		where id_fuente_financiamiento=".$m_id_fuente_financiamiento." and   
		id_parametro IN( select parame.id_parametro 
												from presto.tpr_parametro parame 
												where id_gestion in (select par.id_gestion 
																	from sci.tct_parametro  
																	par where par.id_parametro =".$m_id_parametro_conta.")) ";
		if($m_sw_ingreso=='si'){$criterio_filtro=$criterio_filtro." and tipo_pres =1 ";};
			if($m_sw_ingreso=='no'){$criterio_filtro=$criterio_filtro." and tipo_pres in (2,3) ";};
		 $criterio_filtro=$criterio_filtro.")";	
	
	}	
	if($m_sw_rendicion=='si' &&$m_id_unidad_organizacional&&$m_fecha_regis ){	
		$criterio_filtro=$criterio_filtro." and  FRPPA.id_fina_regi_prog_proy_acti in  (
		select id_fina_regi_prog_proy_acti from presto.tpr_presupuesto where id_unidad_organizacional=".$m_id_unidad_organizacional." and 
id_parametro in 
(select id_parametro from presto.tpr_parametro where id_gestion in
(SELECT id_gestion from param.tpm_periodo where ''".$m_fecha_regis."'' BETWEEN fecha_inicio and fecha_final)) 
		
		) ";
		
			
		 
	
	}
	//Obtiene el criterio de orden de columnas
	$crit_sort = new cls_criterio_sort($sortcol,$sortdir,'AsignacionEstructuraSCI');
	
	$sortcol = $crit_sort->get_criterio_sort();
//echo $criterio_filtro."
//".$criterio_filtro;
//	exit();
 $res = $Custom -> ContarEPUsuarioSCI($cant ,$puntero,$sortcol,$sortdir,$criterio_filtro,$hidden_ep_id_financiador,$hidden_ep_id_regional,$hidden_ep_id_programa,$hidden_ep_id_proyecto,$hidden_ep_id_actividad,$filtro_funcion);
	if($res) $total_registros= $Custom->salida;
  
	//Obtiene el conjunto de datos de la consulta
	$res = $Custom->ListarEPUsuarioSCI($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$hidden_ep_id_financiador,$hidden_ep_id_regional,$hidden_ep_id_programa,$hidden_ep_id_proyecto,$hidden_ep_id_actividad,$filtro_funcion);
	
//echo $Custom->query;
//exit;
	
	if($res)
	{
		$xml = new cls_manejo_xml('ROOT');
		$xml->add_nodo('TotalCount',$total_registros);

		foreach ($Custom->salida as $f)
		{
		$xml->add_rama('ROWS');
		$xml->add_nodo('id_fina_regi_prog_proy_acti',$f["id_fina_regi_prog_proy_acti"]);
		$xml->add_nodo('id_financiador',$f["id_financiador"]);
		$xml->add_nodo('codigo_financiador',$f["codigo_financiador"]);
		$xml->add_nodo('nombre_financiador',$f["nombre_financiador"]);
		$xml->add_nodo('id_regional',$f["id_regional"]);
		$xml->add_nodo('codigo_regional',$f["codigo_regional"]);
		$xml->add_nodo('nombre_regional',$f["nombre_regional"]);
		$xml->add_nodo('id_programa',$f["id_programa"]);
		$xml->add_nodo('codigo_programa',$f["codigo_programa"]);
		$xml->add_nodo('nombre_programa',$f["nombre_programa"]);
		$xml->add_nodo('id_proyecto',$f["id_proyecto"]);
		$xml->add_nodo('codigo_proyecto',$f["codigo_proyecto"]);
		$xml->add_nodo('nombre_proyecto',$f["nombre_proyecto"]);
		$xml->add_nodo('id_actividad',$f["id_actividad"]);
		$xml->add_nodo('codigo_actividad',$f["codigo_actividad"]);
		$xml->add_nodo('nombre_actividad',$f["nombre_actividad"]);
		$xml->add_nodo('desc_epe',$f["desc_epe"]);
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


