<?php
/**
 * Nombre de la Clase:	cls_DBCosteo
 * Prop�sito:			Permite ejecutar la funcionalidad de la tabla tal_costeo
 * Autor:				UNKNOW
 * Fecha creaci�n:		05-05-2015
 *
 */
class cls_DBCosteo 
{
	// Variable que contiene la salida de la ejecuci�n de la funci�n
	// si la funci�n tuvo error (false), salida contendr� el mensaje de error
	// si la funci�n no tuvo error (true), salida contendr� el resultado, ya sea un conjunto de datos o un mensaje de confirmaci�n
	var $salida;
	
	// Variable que contedr� la cadena de llamada a las funciones postgres
	var $query;
	
	// Variables para la ejecuci�n de funciones
	var $var; // middle_client
	var $nombre_funcion; // nombre de la funci�n a ejecutar
	var $codigo_procedimiento; // codigo del procedimiento a ejecutar
	                           // Nombre del archivo
	var $nombre_archivo = "cls_DBCosteo.php";
	
	// Matriz de par�metros de validaci�n de todas las columnas
	var $matriz_validacion = array ();
	
	// Bandera que indica si los datos se decodificar�n o no
	var $decodificar = false;
	function __construct() {
		// Carga los par�metro de validaci�n de todas las columnas
		// Carga en una variable interna la bandera del GET o POST
		$this->decodificar = $decodificar;
	}
	
