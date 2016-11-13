/**
 * Nombre:		  	    pagina_persona_main.js
 * Prop�sito: 			pagina objeto principal
 * Autor:				Generado Automaticamente
 * Fecha creaci�n:		2007-10-25 17:19:23
 */
function pagina_persona(idContenedor,direccion,paramConfig)
{
	var vectorAtributos=new Array;
	var ds;
	var elementos=new Array();
	var componentes=new Array();
	var sw=0;
	/////////////////
	//  DATA STORE //
	/////////////////
	ds = new Ext.data.Store({
		// asigna url de donde se cargaran los datos
		proxy: new Ext.data.HttpProxy({url: direccion+'../../../control/persona/ActionListarPersonaFoto.php'}),
		// aqui se define la estructura del XML
		reader: new Ext.data.XmlReader({
			record: 'ROWS',
			id: 'id_persona',
			totalRecords: 'TotalCount'

		}, [
		// define el mapeo de XML a las etiquetas (campos)
				'id_persona',
		'apellido_paterno',
		'apellido_materno',
		'nombre',
		{name: 'fecha_nacimiento',type:'date',dateFormat:'Y-m-d'},
		'foto_persona',
		'doc_id',
		'genero',
		'casilla',
		'telefono1',
		'telefono2',
		'celular1',
		'celular2',
		'pag_web',
		'email1',
		'email2',
		'email3',
		{name: 'fecha_registro',type:'date',dateFormat:'Y-m-d'},
		'hora_registro',
		{name: 'fecha_ultima_modificacion',type:'date',dateFormat:'Y-m-d'},
		'hora_ultima_modificacion',
		'observaciones',
		'desc_tipo_doc_identificacion',
		'id_tipo_doc_identificacion',
		'size',
		'url',
		'lastMod'

		]),remoteSort:true});

	//carga datos XML
	ds.load({
		params:{
			start:0,
			limit: paramConfig.TamanoPagina,
			CantFiltros:paramConfig.CantFiltros
		}
	});
	//DATA STORE COMBOS

    ds_tipo_doc_identificacion = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../control/tipo_doc_identificacion/ActionListarTipoDocIdentificacion.php'}),
			reader: new Ext.data.XmlReader({
			record: 'ROWS',
			id: 'id_tipo_doc_identificacion',
			totalRecords: 'TotalCount'
		}, ['id_tipo_doc_identificacion','nombre_tipo_documento','descripcion','fecha_registro','hora_registro','fecha_ultima_modificacion','hora_ultima_modificacion'])
	});

	//FUNCIONES RENDER
	
	function render_id_tipo_doc_identificacion(value, p, record){return String.format('{0}', record.data['desc_tipo_doc_identificacion']);}
			
	
			
	
	/////////////////////////
	// Definici�n de datos //
	/////////////////////////
	
	// hidden id_persona
	
	var param_id_persona = {
		validacion:{
			//fieldLabel: 'Id',
			labelSeparator:'',
			name: 'id_persona',
			inputType:'hidden',
			grid_visible:false, 
			grid_editable:false
		},
		tipo: 'Field',
		filtro_0:false,
		save_as:'hidden_id_persona'
	};
	vectorAtributos[0] = param_id_persona;
// txt apellido_paterno
	var param_apellido_paterno= {
		validacion:{
			name:'apellido_paterno',
			fieldLabel:'Apellido Paterno',
			allowBlank:true,
			maxLength:30,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'80%'
		},
		tipo: 'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.apellido_paterno',
		save_as:'txt_apellido_paterno',
		id_grupo:0
	};
	vectorAtributos[1] = param_apellido_paterno;
// txt apellido_materno
	var param_apellido_materno= {
		validacion:{
			name:'apellido_materno',
			fieldLabel:'Apellido Materno',
			allowBlank:true,
			maxLength:30,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'80%'
		},
		tipo: 'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.apellido_materno',
		save_as:'txt_apellido_materno',
		id_grupo:0
	};
	vectorAtributos[2] = param_apellido_materno;
// txt nombre
	var param_nombre= {
		validacion:{
			name:'nombre',
			fieldLabel:'Nombre',
			allowBlank:true,
			maxLength:50,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'80%'
		},
		tipo: 'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.nombre',
		save_as:'txt_nombre',
		id_grupo:0
	};
	vectorAtributos[3] = param_nombre;
