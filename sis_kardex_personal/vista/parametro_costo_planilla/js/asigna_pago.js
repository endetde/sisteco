/**
 * Nombre:		  	    pagina_asigna_pago.js
 * Prop�sito: 			pagina objeto principal
 * Autor:				Fernando Prudencio Cardona
 * Fecha creaci�n:		11-08-2010
 */
function pagina_asigna_pago(idContenedor,direccion,paramConfig,maestro,idContenedorPadre){
	var vectorAtributos=new Array;
	var ds,cmpGestion,cmpPresupuesto,g_id_gestion;
	
	var elementos=new Array();
	var sw=0;
	/////////////////
	//  DATA STORE //
	/////////////////
	ds=new Ext.data.Store({
		// asigna url de donde se cargaran los datos
		proxy:new Ext.data.HttpProxy({url:direccion+'../../../control/parametro_costo_planilla/ActionListarAsignaPago.php'}),
		// aqui se define la estructura del XML
		reader:new Ext.data.XmlReader({
			record:'ROWS',
			id:'id_parametro_costo_planilla',
			totalRecords:'TotalCount'
		},[
		// define el mapeo de XML a las etiquetas (campos)
		'id_parametro_costo_planilla',
		'id_empleado',
		'id_gestion',
		'gestion',
		'id_unidad_organizacional',
		'nombre_unidad',
		'id_fina_regi_prog_proy_acti',
		'id_financiador',
		'nombre_financiador',
		'id_regional',
		'nombre_regional',
		'id_programa',
		'nombre_programa',
		'id_proyecto',
		'nombre_proyecto',
		'id_actividad',
		'nombre_actividad',
		'valor',
		'estado_reg',
		'id_orden_trabajo',
		'desc_orden_trabajo',		
		{name:'fecha_reg',type:'date',dateFormat:'Y-m-d'},
		'id_usuario_reg',
		'id_presupuesto',
		'desc_presupuesto'
		]),remoteSort:true});
	//carga datos XML
	// DEFINICI�N DATOS DEL MAESTRO
    var dataMaestro=[['Id Funcionario',maestro.id_empleado],['Funcionario',maestro.desc_persona],['Email',maestro.email1]];
	var dsMaestro=new Ext.data.Store({proxy:new Ext.data.MemoryProxy(dataMaestro),reader:new Ext.data.ArrayReader({id:0},[{name:'atributo'},{name:'valor'}])});
	dsMaestro.load();
	var cmMaestro=new Ext.grid.ColumnModel([{header:"Atributo",width:150,sortable:false,renderer:negrita,locked:false,dataIndex:'atributo'},{header:"Valor",width:300,sortable:false,renderer:italic,locked:false,dataIndex:'valor'}]);
	function negrita(value){return '<span style="color:red;font-size:10pt"><b>'+value+'</b></span>'}
	function italic(value){return '<i>'+value+'</i>'}
	var div_grid_detalle=Ext.DomHelper.append(idContenedor,{tag:'div',id:'grid_detalle-'+idContenedor});
	var gridMaestro=new Ext.grid.Grid(div_grid_detalle,{ds:dsMaestro,cm:cmMaestro});
	gridMaestro.render();
	//DATA STORE COMBOS
	
	var ds_presupuesto = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../../sis_presupuesto/control/presupuesto/ActionListarComboPresupuesto.php'}),
	reader:new Ext.data.XmlReader({record:'ROWS',id:'id_presupuesto',totalRecords: 'TotalCount'},['id_presupuesto','tipo_pres','estado_pres','id_unidad_organizacional','nombre_unidad','id_fina_regi_prog_proy_acti',
																																								'desc_epe','id_fuente_financiamiento','sigla','estado_gral','gestion_pres','id_parametro','id_gestion','desc_presupuesto',
																																								'nombre_financiador', 'nombre_regional', 'nombre_programa', 'nombre_proyecto', 'nombre_actividad',
																																								'id_categoria_prog','cod_categoria_prog',   'cp_cod_programa','cp_cod_proyecto','cp_cod_actividad',
																																								'cp_cod_organismo_fin','cp_cod_fuente_financiamiento','codigo_sisin'
																																									]),baseParams:{m_sw_rendicion:'si',sw_inv_gasto:'si'}
	});
	var ds_orden_trabajo=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:direccion+"../../../../sis_contabilidad/control/orden_trabajo/ActionListarOrdenTrabajo.php"}),reader:new Ext.data.XmlReader({record:'ROWS',id:'id_orden_trabajo',totalRecords:'TotalCount'},['id_orden_trabajo','desc_orden','motivo_orden'])});
	var tpl_id_orden_trabajo=new Ext.Template('<div class="search-item">','<b>{desc_orden}</b>','<br><FONT COLOR="#B5A642"><b>Motivo:</b> {motivo_orden}</FONT>','</div>');
	function render_id_presupuesto(value, p, record){if(record.get('estado_regis')=='2'){return '<span style="color:red;font-size:8pt">' + record.data['desc_presupuesto']+ '</span>';}else {return record.data['desc_presupuesto'];}}
		var tpl_id_presupuesto=new Ext.Template('<div class="search-item">',
		'<b>{nombre_unidad}</b>',
		'<br><b>Gesti�n: </b><FONT COLOR="#B5A642">{gestion_pres}</FONT>',
		'<br><b>Tipo Presupuesto: </b><FONT COLOR="#B50000">{tipo_pres}</FONT>',
		'<br><b>Fuente de Financiamiento: </b><FONT COLOR="#B5A642">{sigla}</FONT>',
		//'<br> <b>Unidad Organizacional: </b><FONT COLOR="#B5A642">{nombre_unidad}</FONT>',
		'<br>  <b>EP:  </b><FONT COLOR="#B5A642">{desc_epe}</FONT></b>',
		'<br>  <FONT COLOR="#B50000">{nombre_financiador}</FONT>',
		'<br>  <FONT COLOR="#B5A642">{nombre_regional}</FONT>',
		'<br>  <FONT COLOR="#B5A642">{nombre_programa}</FONT>',
		'<br>  <FONT COLOR="#B50000">{nombre_proyecto}</FONT>',
		'<br>  <FONT COLOR="#B5A642">{nombre_actividad}</FONT>',	
		'<br><FONT COLOR="#B50000"><b>Cat. Programatica: </b>{cod_categoria_prog}</FONT>',  
		'<br><FONT COLOR="#B50000"><b>Identificador: </b>{id_presupuesto}</FONT>',  
		'</div>');
		function render_estado_reg(value){
		if(value=='activo'){value='Activo'	}
		else{	value='Inactivo'		}
		return value
	}
	function render_unidad_organizacional(value,p,record){return String.format('{0}',record.data['nombre_unidad'])}
	function render_financiador(value,p,record){return String.format('{0}',record.data['nombre_financiador'])}	
	function render_regional(value,p,record){return String.format('{0}',record.data['nombre_regional'])}	
	function render_programa(value,p,record){return String.format('{0}',record.data['nombre_programa'])}	
	function render_proyecto(value,p,record){return String.format('{0}',record.data['nombre_proyecto'])}	
	function render_actividad(value,p,record){return String.format('{0}',record.data['nombre_actividad'])}
	function render_id_orden_trabajo(value, p, record){return String.format('{0}', record.data['desc_orden_trabajo']);}	
	// Definici�n de datos //
	// hidden id_empleado_frppa
	vectorAtributos[0]={
		validacion:{
			labelSeparator:'',
			name:'id_parametro_costo_planilla',
			inputType:'hidden',
			grid_visible:false, 
			grid_editable:false
		},
		save_as:'hidden_id_parametro_costo_planilla',
		tipo:'Field',
		filtro_0:false
	};