	/**
	 * Nombre de la funci�n:	ListarCosteo
	 * Prop�sito:				Desplegar los registros de tal_movimiento_proyecto en funci�n de los par�metros del filtro
	 * Autor:					UNKNOW
	 * Fecha de creaci�n:		05-05-2015
	 *
	 * @param unknown_type $cant        	
	 * @param unknown_type $puntero        	
	 * @param unknown_type $sortcol        	
	 * @param unknown_type $sortdir        	
	 * @param unknown_type $criterio_filtro        	
	 * @param unknown_type $id_financiador        	
	 * @param unknown_type $id_regional        	
	 * @param unknown_type $id_programa        	
	 * @param unknown_type $id_proyecto        	
	 * @param unknown_type $id_actividad        	
	 * @return unknown
	 */
	function ListarCosteo($cant, $puntero, $sortcol, $sortdir, $criterio_filtro, $id_financiador, $id_regional, $id_programa, $id_proyecto, $id_actividad) 
	{
		$this->salida = "";
		$this->nombre_funcion = 'f_tai_costeo_sel';
		$this->codigo_procedimiento = "'AL_COSTEO_SEL'";
		
		$func = new cls_funciones(); // Instancia de las funciones generales
		                            
		// Instancia la clase midlle para la ejecuci�n de la funci�n de la BD
		$this->var = new cls_middle($this->nombre_funcion, $this->codigo_procedimiento);
		
		// Carga los par�metros del filtro
		$this->var->cant = $cant;
		$this->var->puntero = $puntero;
		$this->var->sortcol = "'$sortcol'";
		$this->var->sortdir = "'$sortdir'";
		$this->var->criterio_filtro = "'$criterio_filtro'";
		
		// Carga los par�metros espec�ficos de la estructura program�tica
		$this->var->add_param($func->iif($id_financiador == '', "'%'", $id_financiador)); // id_financiador
		$this->var->add_param($func->iif($id_regional == '', "'%'", $id_regional)); // id_regional
		$this->var->add_param($func->iif($id_programa == '', "'%'", $id_programa)); // id_programa
		$this->var->add_param($func->iif($id_proyecto == '', "'%'", $id_proyecto)); // id_proyecto
		$this->var->add_param($func->iif($id_actividad == '', "'%'", $id_actividad)); // id_actividad
		                                                                              
		// Carga la definici�n de columnas con sus tipos de datos
		$this->var->add_def_cols('id_costeo','integer');
		$this->var->add_def_cols('fecha_ingreso','text');
		$this->var->add_def_cols('fecha_salida','text');
	 	$this->var->add_def_cols('estado','varchar');
	 	$this->var->add_def_cols('descripcion','varchar');
		$this->var->add_def_cols('usuario_reg','varchar');
		$this->var->add_def_cols('fecha_reg','timestamp'); 
		//$this->var->add_def_cols('id_almacen','integer'); 	
		//$this->var->add_def_cols('desc_almacen','text');
		
		$this->var->add_def_cols('id_movimiento_proyecto','integer');
		$this->var->add_def_cols('desc_mov_proy','text');
		$this->var->add_def_cols('tipo_costeo','varchar');
		
		 
		// Ejecuta la funci�n de consulta
		$res = $this->var->exec_query();
		// Obtiene el array de salida de la funci�n y retorna el resultado de la ejecuci�n
		$this->salida = $this->var->salida;
		// Obtiene la cadena con que se llam� a la funci�n de postgres
		$this->query = $this->var->query;
		
		return $res;
	}
	/**
	 * Nombre de la funci�n:	ContarCosteo
	 * Prop�sito:				Contar el total de registros desplegados en funci�n de los par�metros de filtro
	 * Autor:					unknow
	 * Fecha de creaci�n:		05-05-2015
	 *
	 * @param unknown_type $cant        	
	 * @param unknown_type $puntero        	
	 * @param unknown_type $sortcol        	
	 * @param unknown_type $sortdir        	
	 * @param unknown_type $criterio_filtro        	
	 * @param unknown_type $id_financiador        	
	 * @param unknown_type $id_regional        	
	 * @param unknown_type $id_programa        	
	 * @param unknown_type $id_proyecto        	 
	 * @param unknown_type $id_actividad        	
	 * @return unknown
	 */
	function ContarCosteo($cant, $puntero, $sortcol, $sortdir, $criterio_filtro, $id_financiador, $id_regional, $id_programa, $id_proyecto, $id_actividad) 
	{
		$this->salida = "";
		$this->nombre_funcion = 'f_tai_costeo_sel';
		$this->codigo_procedimiento = "'AL_COSTEO_COUNT'";
		 
		$func = new cls_funciones(); // Instancia de las funciones generales
		                             
		// Instancia la clase midlle para la ejecuci�n de la funci�n de la BD
		$this->var = new cls_middle($this->nombre_funcion, $this->codigo_procedimiento);
		
		// Carga los par�metros del filtro
		$this->var->cant = $cant;
		$this->var->puntero = $puntero;
		$this->var->sortcol = "'$sortcol'";
		$this->var->sortdir = "'$sortdir'";
		$this->var->criterio_filtro = "'$criterio_filtro'";
		
		// Carga los par�metros espec�ficos de la estructura program�tica
		$this->var->add_param($func->iif($id_financiador == '', "'%'", $id_financiador)); // id_financiador
		$this->var->add_param($func->iif($id_regional == '', "'%'", $id_regional)); // id_regional
		$this->var->add_param($func->iif($id_programa == '', "'%'", $id_programa)); // id_programa
		$this->var->add_param($func->iif($id_proyecto == '', "'%'", $id_proyecto)); // id_proyecto
		$this->var->add_param($func->iif($id_actividad == '', "'%'", $id_actividad)); // id_actividad
		                                                                              
		// Carga la definici�n de columnas con sus tipos de datos
		$this->var->add_def_cols('total', 'bigint');
		
		// Ejecuta la funci�n de consulta
		$res = $this->var->exec_query();
		 
		// Obtiene el array de salida de la funci�n
		$this->salida = $this->var->salida;
		
		// Si la ejecuci�n fue satisfactoria modifica la salida para que solo devuelva el total de la consulta
		if ($res) {
			$this->salida = $this->var->salida[0][0];
		}
		
		// Obtiene la cadena con que se llam� a la funci�n de postgres
		$this->query = $this->var->query;
		
		// Retorna el resultado de la ejecuci�n
		return $res;
	}
	/**
	 * Nombre de la funci�n:	EliminarCosteo
	 * Prop�sito:				Eliminar registros de la tabla tal_costeo
	 * Autor:					UNKNOW
	 * Fecha de creaci�n:		12-05-2015
	 */
	function EliminarCosteo($id_costeo) 
	{
		$this->salida = "";
		$this->nombre_funcion = 'f_tai_costeo_iud';
		$this->codigo_procedimiento = "'AL_COSTEO_DEL'";
		
		// Instancia la clase midlle para la ejecuci�n de la funci�n de la BD
		$this->var = new cls_middle($this->nombre_funcion, $this->codigo_procedimiento, $this->decodificar);
		
		// Carga par�metros espec�ficos (no incluyen los par�metros fijos)
		$this->var->add_param("$id_costeo");//al_id_costeo
		$this->var->add_param("NULL");//al_fecha_ingreso
		$this->var->add_param("NULL");//al_fecha_salida
		$this->var->add_param("NULL");//al_estado
		$this->var->add_param("NULL");//al_descripcion
		$this->var->add_param("NULL");//al_id_almacen
		$this->var->add_param("NULL");//al_id_mov_proyecto
		$this->var->add_param("NULL");//al_tipo_costeo
		
		                               
		// Ejecuta la funci�n 
		$res = $this->var->exec_non_query();
		// Obtiene el array de salida de la funci�n y retorna el resultado de la ejecuci�n
		$this->salida = $this->var->salida;
		// Obtiene la cadena con que se llam� a la funci�n de postgres
		$this->query = $this->var->query;
		return $res;
	}
	function InsertarCosteo($id_costeo, $descripcion, $fecha_ingreso, $fecha_salida, $id_almacen,$id_mov_proy,$tipo_costeo)
	{
		$this->salida = "";
		$this->nombre_funcion = 'f_tai_costeo_iud';
		$this->codigo_procedimiento = "'AL_COSTEO_INS'";
		
		// Instancia la clase midlle para la ejecuci�n de la funci�n de la BD
		$this->var = new cls_middle($this->nombre_funcion, $this->codigo_procedimiento, $this->decodificar);
		$this->var->add_param("NULL");//al_id_costeo
		$this->var->add_param("'$fecha_ingreso'");//al_fecha_ingreso
		$this->var->add_param("'$fecha_salida'");//al_fecha_salida
		$this->var->add_param("");//al_estado
		$this->var->add_param("'$descripcion'");//al_descripcion
		$this->var->add_param("NULL");//al_id_almacen 
		//a�adido 12-05-2015
		$this->var->add_param("$id_mov_proy");//al_id_mov_proyecto
		$this->var->add_param("'$tipo_costeo'");//al_tipo_costeo
			
		// Ejecuta la funci�n
		$res = $this->var->exec_non_query();
		
		// Obtiene el array de salida de la funci�n y retorna el resultado de la ejecuci�n
		$this->salida = $this->var->salida;
		
		// Obtiene la cadena con que se llam� a la funci�n de postgres
		$this->query = $this->var->query;
		
		return $res; 
	}
	function ModificarCosteo($id_costeo, $descripcion, $fecha_ingreso, $fecha_salida, $id_almacen,$id_mov_proy,$tipo_costeo)
	{
		$this->salida = "";
		$this->nombre_funcion = 'f_tai_costeo_iud';
		$this->codigo_procedimiento = "'AL_COSTEO_UPD'";
		
		// Instancia la clase midlle para la ejecuci�n de la funci�n de la BD
		$this->var = new cls_middle($this->nombre_funcion, $this->codigo_procedimiento, $this->decodificar);
		
		$this->var->add_param("$id_costeo");//al_id_costeo
		$this->var->add_param("'$fecha_ingreso'");//al_fecha_ingreso
		$this->var->add_param("'$fecha_salida'");//al_fecha_salida
		$this->var->add_param("");//al_estado
		$this->var->add_param("'$descripcion'");//al_descripcion
		$this->var->add_param("$id_almacen");//al_id_almacen 
		//a�adido 12-05-2015
		$this->var->add_param("$id_mov_proy");//al_id_mov_proyecto
		$this->var->add_param("'$tipo_costeo'");//al_tipo_costeo
		
		// Ejecuta la funci�n
		$res = $this->var->exec_non_query();
		
		// Obtiene el array de salida de la funci�n y retorna el resultado de la ejecuci�n
		$this->salida = $this->var->salida;
		
		// Obtiene la cadena con que se llam� a la funci�n de postgres
		$this->query = $this->var->query;
		
		return $res;
	}
	