// txt fecha_nacimiento
	var param_fecha_nacimiento= {
		validacion:{
			name:'fecha_nacimiento',
			fieldLabel:'Fecha Nacimiento',
			allowBlank:true,
			format: 'd/m/Y', //formato para validacion
			minValue: '01/01/1900',
			disabledDaysText: 'D�a no v�lido',
			grid_visible:true,
			grid_editable:true,
			renderer: formatDate,
			width_grid:85,
			disabled:false
		},
		tipo:'DateField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.fecha_nacimiento',
		dateFormat:'m-d-Y',
		defecto:'',
		save_as:'txt_fecha_nacimiento',
		id_grupo:0
	};
	vectorAtributos[4] = param_fecha_nacimiento;
// txt foto_persona
	var param_foto_persona= {
		validacion:{
			name:'foto_persona',
			fieldLabel:'Foto Persona',
			loadMask: true,
			allowBlank:true,
			inputType:'file',
			//tpl:resultTplImagenPersona,
			grid_visible:false, // se muestra en el grid
			grid_editable:false, //es editable en el grid,
			width_grid:120 // ancho de columna en el grid
		},
		tipo: 'Field',
		filtro_0:true,
		filterColValue:'PERSON.foto_persona',
		save_as:'txt_foto_persona',
		id_grupo:0
	};
	vectorAtributos[5] = param_foto_persona;
var param_id_tipo_doc_identificacion= {
			validacion: {
			name:'id_tipo_doc_identificacion',
			fieldLabel:'Tipo de Documento de Identificaci�n',
			allowBlank:false,			
			emptyText:'Documento de Identificaci�n...',
			desc: 'desc_tipo_doc_identificacion', //indica la columna del store principal ds del que proviane la descripcion
			store:ds_tipo_doc_identificacion,
			valueField: 'id_tipo_doc_identificacion',
			displayField: 'nombre_tipo_documento',
			//displayField: 'id_tipo_doc_identificacion',
			onSelect: function(record){componentes[23].setValue(record.data.id_tipo_doc_identificacion);componentes[6].setValue(record.data.nombre_tipo_documento); componentes[6].collapse(); },
		
			queryParam: 'filterValue_0',
			filterCol:'TIDOID.nombre_tipo_documento',
			typeAhead:true,
			forceSelection:true,
			mode:'remote',
			queryDelay:250,
			pageSize:100,
			minListWidth:450,
			grow:true,
			width:'100%',
			//grow:true,
			resizable:true,
			queryParam:'filterValue_0',
			minChars:1, ///caracteres m�nimos requeridos para iniciar la busqueda
			triggerAction:'all',
			editable:true,
			renderer:render_id_tipo_doc_identificacion,
			grid_visible:true,
			grid_editable:true,
			width_grid:100 // ancho de columna en el gris
		},
		tipo:'ComboBox',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'TIDOID.nombre_tipo_documento',
		defecto: '',
		save_as:'txt_id_tipo_doc_identificacion',
		id_grupo:1
	};
	vectorAtributos[6] = param_id_tipo_doc_identificacion;

// txt genero
	var param_genero= {
			validacion: {
			name:'genero',
			fieldLabel:'Genero',
			allowBlank:false,
			typeAhead: true,
			loadMask: true,
			triggerAction: 'all',
			store: new Ext.data.SimpleStore({
				fields: ['ID','valor'],
				data : Ext.persona_combo.genero
			}),
			valueField:'ID',
			displayField:'valor',
			lazyRender:true,
			forceSelection:true,
			grid_visible:true,
			grid_editable:true,
			width_grid:60 // ancho de columna en el gris
		},
		tipo:'ComboBox',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.genero',
		defecto:'varon',
		save_as:'txt_genero',
		id_grupo:0
	};
	vectorAtributos[7] = param_genero;
// txt casilla
	var param_casilla= {
		validacion:{
			name:'casilla',
			fieldLabel:'Casilla',
			allowBlank:true,
			maxLength:20,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'80%'
		},
		tipo: 'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.casilla',
		save_as:'txt_casilla',
		id_grupo:3
	};
	vectorAtributos[8] = param_casilla;
// txt telefono1
	var param_telefono1= {
		validacion:{
			name:'telefono1',
			fieldLabel:'Telefono 1',
			allowBlank:true,
			maxLength:20,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'80%'
		},
		tipo: 'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.telefono1',
		save_as:'txt_telefono1',
		id_grupo:2
	};
	vectorAtributos[9] = param_telefono1;