// txt id_empleado
	vectorAtributos[1]={
		validacion:{
			name:'id_empleado',
			labelSeparator:'',
			inputType:'hidden',
			grid_visible:false,
			grid_editable:false,
			disabled:true
		},
		tipo:'Field',
		filtro_0:false,
		defecto:maestro.id_empleado,
		save_as:'hidden_id_empleado'
	};
	
	vectorAtributos[2]={
	validacion:{
			labelSeparator:'',
			name:'id_gestion',
			inputType:'hidden',
			grid_visible:false, 
			grid_editable:false
		},
		tipo:'Field',
		filtro_0:false,
		save_as:'hidden_id_gestion'
};  
vectorAtributos[3]={
		validacion:{
			name:'valor',
			fieldLabel:'Porcentaje',
			allowBlank:false,
			maxLength:6,
			minLength:0,
			maxValue:100,
			allowDecimals:true,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:100
			},
		tipo:'NumberField',
		filtro_0:true,
		filterColValue:'PACOPLA.valor',
		save_as:'txt_valor'
	}; 
vectorAtributos[4]={
		validacion:{
			labelSeparator:'',
			name:'Unidad',
			inputType:'hidden',
			grid_visible:true, 
			grid_editable:false,
			renderer:render_unidad_organizacional
		},
		form:false,
		tipo:'Field',
		filtro_0:false	
	};
	vectorAtributos[5]={
		validacion:{
			labelSeparator:'',
			name:'id_fina_regi_prog_proy_acti',
			inputType:'hidden',
			grid_visible:false, 
			grid_editable:false
		},
		tipo:'Field',
		filtro_0:false	
	};
	vectorAtributos[6]={
		validacion:{
			labelSeparator:'',
			name:'Financiador',
			inputType:'hidden',
			grid_visible:true, 
			grid_editable:false,
			renderer:render_financiador
		},
		form:false,
		tipo:'Field',
		filtro_0:false	
	};
	vectorAtributos[7]={
		validacion:{
			labelSeparator:'',
			name:'Regional',
			inputType:'hidden',
			grid_visible:true, 
			grid_editable:false,
			renderer:render_regional
		},
		form:false,
		tipo:'Field',
		filtro_0:false	
	};
	vectorAtributos[8]={
		validacion:{
			labelSeparator:'',
			name:'Programa',
			inputType:'hidden',
			grid_visible:true, 
			grid_editable:false,
			renderer:render_programa
		},
		form:false,
		tipo:'Field',
		filtro_0:false	
	};
	vectorAtributos[9]={
		validacion:{
			labelSeparator:'',
			name:'Proyecto',
			inputType:'hidden',
			grid_visible:true, 
			grid_editable:false,
			renderer:render_proyecto
		},
		form:false,
		tipo:'Field',
		filtro_0:false	
	};
	vectorAtributos[10]={
		validacion:{
			labelSeparator:'',
			name:'Actividad',
			inputType:'hidden',
			grid_visible:true, 
			grid_editable:false,
			renderer:render_actividad
		},
		form:false,
		tipo:'Field',
		filtro_0:false	
	};
