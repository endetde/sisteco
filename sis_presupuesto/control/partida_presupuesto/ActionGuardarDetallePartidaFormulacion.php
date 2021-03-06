<?php
/**
**********************************************************
Nombre de archivo:	    ActionGuardarDetallePartidaFormulacion.php
Prop�sito:				Permite insertar y modificar datos en la tabla tpr_partida_presupuesto
Tabla:					tpr_tpr_partida_presupuesto
Par�metros:				$id_partida_presupuesto
						$codigo_formulario
						$fecha_elaboracion
						$id_partida
						$id_presupuesto
						$id_partida_detalle
						$mes_01
						$mes_02
						$mes_03
						$mes_04
						$mes_05
						$mes_06
						$mes_07
						$mes_08
						$mes_09
						$mes_10
						$mes_11
						$mes_12
						$total
						$id_partida_presupuesto
						$id_moneda

Valores de Retorno:    	N�mero de registros guardados
Fecha de Creaci�n:		2008-07-10 09:08:17
Versi�n:				1.0.0
Autor:					Generado Automaticamente
**********************************************************
*/
session_start();
include_once("../LibModeloPresupuesto.php");

$Custom = new cls_CustomDBPresupuesto();
$nombre_archivo = "ActionGuardarDetallePartidaFormulacion.php";

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
			$id_partida_presupuesto= $_GET["id_partida_presupuesto_$j"];
			$codigo_formulario= $_GET["codigo_formulario_$j"];
			$fecha_elaboracion= $_GET["fecha_elaboracion_$j"];
			$id_partida= $_GET["id_partida_$j"];
			$id_presupuesto= $_GET["id_presupuesto_$j"];
			$id_partida_detalle= $_GET["id_partida_detalle_$j"];
			$mes_01= $_GET["mes_01_$j"];
			$mes_02= $_GET["mes_02_$j"];
			$mes_03= $_GET["mes_03_$j"];
			$mes_04= $_GET["mes_04_$j"];
			$mes_05= $_GET["mes_05_$j"];
			$mes_06= $_GET["mes_06_$j"];
			$mes_07= $_GET["mes_07_$j"];
			$mes_08= $_GET["mes_08_$j"];
			$mes_09= $_GET["mes_09_$j"];
			$mes_10= $_GET["mes_10_$j"];
			$mes_11= $_GET["mes_11_$j"];
			$mes_12= $_GET["mes_12_$j"];
			$total= $_GET["total_$j"];
			$id_partida_presupuesto= $_GET["id_partida_presupuesto_$j"];
			$id_moneda= $_GET["id_moneda_$j"];

		}
		else
		{
			$id_partida_presupuesto=$_POST["id_partida_presupuesto_$j"];
			$codigo_formulario=$_POST["codigo_formulario_$j"];
			$fecha_elaboracion=$_POST["fecha_elaboracion_$j"];
			$id_partida=$_POST["id_partida_$j"];
			$id_presupuesto=$_POST["id_presupuesto_$j"];
			$id_partida_detalle=$_POST["id_partida_detalle_$j"];
			$mes_01=$_POST["mes_01_$j"];
			$mes_02=$_POST["mes_02_$j"];
			$mes_03=$_POST["mes_03_$j"];
			$mes_04=$_POST["mes_04_$j"];
			$mes_05=$_POST["mes_05_$j"];
			$mes_06=$_POST["mes_06_$j"];
			$mes_07=$_POST["mes_07_$j"];
			$mes_08=$_POST["mes_08_$j"];
			$mes_09=$_POST["mes_09_$j"];
			$mes_10=$_POST["mes_10_$j"];
			$mes_11=$_POST["mes_11_$j"];
			$mes_12=$_POST["mes_12_$j"];
			$total=$_POST["total_$j"];
			$id_partida_presupuesto=$_POST["id_partida_presupuesto_$j"];
			$id_moneda=$_POST["id_moneda_$j"];

		}

		if ($id_partida_presupuesto == "undefined" || $id_partida_presupuesto == "")
		{
			////////////////////Inserci�n/////////////////////

			//Validaci�n de datos (del lado del servidor)
			$res = $Custom->ValidarDetallePartidaFormulacion("insert",$id_partida_presupuesto, $codigo_formulario,$fecha_elaboracion,$id_partida,$id_presupuesto,$id_partida_detalle,$mes_01,$mes_02,$mes_03,$mes_04,$mes_05,$mes_06,$mes_07,$mes_08,$mes_09,$mes_10,$mes_11,$mes_12,$total,$id_partida_presupuesto,$id_moneda);

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

			//Validaci�n satisfactoria, se ejecuta la inserci�n en la tabla tpr_partida_presupuesto
			$res = $Custom -> InsertarDetallePartidaFormulacion($id_partida_presupuesto, $codigo_formulario,$fecha_elaboracion,$id_partida,$id_presupuesto,$id_partida_detalle,$mes_01,$mes_02,$mes_03,$mes_04,$mes_05,$mes_06,$mes_07,$mes_08,$mes_09,$mes_10,$mes_11,$mes_12,$total,$id_partida_presupuesto,$id_moneda);

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
			
			//Validaci�n de datos (del lado del servidor)
			$res = $Custom->ValidarDetallePartidaFormulacion("update",$id_partida_presupuesto, $codigo_formulario,$fecha_elaboracion,$id_partida,$id_presupuesto,$id_partida_detalle,$mes_01,$mes_02,$mes_03,$mes_04,$mes_05,$mes_06,$mes_07,$mes_08,$mes_09,$mes_10,$mes_11,$mes_12,$total,$id_partida_presupuesto,$id_moneda);

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

			$res = $Custom->ModificarDetallePartidaFormulacion($id_partida_presupuesto, $codigo_formulario,$fecha_elaboracion,$id_partida,$id_presupuesto,$id_partida_detalle,$mes_01,$mes_02,$mes_03,$mes_04,$mes_05,$mes_06,$mes_07,$mes_08,$mes_09,$mes_10,$mes_11,$mes_12,$total,$id_partida_presupuesto,$id_moneda);

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
	if($sortcol == "") $sortcol = "id_partida_presupuesto";
	if($sortdir == "") $sortdir = "asc";
	if($criterio_filtro == "") $criterio_filtro = "PRESUP.id_presupuesto=''$m_id_presupuesto''";

	$res = $Custom->ContarDetallePartidaFormulacion($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$id_financiador,$id_regional,$id_programa,$id_proyecto,$id_actividad);
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