// txt telefono2
	var param_telefono2= {
		validacion:{
			name:'telefono2',
			fieldLabel:'Telefono2',
			allowBlank:true,
			maxLength:20,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'80%'
		},
		tipo: 'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.telefono2',
		save_as:'txt_telefono2',
		id_grupo:2
	};
	vectorAtributos[10] = param_telefono2;
// txt celular1
	var param_celular1= {
		validacion:{
			name:'celular1',
			fieldLabel:'Celular 1',
			allowBlank:true,
			maxLength:20,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'80%'
		},
		tipo: 'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.celular1',
		save_as:'txt_celular1',
		id_grupo:2
	};
	vectorAtributos[11] = param_celular1;
// txt celular2
	var param_celular2= {
		validacion:{
			name:'celular2',
			fieldLabel:'Celular 2',
			allowBlank:true,
			maxLength:20,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'80%'
		},
		tipo: 'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.celular2',
		save_as:'txt_celular2',
		id_grupo:2
	};
	vectorAtributos[12] = param_celular2;
// txt pag_web
	var param_pag_web= {
		validacion:{
			name:'pag_web',
			fieldLabel:'Pagina Web',
			allowBlank:true,
			maxLength:50,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'80%'
		},
		tipo: 'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.pag_web',
		save_as:'txt_pag_web',
		id_grupo:3
	};
	vectorAtributos[13] = param_pag_web;
// txt email1
	var param_email1= {
		validacion:{
			name:'email1',
			fieldLabel:'Email 1',
			allowBlank:true,
			maxLength:100,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'80%'
		},
		tipo: 'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.email1',
		save_as:'txt_email1',
		id_grupo:3
	};
	vectorAtributos[14] = param_email1;
// txt email2
	var param_email2= {
		validacion:{
			name:'email2',
			fieldLabel:'Email 2',
			allowBlank:true,
			maxLength:100,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'80%'
		},
		tipo: 'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.email2',
		save_as:'txt_email2',
		id_grupo:3
	};
	vectorAtributos[15] = param_email2;
// txt email3
	var param_email3= {
		validacion:{
			name:'email3',
			fieldLabel:'Email 3',
			allowBlank:true,
			maxLength:100,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'80%'
		},
		tipo: 'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.email3',
		save_as:'txt_email3',
		id_grupo:3
	};
	vectorAtributos[16] = param_email3;
// txt fecha_registro
	var param_fecha_registro= {
		validacion:{
			name:'fecha_registro1',
			fieldLabel:'Fecha Registro',
			allowBlank:false,
			format: 'd/m/Y', //formato para validacion
			minValue: '01/01/1900',
			disabledDaysText: 'D�a no v�lido',
			grid_visible:true,
			grid_editable:true,
			renderer: formatDate,
			width_grid:85
			//disabled:true
		},
		tipo:'DateField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.fecha_registro',
		dateFormat:'m-d-Y',
		defecto:'',
		save_as:'txt_fecha_registro',
		id_grupo:4
	};
	vectorAtributos[17] = param_fecha_registro;
// txt hora_registro
	var param_hora_registro= {
		validacion:{
			name:'hora_registro',
			fieldLabel:'Hora Registro',
			allowBlank:false,
			maxLength:8,
			minLength:0,
			selectOnFocus:true,
			vtype:'time',
			grid_visible:true,
			grid_editable:true,
			width_grid:100
		//	disabled:true
		},
		tipo:'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.hora_registro',
		save_as:'txt_hora_registro',
		id_grupo:4
	};
	vectorAtributos[18] = param_hora_registro;
// txt fecha_ultima_modificacion
	var param_fecha_ultima_modificacion= {
		validacion:{
			name:'fecha_ultima_modificacion',
			fieldLabel:'Fecha Ultima Modificaci�n',
			allowBlank:true,
			format: 'd/m/Y', //formato para validacion
			minValue: '01/01/1900',
			disabledDaysText: 'D�a no v�lido',
			grid_visible:true,
			grid_editable:true,
			renderer: formatDate,
			width_grid:85,
			disabled:true
		},
		tipo:'DateField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.fecha_ultima_modificacion',
		dateFormat:'m-d-Y',
		defecto:'',
		save_as:'txt_fecha_ultima_modificacion',
		id_grupo:5
	};
	vectorAtributos[19] = param_fecha_ultima_modificacion;
