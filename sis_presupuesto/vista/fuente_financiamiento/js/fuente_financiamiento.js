/**
 * Nombre:		  	pagina_fuente_financiamiento.js
 * Prop�sito: 			pagina objeto principal
 * Autor:				Grover Velasquez Colque
 * Fecha creaci�n:		2008-07-15 10:55:06
 */
function pagina_fuente_financiamiento(idContenedor,direccion,paramConfig){
	var Atributos=new Array,sw=0;
	
	//---DATA STORE
	var ds = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({url: direccion+'../../../control/fuente_financiamiento/ActionListarFuenteFinanciamiento.php'}),
		reader: new Ext.data.XmlReader({
		record: 'ROWS',id:'id_fuente_financiamiento',totalRecords:'TotalCount'
		},[		
				'id_fuente_financiamiento',
		'codigo_fuente',
		'denominacion',
		'descripcion',
		'sigla',
		'usuario_reg',
		'fecha_reg'
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

	//FUNCIONES RENDER
	
	
	/////////////////////////
	// Definici�n de datos //
	/////////////////////////
	
	// hidden id_fuente_financiamiento
	//en la posici�n 0 siempre esta la llave primaria

	Atributos[0]={
		validacion:{
			labelSeparator:'',
			name: 'id_fuente_financiamiento',
			inputType:'hidden',
			grid_visible:false, 
			grid_editable:false
		},
		tipo: 'Field',
		filtro_0:false,
		save_as:'id_fuente_financiamiento'
	};
// txt codigo_fuente
	Atributos[1]={
		validacion:{
			name:'codigo_fuente',
			fieldLabel:'C�digo de FF',
			allowBlank:false,
			maxLength:3,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100,
			width:'50%',
			disabled:false		
		},
		tipo: 'TextField',
		form: true,
		filtro_0:true,
		filterColValue:'FUNFIN.codigo_fuente',
		save_as:'codigo_fuente'
	};
// txt denominacion
	Atributos[2]={
		validacion:{
			name:'denominacion',
			fieldLabel:'Denominaci�n',
			allowBlank:false,
			maxLength:100,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:250,
			width:'100%',
			disabled:false		
		},
		tipo: 'TextArea',
		form: true,
		filtro_0:true,
		filterColValue:'FUNFIN.denominacion',
		save_as:'denominacion'
	};

// txt sigla
	Atributos[3]={
		validacion:{
			name:'sigla',
			fieldLabel:'Sigla',
			allowBlank:false,
			maxLength:50,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:150,
			width:'100%',
			disabled:false		
		},
		tipo: 'TextField',
		form: true,
		filtro_0:true,
		filterColValue:'FUNFIN.sigla',
		save_as:'sigla'
	};
	
// txt descripcion
	Atributos[4]={
		validacion:{
			name:'descripcion',
			fieldLabel:'Descripci�n',
			allowBlank:false,
			maxLength:1000,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:400,
			width:'100%',
			disabled:false		
		},
		tipo: 'TextArea',
		form: true,
		filtro_0:true,
		filterColValue:'FUNFIN.descripcion',
		save_as:'descripcion'
	};	
	
	Atributos[5 ]={
		validacion:{
			name:'usuario_reg',
			fieldLabel:'Usuario Registro',
			allowBlank:true,
			maxLength:3,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:false,
			width_grid:150,
			width:'50%',
			disabled:false		
		},
		tipo: 'TextField',
		form: false,
		filtro_0:true,
		filterColValue:'USUARI.login',
		save_as:'usuario_reg'
	};	

	Atributos[6]={
		validacion:{
			name:'fecha_reg',
			fieldLabel:'Fecha Registro',
			allowBlank:true,
			maxLength:3,
			minLength:0,
			selectOnFocus:true,
			vtype:'texto',
			grid_visible:true,
			grid_editable:false,
			width_grid:150,
			width:'50%',
			disabled:false		
		},
		tipo: 'TextField',
		form: false,
		filtro_0:true,
		filterColValue:'FUNFIN.fecha_reg',
		save_as:'fecha_reg'
	};	

	//////////////////////////////////////////////////////////////
	// ----------            FUNCIONES RENDER    ---------------//
	//////////////////////////////////////////////////////////////
	function formatDate(value){return value?value.dateFormat('d/m/Y'):''};

	//---------- INICIAMOS LAYOUT DETALLE
	var config={titulo_maestro:'Fuente Financiamiento',grid_maestro:'grid-'+idContenedor};
	var layout_fuente_financiamiento=new DocsLayoutMaestro(idContenedor);
	layout_fuente_financiamiento.init(config);

	////////////////////////
	// INICIAMOS HERENCIA //
	////////////////////////

	
	this.pagina=Pagina;
	//-- pagina (array PARAMETROS DE CONFIGURACION, array DEFINICION DE ATRIBUTOS, SELECTION MODEL, DATA STORE, COLUM MODEL)
	this.pagina(paramConfig,Atributos,ds,layout_fuente_financiamiento,idContenedor);
	var getComponente=this.getComponente;
	var getSelectionModel=this.getSelectionModel;

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
	var paramFunciones={
		btnEliminar:{url:direccion+'../../../control/fuente_financiamiento/ActionEliminarFuenteFinanciamiento.php'},
		Save:{url:direccion+'../../../control/fuente_financiamiento/ActionGuardarFuenteFinanciamiento.php'},
		ConfirmSave:{url:direccion+'../../../control/fuente_financiamiento/ActionGuardarFuenteFinanciamiento.php'},
		Formulario:{html_apply:'dlgInfo-'+idContenedor,height:400,width:480,minWidth:150,minHeight:200,	closable:true,titulo:'Fuente de Financiamiento'}};
	//-------------- DEFINICI�N DE FUNCIONES PROPIAS --------------//

	//Para manejo de eventos
	function iniciarEventosFormularios(){
	//para iniciar eventos en el formulario
	}

	//para que los hijos puedan ajustarse al tama�o
	this.getLayout=function(){return layout_fuente_financiamiento.getLayout()};
	this.Init(); //iniciamos la clase madre
	this.InitBarraMenu(paramMenu);
	//InitBarraMenu(array DE PAR�METROS PARA LAS FUNCIONES DE LA CLASE MADRE);
	this.InitFunciones(paramFunciones);
	//para agregar botones
	
	this.iniciaFormulario();
	iniciarEventosFormularios();
	layout_fuente_financiamiento.getLayout().addListener('layout',this.onResize);//aregla la forma en que se ve el grid dentro del layout
	ContenedorPrincipal.getContenedorPrincipal().addListener('layout',this.onResizePrimario);
}