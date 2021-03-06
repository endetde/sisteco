<?php
/**
**********************************************************
Nombre de archivo:	    ActionFinalizarRendiciones.php
Prop�sito:				Permite eliminar registros de la tabla tts_cuenta_doc
Tabla:					tts_tts_cuenta_doc
Par�metros:				$id_depto


Valores de Retorno:    	N�mero de registros
Fecha de Creaci�n:		2009-10-27 10:40:41
Versi�n:				1.0.0
Autor:					Generado Automaticamente
**********************************************************
*/
session_start();
include_once("../LibModeloTesoreria.php");

$Custom = new cls_CustomDBTesoreria();

$nombre_archivo = "ActionEstadoCuentaDoc.php";

if (!isset($_SESSION["autentificado"]))
{
	$_SESSION["autentificado"]="NO";
}


if($_SESSION["autentificado"]=="SI")
{
	if (sizeof($_GET) >0)
	{
		$get=true;
		$cont=1;
	}
	elseif(sizeof($_POST) >0)
	{
		$get=false;
		$cont =  $_POST["cantidad_ids"];
		$cont=1;
	}
	else
	{
		$resp = new cls_manejo_mensajes(true, "406");
		$resp->mensaje_error = "MENSAJE ERROR = No existen datos para Cambiar Estado.";
		$resp->origen = "ORIGEN = $nombre_archivo";
		$resp->proc = "PROC = $nombre_archivo";
		$resp->nivel = "NIVEL = 4";
		echo $resp->get_mensaje();
		exit;
	}

	
	for($j = 0;$j < $cont; $j++)
	{
		if ($get){ 
			$id_cuenta_doc = $_GET["id_cuenta_doc_$j"];
			$tipo_pago_fin = $_GET["tipo_pago_fin_$j"];
			$id_caja_fin = $_GET["id_caja_fin_$j"];
			$id_cajero_fin = $_GET["id_cajero_fin_$j"];
			$id_cuenta_bancaria_fin = $_GET["id_cuenta_bancaria_fin_$j"];
			$nro_deposito = $_GET["nro_deposito_$j"];
		} else{
			$id_cuenta_doc = $_POST["id_cuenta_doc_$j"];
			$tipo_pago_fin = $_POST["tipo_pago_fin_$j"];
			$id_caja_fin = $_POST["id_caja_fin_$j"];
			$id_cajero_fin = $_POST["id_cajero_fin_$j"];
			$id_cuenta_bancaria_fin = $_POST["id_cuenta_bancaria_fin_$j"];
			$nro_deposito = $_POST["nro_deposito_$j"];
		}

		if ($id_cuenta_doc == "undefined" || $id_cuenta_doc == ""){
			$resp = new cls_manejo_mensajes(true, "406");
			$resp->mensaje_error = "MENSAJE ERROR = No existe el registro especificado para realizar el registro.";
			$resp->origen = "ORIGEN = $nombre_archivo";
			$resp->proc = "PROC = $nombre_archivo";
			$resp->nivel = "NIVEL = 4";
			echo $resp->get_mensaje();
			exit;
		} else{	
			
			$res = $Custom-> RegistrarDatosFinalizacion($id_cuenta_doc,$tipo_pago_fin,$id_cuenta_bancaria_fin,$id_caja_fin,$id_cajero_fin,$nro_deposito);
			if(!$res){
				$resp = new cls_manejo_mensajes(true, "406");
				$resp->mensaje_error = $Custom->salida[1] ;
				$resp->origen = $Custom->salida[2];
				$resp->proc = $Custom->salida[3];
				$resp->nivel = $Custom->salida[4];
				$resp->query = $Custom->query;
				echo $resp->get_mensaje();
				exit;
			}
		}
	}//end for

	//Guarda el mensaje de �xito de la operaci�n realizada
	if($cont>1) $mensaje_exito = "Se cambio el estado de los registros especificados.";
	else $mensaje_exito = $Custom->salida[1];

	//Obtiene el total de los registros. Par�metros del filtro
	if($cant == "") $cant = 100;
	if($puntero == "") $puntero = 0;
	if($sortcol == "") $sortcol = "id_cuenta_doc";
	if($sortdir == "") $sortdir = "asc";
	$criterio_filtro = "0=0";

	$res = $Custom->ContarSolicitudViaticos2($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$id_financiador,$id_regional,$id_programa,$id_proyecto,$id_actividad,$vista,$estado);
	if($res) $total_registros = $Custom->salida;

	//Arma el xml para desplegar el mensaje
	$resp = new cls_manejo_mensajes(false);
	$resp->add_nodo("TotalCount", $total_registros);
	$resp->add_nodo("mensaje",$mensaje_exito);
	$resp->add_nodo("tiempo_resp", "200");
	echo $resp->get_mensaje();
	exit;
}
else
{
	$resp = new cls_manejo_mensajes(true, "401");
	$resp->mensaje_error = "MENSAJE ERROR = Usuario no Autentificado";
	$resp->origen = "ORIGEN = $nombre_archivo";
	$resp->proc = "PROC = $nombre_archivo";
	$resp->nivel = "NIVEL = 1";
	echo $resp->get_mensaje();
	exit;
}
?>