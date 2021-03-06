<?php
/**
 * Nombre de la clase:	cls_DBRubro.php
 * Prop�sito:			Permite ejecutar toda la funcionalidad de la tabla tct_tct_rubro
 * Autor:				(autogenerado)
 * Fecha creaci�n:		2008-10-02 11:34:33
 */

 
class cls_DBRubro
{
	var $salida;
	var $query;
	var $var;
	var $nombre_funcion;
	var $codigo_procedimiento;
	var $decodificar;
	
	function __construct()
	{
		$this->decodificar=$decodificar;
	}
	
	/**
	 * Nombre de la funci�n:	ListarRubro
	 * Prop�sito:				Desplegar los registros de tct_rubro
	 * Autor:				    (autogenerado)
	 * Fecha de creaci�n:		2008-10-02 11:34:33
	 */
	function ListarRubro($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$id_financiador,$id_regional,$id_programa,$id_proyecto,$id_actividad)
	{
		$this->salida = "";
		$this->nombre_funcion = 'f_tct_rubro_sel';
		$this->codigo_procedimiento = "'CT_RUBROO_SEL'";

		$func = new cls_funciones();//Instancia de las funciones generales
		
		//Instancia la clase middle para la ejecuci�n de la funci�n de la BD
		$this->var = new cls_middle($this->nombre_funcion,$this->codigo_procedimiento);

		//Carga los par�metros del filtro
		$this->var->cant = $cant;
		$this->var->puntero = $puntero;
		$this->var->sortcol = "'$sortcol'";
		$this->var->sortdir = "'$sortdir'";
		$this->var->criterio_filtro = "'$criterio_filtro'";

		//Carga los par�metros espec�ficos de la estructura program�tica
		$this->var->add_param($func->iif($id_financiador == '',"'%'","'$id_financiador'"));//id_financiador
		$this->var->add_param($func->iif($id_regional == '',"'%'","'$id_regional'"));//id_regional
		$this->var->add_param($func->iif($id_programa == '',"'%'","'$id_programa'"));//id_programa
		$this->var->add_param($func->iif($id_proyecto == '',"'%'","'$id_proyecto'"));//id_proyecto
		$this->var->add_param($func->iif($id_actividad == '',"'%'","'$id_actividad'"));//id_actividad

		//Carga la definici�n de columnas con sus tipos de datos
		$this->var->add_def_cols('id_rubro','int4');
		$this->var->add_def_cols('nombre_rubro','varchar');
		$this->var->add_def_cols('id_reporte_eeff','int4');
		$this->var->add_def_cols('desc_reporte_eeff','varchar');
		$this->var->add_def_cols('fk_rubro','int4');
		$this->var->add_def_cols('desc_rubro','varchar');
		$this->var->add_def_cols('sw_debe_haber','numeric');
		$this->var->add_def_cols('sw_arbol_cuenta','varchar');

		//Ejecuta la funci�n de consulta
		$res = $this->var->exec_query();

		//Obtiene el array de salida de la funci�n y retorna el resultado de la ejecuci�n
		$this->salida = $this->var->salida;

		//Obtiene la cadena con que se llam� a la funci�n de postgres
		$this->query = $this->var->query;
		return $res;
	}
	
	/**
	 * Nombre de la funci�n:	ContarRubro
	 * Prop�sito:				Contar los registros de tct_rubro
	 * Autor:				    (autogenerado)
	 * Fecha de creaci�n:		2008-10-02 11:34:33
	 */
	function ContarRubro($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$id_financiador,$id_regional,$id_programa,$id_proyecto,$id_actividad)
	{
		$this->salida = "";
		$this->nombre_funcion = 'f_tct_rubro_sel';
		$this->codigo_procedimiento = "'CT_RUBROO_COUNT'";

		$func = new cls_funciones();//Instancia de las funciones generales
		
		//Instancia la clase middle para la ejecuci�n de la funci�n de la BD
		$this->var = new cls_middle($this->nombre_funcion,$this->codigo_procedimiento);

		//Carga los par�metros del filtro
		$this->var->cant = $cant;
		$this->var->puntero = $puntero;
		$this->var->sortcol = "'$sortcol'";
		$this->var->sortdir = "'$sortdir'";
		$this->var->criterio_filtro = "'$criterio_filtro'";

		//Carga los par�metros espec�ficos de la estructura program�tica
		$this->var->add_param($func->iif($id_financiador == '',"'%'","'$id_financiador'"));//id_financiador
		$this->var->add_param($func->iif($id_regional == '',"'%'","'$id_regional'"));//id_regional
		$this->var->add_param($func->iif($id_programa == '',"'%'","'$id_programa'"));//id_programa
		$this->var->add_param($func->iif($id_proyecto == '',"'%'","'$id_proyecto'"));//id_proyecto
		$this->var->add_param($func->iif($id_actividad == '',"'%'","'$id_actividad'"));//id_actividad

		
		//Carga la definici�n de columnas con sus tipos de datos
		$this->var->add_def_cols('total','bigint');

		//Ejecuta la funci�n de consulta
		$res = $this->var->exec_query();

		//Obtiene el array de salida de la funci�n
		$this->salida = $this->var->salida;

		//Si la ejecuci�n fue satisfactoria modifica la salida para que solo devuelva el total de la consulta
		if($res)
		{
			$this->salida = $this->var->salida[0][0];
		}

		//Obtiene la cadena con que se llam� a la funci�n de postgres
		$this->query = $this->var->query;

		//Retorna el resultado de la ejecuci�n
		return $res;
	}
	
