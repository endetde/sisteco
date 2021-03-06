<?php
/**
 * Clase:  cls_GeneradorCodigo
 * Proposito: Generar codigo pata el modelo, la vista y el controlador a partir de la tabla metaproceso y metadatos de la BD
 * Autor: Rensi Arteaga Copari
 *
 * @param conexion postgres    $db              
 * @param  nombre de la tabla  $table          
 * @return array
 */

class cls_GeneradorCodigo{

	function __construct()
	{
		include("lib/BDSel.php");
		include("lib/BDIud.php");
		include("lib/ModeloBD.php");
		include("lib/ControlListar.php");
		include("lib/ControlGuardar.php");
		include("lib/ControlEliminar.php");
		include("lib/VistaMain.php");
		include("lib/Vista.php");
		include("lib/VistaJsMaestro.php");
		include("lib/VistaCombo.php");

	}

	function FormatPhpToJava($nombre){
		$v_nombre=explode('_',$nombre);
		$cont=sizeof($v_nombre );
		$java_nombre="";
		for($i=0;$i<$cont;$i++){
			$java_nombre.=ucwords($v_nombre[$i]);
		}

		return $java_nombre;
	}

	function quitarPrefijoTabla($table){

		$table =substr($table,2);

		return $table;
	}


	function decodificarForamto($cadena){
		$res = array();
		$v=explode('&',$cadena);
		$cont=sizeof($v );
		for($i=0;$i<$cont;$i++){
			$java_nombre.=ucwords($v_nombre[$i]);
			$v2=explode('=',$v[$i]);
			$res[$v2[0]]=$v2[1];
		}
		return $res;
	}


	/**
 * Funcion:  obtener_desc_col
 * Proposito: Obtiene la descripci�n de los campos de una tabla
 * Autor: Rodrigo Chumacero Moscoso
 *
 * @param unknown_type $tabla
 * @return unknown
 */
	function obtener_desc_col($tabla,$db)
	{

		$query="SELECT * FROM f_gen_obtener_desc_col('$tabla') AS (columna name,tipo_dato text,valor_defecto text,nulo boolean,atnum smallint,descripcion text)";
		$salida=array();

		if($result = pg_query($db,$query))
		{
			while ($row = pg_fetch_array($result))
			{
				array_push ($salida, $row);
			}
			//Libera la memoria
			pg_FreeResult($result);
		}
		else
		{
			print('Error al ejecutar funci�n. '.pg_last_error($db));
		}
		return $salida;
	}


