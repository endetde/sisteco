/**
 * Nombre:		  	    pagina_empleado_afp.js
 * Prop�sito: 			pagina objeto principal
 * Autor:				Generado Automaticamente
 * Fecha creaci�n:		11-08-2010
 */
function pagina_planilla_presupuesto(idContenedor,direccion,paramConfig,maestro,idContenedorPadre){
	var Atributos=new Array;
	var ds;
	
	var elementos=new Array();
	var sw=0;
	/////////////////
	//  DATA STORE //
	/////////////////
	ds=new Ext.data.Store({
		// asigna url de donde se cargaran los datos
		proxy:new Ext.data.HttpProxy({url:direccion+'../../../control/planilla_presupuesto/ActionListarPlanillaPresupuesto.php'}),
		// aqui se define la estructura del XML
		reader:new Ext.data.XmlReader({
			record:'ROWS',
			id:'id_planilla_presupuesto',
			totalRecords:'TotalCount'
		},[
		// define el mapeo de XML a las etiquetas (campos)
		   'id_planilla_presupuesto',
			'id_planilla',
			'id_presupuesto',
			'nombre_unidad',
			'desc_presupuesto',
			'tipo_pres',
			'desc_epe',
			'porcentaje',
			{name:'fecha_reg',type:'date',dateFormat:'Y-m-d'},
		    'estado_reg'
		    ]),remoteSort:true});
	//carga datos XML
	ds.load({
		params:{
			start:0,
			limit: paramConfig.TamanoPagina,
			CantFiltros:paramConfig.CantFiltros,
			id_planilla:maestro.id_planilla
		}
	});
	// DEFINICI�N DATOS DEL MAESTRO
 /*   var dataMaestro=[['Id Planilla',maestro.id_planilla],['Id gestion',maestro.id_gestion]];
    var dsMaestro=new Ext.data.Store({proxy:new Ext.data.MemoryProxy(dataMaestro),reader:new Ext.data.ArrayReader({id:0},[{name:'atributo'},{name:'valor'}])});
	dsMaestro.load();
	
	
	
	var cmMaestro=new Ext.grid.ColumnModel([{header:"Atributo",width:150,sortable:false,renderer:negrita,locked:false,dataIndex:'atributo'},{header:"Valor",width:300,sortable:false,renderer:italic,locked:false,dataIndex:'valor'}]);
	*/
	
	function negrita(value){return '<span style="color:red;font-size:10pt"><b>'+value+'</b></span>'}
	function italic(value){return '<i>'+value+'</i>'}
	var div_grid_detalle=Ext.DomHelper.append(idContenedor,{tag:'div',id:'grid_detalle-'+idContenedor});
	/*var gridMaestro=new Ext.grid.Grid(div_grid_detalle,{ds:dsMaestro,cm:cmMaestro});
	gridMaestro.render();*/
	//DATA STORE COMBOS
//DATA STORE COMBOS

    var ds_presupuesto = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../../sis_presupuesto/control/presupuesto/ActionListarComboPresupuesto.php'}),
	reader:new Ext.data.XmlReader({record:'ROWS',id:'id_presupuesto',totalRecords: 'TotalCount'},['id_presupuesto','tipo_pres','estado_pres','id_unidad_organizacional','nombre_unidad','id_fina_regi_prog_proy_acti','desc_epe','id_fuente_financiamiento','sigla','estado_gral','gestion_pres','id_parametro','id_gestion','desc_presupuesto','nombre_financiador', 'nombre_regional', 'nombre_programa', 'nombre_proyecto', 'nombre_actividad' ]),baseParams:{m_sw_rendicion:'si',sw_inv_gasto:'si'}
	});
	
	
	
	//FUNCIONES RENDER
		function render_id_presupuesto(value, p, record){return record.data['desc_presupuesto']}
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
		'</div>');
	
		function render_estado_reg(value){
			if(value=='activo'){value='Activo'	}
			else{	value='Inactivo'		}
			return value
		}
		
	
	
	// Definici�n de datos //
	// hidden id_empleado_frppa
	Atributos[0]={
		validacion:{
			labelSeparator:'',
			name:'id_planilla_presupuesto',
			inputType:'hidden',
			grid_visible:false, 
			grid_editable:false
		},
		tipo:'Field',
		filtro_0:false
	};
	
    // txt id_empleado
	Atributos[1]={
		validacion:{
			name:'id_planilla',
			labelSeparator:'',
			inputType:'hidden',
			grid_visible:false,
			grid_editable:false,
			disabled:true
		},
		tipo:'Field',
		filtro_0:false,
		defecto:maestro.id_planilla
	};
	
	
		filterCols=new Array();
		filterValues=new Array();
		filterCols[0]='id_gestion';
		filterValues[0]=maestro.id_gestion;

	
	
	 Atributos[2]={
			validacion:{
				
				
			name:'id_presupuesto',
			fieldLabel:'Presupuesto',
			allowBlank:false,			
			//emptyText:'Presupuesto...',
			desc: 'desc_presupuesto', //indica la columna del store principal ds del que proviane la descripcion
			store:ds_presupuesto,
			valueField: 'id_presupuesto',
			displayField: 'desc_presupuesto',
			queryParam: 'filterValue_0',
			filterCol:'presup.desc_presupuesto',
			filterCols:filterCols,
			filterValues:filterValues,
			typeAhead:false,
			tpl:tpl_id_presupuesto,
			forceSelection:true,
			mode:'remote',
			queryDelay:360,
			pageSize:10,
			minListWidth:400,
			grow:true,
			resizable:true,
			queryParam:'filterValue_0',
			minChars:3, ///caracteres m�nimos requeridos para iniciar la busqueda
			triggerAction:'all',
			editable:true,
			renderer:render_id_presupuesto,
			grid_visible:true,
			grid_editable:false,
			width_grid:400,
			width:'100%'	
		},
		tipo:'ComboBox',
		form: true,
		filtro_0:true,
		filterColValue:'vp.desc_presupuesto',
		id_grupo:0		
	};
	
	
	
    
	