// txt fecha_registro
	vectorAtributos[11]={
		validacion:{
			name:'fecha_reg',
			fieldLabel:'Fecha de Registro',
			allowBlank:true,
			format:'d/m/Y', //formato para validacion
			minValue:'01/01/1900',
			grid_visible:true,
			grid_editable:false,
			renderer:formatDate,
			width_grid:95
		},
		form:false,
		tipo:'DateField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PACOPLA.fecha_reg',
		dateFormat:'m-d-Y',
		defecto:''
	};	
	
vectorAtributos[12]={
			validacion:{
			name:'id_presupuesto',
			fieldLabel:'Presupuesto',
			allowBlank:false,			
			emptyText:'Presupuesto...',
			desc:'desc_presupuesto', //indica la columna del store principal ds del que proviane la descripcion
			store:ds_presupuesto,
			valueField:'id_presupuesto',
			displayField:'desc_presupuesto',
			queryParam:'filterValue_0',
			filterCol:'presup.desc_presupuesto#PRESUP.id_presupuesto#CATPRO.cod_categoria_prog',
			typeAhead:false,
			tpl:tpl_id_presupuesto,
			forceSelection:true,
			mode:'remote',
			queryDelay:300,
			pageSize:10,
			minListWidth:300,
			grow:true,
			resizable:true,
			minChars:1, ///caracteres m�nimos requeridos para iniciar la busqueda
			triggerAction:'all',
			editable:true,
			renderer:render_id_presupuesto,
			grid_visible:true,
			grid_editable:false,
			width_grid:400,
			width:300	
		},
		tipo:'ComboBox',
		form:true,
		filtro_0:true,
		filterColValue:'PRESUP.desc_presupuesto',
		save_as:'hidden_id_presupuesto'
	};
	vectorAtributos[13]={
		validacion:{
			name:'id_orden_trabajo',
			fieldLabel:'Orden de Trabajo',
			allowBlank:true,			
			emptyText:'Orden Trabajo...',
			desc:'desc_orden_trabajo', 
			store:ds_orden_trabajo,
			valueField:'id_orden_trabajo',
			displayField:'desc_orden',
			queryParam:'filterValue_0',
			filterCol:'ORDTRA.desc_orden',
			typeAhead:true,
			tpl:tpl_id_orden_trabajo,
			forceSelection:true,
			mode:'remote',
			queryDelay:300,
			pageSize:10,
			minListWidth:300,
			grow:true,
			resizable:true,
			minChars:1, 
			triggerAction:'all',
			editable:true,
			renderer:render_id_orden_trabajo,
			width:300,
			grid_visible:true,
			grid_editable:false
		},
		tipo:'ComboBox',
		filtro_0:true,
		filterColValue:'ORDTRA.desc_orden',
		save_as:'hidden_id_orden_trabajo'
	};
		vectorAtributos[14]= {
		validacion: {
			name:'estado_reg',
			emptyText:'Estado...',
			fieldLabel:'Estado',
			allowBlank:false,
			typeAhead:true,
			loadMask:true,
			triggerAction:'all',			
			store:new Ext.data.SimpleStore({fields:['ID','valor'],data:[['activo','Activo'],['inactivo','Inactivo']]}),
			valueField:'ID',
			displayField:'valor',
			lazyRender:true,
			renderer:render_estado_reg,
			forceSelection:true,
			grid_visible:true,
			grid_editable:false,
			width_grid:60
		},
		form:false,
		tipo:'ComboBox',
		filtro_0:true,
		filtro_1:false,
		filterColValue:'PACOPLA.estado_reg',
		save_as:'txt_estado_reg'
		};
			
	//----------- FUNCIONES RENDER
	function formatDate(value){return value ? value.dateFormat('d/m/Y'):''};
	
	//---------- INICIAMOS LAYOUT DETALLE
	var config={
		titulo_maestro:'Registro Empleados (Maestro)',
		titulo_detalle:'Asignaci�n de Porcentaje de Pagos (Detalle)',
		grid_maestro:'grid-'+idContenedor
	};
	layout_asigna_pago=new DocsLayoutDetalle(idContenedor,idContenedorPadre);
	layout_asigna_pago.init(config);
	//---------- INICIAMOS HERENCIA
	this.pagina=Pagina;
	this.pagina(paramConfig,vectorAtributos,ds,layout_asigna_pago,idContenedor);
	var getSelectionModel=this.getSelectionModel;
	var getComponente=this.getComponente;
	var ocultarComponente=this.ocultarComponente;
	var mostrarComponente=this.mostrarComponente;
	var ClaseMadre_conexionFailure=this.conexionFailure;
	
	var ClaseMadre_btnNew=this.btnNew;
	var ClaseMadre_btnEdit=this.btnEdit;
	var ClaseMadre_onResize=this.onResize;
	var ClaseMadre_SaveAndOther=this.SaveAndOther;
	//-------- DEFINICI�N DE LA BARRA DE MEN�
	var paramMenu={
		guardar:{crear:true,separador:false},
		nuevo:{crear:true,separador:true},
		editar:{crear:true,separador:false},
		eliminar:{crear:true,separador:false},
		actualizar:{crear:true,separador:false}
	};
	//--------- DEFINICI�N DE FUNCIONES
	var paramFunciones={
	btnEliminar:{url:direccion+'../../../control/parametro_costo_planilla/ActionEliminarAsignaPago.php',parametros:'&m_id_empleado='+maestro.id_empleado},
	Save:{url:direccion+'../../../control/parametro_costo_planilla/ActionGuardarAsignaPago.php',parametros:'&m_id_empleado='+maestro.id_empleado},
	ConfirmSave:{url:direccion+'../../../control/parametro_costo_planilla/ActionGuardarAsignaPago.php',parametros:'&m_id_empleado='+maestro.id_empleado},
	Formulario:{html_apply:'dlgInfo-'+idContenedor,height:250,width:500,minWidth:150,minHeight:200,closable:true,titulo:'Porcentaje Pago'}};
	this.reload=function(params){
		var datos=Ext.urlDecode(decodeURIComponent(params));
		maestro.id_empleado=datos.m_id_empleado;
		maestro.id_persona=datos.m_id_persona;
		maestro.codigo_empleado=datos.m_codigo_empleado;
		maestro.desc_persona=datos.m_desc_persona;
		maestro.email1=datos.m_email1;
		gestion.reset();
		g_id_gestion='NULL';
		gridMaestro.getDataSource().removeAll();
		gridMaestro.getDataSource().loadData([['Id Funcionario',maestro.id_empleado],['Funcionario',maestro.desc_persona],['Email',maestro.email1]]);
		vectorAtributos[1].defecto=maestro.id_empleado;
		paramFunciones={
	    btnEliminar:{url:direccion+'../../../control/parametro_costo_planilla/ActionEliminarAsignaPago.php',parametros:'&m_id_empleado='+maestro.id_empleado},
	   Save:{url:direccion+'../../../control/parametro_costo_planilla/ActionGuardarAsignaPago.php',parametros:'&m_id_empleado='+maestro.id_empleado},
	  ConfirmSave:{url:direccion+'../../../control/parametro_costo_planilla/ActionGuardarAsignaPago.php',parametros:'&m_id_empleado='+maestro.id_empleado},
	   Formulario:{html_apply:'dlgInfo-'+idContenedor,height:300,width:500,minWidth:150,minHeight:200,closable:true,titulo:'Porcentaje Pago'}};
		this.InitFunciones(paramFunciones);
		ds.lastOptions={
			params:{
				start:0,
				limit: paramConfig.TamanoPagina,
			    CantFiltros:paramConfig.CantFiltros,
			    m_id_gestion:g_id_gestion,
				m_id_empleado:maestro.id_empleado
			}
			};
		this.btnActualizar()
	}
	//-------------- DEFINICI�N DE FUNCIONES PROPIAS --------------//
	function iniciarEventosFormularios(){
		  CM_getBoton('nuevo-'+idContenedor).disable();
		CM_getBoton('eliminar-'+idContenedor).disable();
	    CM_getBoton('editar-'+idContenedor).disable();
		cmpGestion=getComponente('id_gestion');
		cmpPresupuesto=getComponente('id_presupuesto');
		
	}
	this.btnNew=function(){
		ClaseMadre_btnNew();
		cmpGestion.setValue(gestion.getValue());
	}
	//para que los hijos puedan ajustarse al tama�o
	this.getLayout=function(){
		return layout_asigna_pago.getLayout()
	};
	//para el manejo de hijos
	this.getPagina=function(idContenedorHijo){
		var tam_elementos=elementos.length;
		for(i=0;i<tam_elementos;i++){
			if(elementos[i].idContenedor==idContenedorHijo){
				return elementos[i]
			}
		}
	};
	this.getElementos=function(){return elementos};
	this.setPagina=function(elemento){elementos.push(elemento)};
	this.Init(); //iniciamos la clase madre
	this.InitBarraMenu(paramMenu);
	this.InitFunciones(paramFunciones);
	var CM_getBoton=this.getBoton;
	//para agregar botones
	this.iniciaFormulario();
	iniciarEventosFormularios();
	var ds_gestion = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../../sis_parametros/control/gestion/ActionListarGestion.php'}),reader: new Ext.data.XmlReader({record: 'ROWS',id:'id_gestion',totalRecords:'TotalCount'},['id_gestion','gestion','estado_ges_gral','id_empresa','desc_empresa','id_moneda_base','desc_moneda']),baseParams:{estado:'abierto'}});
	   var tpl_gestion=new Ext.Template('<div class="search-item">','<b><i>{gestion}</i></b>','</div>');