	/**
	 * Nombre de la funci�n:	InsertarRubro
	 * Prop�sito:				Permite ejecutar la funci�n de inserci�n de la tabla tct_rubro
	 * Autor:				    (autogenerado)
	 * Fecha de creaci�n:		2008-10-02 11:34:33
	 */
	function InsertarRubro($id_rubro,$nombre_rubro,$id_reporte_eeff,$fk_rubro,$sw_debe_haber,$sw_arbol_cuenta)
	{
		$this->salida = "";
		$this->nombre_funcion = 'f_tct_rubro_iud';
		$this->codigo_procedimiento = "'CT_RUBROO_INS'";

		//Instancia la clase midlle para la ejecuci�n de la funci�n de la BD
		$this->var = new cls_middle($this->nombre_funcion,$this->codigo_procedimiento,$this->decodificar);
		$this->var->add_param("NULL");
		$this->var->add_param("'$nombre_rubro'");
		$this->var->add_param($id_reporte_eeff);
		$this->var->add_param($fk_rubro);
		$this->var->add_param($sw_debe_haber);
		$this->var->add_param("'$sw_arbol_cuenta'");

		//Ejecuta la funci�n
		$res = $this->var->exec_non_query();

		//Obtiene el array de salida de la funci�n y retorna el resultado de la ejecuci�n
		$this->salida = $this->var->salida;

		//Obtiene la cadena con que se llam� a la funci�n de postgres
		$this->query = $this->var->query;

		return $res;
	}
	
	/**
	 * Nombre de la funci�n:	ModificarRubro
	 * Prop�sito:				Permite ejecutar la funci�n de modificaci�n de la tabla tct_rubro
	 * Autor:				    (autogenerado)
	 * Fecha de creaci�n:		2008-10-02 11:34:33
	 */
	function ModificarRubro($id_rubro,$nombre_rubro,$id_reporte_eeff,$fk_rubro,$sw_debe_haber,$sw_arbol_cuenta)
	{
		$this->salida = "";
		$this->nombre_funcion = 'f_tct_rubro_iud';
		$this->codigo_procedimiento = "'CT_RUBROO_UPD'";

		//Instancia la clase midlle para la ejecuci�n de la funci�n de la BD
		$this->var = new cls_middle($this->nombre_funcion,$this->codigo_procedimiento,$this->decodificar);
		$this->var->add_param($id_rubro);
		$this->var->add_param("'$nombre_rubro'");
		$this->var->add_param($id_reporte_eeff);
		$this->var->add_param($fk_rubro);
		$this->var->add_param($sw_debe_haber);
		$this->var->add_param("'$sw_arbol_cuenta'");

		//Ejecuta la funci�n
		$res = $this->var->exec_non_query();

		//Obtiene el array de salida de la funci�n y retorna el resultado de la ejecuci�n
		$this->salida = $this->var->salida;

		//Obtiene la cadena con que se llam� a la funci�n de postgres
		$this->query = $this->var->query;

		return $res;
	}
	
	/**
	 * Nombre de la funci�n:	EliminarRubro
	 * Prop�sito:				Permite ejecutar la funci�n de eliminaci�n de la tabla tct_rubro
	 * Autor:				    (autogenerado)
	 * Fecha de creaci�n:		2008-10-02 11:34:33
	 */
	function EliminarRubro($id_rubro)
	{
		$this->salida = "";
		$this->nombre_funcion = 'f_tct_rubro_iud';
		$this->codigo_procedimiento = "'CT_RUBROO_DEL'";

		//Instancia la clase midlle para la ejecuci�n de la funci�n de la BD
		$this->var = new cls_middle($this->nombre_funcion,$this->codigo_procedimiento,$this->decodificar);
		$this->var->add_param($id_rubro);
		$this->var->add_param("NULL");
		$this->var->add_param("NULL");
		$this->var->add_param("NULL");
		$this->var->add_param("NULL");
		$this->var->add_param("NULL");

		//Ejecuta la funci�n
		$res = $this->var->exec_non_query();

		//Obtiene el array de salida de la funci�n y retorna el resultado de la ejecuci�n
		$this->salida = $this->var->salida;

		//Obtiene la cadena con que se llam� a la funci�n de postgres
		$this->query = $this->var->query;

		return $res;
	}
	