Atributos[3]={
		validacion:{
			name:'porcentaje',
			fieldLabel:'Porcentaje',
			allowBlank:true,
			maxLength:20,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:false,
			width_grid:150,
			width:150
		},
		tipo:'NumberField',
		filtro_0:true,
		filtro_1:true,
		//filterColValue:'UNIORG.nombre_cargo'	
		filterColValue:'porcentaje'	
	};
	
	// txt fecha_registro
	Atributos[4]={
		validacion:{
			name:'fecha_reg',
			fieldLabel:'Fecha de Registro',
			allowBlank:true,
			format:'d/m/Y', //formato para validacion
			minValue:'01/01/1900',
			disabledDaysText:'D�a no v�lido',
			grid_visible:true,
			grid_editable:false,
			renderer:formatDate,
			width_grid:95,
			disabled:true,
			width:150
		},
		tipo:'DateField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'EMPAFP.fecha_reg',
		dateFormat:'m-d-Y'
	};	
	
	Atributos[5]= {
		validacion: {
			name:'estado_reg',
			
			fieldLabel:'Estado',
			
			lazyRender:true,
			renderer:render_estado_reg,			
			disabled:true,			
			grid_visible:true,
			grid_editable:false,
			width_grid:60,
			width:150
		},
		tipo:'Field',
		filtro_0:true,
		filtro_1:false,
		filterColValue:'pp.estado_reg'
		};
		
		
	
	//----------- FUNCIONES RENDER
	function formatDate(value){return value ? value.dateFormat('d/m/Y'):''};
	//---------- INICIAMOS LAYOUT DETALLE
	var config={
		titulo_maestro:'Planilla (Maestro)',
	//	titulo_detalle:'Presupuesto (Detalle)'
		grid_maestro:'grid-'+idContenedor
		,urlHijo:'../../../sis_kardex_personal/vista/columna_partida_ejecucion/columna_partida_ejecucion.php'
	};
	layout_planilla_presupuesto=new DocsLayoutMaestroDeatalle(idContenedor,idContenedorPadre);
	layout_planilla_presupuesto.init(config);
	//---------- INICIAMOS HERENCIA
	this.pagina=Pagina;
	this.pagina(paramConfig,Atributos,ds,layout_planilla_presupuesto,idContenedor);
	var getSelectionModel=this.getSelectionModel;
	var getComponente=this.getComponente;
	var ocultarComponente=this.ocultarComponente;
	var mostrarComponente=this.mostrarComponente;
	var ClaseMadre_conexionFailure=this.conexionFailure;
		var enableSelect=this.EnableSelect;
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
	btnEliminar:{url:direccion+'../../../control/planilla_presupuesto/ActionEliminarPlanillaPresupuesto.php',parametros:'&m_id_planilla='+maestro.id_planilla},
	Save:{url:direccion+'../../../control/planilla_presupuesto/ActionGuardarPlanillaPresupuesto.php',parametros:'&m_id_planilla='+maestro.id_planilla},
	ConfirmSave:{url:direccion+'../../../control/planilla_presupuesto/ActionGuardarPlanillaPresupuesto.php',parametros:'&m_id_planilla='+maestro.id_planilla},
	Formulario:{html_apply:'dlgInfo-'+idContenedor,height:300,width:400,minWidth:150,minHeight:200,closable:true,titulo:'Presupuesto'}};
	
	//funcion de reload
	
	
	this.reload=function(params){
		var datos=Ext.urlDecode(decodeURIComponent(params));
		maestro.id_planilla=datos.id_planilla;
		maestro.id_gestion=datos.id_gestion;
	//	gridMaestro.getDataSource().removeAll();
		//gridMaestro.getDataSource().loadData([['Id Planilla',maestro.id_planilla],['Id gestion',maestro.id_gestion]]);
		

		Atributos[1].defecto=maestro.id_planilla;

		paramFunciones={
	  	btnEliminar:{url:direccion+'../../../control/planilla_presupuesto/ActionEliminarPlanillaPresupuesto.php',parametros:'&m_id_planilla='+maestro.id_planilla},
		Save:{url:direccion+'../../../control/planilla_presupuesto/ActionGuardarPlanillaPresupuesto.php',parametros:'&m_id_planilla='+maestro.id_planilla},
		ConfirmSave:{url:direccion+'../../../control/planilla_presupuesto/ActionGuardarPlanillaPresupuesto.php',parametros:'&m_id_planilla='+maestro.id_planilla},
		Formulario:{html_apply:'dlgInfo-'+idContenedor,height:300,width:400,minWidth:150,minHeight:200,closable:true,titulo:'Presupuesto'}};
	   
	   
	
		Atributos[2].validacion.filterValues[0]=maestro.id_gestion;
		
	   
		this.InitFunciones(paramFunciones);
		ds.lastOptions={
			params:{
				start:0,
				limit: paramConfig.TamanoPagina,
			    CantFiltros:paramConfig.CantFiltros,
				id_planilla:maestro.id_planilla
			}
			};
		this.btnActualizar()
	}
	//-------------- DEFINICI�N DE FUNCIONES PROPIAS --------------//
	function iniciarEventosFormularios(){	
		
		
	}
	this.btnNew=function(){
		//ocultarComponente(getComponente('fecha_reg'));
		ClaseMadre_btnNew()
	};
	this.btnEdit=function(){
	mostrarComponente(getComponente('fecha_reg'));
	ClaseMadre_btnEdit()
	};
//para que los hijos puedan ajustarse al tama�o
	this.getLayout=function(){
		return layout_planilla_presupuesto.getLayout()
	};

	this.EnableSelect=function(sm,row,rec){
				_CP.getPagina(layout_planilla_presupuesto.getIdContentHijo()).pagina.reload(rec.data);
				_CP.getPagina(layout_planilla_presupuesto.getIdContentHijo()).pagina.desbloquearMenu();
				enable(sm,row,rec);
			}

	this.Init(); //iniciamos la clase madre
	this.InitBarraMenu(paramMenu);
	this.InitFunciones(paramFunciones);
	//para agregar botones
	
		function  enable(sel,row,selected){
				var record=selected.data;
				
				var NumSelect = sel.getCount(); //recupera la cantidad de filas selecionadas
				var filas=ds.getModifiedRecords();

				if(selected&&record!=-1){
				   
				    
				}

				enableSelect(sel,row,selected);
			}
	this.iniciaFormulario();
	iniciarEventosFormularios();
	layout_planilla_presupuesto.getLayout().addListener('layout',this.onResize);
	ContenedorPrincipal.getPagina(idContenedorPadre).pagina.getLayout().addListener('layout',this.onResizePrimario)
}