	/**
 /**
 * Funcion:  MetaData
 * Proposito: obtener los metadatos de la tabla especificada
 * Autor: Rensi Arteaga Copari
 * @param unknown_type $db
 * @param unknown_type $prefijo
 * @param unknown_type $table
 * @return unknown
 */
	function MetaData($db,$prefijo,$table){

		$table=strtolower($table);
		if($prefijo!=null){
			$table = "t".strtolower($prefijo)."_".$table;
		}


		$rows    = 0;        // Number of rows
		$qid    = 0;        // Query result resource
		$meta    = array();    // Metadata array
		// See PostgreSQL developer manual (www.postgresql.org) for system table spec.
		// Get catalog data from system tables.
		$sql = 'SELECT a.attnum, a.attname, t.typname, a.attlen, a.atttypmod, a.attnotnull, a.atthasdef,pg_catalog.obj_description(c.oid)
			FROM pg_class as c, pg_attribute a, pg_type t 
			WHERE a.attnum > 0 and a.attrelid = c.oid and c.relname = '."'$table'".' and a.atttypid = t.oid order by a.attnum';
		$qid = pg_Exec($db, $sql);

		// Check error
		if (!is_resource($qid)) {
			print('MetaData(): Query Error - table does not exist');
			return null;
		}

		$rows = pg_NumRows($qid);
		// Store meta data
		for ($i = 0; $i < $rows; $i++) {
			$field_name                     = pg_Result($qid,$i,1);        // Field Name
			// $meta[$field_name]['id']          = pg_Result($qid,$i,0);        // Attrbute ID
			// $meta[$field_name]['type']         = pg_Result($qid,$i,2);        // Data type name
			//$meta[$field_name]['len']        = pg_Result($qid,$i,3);        // Length: -1 for variable length
			// $meta[$field_name]['modifier']    = pg_Result($qid,$i,4);        // Modifier
			// $meta[$field_name]['notnull']     = (pg_Result($qid,$i,5) === 't' ? TRUE : FALSE);        // Not NULL?
			// $meta[$field_name]['hasdefault'] = (pg_Result($qid,$i,6) === 't' ? TRUE : FALSE);    // Has default value?

			$meta[$i]["campo"]=$field_name;
			$meta[$i]['id']   = pg_Result($qid,$i,0);        // Attrbute ID
			$meta[$i]['type']         = pg_Result($qid,$i,2);        // Data type name
			$meta[$i]['len']        = pg_Result($qid,$i,3);        // Length: -1 for variable length
			$meta[$i]['modifier']    = pg_Result($qid,$i,4);        // Modifier
			$meta[$i]['notnull']     = (pg_Result($qid,$i,5) === 't' ? TRUE : FALSE);        // Not NULL?
			$meta[$i]['hasdefault'] = (pg_Result($qid,$i,6) === 't' ? TRUE : FALSE);    // Has default value?
			$meta[$i]['descripcion_tabla']  = pg_Result($qid,$i,7);

			$nombre_constraint = tiene_check($field_name,$table);
			if( $nombre_constraint != ""){
				$meta[$i]['check'] = get_valores_check($nombre_constraint,$table);
			}else{
				$meta[$i]['check'] = null;
			}
			$meta[$i]['referenciado'] = esta_referenciado($field_name,$table);

		}

		// Clean up. PHP4 reference count code would be smart enough to do this, though.
		pg_FreeResult($qid);

		$vec = obtener_desc_col($table,$db);
		for ($i = 0; $i < $rows; $i++) {


			$meta[$i]['descripcion'] = $vec[$i][5];

		}


		return $meta;
	}
	/**
 * Funcion:  getCamposTabla
 * Proposito: obtener los campos de la tabla especificada
 * Autor: Rensi Arteaga Copari
 *
 * @param unknown_type $db
 * @param unknown_type $table
 * @return unknown
 */

	function getCamposTabla($db, $table){
		$rows    = 0;        // Number of rows
		$qid    = 0;        // Query result resource
		$campos    = array();    // Metadata array - return value

		// See PostgreSQL developer manual (www.postgresql.org) for system table spec.
		// Get catalog data from system tables.
		$sql = 'SELECT a.attnum, a.attname, t.typname, a.attlen, a.atttypmod, a.attnotnull, a.atthasdef FROM pg_class as c, pg_attribute a, pg_type t WHERE a.attnum > 0 and a.attrelid = c.oid and c.relname = '."'$table'".' and a.atttypid = t.oid order by a.attnum';
		$qid = pg_Exec($db, $sql);

		// Check error
		if (!is_resource($qid)) {
			print('MetaData(): Query Error - table does not exist');
			return null;
		}

		$rows = pg_NumRows($qid);
		// Store meta data
		for ($i = 0; $i < $rows; $i++){
			$field_name = pg_Result($qid,$i,1);        // Field Name
			$campos[$i] = $field_name;
		}

		// Clean up. PHP4 reference count code would be smart enough to do this, though.
		pg_FreeResult($qid);
		return $campos;
	}