var gestion =new Ext.form.ComboBox({
			store:ds_gestion,
			displayField:'gestion',
			typeAhead: true,
			mode:'remote',
			triggerAction: 'all',
			emptyText:'gestion...',
			selectOnFocus:true,
			width:100,
			valueField:'id_gestion',
			tpl:tpl_gestion
		});
  gestion.on('select',function(combo, record, index){g_id_gestion=gestion.getValue();
  ds.load({
		params:{
			start:0,
			limit: paramConfig.TamanoPagina,
			CantFiltros:paramConfig.CantFiltros,
			m_id_gestion:g_id_gestion,
			m_id_empleado:maestro.id_empleado
		}
	});	
	CM_getBoton('nuevo-'+idContenedor).enable();
		CM_getBoton('eliminar-'+idContenedor).enable();
	    CM_getBoton('editar-'+idContenedor).enable();
  cmpGestion.setValue(g_id_gestion);
  cmpPresupuesto.store.baseParams={m_sw_rendicion:'si',sw_inv_gasto:'si',id_gestion:g_id_gestion};
  cmpPresupuesto.modificado=true;
  });
  this.AdicionarBotonCombo(gestion,'gestion');
	layout_asigna_pago.getLayout().addListener('layout',this.onResize);
	ContenedorPrincipal.getPagina(idContenedorPadre).pagina.getLayout().addListener('layout',this.onResizePrimario)
}