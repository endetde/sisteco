<?php
/**
**********************************************************
Nombre de archivo:	    ActionGuardarPensamiento.php
Prop�sito:				Permite insertar y modificar datos en la tabla com_pensamiento_dia
Tabla:					com_pensamiento_dia
Par�metros:				dependiendo
						

Valores de Retorno:    	N�mero de registros guardados
Fecha de Creaci�n:		2013-05-2013
Versi�n:				1.0.0
Autor:					Morgan Huascar Checa Lopez
**********************************************************
*/
session_start();
include_once('../LibModeloAdministracionComunidad.php');

$Custom = new cls_CustomDBComunidad();
$nombre_archivo = "ActionGuardarPensamientoDia.php";

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
			$id_pensamiento=$_GET["id_pensamiento_dia_$j"];
			$texto_pensamiento=$_GET["texto_pensamiento_$j"];
			
		
		}
		else
		{
		
			$id_pensamiento=$_POST["id_pensamiento_dia_$j"];
			$texto_pensamiento=$_POST["texto_pensamiento_$j"];
			

		}
	    
               
		if ($id_pensamiento == "undefined" || $id_pensamiento== "")
		{
			////////////////////Inserci�n/////////////////////
					//Validaci�n satisfactoria, se ejecuta la inserci�n en la tabla com_publicaciones 
					$res = $Custom -> InsertarPensamiento($id_pensamiento,$texto_pensamiento);
			
						if(!$res){
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
			
		

			$res = $Custom->ModificarPensamiento($id_pensamiento,$texto_pensamiento);

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
	if($sortcol == "") $sortcol = "PENS.id_pensamiento";
	if($sortdir == "") $sortdir = "asc";
	if($criterio_filtro == "") $criterio_filtro = "0=0 and PENS.pens_estado_registro=''activo''";

	$res = $Custom->ContarPensamiento($cant,$puntero,$sortcol,$sortdir,$criterio_filtro);
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