	/**
 * Funcion:  tiene_check
 * Proposito: Verificar si un campo (columna) tiene restricciones (constraints) del tipo CHECK
 * Autor: Enzo Rojas Heredia
 *
 * @param unknown_type $campo
 * @param unknown_type $tabla
 * @return unknown
 */
	function tiene_check($campo,$tabla){
		global $db;
		$respuesta = "";
		/*$salida_temp = array();
		$sql = "SELECT constraint_name,constraint_type FROM f_gen_obtener_checks('".$tabla."') AS (constraint_name information_schema.sql_identifier, constraint_type information_schema.character_data)";

		if($result = pg_exec($db, $sql))
		{
		//Carga el resultado en el array temporal de salida
		while ($row = pg_fetch_array($result))
		{
		array_push ($salida_temp, $row);
		}

		//Libera la memoria
		pg_free_result($result);
		foreach( $salida_temp as $key => $value ) {
		echo "Key: $key; Valor: $value&lt;br&gt;\n";
		}*/

		$sql = "SELECT constraint_name, constraint_type FROM information_schema.table_constraints WHERE table_name = '$tabla' and constraint_type='CHECK';";
		$qid = pg_exec($db, $sql);

		if (!is_resource($qid)) {
			print('MetaData(): Query Error - table does not exist');
			return null;
		}
		$rows = pg_NumRows($qid);
		for ($i = 0; $i < $rows; $i++){
			$nombre_constraint = pg_Result($qid,$i,0);
			if(stripos($nombre_constraint,$campo) !== false){
				$respuesta = $nombre_constraint;
				echo "**************check: ".$nombre_constraint."<br>";
			}
		}

		// Clean up. PHP4 reference count code would be smart enough to do this, though.
		pg_FreeResult($qid);
		//echo "+++++++++++".$respuesta."<br>";
		return $respuesta;

		//}
	}


	/**
 * Funcion:  get_valores_check
 * Proposito: Obtener y devolver la lista de los valores de una restriccion (constraint)
 * Autor: Enzo Rojas Heredia
 *
 * @param unknown_type $nombre_constraint
 * @param unknown_type $tabla
 * @return unknown
 */
	function get_valores_check($nombre_constraint,$tabla){
		global $db;
		$sql="SELECT c.conname AS constraint_name, c.consrc AS restriccion FROM pg_constraint c LEFT JOIN pg_class t ON c.conrelid = t.oid LEFT JOIN pg_class t2 ON c.confrelid = t2.oid WHERE t.relname = '$tabla' AND c.conname = '$nombre_constraint'";
		$res =  array();

		$qid = pg_exec($db, $sql);
		if (!is_resource($qid)) {
			print('MetaData(): Query Error - table does not exist');
			return null;
		}
		$rows = pg_NumRows($qid);
		for ($i = 0; $i < $rows; $i++){
			$constraint_name = pg_Result($qid,$i,0);
			if($nombre_constraint  == $constraint_name){
				$constraint = pg_Result($qid,$i,1);
				$trozos = explode("'", $constraint);

				$tam = count($trozos);
				$valores;
				for($i = 0;$i <$tam;$i++){
					$num = (int)($i/2);
					if(($i/2) != $num){
						array_push ($res, $trozos[$i]);
						//$res .= $trozos[$i].",";
						echo "+++++++++++++++++++++++$i: ".$trozos[$i]."<br>";
					}
					//echo "$i: ".$trozos[$i]."<br>";
				}
			}
		}

		// Clean up. PHP4 reference count code would be smart enough to do this, though.
		pg_FreeResult($qid);
		return $res;
	}






	/**
 * Funcion:  getTiposDatosTabla
 * Proposito: obtener los tipos de datos de la tabla especificada
 * Autor: Rensi Arteaga Copari
 *
 * @param unknown_type $db
 * @param unknown_type $table
 * @return unknown
 */

	function getTiposDatosTabla($db,$table){
		$rows    = 0;        // Number of rows
		$qid    = 0;        // Query result resource
		$tipos   = array();    // Metadata array - return value

		// See PostgreSQL developer manual (www.postgresql.org) for system table spec.
		// Get catalog data from system tables.
		$sql = 'SELECT a.attnum, a.attname, t.typname, a.attlen, a.atttypmod, a.attnotnull, a.atthasdef FROM pg_class as c, pg_attribute a, pg_type t WHERE a.attnum > 0 and a.attrelid = c.oid and c.relname = '."'$table'".' and a.atttypid = t.oid order by a.attnum';
		$qid = pg_Exec($db, $sql);

		// Check error
		if (!is_resource($qid)) {
			print('MetaData(): Query Error - table does not exist');
			return null;
		}

		$rows = pg_NumRows($qid);
		// Store meta data
		for ($i = 0; $i < $rows; $i++){

			$tipos[$i]=pg_Result($qid,$i,2);        // Data type name
		}

		// Clean up. PHP4 reference count code would be smart enough to do this, though.
		pg_FreeResult($qid);
		return $tipos;
	}

