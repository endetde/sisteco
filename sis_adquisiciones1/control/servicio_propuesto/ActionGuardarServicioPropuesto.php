<?php
/**
**********************************************************
Nombre de archivo:	    ActionGuardarServicioPropuesto.php
Prop�sito:				Permite insertar y modificar datos en la tabla tad_servicio_propuesto
Tabla:					tad_tad_servicio_propuesto
Par�metros:				$hidden_id_servicio_propuesto
						$txt_nombre
						$txt_descripcion
						$txt_fecha_reg
						$txt_monto
						$txt_id_proveedor
						$txt_id_moneda
						$txt_id_usuario

Valores de Retorno:    	N�mero de registros guardados
Fecha de Creaci�n:		2008-05-13 10:35:58
Versi�n:				1.0.0
Autor:					Generado Automaticamente
**********************************************************
*/
session_start();
include_once("../LibModeloAdquisiciones.php");

$Custom = new cls_CustomDBAdquisiciones();
$nombre_archivo = "ActionGuardarServicioPropuesto.php";

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
			$hidden_id_servicio_propuesto= $_GET["hidden_id_servicio_propuesto_$j"];
			$txt_nombre= $_GET["txt_nombre_$j"];
			$txt_descripcion= $_GET["txt_descripcion_$j"];
			$txt_fecha_reg= $_GET["txt_fecha_reg_$j"];
			$txt_monto= $_GET["txt_monto_$j"];
			$txt_id_proveedor= $_GET["txt_id_proveedor_$j"];
			$txt_id_moneda= $_GET["txt_id_moneda_$j"];
		//	$txt_id_usuario= $_GET["txt_id_usuario_$j"];

		}
		else
		{
			$hidden_id_servicio_propuesto=$_POST["hidden_id_servicio_propuesto_$j"];
			$txt_nombre=$_POST["txt_nombre_$j"];
			$txt_descripcion=$_POST["txt_descripcion_$j"];
			$txt_fecha_reg=$_POST["txt_fecha_reg_$j"];
			$txt_monto=$_POST["txt_monto_$j"];
			$txt_id_proveedor=$_POST["txt_id_proveedor_$j"];
			$txt_id_moneda=$_POST["txt_id_moneda_$j"];
			//$txt_id_usuario=$_POST["txt_id_usuario_$j"];

		}

		if ($hidden_id_servicio_propuesto == "undefined" || $hidden_id_servicio_propuesto == "")
		{
			////////////////////Inserci�n/////////////////////
/*echo "asdf";
exit;
	*/		//Validaci�n de datos (del lado del servidor)
			$res = $Custom->ValidarServicioPropuesto("insert",$hidden_id_servicio_propuesto, $txt_nombre,$txt_descripcion,$txt_fecha_reg,$txt_monto,$txt_id_proveedor,$txt_id_moneda);

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
			}

			//Validaci�n satisfactoria, se ejecuta la inserci�n en la tabla tad_servicio_propuesto
			$res = $Custom -> InsertarServicioPropuesto($hidden_id_servicio_propuesto, $txt_nombre, $txt_descripcion, $txt_fecha_reg, $txt_monto, $txt_id_proveedor, $txt_id_moneda);

			if(!$res)
			{
				//Se produjo un error
				$resp = new cls_manejo_mensajes(true, "406");
				$resp->mensaje_error = $Custom->salida[1] . " (iteraci�n $cont)";
				$resp->origen = $Custom->salida[2];
				$resp->proc = $Custom->salida[3];
				$resp->nivel = $Custom->salida[4];
				$resp->query = $Custom->query;
				echo $resp->get_mensaje();
				exit;
			}
		}
		else
		{	///////////////////////Modificaci�n////////////////////
			/*echo "aasdfsdfsdfsdfsdfsdfsdfsdff";
exit;*/
			//Validaci�n de datos (del lado del servidor)
			$res = $Custom->ValidarServicioPropuesto("update",$hidden_id_servicio_propuesto, $txt_nombre, $txt_descripcion, $txt_fecha_reg, $txt_monto, $txt_id_proveedor, $txt_id_moneda);

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
			}

			$res = $Custom->ModificarServicioPropuesto($hidden_id_servicio_propuesto, $txt_nombre, $txt_descripcion, $txt_fecha_reg, $txt_monto, $txt_id_proveedor, $txt_id_moneda);

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
	if($sortcol == "") $sortcol = "id_servicio_propuesto";
	if($sortdir == "") $sortdir = "asc";
	if($criterio_filtro == "") $criterio_filtro = "0=0";

	$res = $Custom->ContarServicioPropuesto($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$id_financiador,$id_regional,$id_programa,$id_proyecto,$id_actividad);
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