	function CostearIngresos($id_costeo,$tipo_costeo)
	{
		$this->salida = "";
		$this->nombre_funcion = 'f_tai_costeo_iud';
		$this->codigo_procedimiento = "'AL_COSTEO_IUD'";
		
		// Instancia la clase midlle para la ejecuci�n de la funci�n de la BD
		$this->var = new cls_middle($this->nombre_funcion, $this->codigo_procedimiento, $this->decodificar);
		$this->var->add_param("$id_costeo");//al_id_costeo
		$this->var->add_param("NULL");//al_fecha_ingreso
		$this->var->add_param("NULL");//al_fecha_salida
		$this->var->add_param("NULL");//al_estado
		$this->var->add_param("NULL");//al_descripcion
		$this->var->add_param("NULL");//al_id_almacen
		//a�adido 12-05-2015
		$this->var->add_param("NULL");//al_id_mov_proyecto
		$this->var->add_param("'$tipo_costeo'");//al_tipo_costeo
		
		// Ejecuta la funci�n
		$res = $this->var->exec_non_query();
		
		// Obtiene el array de salida de la funci�n y retorna el resultado de la ejecuci�n
		$this->salida = $this->var->salida;
		
		// Obtiene la cadena con que se llam� a la funci�n de postgres
		$this->query = $this->var->query;
 		
		return $res;
		
	}

