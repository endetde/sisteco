<?php
/**
**********************************************************
Nombre de archivo:	    ActionGuardarOrdenIngresoSol.php
Prop�sito:				Permite insertar y modificar datos en la tabla tal_ingreso
Tabla:					tal_tal_ingreso
Par�metros:				$hidden_id_ingreso
						$txt_correlativo_ord_ing
						$txt_correlativo_ing
						$txt_codigo
						$txt_descripcion
						$txt_observaciones
						$txt_costo_total
						$txt_contabilizar
						$txt_contabilizado
						$txt_estado_ingreso
						$txt_estado_registro
						$txt_cod_inf_tec
						$txt_resumen_inf_tec
						$txt_fecha_borrador
						$txt_fecha_pendiente
						$txt_fecha_aprobado_rechazado
						$txt_fecha_ing_fisico
						$txt_fecha_ing_valorado
						$txt_fecha_finalizado_cancelado
						$txt_fecha_reg
						$txt_id_responsable_almacen
						$txt_id_proveedor
						$txt_id_contratista
						$txt_id_empleado
						$txt_id_almacen_logico
						$txt_id_firma_autorizada
						$txt_id_institucion
						$txt_id_motivo_ingreso

Valores de Retorno:    	N�mero de registros guardados
Fecha de Creaci�n:		2007-10-18 20:49:02
Versi�n:				1.0.0
Autor:					Generado Automaticamente
**********************************************************
*/
session_start();
include_once("../rac_LibModeloAlmacenes.php");

$Custom = new cls_CustomDBAlmacenes();
$nombre_archivo = "ActionGuardarSalidaPedidoFin.php";

if (!isset($_SESSION["autentificado"]))
{
	$_SESSION["autentificado"]="NO";
}
if($_SESSION["autentificado"]=="SI")
{
	//Verifica si los datos vienen por POST o GET
	if (sizeof($_GET) > 0)
	{
		$get=true;
		$cont=1;

		//Verifica si se har� o no la decodificaci�n(s�lo pregunta en caso del GET)
		//valores permitidos de $cod -> "si", "no"
		switch ($cod)
		{
			case "si":
				$decodificar = true;
				break;
			case "no":
				$decodificar = false;
				break;
			default:
				$decodificar = true;
				break;
		}
	}
	elseif(sizeof($_POST) > 0)
	{
		$get = false;
		$cont =  $_POST["cantidad_ids"];

		//Por Post siempre se decodifica
		$decodificar = true;
	}
	else
	{
		$resp = new cls_manejo_mensajes(true, "406");
		$resp->mensaje_error = "MENSAJE ERROR = No existen datos para almacenar.";
		$resp->origen = "ORIGEN = ";
		$resp->proc = "PROC = ";
		$resp->nivel = "NIVEL = 4";
		echo $resp->get_mensaje();
		exit;
	}

	//Envia al Custom la bandera que indica si se decodificar� o no
	$Custom->decodificar = $decodificar;

	//Realiza el bucle por todos los ids mandados
	for($j = 0;$j < $cont; $j++)
	{
		if ($get)
		{
			$hidden_id_salida= $_GET["hidden_id_salida_$j"];
		}
		else
		{
			$hidden_id_salida=$_POST["hidden_id_salida_$j"];
		}
		
		if ($hidden_id_salida == "undefined" || $hidden_id_salida == "")
		{
			$resp = new cls_manejo_mensajes(true, "406");
			$resp->mensaje_error = "Pedido inexistente";
			$resp->origen = $nombre_archivo;
			$resp->proc = "";
			$resp->nivel = "3";
			echo $resp->get_mensaje();
			exit;
		}
		else
		{	
			
			//Validaci�n de datos (del lado del servidor)
			/*$res = $Custom->ValidarSalidaPedido("fin",$hidden_id_salida, $txt_correlativo_sal,$txt_correlativo_vale,$txt_descripcion,$txt_contabilizar,$txt_contabilizado,$txt_estado_salida,$txt_estado_registro,$txt_motivo_cancelacion,$txt_id_responsable_almacen,$txt_id_almacen_logico,$txt_id_empleado,$txt_id_firma_autorizada,$txt_id_contratista,$txt_id_tipo_material,$txt_id_institucion,$txt_id_subactividad,$txt_id_motivo_salida_cuenta,$txt_tipo_pedido);

			if(!$res)
			{
				//Error de validaci�n
				$resp = new cls_manejo_mensajes(true, "406");
				$resp->mensaje_error = $Custom->salida[1];
				$resp->origen = $Custom->salida[2];
				$resp->proc = $Custom->salida[3];
				$resp->nivel = $Custom->salida[4];
				echo $resp->get_mensaje();
				exit;
			}*/

			$res = $Custom->FinalizarSalidaUCProy($hidden_id_salida, $txt_correlativo_sal,$txt_correlativo_vale,$txt_descripcion,$txt_contabilizar,$txt_contabilizado,$txt_estado_salida,$txt_estado_registro,$txt_motivo_cancelacion,$txt_id_responsable_almacen,$txt_id_almacen_logico,$txt_id_empleado,$txt_id_firma_autorizada,$txt_id_contratista,$txt_id_tipo_material,$txt_id_institucion,$txt_id_subactividad,$txt_id_motivo_salida_cuenta,$emergencia);

			if(!$res)
			{
				//Se produjo un error
				$resp = new cls_manejo_mensajes(true, "406");
				$resp->mensaje_error = $Custom->salida[1];
				$resp->origen = $Custom->salida[2];
				$resp->proc = $Custom->salida[3];
				$resp->nivel = $Custom->salida[4];
				$resp->query = $Custom->query;
				echo $resp->get_mensaje();
				exit;
			}
		}

	}//END FOR

	//Guarda el mensaje de �xito de la operaci�n realizada
	if($cont > 1) $mensaje_exito = "Se guardaron todos los datos.";
	else $mensaje_exito = $Custom->salida[1];

	//Obtiene el total de los registros. Par�metros del filtro
	if($cant == "") $cant = 100;
	if($puntero == "") $puntero = 0;
	if($sortcol == "") $sortcol = "id_ingreso";
	if($sortdir == "") $sortdir = "asc";
	if($criterio_filtro == "") $criterio_filtro = "0=0";

	$res = $Custom->ContarSalidaPedido($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$id_financiador,$id_regional,$id_programa,$id_proyecto,$id_actividad);
	if($res) $total_registros = $Custom->salida;

	//Arma el xml para desplegar el mensaje
	$resp = new cls_manejo_mensajes(false);
	$resp->add_nodo("TotalCount", $total_registros);
	$resp->add_nodo("mensaje", $mensaje_exito);
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