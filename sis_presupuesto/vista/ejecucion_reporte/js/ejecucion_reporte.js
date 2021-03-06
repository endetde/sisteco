function EjecucionReporte(idContenedor,direccion,paramConfig,configConsolidacion)
{
	var vectorAtributos=new Array();
	var parametro;
	var gestion;
	var periodo;
	var componentes=new Array();
	var id_moneda , id_parametro, id_presupuesto, id_tipo_presupuesto, f_f,e_p_e,u_o;
		
	var	g_CantFiltros='';
	var	g_id_tipo_pres='';
	var	g_id_parametro='';
	var	g_id_moneda='';
	var	g_ids_fuente_financiamiento='';
	var	g_ids_u_o='';
	var	g_ids_financiador='';
	var	g_ids_regional='';
	var	g_ids_programa='';
	var	g_ids_proyecto='';
	var	g_ids_actividad='';
	var	g_sw_vista='';
	var	g_ids_concepto_colectivo='';
 	
	var g_regional='';
	var g_financiador='';
	var g_programa='';
	var g_proyecto='';
	var g_actividad='';
	var g_unidad_organizacional='';
	var g_Fuente_financiamiento='';
	
	var g_colectivo='';
	var g_desc_moneda='';
	var g_desc_pres='';
	var g_desc_estado_gral='';
	var g_gestion_pres='';
	var g_fecha_fin='';
	var g_tipo_reporte='';
	var g_filtro_niveles='';
	
	var g_filtro = '';
	var g_id_categoria_prog = '';
	var g_desc_categoria_prog = '';
	
	var g_cod_programa='';
	var g_cod_proyecto='';
	var g_cod_actividad='';
	var g_cod_fuente_financiamiento='';
	var g_cod_organismo_financiador='';
	var g_descripcion_cp='';
	var g_codigo_sisin='';
	var g_id_presupuesto='';
	
	
	//DATA STORE 		
 	var ds_parametro = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../control/parametro/ActionListarParametro.php'}),
			reader:new Ext.data.XmlReader({record:'ROWS',id:'id_parametro',totalRecords: 'TotalCount'},['id_parametro','gestion_pres','estado_gral','cod_institucional','porcentaje_sobregiro','cantidad_niveles','desc_estado_gral'])
	});
	
	var ds_tipo_pres_gestion = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../control/tipo_pres_gestion/ActionListarTipoPresGestion.php'}),
			reader:new Ext.data.XmlReader({record:'ROWS',id:'id_tipo_pres',totalRecords: 'TotalCount'},['id_tipo_pres_gestion','id_tipo_pres','desc_tipo_pres','id_parametro','desc_parametro','estado','doble'])
	});
	
	var ds_moneda=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:direccion+'../../../../sis_parametros/control/moneda/ActionListarMoneda.php'}),
			reader:new Ext.data.XmlReader({record:'ROWS',id:'id_moneda',totalRecords:'TotalCount'},['id_moneda','nombre','simbolo','estado','origen','prioridad']),
			baseParams:{sw_comboPresupuesto:'si'}
	});
	
	var ds_presupuesto = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../control/presupuesto/ActionListarPresupuesto.php?oc=si'}),
			reader:new Ext.data.XmlReader({record:'ROWS',id:'id_presupuesto',totalRecords: 'TotalCount'},['id_presupuesto','tipo_pres','estado_pres','id_fina_regi_prog_proy_acti','desc_fina_regi_prog_proy_acti',
																																										'id_unidad_organizacional','desc_unidad_organizacional','id_fuente_financiamiento','denominacion','id_parametro',
																																										'desc_parametro','id_financiador','id_regional','id_programa','id_proyecto','id_actividad','nombre_financiador',
																																										'nombre_regional','nombre_programa','nombre_proyecto','nombre_actividad','codigo_financiador','codigo_regional',
																																										'codigo_programa','codigo_proyecto','codigo_actividad','id_concepto_colectivo','desc_colectivo','sigla',
																																										'id_categoria_prog','cod_categoria_prog',   'cp_cod_programa','cp_cod_proyecto','cp_cod_actividad',
																																										'cp_cod_organismo_fin','cp_cod_fuente_financiamiento','codigo_sisin'])
	});	
	
	var ds_categoria_prog = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../control/categoria_prog/ActionListarCategoriaProg.php?oc=si'}),
			reader:new Ext.data.XmlReader({record:'ROWS',id:'id_categoria_prog',totalRecords: 'TotalCount'},['id_categoria_prog','cod_categoria_prog','desc_parametro','cod_programa','desc_programa','cod_proyecto','desc_proyecto','cod_actividad','desc_actividad',
																																											 'cod_organismo_fin','desc_organismo_fin','cod_fuente_financiamiento','desc_fuente_financiamiento','id_fuente_financiamiento','descripcion_cp','codigo_sisin'])  //, baseParams:{tipo_vista:'formulacion'}
	});
	
	
	//render
	
		function renderTipoPresupuesto(value, p, record)
		{						
			if(value == 1)
			{return "Recurso"}
			if(value == 2)
			{return "Gasto"}
			if(value == 3)
			{return "Inversi�n"}			
			if(value == 4)
			{return "PNO - Recurso"}
			if(value == 5)
			{return "PNO - Gasto"}
			if(value == 6)
			{return "PNO - Inversi�n"}
			
			return '';
		}	
		
		function renderPeriodo(value, p, record)
		{
			if(value == 1) {return "Enero"}
			if(value == 2) {return "Febrero"}
			if(value == 3) {return "Marzo"}
			if(value == 4) {return "Abril"}
			if(value == 5) {return "Mayo"}
			if(value == 6) {return "Junio"}
			if(value == 7) {return "Julio"}
			if(value == 8) {return "Agosto"}
			if(value == 9) {return "Septiembre"}
			if(value == 10){return "Octubre"}
			if(value == 11){return "noviembre"}
			if(value == 12){return "Diciembre"}
			if(value == 13){return "Gesti�n"}
		}
		
		function render_id_parametro(value,cell,record,row,colum,store){return String.format('{0}', record.data['desc_parametro']);}
		function render_id_moneda(value,p,record){return String.format('{0}', record.data['desc_moneda'])}
		function render_id_tipo_pres_gestion(value,cell,record,row,colum,store){return String.format('{0}', record.data['desc_tipo_pres']);}
		
						
		var tpl_id_parametro=new Ext.Template('<div class="search-item">','<b><i>{gestion_pres}</i></b>','<br><FONT COLOR="#B5A642"><b>Estado Gral: </b>{desc_estado_gral}</FONT>','</div>');
		var tpl_id_moneda=new Ext.Template('<div class="search-item">','<b><i>{nombre}</i></b>','<br><FONT COLOR="#B5A642"><b>Abrev: </b>{simbolo}</FONT>','</div>');
		var tpl_id_tipo_pres_gestion=new Ext.Template('<div class="search-item">','<b><i>{desc_tipo_pres}</i></b>','<br><FONT COLOR="#B5A642"><b>Gesti�n: </b>{desc_parametro}</FONT>','</div>');
		
		
		function render_id_presupuesto(value, p, record){return String.format('{0}', record.data['desc_presupuesto']);}
		var tpl_id_presupuesto=new Ext.Template('<div class="search-item">','<b><i>{desc_unidad_organizacional}</i></b>',
																													'<br><b>Gesti�n: </b><FONT COLOR="#B5A642">{desc_parametro}</FONT>',
																													'<br><b>Tipo Presupuesto: </b><FONT COLOR="#B50000">{sigla}</FONT>',
																													'<br><FONT COLOR="#B50000"><b>Financiador: </b>{nombre_financiador}</FONT>',
																													'<br><FONT COLOR="#B5A642"><b>Regional: </b>{nombre_regional}</FONT>',
																													'<br><FONT COLOR="#B5A642"><b>Programa: </b>{nombre_programa}</FONT>',
																													'<br><FONT COLOR="#B50000"><b>Sub Programa: </b>{nombre_proyecto}</FONT>',
																													'<br><FONT COLOR="#B50000"><b>Actividad: </b>{nombre_actividad}</FONT>',
																													'<br><FONT COLOR="#B5A642"><b>Fuente de Financiamiento: </b>{denominacion}</FONT>',
																													'<br><FONT COLOR="#B50000"><b>Cat. Programatica: </b>{cod_categoria_prog}</FONT>',  
																													'<br><FONT COLOR="#B50000"><b>Identificador: </b>{id_presupuesto}</FONT>',  
																													'</div>');																									
	
		function render_id_categoria_prog(value, p, record){return String.format('{0}', record.data['cod_categoria_prog']);}
		var tpl_id_categoria_prog=new Ext.Template('<div class="search-item">', '<b><i>{cod_categoria_prog}</i></b>',
																												'<br><FONT COLOR="#B50000"><b>Cod. Programa: </b>{desc_programa}</FONT>',
																												'<br><FONT COLOR="#B50000"><b>Cod. Proyecto: </b>{desc_proyecto}</FONT>',
																												'<br><FONT COLOR="#B50000"><b>Cod. Actividad: </b>{desc_actividad}</FONT>',
																												'<br><FONT COLOR="#B50000"><b>Cod. Fuente Financiamiento: </b>{desc_fuente_financiamiento}</FONT>',
																												'<br><FONT COLOR="#B50000"><b>Cod. Organismo Financiador: </b>{desc_organismo_fin}</FONT>',																												
																												'<br><FONT COLOR="#B5A642"><b>Gesti�n: </b>{desc_parametro}</FONT>',
																												'</div>');
				
	vectorAtributos[0]={
		validacion:{
			name:'id_parametro',
			fieldLabel:'Gesti�n',
			allowBlank:false,			
			//emptyText:'Parame...',
			desc: 'desc_parametro', //indica la columna del store principal ds del que proviane la descripcion
			store:ds_parametro,
			valueField: 'id_parametro',
			displayField: 'gestion_pres',
			queryParam: 'filterValue_0',
			filterCol:'PARAMP.gestion_pres#PARAMP.estado_gral',
			typeAhead:true,
			tpl:tpl_id_parametro,
			forceSelection:true,
			mode:'remote',
			queryDelay:250,
			pageSize:100,
			minListWidth:'50%',
			grow:true,
			resizable:true,
			queryParam:'filterValue_0',
			minChars:1, ///caracteres m�nimos requeridos para iniciar la busqueda
			triggerAction:'all',
			editable:true,
			renderer:render_id_parametro,
			grid_visible:true,
			grid_editable:false,
			width_grid:100,
			width:250,
			disabled:false
		},
		tipo:'ComboBox',
		form: true,
		filtro_0:true,
		filterColValue:'PARAMP.gestion_pres',
		save_as:'id_parametro'
	}; 
	
	vectorAtributos[1]={
		validacion:{
			name:'id_tipo_pres',
			fieldLabel:'Tipo de Presupuesto',
			allowBlank:false,			
			//emptyText:'Parame...',
			desc: 'desc_tipo_pres', //indica la columna del store principal ds del que proviane la descripcion
			store:ds_tipo_pres_gestion,
			valueField: 'id_tipo_pres',
			displayField: 'desc_tipo_pres',
			queryParam: 'filterValue_0',
			filterCol:'TIPREGES.desc_tipo_pres',
			typeAhead:true,
			tpl:tpl_id_tipo_pres_gestion,
			forceSelection:true,
			mode:'remote',
			queryDelay:250,
			pageSize:100,
			minListWidth:'50%',
			grow:true,
			resizable:true,
			queryParam:'filterValue_0',
			minChars:1, ///caracteres m�nimos requeridos para iniciar la busqueda
			triggerAction:'all',
			editable:true,
			renderer:render_id_tipo_pres_gestion,
			grid_visible:true,
			grid_editable:false,
			width_grid:100,
			width:250,
			disabled:false
		},
		tipo:'ComboBox',
		form: true,
		filtro_0:true,
		filterColValue:'TIPREGES.gestion_pres',
		save_as:'id_tipo_pres'
	}; 
	
	vectorAtributos[2]={
			validacion:{
				name: 'filtro',
				fieldLabel:'Filtrar por',
				allowBlank:false,
				typeAhead:true,
				loadMask:true,
				triggerAction:'all',
				store:new Ext.data.SimpleStore({fields:['id','valor'],data:[['1','Presupuesto'],['2','Categor�a Program�tica']]}),  //,['3','Fuente de Financiamiento y Organismo Financiador ']
				valueField:'id',
				displayField:'valor',
				lazyRender:true,								
				forceSelection:true,
				//emptyText:'Seleccione una opci�n...',
				width:250		
			},
			tipo: 'ComboBox',
			filtro_0:true,
		};

	// txt id_fuente_financiamiento
	vectorAtributos[3]={
			validacion:{
			name:'id_categoria_prog',
			fieldLabel:'Categor�a Program�tica',
			allowBlank:true,			
			//emptyText:'Fuente Financiamiento...',
			desc: 'cod_categoria_prog', //indica la columna del store principal ds del que proviane la descripcion
			store:ds_categoria_prog,
			valueField: 'id_categoria_prog',
			displayField: 'cod_categoria_prog',
			queryParam: 'filterValue_0',
			filterCol:'PROGRA.codigo#PROYEC.codigo#ACTIVI.codigo#ORGFIN.codigo#FUEFIN.codigo_fuente',
			typeAhead:true,
			tpl:tpl_id_categoria_prog,
			forceSelection:true,
			mode:'remote',
			queryDelay:300,
			pageSize:20,
			minListWidth:500,
			grow:true,
			resizable:true,
			queryParam:'filterValue_0',
			minChars:1, ///caracteres m�nimos requeridos para iniciar la busqueda
			triggerAction:'all',
			editable:true,
			renderer:render_id_categoria_prog,
			grid_visible:true,
			grid_editable:false,
			width_grid:150,
			width:250,
			disabled:false
		},
		tipo:'ComboBox',
		form: true,
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PROGRA.codigo#PROYEC.codigo#ACTIVI.codigo#ORGFIN.codigo#FUEFIN.codigo_fuente',
		save_as:'id_categoria_prog'
		//id_grupo:2
	};

	vectorAtributos[4]={
			validacion:{
			name:'id_presupuesto',
			fieldLabel:'Presupuesto',
			allowBlank:false,			
			//emptyText:'Presupue...',
			desc: 'desc_presupuesto', //indica la columna del store principal ds del que proviane la descripcion
			store:ds_presupuesto,
			valueField: 'id_presupuesto',
			displayField: 'desc_unidad_organizacional',
			queryParam: 'filterValue_0',
			filterCol:'PRESUP.nombre_unidad#PRESUP.nombre_fuente_financiamiento#PRESUP.nombre_financiador#PRESUP.nombre_regional#PRESUP.nombre_programa#PRESUP.nombre_proyecto#PRESUP.nombre_actividad#PRESUP.id_presupuesto#PROGRA.codigo#PROYEC.codigo#ACTIVI.codigo#FUNFIN.codigo_fuente#ORGFIN.codigo',				
			typeAhead:false,			
			tpl:tpl_id_presupuesto,
			forceSelection:true,
			mode:'remote',
			queryDelay:250,
			pageSize:100,
			minListWidth:'100%',
			grow:true,
			resizable:true,
			queryParam:'filterValue_0',
			minChars:3, //caracteres m�nimos requeridos para iniciar la busqueda
			triggerAction:'all',
			editable:true,
			renderer:render_id_presupuesto,
			grid_visible:true,
			grid_editable:false,
			width_grid:150,
			width:250,
			disabled:false,
			grid_indice:8		
		},
		tipo:'ComboBox',
		form: true,
		filtro_0:true,		
		filterColValue:'UNIORG.nombre_unidad#FUNFIN.denominacion#FINANC.nombre_financiador#REGION.nombre_regional#PROGRA.nombre_programa#PROYEC.nombre_proyecto#ACTIVI.nombre_actividad',
		save_as:'id_presupuesto'
	};
	
	vectorAtributos[5]={
		validacion:{
			name:'sub_programa',
			fieldLabel:'Sub Programa',
			allowBlank:true,
			maxLength:500,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:false,
			width_grid:100,
			width:250,
			disabled:true,					
		},
		tipo: 'TextField',
		form: true,
		filtro_0:false				
	};
	
	vectorAtributos[6]={
			validacion:{
			name:'id_moneda',
			fieldLabel:'Moneda',
			allowBlank:false,			
			//emptyText:'Moneda...',
			desc: 'desc_moneda', //indica la columna del store principal ds del que proviane la descripcion
			store:ds_moneda,
			valueField: 'id_moneda',
			displayField: 'nombre',
			queryParam: 'filterValue_0',
			filterCol:'MONEDA.nombre',
			typeAhead:true,
			tpl:tpl_id_moneda,
			forceSelection:true,
			mode:'remote',
			queryDelay:250,
			pageSize:100,
			minListWidth:'50%',
			grow:true,
			resizable:true,
			minChars:1, ///caracteres m�nimos requeridos para iniciar la busqueda
			triggerAction:'all',
			editable:true,
			renderer:render_id_moneda,
			grid_visible:false,
			grid_editable:true,
			width:250,			
			disable:false		
		},
		tipo:'ComboBox',
		form: true,
		filtro_0:true,
		filterColValue:'MONEDA.nombre',
		save_as:'id_moneda'
	};	 
	
	vectorAtributos[7]={
		validacion:{
			name:'fecha_ini',
			fieldLabel:'Fecha Inicio',
			allowBlank:false,
			format:'d/m/Y', 
			minValue:'01/01/1900',
			//disabledDays:[0, 7],
			disabledDaysText:'D�a no v�lido',
			grid_visible:true, 
			grid_editable:false, 
			renderer:formatDate,
			width_grid:100, 
			width:'100%',
			align:'center',
			disabled:false
		},
		tipo:'DateField',
		filtro_0:true,
		filterColValue:'cre.fecha_ini',
		filtro_1:true,
		save_as:'txt_fecha_ini',
		dateFormat:'m-d-Y', 
	};
	
 	vectorAtributos[8]={
		validacion:{
			name:'fecha_fin',
			fieldLabel:'Fecha Final',
			allowBlank:false,
			format:'d/m/Y', 
			minValue:'01/01/1900',
			//disabledDays:[0, 7],
			disabledDaysText:'D�a no v�lido',
			grid_visible:true, 
			grid_editable:false, 
			renderer:formatDate,
			width_grid:100, 
			width:'100%',
			align:'center',
			disabled:false
		},
		tipo:'DateField',
		filtro_0:true,
		filterColValue:'cre.fecha_fin',
		filtro_1:true,
		save_as:'txt_fecha_fin',
		dateFormat:'m-d-Y', 
	};
	
	vectorAtributos[9]=
	{
			validacion:{
				name: 'tipo_reporte',
				fieldLabel:'Tipo Reporte',
				allowBlank:false,
				typeAhead:true,
				loadMask:true,
				triggerAction:'all',
				store:new Ext.data.SimpleStore({fields:['id','valor'],data:[['1','PDF'],['2','Excel']]}),				
				valueField:'id',
				displayField:'valor',
				lazyRender:true,								
				forceSelection:true,
				//emptyText:'Seleccione una opci�n...',
				width:250		
			},
			tipo: 'ComboBox',
			filtro_0:true,			
			id_grupo:0,
			defecto:'no',
			save_as:'tipo_reporte'
		};
		
	vectorAtributos[10]=
		{
			validacion:{
				name: 'filtro_niveles',
				fieldLabel:'Niveles',
				allowBlank:false,
				typeAhead:true,
				loadMask:true,
				triggerAction:'all',
				store:new Ext.data.SimpleStore({fields:['id','valor'],data:[['1','Todos los Niveles'],['2','Solo Grupos y Partidas de Movimiento'],['3','Solo Grupos']]}),				
				valueField:'id',
				displayField:'valor',
				lazyRender:true,								
				forceSelection:true,
				//emptyText:'Seleccione una opci�n...',
				width:250		
			},
			tipo: 'ComboBox',
			filtro_0:true,			
			id_grupo:0,			
			save_as:'filtro_niveles'
		};	

	//////////////////////////////////////////////////////////////
	//---------         INICIAMOS LAYOUT MAESTRO     -----------//
	//////////////////////////////////////////////////////////////

	function formatDate(value){	return value ? value.dateFormat('d/m/Y'):''}
	
	// ---------- Inicia Layout ---------------//
	var config=
	{
		titulo_maestro:"Consolidaci�n Presupuesto"
	};
	layout_ejecucion_reporte=new DocsLayoutProceso(idContenedor);
	layout_ejecucion_reporte.init(config);

	//////////////////////////////////////////////////////////////
	//---------         INICIAMOS HERENCIA           -----------//
	//////////////////////////////////////////////////////////////

	/// HEREDAMOS DE LA CLASE MADRE
	this.pagina=BaseParametrosReporte;
	//-- pagina (array PARAMETROS DE CONFIGURACION, array DEFINICION DE ATRIBUTOS, SELECTION MODEL, DATA STORE, COLUM MODEL)
	this.pagina(paramConfig,vectorAtributos,layout_ejecucion_reporte,idContenedor);

	//--------------- HERENCIA DE LA CLASE MADRE ---------------------//

	var ClaseMadre_conexionFailure = this.conexionFailure; // para heredar de la clase madre la funcion eliminarSucces de esta forma se encuentra disponible tambien para los metodos y no solo para el contructor
	var ClaseMadre_getComponente = this.getComponente;	
	var CM_ocultarComponente=this.ocultarComponente;
	var CM_mostrarComponente=this.mostrarComponente;

	//ds_parametro.addListener('loadexception',  ClaseMadre_conexionFailure); //se recibe un error	
	
	//////////////////////////////////////////////////////////////////////////////
	//----------------------  DEFINICI�N DE FUNCIONES ------------------------- //
	//  aqu� se parametrizan las funciones que se ejecutan en la clase madre    //
	//////////////////////////////////////////////////////////////////////////////

	var paramFunciones = {

		Formulario:{
			labelWidth: 75, //ancho del label
		 	url:direccion+'../../../../sis_presupuesto/vista/consolidacion_presupuesto/consolidacion_presupuesto.php',
			abrir_pestana:true, //abrir pestana
			titulo_pestana:'Ejecuci�n Presupuestaria',
			fileUpload:false,
			columnas:[505,305],			
			grupos:[
			{
				tituloGrupo:'Asigne Datos Para Consultar la Ejecuci�n ',
				columna:0,
				id_grupo:0
			}
			
			],
			parametros: '',
			submit:function ()
			{					
				var mensaje="";
				
				if(id_parametro.getValue()==""){mensaje+=" El campo Gesti�n esta vacio";}; 
				if(id_tipo_presupuesto.getValue()==""){mensaje+=" El campo Tipo Presupuesto esta vacio";};
				//if(id_presupuesto.getValue()==""){mensaje+=" El campo Presupuesto esta vacio";};
				if(id_moneda.getValue()==""){mensaje+=" El campo Moneda esta vacio";};
				if(fecha_ini.getValue()==""){mensaje+=" El campo Fecha Inicio esta vacio";};
				if(fecha_fin.getValue()==""){mensaje+=" El campo Fecha Final esta vacio";};
				//if(cmbReporte.getValue()==""){mensaje+=" El campo Tipo Reporte esta vacio";};
				//if(periodo.getValue()==""){mensaje+=" El campo Periodo esta vacio";};
				
				if(mensaje=="")
				{							
					var data='start=0';
					 data+='&limit=1000';
					 data+='&CantFiltros='+g_CantFiltros;
					 data+='&tipo_pres='+g_id_tipo_pres;	//listo
					 data+='&id_parametro='+g_id_parametro;	//listo
					 data+='&id_moneda='+g_id_moneda;	//listo
					 data+='&ids_fuente_financiamiento='+g_ids_fuente_financiamiento;	//listo
					 data+='&ids_u_o='+g_ids_u_o;	//listo
					 data+='&ids_financiador='+g_ids_financiador;	//listo
					 data+='&ids_regional='+g_ids_regional;		//listo
					 data+='&ids_programa='+g_ids_programa;		//listo
					 data+='&ids_proyecto='+g_ids_proyecto;		//listo
					 data+='&ids_actividad='+g_ids_actividad;	//listo
					 data+='&sw_vista='+configConsolidacion.sw_vista;	//lista
					 data+='&ids_concepto_colectivo='+g_ids_concepto_colectivo;
					 data+='&fecha_ini='+formatDate(fecha_ini.getValue());	//listo
					 data+='&fecha_fin='+formatDate(fecha_fin.getValue());	//listo
					 data+='&tipo_reporte='+g_tipo_reporte;	//listo
					 data+='&filtro_niveles='+g_filtro_niveles;	//listo
				 
					if(g_unidad_organizacional==""){g_unidad_organizacional="Todos"}
					if(g_Fuente_financiamiento==""){g_Fuente_financiamiento="Todos"}
					if(g_colectivo==""){g_colectivo="Todos"}
					
					data+='&regional='+g_regional;	//listo
					data+='&financiador='+g_financiador;	//listo
					data+='&programa='+g_programa;	//listo
					data+='&proyecto='+g_proyecto;	//listo
					data+='&actividad='+g_actividad;	//listo
					data+='&unidad_organizacional='+g_unidad_organizacional;	//listo
					data+='&Fuente_financiamiento='+g_Fuente_financiamiento;	//listo
					data+='&colectivo='+g_colectivo;
					data+='&desc_moneda='+g_desc_moneda;	//listo
					data+='&desc_pres='+g_desc_pres;		//listo
					data+='&desc_estado_gral='+g_desc_estado_gral;	//listo
					data+='&gestion_pres='+g_gestion_pres;	//listo
					
					data+='&id_categoria_prog='+g_id_categoria_prog;
					data+='&desc_categoria_prog='+g_desc_categoria_prog;
					data+='&filtro='+g_filtro;
					
					data+='&cod_programa='+g_cod_programa;
					data+='&cod_proyecto='+g_cod_proyecto;
					data+='&cod_actividad='+g_cod_actividad;
					data+='&cod_fuente_financiamiento='+g_cod_fuente_financiamiento;
					data+='&cod_organismo_financiador='+g_cod_organismo_financiador;
					data+='&descripcion_cp='+g_descripcion_cp;
					data+='&codigo_sisin='+g_codigo_sisin;
					data+='&id_presupuesto='+g_id_presupuesto;
					
					window.open(direccion+'../../../control/ejecucion/ActionReporteEjecucion.php?'+data);					
				}
				else{alert(mensaje);}
			}
		}
	}

	//-------------- DEFINICI�N DE FUNCIONES PROPIAS --------------//

	function iniciarEventosFormularios()
	{			
		id_parametro = ClaseMadre_getComponente('id_parametro');
		id_tipo_presupuesto = ClaseMadre_getComponente('id_tipo_pres');
		id_categoria_prog = ClaseMadre_getComponente('id_categoria_prog');
		id_presupuesto = ClaseMadre_getComponente('id_presupuesto');	
		sub_programa = ClaseMadre_getComponente('sub_programa');		
		id_moneda = ClaseMadre_getComponente('id_moneda');	
		fecha_ini = ClaseMadre_getComponente('fecha_ini');
		fecha_fin = ClaseMadre_getComponente('fecha_fin');		
		cmbReporte = ClaseMadre_getComponente('tipo_reporte');	
		
		for(var i=0; i<vectorAtributos.length; i++)
		{
			componentes[i]=ClaseMadre_getComponente(vectorAtributos[i].validacion.name)
		}
		
		CM_ocultarComponente(id_categoria_prog);	
		CM_ocultarComponente(id_presupuesto);
		CM_ocultarComponente(sub_programa);
		
		componentes[0].on('select',evento_parametro);		//parametro		
		componentes[1].on('select',evento_tipo_presupuesto);	//tipo_pres	
		componentes[2].on('select',evento_filtro);	//	filtrar por 
		componentes[3].on('select',evento_categoria_prog);	//categoria
		componentes[4].on('select',evento_presupuesto);		//presupuesto
		componentes[6].on('select',evento_moneda);		//moneda
		componentes[9].on('select',evento_reporte);		//tipo reporte
		componentes[10].on('select',evento_filtro_niveles);		//tipo reporte 
	}
	
	function evento_parametro( combo, record, index )
	{
		//Validaci�n de fechas
		var id = componentes[0].getValue();
		if(componentes[0].store.getById(id)!=undefined){
			
			var intGestion=componentes[0].store.getById(id).data.gestion_pres;
			var dte_fecha_ini_valid=new Date('01/01/'+intGestion+' 00:00:00');
			var dte_fecha_fin_valid=new Date('12/31/'+intGestion+' 00:00:00');
				
			//Aplica la validaci�n en la fecha
			componentes[7].minValue=dte_fecha_ini_valid; //Fecha inicio
			componentes[7].maxValue=dte_fecha_fin_valid;
			componentes[8].minValue=dte_fecha_ini_valid;
			componentes[8].maxValue=dte_fecha_fin_valid;
				
			//Define un valor por defecto
			componentes[7].setValue(dte_fecha_ini_valid);
			componentes[8].setValue(dte_fecha_fin_valid);			
		}
		
		g_id_parametro=record.data.id_parametro;
		g_gestion_pres=record.data.gestion_pres;
		g_desc_estado_gral=record.data.desc_estado_gral;
		
		componentes[1].store.baseParams={m_id_parametro:componentes[0].getValue(),m_incluir_dobles:'no'};
		componentes[1].modificado=true;
		componentes[1].setValue('');		
		
		componentes[3].store.baseParams={m_id_parametro:componentes[0].getValue()};
		componentes[3].modificado=true;
		componentes[3].setValue('');
		componentes[3].setDisabled(false);
	}	
	
	function evento_tipo_presupuesto( combo, record, index )
	{
		g_id_tipo_pres=componentes[1].getValue();
		g_desc_pres=renderTipoPresupuesto(g_id_tipo_pres, '', '');
		
		componentes[3].store.baseParams={tipo_vista:'formulacion',m_id_parametro:componentes[0].getValue(),m_tipo_pres:componentes[1].getValue()}; 
		componentes[3].modificado=true;
		componentes[3].setValue('');
		
		componentes[4].store.baseParams={sw_reporte_ejecucion:'si',m_id_parametro:componentes[0].getValue(),m_id_tipo_pres:componentes[1].getValue()};  //,m_id_unidad_organizacional:record.data.id_unidad_organizacional
		componentes[4].modificado=true;			
		componentes[4].setValue('');			
	}
	
	function evento_filtro( combo, record, index )
	{
		g_filtro = componentes[2].getValue();
		
		if(record.data.id == '1')
		{
			CM_ocultarComponente(id_categoria_prog);						
			CM_mostrarComponente(id_presupuesto);
			CM_mostrarComponente(sub_programa);
			
			componentes[3].allowBlank = true;
			componentes[3].modificado = true;			
			componentes[3].setValue('');		

			componentes[4].store.baseParams={sw_reporte_ejecucion:'si',m_id_parametro:componentes[0].getValue(),m_id_tipo_pres:componentes[1].getValue()};  			
			componentes[4].allowBlank = false;
			componentes[4].modificado=true;			
			componentes[4].setValue('');			
			
			componentes[5].modificado = true;			
			componentes[5].setValue('');
		}
		else
		{
			CM_mostrarComponente(id_categoria_prog);			
			CM_ocultarComponente(id_presupuesto);
			CM_ocultarComponente(sub_programa);	
		
			componentes[3].store.baseParams={tipo_vista:'formulacion',m_id_parametro:componentes[0].getValue(),m_tipo_pres:componentes[1].getValue()};
			componentes[3].modificado=true;			
			componentes[3].setValue('');
			componentes[3].allowBlank = false;				
			
			componentes[4].allowBlank = true;	
			componentes[4].modificado=true;			
			componentes[4].setValue('');
			
			componentes[5].allowBlank = true;	
			componentes[5].modificado=true;			
			componentes[5].setValue('');
			
			//componentes[10].store.baseParams={sw_traspaso:'si',m_id_presupuesto:'%',m_id_tipo_pres:g_id_tipo_pres,m_id_parametro:g_id_parametro};		
		}				
	}
	
	function evento_categoria_prog( combo, record, index )
	{
		g_id_categoria_prog=record.data.id_categoria_prog;
		g_desc_categoria_prog=record.data.cod_categoria_prog;
		
		g_cod_programa=record.data.cod_programa;
		g_cod_proyecto=record.data.cod_proyecto;
		g_cod_actividad=record.data.cod_actividad;
		g_cod_fuente_financiamiento=record.data.cod_fuente_financiamiento;
		g_cod_organismo_financiador=record.data.cod_organismo_fin;
		g_descripcion_cp=record.data.desc_programa + ' / ' + record.data.desc_proyecto  + ' / ' +  record.data.desc_actividad;
		g_codigo_sisin=record.data.codigo_sisin;
		g_id_presupuesto='';
		
		g_ids_fuente_financiamiento='';
		g_ids_u_o='';
		g_ids_financiador='';
		g_ids_regional='';
		g_ids_programa='';
		g_ids_proyecto='';
		g_ids_actividad='';		
 	
	 	g_regional='';
	 	g_financiador='';
	 	g_programa='';
	 	g_proyecto='';
	 	g_actividad='';
	 	g_unidad_organizacional='';
	 	g_Fuente_financiamiento='';
	}
	
	function evento_presupuesto( combo, record, index )
	{				
		g_ids_fuente_financiamiento=record.data.id_fuente_financiamiento;
		g_ids_u_o=record.data.id_unidad_organizacional;
		g_ids_financiador=g_proyecto=record.data.id_financiador;
		g_ids_regional=record.data.id_regional;
		g_ids_programa=record.data.id_programa;
		g_ids_proyecto=record.data.id_proyecto;
		g_ids_actividad=record.data.id_actividad;		
 	
	 	g_regional=record.data.nombre_regional;
	 	g_financiador=record.data.nombre_financiador;
	 	g_programa=record.data.nombre_programa;
	 	g_proyecto=record.data.nombre_proyecto;
	 	g_actividad=record.data.nombre_actividad;
	 	g_unidad_organizacional=record.data.desc_unidad_organizacional;
	 	g_Fuente_financiamiento=record.data.denominacion;
	 	g_CantFiltros=1;		
		
		//Obtenemos los codigos de la categoria programatica
		g_cod_programa=record.data.cp_cod_programa;
		g_cod_proyecto=record.data.cp_cod_proyecto;
		g_cod_actividad=record.data.cp_cod_actividad;
		g_cod_fuente_financiamiento=record.data.cp_cod_fuente_financiamiento;
		g_cod_organismo_financiador=record.data.cp_cod_organismo_fin;
		//g_descripcion_cp=record.data.descripcion_cp;
		g_codigo_sisin=record.data.codigo_sisin;
		g_id_presupuesto=record.data.id_presupuesto;
		
		g_id_categoria_prog=record.data.id_categoria_prog;
		
		componentes[5].setValue(g_proyecto);
	}
	
	function evento_moneda( combo, record, index )
	{
		g_id_moneda=record.data.id_moneda;
		g_desc_moneda=record.data.nombre;
		
		componentes[9].modificado=true;			
		componentes[9].setValue('');	
	}
	
	function evento_reporte( combo, record, index )
	{
		g_tipo_reporte=record.data.id;
	}	
	
	function evento_filtro_niveles( combo, record, index )
	{
		g_filtro_niveles=record.data.id;
	}
	
	//InitBarraMenu(array BOTONES DISPONIBLES);
	this.Init(); //iniciamos la clase madre
	//InitBarraMenu(array DE PAR�METROS PARA LAS FUNCIONES DE LA CLASE MADRE);
	this.InitFunciones(paramFunciones);
    //Se agrega el bot�n para la generaci�n del reporte
	this.iniciaFormulario();
	iniciarEventosFormularios();
	ContenedorPrincipal.getContenedorPrincipal().addListener('layout',this.onResizePrimario);
}