// txt hora_ultima_modificacion
	var param_hora_ultima_modificacion= {
		validacion:{
			name:'hora_ultima_modificacion',
			fieldLabel:'Hora Ultima Modificaci�n',
			allowBlank:true,
			maxLength:8,
			minLength:0,
			selectOnFocus:true,
			vtype:'time',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			disabled:true
		},
		tipo:'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.hora_ultima_modificacion',
		save_as:'txt_hora_ultima_modificacion',
		id_grupo:5
	};
	vectorAtributos[20] = param_hora_ultima_modificacion;
// txt observaciones
	var param_observaciones= {
		validacion:{
			name:'observaciones',
			fieldLabel:'Observaciones',
			allowBlank:true,
			maxLength:300,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:200,
			width:'100%'
		},
		tipo: 'TextArea',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.observaciones',
		save_as:'txt_observaciones',
		id_grupo:0
	};
	vectorAtributos[21] = param_observaciones;
// txt doc_id
	var param_doc_id= {
		validacion:{
			name:'doc_id',
			fieldLabel:'Documento de Identificaci�n',
			allowBlank:true,
			maxLength:50,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'80%'
		},
		tipo: 'TextField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PERSON.doc_id',
		save_as:'txt_doc_id',
		id_grupo:1
	};
	vectorAtributos[22] = param_doc_id;
	// txt id_tipo_doc_identificacion

	var param_id_tipo_doc_identificacion_value= {
			validacion: {
			name:'id_tipo_doc_identificacion_value',
			fieldLabel:'Tipo de Documento de Identificaci�n',
			allowBlank:true,			
			emptyText:'Documento de Identificaci�n...',
			desc: 'id_tipo_doc_identificacion', //indica la columna del store principal ds del que proviane la descripcion
			store:ds_tipo_doc_identificacion,
			valueField: 'id_tipo_doc_identificacion',
			displayField: 'id_tipo_doc_identificacion',
			//displayField: 'id_tipo_doc_identificacion',
			//queryParam: 'filterValue_0',
			//filterCol:'TIDOID.nombre_tipo_documento',
			typeAhead:true,
			//forceSelection:true,
			mode:'remote',
			queryDelay:250,
			pageSize:100,
			minListWidth:450,
			grow:true,
			width:'100%',
			//grow:true,
			resizable:true,
			queryParam:'filterValue_0',
			minChars:1, ///caracteres m�nimos requeridos para iniciar la busqueda
			triggerAction:'all',
			editable:true,
			renderer:render_id_tipo_doc_identificacion,
			grid_visible:false,
			grid_editable:false,
			width_grid:100 // ancho de columna en el gris
			//disabled:true
		},
		tipo:'ComboBox',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'TIDOID.nombre_tipo_documento',
		defecto: '',
		save_as:'txt_id_tipo_doc_identificacion',
		id_grupo:6
	};
	vectorAtributos[23] = param_id_tipo_doc_identificacion_value;
	var param_foto_persona1= {
		validacion:{
			id:'url',
			name:'url',
			fieldLabel:'Foto Persona',
			loadMask: true,
			allowBlank:true,
			vtype:'texto',
			//tpl:resultTplImagenPersona,
			grid_visible:true, // se muestra en el grid
			grid_editable:false, //es editable en el grid,
			width_grid:120, // ancho de columna en el grid
			renderer:formatFoto
		},
		tipo: 'Field',
		/*filtro_0:true,
		filterColValue:'PERSON.foto_persona',
		*/
		save_as:'txt_url',
		id_grupo:0
	};
	vectorAtributos[24] = param_foto_persona1;
	//////////////////////////////////////////////////////////////
	// ----------            FUNCIONES RENDER    ---------------//
	//////////////////////////////////////////////////////////////
	function formatDate(value){
		return value ? value.dateFormat('d/m/Y') : '';
	};
	
	function formatFoto(val) { 
		var res;
		if(val!="")
	     {  
	     	res='<img src='+direccion+'../../../control/persona/archivo/'+val+' width=50 height=50>';
	     //	alert (res);
	     	
	     }
	     return res;
	}
	

	//////////////////////////////////////////////////////////////
	//---------         INICIAMOS LAYOUT MAESTRO     -----------//
	//////////////////////////////////////////////////////////////
	//Inicia Layout
	var config = {
		titulo_maestro:'persona',
		grid_maestro:'grid-'+idContenedor
	};
	layout_persona=new DocsLayoutMaestro(idContenedor);
	layout_persona.init(config);

	////////////////////////
	// INICIAMOS HERENCIA //
	////////////////////////

	/// HEREDAMOS DE LA CLASE MADRE
	this.pagina = Pagina;
	//-- pagina (array PARAMETROS DE CONFIGURACION, array DEFINICION DE ATRIBUTOS, SELECTION MODEL, DATA STORE, COLUM MODEL)
	this.pagina(paramConfig,vectorAtributos,ds,layout_persona,idContenedor);
	//--------------- HERENCIA DE LA CLASE MADRE ---------------------//
	var getSelectionModel=this.getSelectionModel;
	var ClaseMadre_getComponente=this.getComponente;
	var ClaseMadre_conexionFailure=this.conexionFailure;
	var ClaseMadre_btnNew=this.btnNew;
	var ClaseMadre_onResize=this.onResize;
	var ClaseMadre_SaveAndOther=this.SaveAndOther;
	var ClaseMadre_btnEdit=this.btnEdit;
	var CM_ocultarGrupo=this.ocultarGrupo;
	var CM_mostrarGrupo=this.mostrarGrupo;


	///////////////////////////////////
	// DEFINICI�N DE LA BARRA DE MEN�//
	///////////////////////////////////

	var paramMenu={
		guardar:{crear:true,separador:false},
		nuevo:{crear:true,separador:true},
		editar:{crear:true,separador:false},
		eliminar:{crear:true,separador:false},
		actualizar:{crear:true,separador:false}
	};


	//////////////////////////////////////////////////////////////////////////////
	//----------------------  DEFINICI�N DE FUNCIONES ------------------------- //
	//  aqu� se parametrizan las funciones que se ejecutan en la clase madre    //
	//////////////////////////////////////////////////////////////////////////////
	
	//datos necesarios para el filtro
	var paramFunciones = {
		btnEliminar:{url:direccion+'../../../control/persona/ActionEliminarPersona.php'},
		Save:{url:direccion+'../../../control/persona/ActionGuardarPersonaFoto.php'},
		ConfirmSave:{url:direccion+'../../../control/persona/ActionGuardarPersonaFoto.php'},
		Formulario:{
			titulo:'Persona',
			html_apply:"dlgInfo-"+idContenedor,
			width:'64%',
			height:'80%',
			minWidth:200,
			minHeight:150,
			columnas:['45%','45%'],
			closable:true,
			upload:true,
			grupos:[
			{
				tituloGrupo:'Datos Personales',
				columna:0,
				id_grupo:0
			},
			{
				tituloGrupo:'Documento de Identificaci�n',
				columna:0,
				id_grupo:1
			},
			{
				tituloGrupo:'Direcci�n Telefono',
				columna:1,
				id_grupo:2
			},
			
			{
				tituloGrupo:'Direcci�n Correo - Web',
				columna:1,
				id_grupo:3
			},
			
			{
				tituloGrupo:'Hora y Fecha Registro',
				columna:1,
				id_grupo:4
			},
			{
				tituloGrupo:'Hora y Fecha Modificaci�n',
				columna:1,
				id_grupo:5
			},
			{
				tituloGrupo:'Ocultos',
				columna:1,
				id_grupo:6
			}
			]
		}
	
	};
	//-------------- DEFINICI�N DE FUNCIONES PROPIAS --------------//

	 this.btnNew = function()
	{
		//dialog.resizeTo('50%','70%');
		CM_mostrarGrupo('Datos Personales');
		CM_mostrarGrupo('Documento de Identificaci�n');
		CM_mostrarGrupo('Direcci�n Telefono');
		CM_mostrarGrupo('Direcci�n Correo - Web');
		CM_ocultarGrupo('Hora y Fecha Registro');
		CM_ocultarGrupo('Hora y Fecha Modificaci�n');
		CM_ocultarGrupo('Ocultos');
		get_fecha_bd();
		get_hora_bd();
		ClaseMadre_btnNew();
		
	};
	
	 this.btnEdit = function()
	{ 
		//dialog.resizeTo('50%','70%');
		CM_mostrarGrupo('Datos Personales');
		CM_mostrarGrupo('Documento de Identificaci�n');
		CM_mostrarGrupo('Direcci�n Telefono');
		CM_mostrarGrupo('Direcci�n Correo - Web');
		CM_ocultarGrupo('Hora y Fecha Registro');
		CM_mostrarGrupo('Hora y Fecha Modificaci�n');
		get_fecha_bd();
		get_hora_bd();
		ClaseMadre_btnEdit();
		
	};
    function get_fecha_bd()
	{
		Ext.Ajax.request({
			url:direccion+"../../../../lib/lib_control/action/ActionObtenerFechaBD.php",
			method:'GET',
			success:cargar_fecha_bd,
			failure:ClaseMadre_conexionFailure,
			timeout:100000//TIEMPO DE ESPERA PARA DAR FALLO
		});
	}
	function cargar_fecha_bd(resp)
	{   
		Ext.MessageBox.hide();
		if(resp.responseXML != undefined && resp.responseXML != null && resp.responseXML.documentElement != null && resp.responseXML.documentElement != undefined){
			var root = resp.responseXML.documentElement;
			if(componentes[17].getValue()=="")
			{
				componentes[17].setValue(root.getElementsByTagName('fecha')[0].firstChild.nodeValue);
			}
		   	componentes[19].setValue(root.getElementsByTagName('fecha')[0].firstChild.nodeValue);
			
		}
	}
	function get_hora_bd()
		{
		Ext.Ajax.request({
			url:direccion+"../../../../lib/lib_control/action/ActionObtenerHoraBD.php",
			method:'GET',
			success:cargar_hora_bd,
			failure:ClaseMadre_conexionFailure,
			timeout:100000//TIEMPO DE ESPERA PARA DAR FALLO
			});
		}

	 	function cargar_hora_bd(resp)
		{
			Ext.MessageBox.hide();
			if(resp.responseXML != undefined && resp.responseXML != null && resp.responseXML.documentElement != null && resp.responseXML.documentElement != undefined){
				var root = resp.responseXML.documentElement;
			if(componentes[18].getValue()==""){
					componentes[18].setValue(root.getElementsByTagName('hora')[0].firstChild.nodeValue);
				}
				componentes[20].setValue(root.getElementsByTagName('hora')[0].firstChild.nodeValue);
			}
		}
	
	
	//Para manejo de eventos
	function iniciarEventosFormularios()
	{	
	//para iniciar eventos en el formulario
	for(i=0;i<vectorAtributos.length;i++)
		{
			
			componentes[i]=ClaseMadre_getComponente(vectorAtributos[i].validacion.name);
			
		}
		sm=getSelectionModel();

	}
   function btnVerPersonaFoto(){
	//	h_txt_id_fac_index = ClaseMadre_getComponente('id_fac_index');
	
		var sm = getSelectionModel();
		var filas = ds.getModifiedRecords();
		var cont = filas.length;
		var NumSelect = sm.getCount(); //recupera la cantidad de filas selecionadas
		var sw=false;

		if(NumSelect!=0){//Verifica si hay filas seleccionadas
			//if(confirm('Esta seguro de Indexar Tarifas, desea continuar?'))
		   //			{sw=true;}
			//if(sw){
				var SelectionsRecord  = sm.getSelected(); //es el primer registro selecionado
				//var data = "hidden_id_fac_index=" + h_txt_id_fac_index.getValue();
				//var ParamVentana={Ventana:{width:'90%',height:'80%'}}
				window.open(direccion+"../../../control/persona/ActionListarPersonaFoto.php",'Sectores del Almac�n');
		}
		else{
			Ext.MessageBox.alert('...', '<span style="color:blue;font-size:8pt"><b>Antes debe seleccionar un Valor de Indexaci�n...</b></span>');
		}
	}
	

	//para que los hijos puedan ajustarse al tama�o
	this.getLayout=function(){return layout_persona.getLayout();};
	//para el manejo de hijos
	this.getPagina=function(idContenedorHijo){
		var tam_elementos=elementos.length;
		for(i=0;i<tam_elementos;i++){
			if(elementos[i].idContenedor==idContenedorHijo){
				return elementos[i];
			}
		}
	};
	this.getElementos=function(){return elementos;};
	this.setPagina=function(elemento){elementos.push(elemento);};

				//-------------- FIN DEFINICI�N DE FUNCIONES PROPIAS --------------//
				this.Init(); //iniciamos la clase madre
				this.InitBarraMenu(paramMenu);
				//InitBarraMenu(array DE PAR�METROS PARA LAS FUNCIONES DE LA CLASE MADRE);
				this.InitFunciones(paramFunciones);
				//para agregar botones
				
				this.iniciaFormulario();
				iniciarEventosFormularios();
              //  this.AdicionarBoton("../../../lib/imagenes/list-proce.bmp",'',btnVerPersonaFoto,true, 'ver persona foto','Ver foto');
	
				layout_persona.getLayout().addListener('layout',this.onResize);//aregla la forma en que se ve el grid dentro del layout
				ContenedorPrincipal.getContenedorPrincipal().addListener('layout',this.onResizePrimario);
}