	/**
	 * Nombre de la funci�n:	ValidarRubro
	 * Prop�sito:				Permite ejecutar la validaci�n del lado del servidor de la tabla tct_rubro
	 * Autor:				    (autogenerado)
	 * Fecha de creaci�n:		2008-10-02 11:34:33
	 */
	function ValidarRubro($operacion_sql,$id_rubro,$nombre_rubro,$id_reporte_eeff,$fk_rubro,$sw_debe_haber,$sw_arbol_cuenta)
	{
		$this->salida = "";
		$valid = new cls_validacion_serv();

		//Clase para validar el tipo de dato
		$tipo_dato = new cls_define_tipo_dato();
	
		//Ejecuta la validaci�n por el tipo de operaci�n
		if($operacion_sql=='insert' || $operacion_sql=='update')
		{
			if($operacion_sql == 'update')
			{
				//Validar id_rubro - tipo int4
				$tipo_dato->_reiniciar_valor();
				$tipo_dato->set_MaxLength(10);
				$tipo_dato->set_Columna("id_rubro");

				if(!$valid->verifica_dato($tipo_dato->TipoDatoInteger(), "id_rubro", $id_rubro))
				{
					$this->salida = $valid->salida;
					return false;
				}
			}

			//Validar nombre_rubro - tipo varchar
			$tipo_dato->_reiniciar_valor();
			$tipo_dato->set_Columna("nombre_rubro");
			$tipo_dato->set_MaxLength(200);
			$tipo_dato->set_AllowBlank(true);
			if(!$valid->verifica_dato($tipo_dato->TipoDatoText(), "nombre_rubro", $nombre_rubro))
			{
				$this->salida = $valid->salida;
				return false;
			}

			//Validar id_reporte_eeff - tipo int4
			$tipo_dato->_reiniciar_valor();
			$tipo_dato->set_Columna("id_reporte_eeff");
			$tipo_dato->set_MaxLength(10);
			$tipo_dato->set_AllowBlank(true);
			if(!$valid->verifica_dato($tipo_dato->TipoDatoInteger(), "id_reporte_eeff", $id_reporte_eeff))
			{
				$this->salida = $valid->salida;
				return false;
			}

			//Validar fk_rubro - tipo int4
			$tipo_dato->_reiniciar_valor();
			$tipo_dato->set_Columna("fk_rubro");
			$tipo_dato->set_MaxLength(10);
			$tipo_dato->set_AllowBlank(false);
			if(!$valid->verifica_dato($tipo_dato->TipoDatoInteger(), "fk_rubro", $fk_rubro))
			{
				$this->salida = $valid->salida;
				return false;
			}

			//Validar sw_debe_haber - tipo numeric
			$tipo_dato->_reiniciar_valor();
			$tipo_dato->set_Columna("sw_debe_haber");
			$tipo_dato->set_MaxLength(10);
			$tipo_dato->set_AllowBlank(true);
			if(!$valid->verifica_dato($tipo_dato->TipoDatoReal(), "sw_debe_haber", $sw_debe_haber))
			{
				$this->salida = $valid->salida;
				return false;
			}
			
			$tipo_dato->_reiniciar_valor();
			$tipo_dato->set_Columna("sw_arbol_cuenta");
			$tipo_dato->set_MaxLength(20);
			$tipo_dato->set_AllowBlank(true);
			if(!$valid->verifica_dato($tipo_dato->TipoDatoText(), "sw_arbol_cuenta", $sw_arbol_cuenta))
			{
				$this->salida = $valid->salida;
				return false;
			}
			//Validaci�n exitosa
			return true;
		}
		elseif ($operacion_sql=='delete')
		{
			//Validar id_rubro - tipo int4
			$tipo_dato->_reiniciar_valor();
			$tipo_dato->set_Columna("id_rubro");

			if(!$valid->verifica_dato($tipo_dato->TipoDatoInteger(), "id_rubro", $id_rubro))
			{
				$this->salida = $valid->salida;
				return false;
			}
		
			//Validaci�n exitosa
			return true;	
		}
		else
		{
			return false;
		}
	}
}?>