	function esta_referenciado($campo,$tabla){
		global $db;
		$tabla_padre = null;
		$resultado = array();
		$sql = "SELECT c.table_name,c.column_name, f.constraint_type
			FROM information_schema.table_constraints f LEFT JOIN information_schema.constraint_column_usage c ON c.constraint_name = f.constraint_name
			WHERE f.table_name = '$tabla' and f.constraint_type='FOREIGN KEY' and c.column_name = '$campo'";

		$qid = pg_exec($db, $sql);

		if (!is_resource($qid)) {
			print('MetaData(): Query Error - table does not exist');
			return null;
		}
		$rows = pg_NumRows($qid);
		if($rows > 0){
			$resultado[] = pg_Result($qid,0,0);
			$resultado[] = pg_Result($qid,0,1);
			echo "+++++++++++".pg_Result($qid,0,0)."<br>";
		}else{
			$resultado = null;
		}
		// Clean up. PHP4 reference count code would be smart enough to do this, though.
		pg_FreeResult($qid);
		return $resultado;

	}


	//// Test code ////
	$dbName     = 'dbendesis';    // Change this to your db name
	$dbUser        = 'rodrigo';    // Change this to your db user name


	//$codigo='TIPTRA';
	//$prefijo='AL';
	//$sistema="almacenes";
	//$tableName ='tipo_transferencia';    // Change this to your table name

	$sistema =strtolower($sistema);
	$prefijo =strtoupper($prefijo);
	$codigo =strtoupper($codigo);
	$tableName =strtolower($tableName);



	$db = pg_connect('host=192.168.0.8 dbname='.$dbName.' user='.$dbUser." password='db_rcm' port=5432");
	$meta = metadata($db,$prefijo,$tableName);
	$campos = getCamposTabla($db,$tableName);


	$base = "base/$tableName";
	$modelo="modelo/$tableName";
	$control="control/$tableName";
	$vista="vista/$tableName";
	if(!file_exists($base))
	mkdir($base);
	if(!file_exists($modelo))
	mkdir($modelo);
	if(!file_exists($control))
	mkdir($control);
	if(!file_exists($vista))
	mkdir($vista);
	if(!file_exists("$vista/js"))
	mkdir("$vista/js");



	crearArchivo_BDSel($base,$tableName,$prefijo,$codigo,$meta);
	crearArchivo_BDIud($base,$tableName,$prefijo,$codigo,$meta);
	crearModeloBD($modelo,$sistema,$tableName,$prefijo,$codigo,$meta);
	crearArchivo_ControlListar($control,$sistema,$tableName,$prefijo,$codigo,$meta);
	crearArchivo_ControlGuardar($control,$sistema,$tableName,$prefijo,$codigo,$meta);
	crearArchivo_ControlEliminar($control,$sistema,$tableName,$prefijo,$codigo,$meta);
	crearArchivo_Vista($vista,$sistema,$tableName,$prefijo,$codigo,$meta);
	crearArchivo_VistaMain("$vista/js",$tableName,$prefijo,$codigo,$meta);
	crearArchivo_VistaCombo("$vista/js",$sistema,$tableName,$prefijo,$codigo,$meta);
	crearArchivo_VistaJsMaestro("$vista/js",$db,$sistema,$tableName,$prefijo,$codigo,$meta);


	print("<pre>");
	print_r($meta);
	print("</pre>");

	$cod="label=xxx&tipo=cmf";
	$resultado = decodificarForamto($cod);

	print("<pre>");
	print_r($resultado);
	print("</pre>");

}
?> 
