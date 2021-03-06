/**
 * Nombre:		  	    pagina_almacen_sector_main.js
 * Prop�sito: 			pagina objeto principal
 * Autor:				Generado Automaticamente
 * Fecha creaci�n:		2007-10-11 16:17:05
 */
function pagina_almacen_sector(idContenedor,direccion,paramConfig)
{
	var vectorAtributos=new Array;
	var ds;
	var elementos=new Array();
	var sw=0;
	/////////////////
	//  DATA STORE //
	/////////////////
	ds = new Ext.data.Store({
		// asigna url de donde se cargaran los datos
		proxy: new Ext.data.HttpProxy({url: direccion+'../../../control/almacen_sector/ActionListarAlmacenSector.php'}),
		// aqui se define la estructura del XML
		reader: new Ext.data.XmlReader({
			record: 'ROWS',
			id: 'id_almacen_sector',
			totalRecords: 'TotalCount'

		}, [
		// define el mapeo de XML a las etiquetas (campos)
				'id_almacen_sector',
		'superficie',
		'altura',
		'via_fil',
		'via_col',
		'techado',
		'aire_acond',
		{name: 'fecha_reg',type:'date',dateFormat:'Y-m-d'},
		'id_tipo_sector',
		'desc_tipo_sector',
		'desc_almacen',
		'id_almacen'

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

    ds_tipo_sector = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../control/tipo_sector/ActionListarTipoSector.php'}),
			reader: new Ext.data.XmlReader({
			record: 'ROWS',
			id: 'id_tipo_sector',
			totalRecords: 'TotalCount'
		}, ['id_tipo_sector','codigo','descripcion','observaciones','estado_registro','fecha_reg'])
	});

    ds_almacen = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../control/almacen/ActionListarAlmacen.php'}),
			reader: new Ext.data.XmlReader({
			record: 'ROWS',
			id: 'id_almacen',
			totalRecords: 'TotalCount'
		}, ['id_almacen','codigo','nombre','descripcion','direccion','via_fil_max','via_col_max','bloqueado','bloquear','cerrado','nro_prest_pendientes','nro_ing_no_finalizados','nro_sal_no_finalizadas','observaciones','fecha_ultimo_inventario','fecha_reg','id_regional'])
	});

	//FUNCIONES RENDER
	
			function render_id_tipo_sector(value, p, record){return String.format('{0}', record.data['desc_tipo_sector']);}
			function render_id_almacen(value, p, record){return String.format('{0}', record.data['desc_almacen']);};
	
	/////////////////////////
	// Definici�n de datos //
	/////////////////////////
	
	// hidden id_almacen_sector
	//en la posici�n 0 siempre esta la llave primaria

	var param_id_almacen_sector = {
		validacion:{
			//fieldLabel: 'Id',
			labelSeparator:'',
			name: 'id_almacen_sector',
			inputType:'hidden',
			grid_visible:false, 
			grid_editable:false
		},
		tipo: 'Field',
		filtro_0:false,
		save_as:'hidden_id_almacen_sector'
	};
	vectorAtributos[0] = param_id_almacen_sector;
// txt superficie
	var param_superficie= {
		validacion:{
			name:'superficie',
			fieldLabel:'Superficie',
			allowBlank:false,
			maxLength:50,
			minLength:0,
			selectOnFocus:true,
			allowDecimals:true,
			decimalPrecision :2,//para numeros float
			allowNegative: false,
			minValue:0,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100
		},
		tipo: 'NumberField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'ALMSEC.superficie',
		save_as:'txt_superficie'
	};
	vectorAtributos[1] = param_superficie;
// txt altura
	var param_altura= {
		validacion:{
			name:'altura',
			fieldLabel:'Altura',
			allowBlank:false,
			maxLength:50,
			minLength:0,
			selectOnFocus:true,
			allowDecimals:false,
			decimalPrecision :2,//para numeros float
			allowNegative: false,
			minValue:0,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100
		},
		tipo: 'NumberField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'ALMSEC.altura',
		save_as:'txt_altura'
	};
	vectorAtributos[2] = param_altura;
// txt via_fil
	var param_via_fil= {
		validacion:{
			name:'via_fil',
			fieldLabel:'Via Fila',
			allowBlank:false,
			maxLength:50,
			minLength:0,
			selectOnFocus:true,
			allowDecimals:false,
			decimalPrecision :2,//para numeros float
			allowNegative: false,
			minValue:0,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100
		},
		tipo: 'NumberField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'ALMSEC.via_fil',
		save_as:'txt_via_fil'
	};
	vectorAtributos[3] = param_via_fil;
// txt via_col
	var param_via_col= {
		validacion:{
			name:'via_col',
			fieldLabel:'Via Columna',
			allowBlank:false,
			maxLength:50,
			minLength:0,
			selectOnFocus:true,
			allowDecimals:false,
			decimalPrecision :2,//para numeros float
			allowNegative: false,
			minValue:0,
			vtype:'texto',
			grid_visible:true,
			grid_editable:true,
			width_grid:100
		},
		tipo: 'NumberField',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'ALMSEC.via_col',
		save_as:'txt_via_col'
	};
	vectorAtributos[4] = param_via_col;
// txt techado
	var param_techado= {
			validacion: {
			name:'techado',
			fieldLabel:'Techado',
			allowBlank:false,
			typeAhead: true,
			loadMask: true,
			triggerAction: 'all',
			store: new Ext.data.SimpleStore({
				fields: ['ID','valor'],
				data : Ext.almacen_sector_combo.techado
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
		filterColValue:'ALMSEC.techado',
		defecto:'si',
		save_as:'txt_techado'
	};
	vectorAtributos[5] = param_techado;
// txt aire_acond
	var param_aire_acond= {
			validacion: {
			name:'aire_acond',
			fieldLabel:'Aire Acondicionado',
			allowBlank:false,
			typeAhead: true,
			loadMask: true,
			triggerAction: 'all',
			store: new Ext.data.SimpleStore({
				fields: ['ID','valor'],
				data : Ext.almacen_sector_combo.aire_acond
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
		filterColValue:'ALMSEC.aire_acond',
		defecto:'si',
		save_as:'txt_aire_acond'
	};
	vectorAtributos[6] = param_aire_acond;
// txt fecha_reg
	var param_fecha_reg= {
		validacion:{
			name:'fecha_reg',
			fieldLabel:'Fecha Registro',
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
		filterColValue:'ALMSEC.fecha_reg',
		dateFormat:'m-d-Y',
		defecto:'',
		save_as:'txt_fecha_reg'
	};
	vectorAtributos[7] = param_fecha_reg;
// txt id_tipo_sector
	var param_id_tipo_sector= {
			validacion: {
			name:'id_tipo_sector',
			fieldLabel:'Tipo Sector',
			allowBlank:false,			
			emptyText:'Tipo Sector...',
			name: 'id_tipo_sector',     //indica la columna del store principal ds del que proviane el id
			desc: 'desc_tipo_sector', //indica la columna del store principal ds del que proviane la descripcion
			store:ds_tipo_sector,
			valueField: 'id_tipo_sector',
			displayField: 'codigo',
			queryParam: 'filterValue_0',
			filterCol:'TIPSEC.codigo#TIPSEC.descripcion',
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
			renderer:render_id_tipo_sector,
			grid_visible:true,
			grid_editable:true,
			width_grid:100 // ancho de columna en el gris
		},
		tipo:'ComboBox',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'TIPSEC.codigo',
		defecto: '',
		save_as:'txt_id_tipo_sector'
	};
	vectorAtributos[8] = param_id_tipo_sector;
// txt id_almacen
	var param_id_almacen= {
			validacion: {
			name:'id_almacen',
			fieldLabel:'Almacen',
			allowBlank:false,			
			emptyText:'Almacen...',
			name: 'id_almacen',     //indica la columna del store principal ds del que proviane el id
			desc: 'desc_almacen', //indica la columna del store principal ds del que proviane la descripcion
			store:ds_almacen,
			valueField: 'id_almacen',
			displayField: 'codigo',
			queryParam: 'filterValue_0',
			filterCol:'ALMACE.codigo#ALMACE.nombre#ALMACE.descripcion',
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
			renderer:render_id_almacen,
			grid_visible:true,
			grid_editable:true,
			width_grid:100 // ancho de columna en el gris
		},
		tipo:'ComboBox',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'ALMACE.codigo',
		defecto: '',
		save_as:'txt_id_almacen'
	};
	vectorAtributos[9] = param_id_almacen;

	//////////////////////////////////////////////////////////////
	// ----------            FUNCIONES RENDER    ---------------//
	//////////////////////////////////////////////////////////////
	function formatDate(value){
		return value ? value.dateFormat('d/m/Y') : '';
	};

	//////////////////////////////////////////////////////////////
	//---------         INICIAMOS LAYOUT MAESTRO     -----------//
	//////////////////////////////////////////////////////////////
	//Inicia Layout
	var config = {
		titulo_maestro:'almacen_sector',
		grid_maestro:'grid-'+idContenedor
	};
	layout_almacen_sector = new DocsLayoutMaestro(idContenedor);
	layout_almacen_sector.init(config);

	////////////////////////
	// INICIAMOS HERENCIA //
	////////////////////////

	/// HEREDAMOS DE LA CLASE MADRE
	this.pagina = Pagina;
	//-- pagina (array PARAMETROS DE CONFIGURACION, array DEFINICION DE ATRIBUTOS, SELECTION MODEL, DATA STORE, COLUM MODEL)
	this.pagina(paramConfig,vectorAtributos,ds,layout_almacen_sector,idContenedor);
	//--------------- HERENCIA DE LA CLASE MADRE ---------------------//
	var getSelectionModel=this.getSelectionModel;
	var ClaseMadre_getComponente=this.getComponente;
	var ClaseMadre_conexionFailure=this.conexionFailure;
	var ClaseMadre_btnNew=this.btnNew;
	var ClaseMadre_onResize=this.onResize;
	var ClaseMadre_SaveAndOther=this.SaveAndOther;

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
	parametrosFiltro = '&filterValue_0='+ds.lastOptions.params.filterValue_0+'&filterCol_0='+ds.lastOptions.params.filterCol_0;

	var paramFunciones = {
		btnEliminar:{
			url:direccion+'../../../control/almacen_sector/ActionEliminarAlmacenSector.php'
		},
		Save:{
			url:direccion+'../../../control/almacen_sector/ActionGuardarAlmacenSector.php'
		},
		ConfirmSave:{
			url:direccion+'../../../control/almacen_sector/ActionGuardarAlmacenSector.php'
		},
		Formulario:{
			html_apply:'dlgInfo-'+idContenedor,
			width:480,
			height:340,
			minWidth:150,
			minHeight:200,
			closable:true,
			titulo: 'almacen_sector'
		}
	}
	//-------------- DEFINICI�N DE FUNCIONES PROPIAS --------------//
function btn_estante(){
		var sm=getSelectionModel();var filas=ds.getModifiedRecords();var cont=filas.length;var NumSelect=sm.getCount();
		if(NumSelect!=0){
			var SelectionsRecord=sm.getSelected();
			var data='m_id_almacen_sector='+SelectionsRecord.data.id_almacen_sector;
			data=data+'&m_superficie='+SelectionsRecord.data.superficie;
			data=data+'&m_altura='+SelectionsRecord.data.altura;

			var ParamVentana={ventan:{width:'90%',height:'70%'}}
			layout_almacen_sector.loadWindows(direccion+'../../estante/estante_det.php?'+data,'Estanter�a',ParamVentana);
layout_almacen_sector.getVentana().on('resize',function(){
			layout_almacen_sector.getLayout().layout();
				})
		}
	else
	{
		Ext.MessageBox.alert('Estado', 'Antes debe seleccionar un item.');
	}
	}
	
	//Para manejo de eventos
	function iniciarEventosFormularios()
	{//para iniciar eventos en el formulario
	}

	//para que los hijos puedan ajustarse al tama�o
	this.getLayout=function(){
		return layout_almacen_sector.getLayout();
	};



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
				
		this.AdicionarBoton('../../../lib/imagenes/menu-show.gif','',btn_estante,true,'estante','Estanter�a');

				this.iniciaFormulario();
				iniciarEventosFormularios();

				layout_almacen_sector.getLayout().addListener('layout',this.onResize);//aregla la forma en que se ve el grid dentro del layout
				ContenedorPrincipal.getContenedorPrincipal().addListener('layout',this.onResizePrimario);
}