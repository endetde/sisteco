function EjecucionPresupuesto(idContenedor,direccion,paramConfig,configConsolidacion){
	var vectorAtributos=new Array();
	var parametro;
	var gestion;
	var periodo;
	var id_moneda , id_parametro, tipo_pres, f_f,e_p_e,u_o;
	
	var ds_parametro = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../control/parametro/ActionListarParametro.php'}),
			reader:new Ext.data.XmlReader({record:'ROWS',id:'id_parametro',totalRecords: 'TotalCount'},['id_parametro','gestion_pres','estado_gral','cod_institucional','porcentaje_sobregiro','cantidad_niveles','desc_estado_gral'])
			});
	
	var ds_moneda=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:direccion+'../../../../sis_parametros/control/moneda/ActionListarMoneda.php'}),
			reader:new Ext.data.XmlReader({record:'ROWS',id:'id_moneda',totalRecords:'TotalCount'},['id_moneda','nombre','simbolo','estado','origen','prioridad']),
			baseParams:{sw_comboPresupuesto:'si'}
	});
	
	//render
	function renderTipoPresupuesto(value, p, record){
		if(value == 1)
		{return  "Recurso"}
		if(value == 2)
		{return "Gasto"}
		if(value == 3)
		{return "Inversi�n"}
		if (value=='2,3')
		{return "Gasto - Inversion"}
		if(value == 4)
		{return "PNO - Recurso"}
		if(value == 5)
		{return "PNO - Gasto"}
		if(value == 6)
		{return "PNO - Inversi�n"}
			
	}	
	
	function renderPeriodo(value, p, record){
		if(value == 1) {return  "Enero"}
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
	
	var tpl_id_parametro=new Ext.Template('<div class="search-item">','<b><i>{gestion_pres}</i></b>','<br><FONT COLOR="#B5A642"><b>Estado Gral: </b>{desc_estado_gral}</FONT>','</div>');
	var tpl_id_moneda=new Ext.Template('<div class="search-item">','<b><i>{nombre}</i></b>','<br><FONT COLOR="#B5A642"><b>Abrev: </b>{simbolo}</FONT>','</div>');

	// txt tipo_pres  
	 vectorAtributos[0]  = {
		validacion: {
			name:'tipo_pres',
			//desc: 'tipo_conex_literal',
			fieldLabel:'Tipo Presupuesto',
			vtype:'texto',
			emptyText:'Tipo Presupuesto...',
			allowBlank: false,
			typeAhead: true,
			loadMask: true,
			triggerAction: 'all',
			store: new Ext.data.SimpleStore({
				fields: ['ID', 'valor'],
				data :[
				       
				        ['1', 'Recurso'],
				        ['2', 'Gasto'],
				        ['3', 'Inversi�n'],
				        ['2,3', 'Gasto-Inversion'],
				        ['4', 'PNO - Recurso'],
				        ['5', 'PNO - Gasto'],
				        ['6', 'PNO - Inversion']
				        
					    ] // from states.js
			}),
			valueField:'ID',
			displayField:'valor',
			renderer: renderTipoPresupuesto,
			forceSelection:true,
			grid_visible:true, // se muestra en el grid
			grid_editable:true, //es editable en el grid,
			width_grid:100, // ancho de columna en el gris
			width:150,
			
		},
		tipo:'ComboBox',
		filtro_0:true,
		save_as:'tipo_pres',
		id_grupo:0
	}; 
	 
	vectorAtributos[1]={
		validacion:{
			name:'id_parametro',
			fieldLabel:'Gesti�n',
			allowBlank:false,			
			emptyText:'Parametro...',
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
			width:'50%',
			disabled:false
		},
		tipo:'ComboBox',
		form: true,
		filtro_0:true,
		filterColValue:'PARAMP.gestion_pres',
		save_as:'id_parametro'
	}; 

	vectorAtributos[2]={
		validacion:{
			name:'id_moneda',
			fieldLabel:'Moneda',
			allowBlank:false,			
			emptyText:'Moneda...',
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
			width_grid:150,
			width:'50%',
			disable:false		
		},
		tipo:'ComboBox',
		form: true,
		filtro_0:true,
		filterColValue:'MONEDA.nombre',
		save_as:'id_moneda'
	};
	
	vectorAtributos[3]={
		validacion:{
			name:'fecha_ini',
			fieldLabel:'Fecha Inicial',
			allowBlank:true,
			format:'d/m/Y', 
			minValue:'01/01/2009',
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
	
	vectorAtributos[4]={
		validacion:{
			name:'fecha_fin',
			fieldLabel:'Fecha Final',
			allowBlank:true,
			format:'d/m/Y', 
			minValue:'01/01/2009',
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

	//////////////////////////////////////////////////////////////
	//---------         INICIAMOS LAYOUT MAESTRO     -----------//
	//////////////////////////////////////////////////////////////

	function formatDate(value){	return value ? value.dateFormat('d/m/Y'):''}
	// ---------- Inicia Layout ---------------//
	var config={
		titulo_maestro:"Consolidaci�n Presupuesto"
	};
	layout_ejecucion=new DocsLayoutProceso(idContenedor);
	layout_ejecucion.init(config);

	//////////////////////////////////////////////////////////////
	//---------         INICIAMOS HERENCIA           -----------//
	//////////////////////////////////////////////////////////////

	/// HEREDAMOS DE LA CLASE MADRE
	this.pagina=BaseParametrosReporte;
	//-- pagina (array PARAMETROS DE CONFIGURACION, array DEFINICION DE ATRIBUTOS, SELECTION MODEL, DATA STORE, COLUM MODEL)
	this.pagina(paramConfig,vectorAtributos,layout_ejecucion,idContenedor);

	//--------------- HERENCIA DE LA CLASE MADRE ---------------------//

	var ClaseMadre_conexionFailure = this.conexionFailure; // para heredar de la clase madre la funcion eliminarSucces de esta forma se encuentra disponible tambien para los metodos y no solo para el contructor
	var ClaseMadre_getComponente = this.getComponente;
	var CM_ocultarComponente=this.ocultarComponente;

	//ds_parametro.addListener('loadexception',  ClaseMadre_conexionFailure); //se recibe un error

	//-------------- DEFINICI�N DE FUNCIONES PROPIAS --------------//

	function iniciarEventosFormularios(){
	 
		id_moneda = ClaseMadre_getComponente('id_moneda');
		id_parametro = ClaseMadre_getComponente('id_parametro');
		tipo_pres = ClaseMadre_getComponente('tipo_pres');

		fecha_ini = ClaseMadre_getComponente('fecha_ini');
		fecha_fin = ClaseMadre_getComponente('fecha_fin');
	}

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
			columnas:[305,305],
			grupos:[
			{
				tituloGrupo:'Asigne Datos Para Cosultar la Ejecuci�n ',
				columna:0,
				id_grupo:0
			}
			],
		parametros: '',
			submit:function (){	
					var data ='&m_tipo_pres='+tipo_pres.getValue(); 
					data+='&m_id_parametro='+id_parametro.getValue(); 
					data+='&m_id_moneda='+id_moneda.getValue(); 
					data+='&m_fecha_ini='+formatDate(fecha_ini.getValue());
					data+='&m_fecha_fin='+formatDate(fecha_fin.getValue()); 
					
					var mensaje="";
					 
					if(tipo_pres.getValue()==""){mensaje+=" El campo tipo Presupuesto esta vacio";};
					if(id_parametro.getValue()==""){mensaje+=" El campo Gesti�n esta vacio";};
					if(id_moneda.getValue()==""){mensaje+=" El campo Moneda esta vacio";};
					if(fecha_ini.getValue()==""){mensaje+=" El campo Fecha Inicial esta vacio";};
					if(fecha_fin.getValue()==""){mensaje+=" El campo Fecha Final esta vacio";};
					
					if(mensaje=="")
					{
						for(var i=0;i<id_moneda.store.data.length;i++){
					 	if(id_moneda.store.getAt(i).data['id_moneda']==id_moneda.getValue()) 
						{
						data+='&m_desc_moneda='+id_moneda.store.getAt(i).data['nombre']; 	
						};
					}
					for(var i=0;i<id_parametro.store.data.length;i++){
					 	if(id_parametro.store.getAt(i).data['id_parametro']==id_parametro.getValue()) 
						{
						data+='&m_gestion_pres='+id_parametro.store.getAt(i).data['gestion_pres']; 	
						data+='&m_desc_estado_gral='+id_parametro.store.getAt(i).data['desc_estado_gral']; 	
						};
					}
					
					data +='&m_desc_pres='+renderTipoPresupuesto(tipo_pres.getValue(), '', '');
					data +='&m_sw_vista='+configConsolidacion.sw_vista;
		 				
	 				var ParamVentana={Ventana:{width:'80%',height:'90%'}}
					layout_ejecucion.loadWindows(direccion+'../../../../sis_presupuesto/vista/ejecucion_presupuesto/ejecucion_fech_presupuesto.php?'+data,'Detalle de Partidas',ParamVentana);
			}
			else{alert(mensaje);}
		}
	}}

	//InitBarraMenu(array BOTONES DISPONIBLES);
	this.Init(); //iniciamos la clase madre
	//InitBarraMenu(array DE PAR�METROS PARA LAS FUNCIONES DE LA CLASE MADRE);
	this.InitFunciones(paramFunciones);
    //Se agrega el bot�n para la generaci�n del reporte
	this.iniciaFormulario();
	iniciarEventosFormularios();
	ContenedorPrincipal.getContenedorPrincipal().addListener('layout',this.onResizePrimario);
}