	function ValidarMovimientoProyecto($sql, $id_movimiento_proyecto, $almacen,$fecha_ingreso, $concepto_ingreso, $origen_ingreso, $proveedor, $contratista,$empleado,$institucion,$observaciones)
	{
		$this->salida = "";
		$valid = new cls_validacion_serv();
		
		// Clase para validar el tipo de dato
		$tipo_dato = new cls_define_tipo_dato();
		
		// Ejecuta la validaci�n por el tipo de operaci�n
		if ($sql == 'insert' || $sql == 'update') {
			if ($sql == 'update') 
			{
				
				$tipo_dato->_reiniciar_valor();
				$tipo_dato->set_Columna("id_movimiento_proyecto");
				
				if (! $valid->verifica_dato($tipo_dato->TipoDatoInteger(), "id_movimiento_proyecto", $id_movimiento_proyecto)) 
				{
					$this->salida = $valid->salida;
					return false;
				}
			}
			// Validar id_almacen - tipo integer
			$tipo_dato->_reiniciar_valor();
			$tipo_dato->set_Columna("id_almacen");
			$tipo_dato->set_AllowBlank(false);
			if (! $valid->verifica_dato($tipo_dato->TipoDatoInteger(), "id_almacen", $almacen)) 
			{
				$this->salida = $valid->salida;
				return false;
			}
			// Validar concepto_ingreso - tipo integer
			$tipo_dato->_reiniciar_valor();
			$tipo_dato->set_Columna("concepto_ingreso");
			$tipo_dato->set_AllowBlank(false);
			if (! $valid->verifica_dato($tipo_dato->TipoDatoText(), "concepto_ingreso", $concepto_ingreso)) {
				$this->salida = $valid->salida;
				return false;
			}

			// Validar descripcion - tipo varchar
			$tipo_dato->_reiniciar_valor();
			$tipo_dato->set_Columna("observaciones");
			$tipo_dato->set_MaxLength(200);
			$tipo_dato->set_AllowBlank(true);
			if (! $valid->verifica_dato($tipo_dato->TipoDatoText(), "observaciones", $observaciones)) {
				$this->salida = $valid->salida;
				return false;
			}
		
			return true;
		} 
	}
	
	function CorregirCosteo($id_costeo,$estado_costeo)
	{
		$this->salida = "";
		$this->nombre_funcion = 'f_tai_costeo_iud';
		$this->codigo_procedimiento = "'AL_COSTEO_CORREG'";
		
		// Instancia la clase midlle para la ejecuci�n de la funci�n de la BD
		$this->var = new cls_middle($this->nombre_funcion, $this->codigo_procedimiento, $this->decodificar);
		$this->var->add_param("$id_costeo");//al_id_costeo
		$this->var->add_param("NULL");//al_fecha_ingreso
		$this->var->add_param("NULL");//al_fecha_salida
		$this->var->add_param("'$estado_costeo'");//al_estado
		$this->var->add_param("NULL");//al_descripcion
		$this->var->add_param("NULL");//al_id_almacen
		//a�adido 12-05-2015
		$this->var->add_param("NULL");//al_id_mov_proyecto
		$this->var->add_param("NULL");//al_tipo_costeo
		
		// Ejecuta la funci�n
		$res = $this->var->exec_non_query();
		
		// Obtiene el array de salida de la funci�n y retorna el resultado de la ejecuci�n
		$this->salida = $this->var->salida;
		
		// Obtiene la cadena con que se llam� a la funci�n de postgres
		$this->query = $this->var->query;
			
		return $res;
	}
}
?>
