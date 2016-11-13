//<script>
function main(){
	 <?php
	//obtenemos la ruta absoluta
	$host  = $_SERVER['HTTP_HOST'];
	$uri  = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
	$dir = "http://$host$uri/";
	echo "\nvar direccion=\"$dir\";";
	echo "var idContenedor='$idContenedor';";
	?>

var paramConfig={TiempoEspera:10000};
var elemento={pagina:new pagina_almacen_logico(idContenedor,direccion,paramConfig),idContenedor:idContenedor};
ContenedorPrincipal.setPagina(elemento);
}
Ext.onReady(main,main);


/**
 * Nombre:		  pagina_almacen_logico.js
 * Prop�sito: 		  para dibujar los ............
 * Autor:		  JoS� Abraham Mita Huanca
 * Fecha creaci�n:	  2008-03-13 
 */
function pagina_almacen_logico(idContenedor,direccion,paramConfig)
{	var vectorAtributos=new Array;
	var data_ep;
	
   
	 ds_financiador= new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../../../../sis_parametros/control/financiador/ActionListaFinanciadorEP.php?origen=filtro'}),
			reader: new Ext.data.XmlReader({
			record: 'ROWS',
			id: 'id_financiador',
			totalRecords: 'TotalCount'
		}, ['id_financiador','codigo_financiador','nombre_financiador','descripcion_financiador','fecha_registro','hora_registro','fecha_ultima_modificacion','hora_ultima_modificacion'])
	});
	
	ds_regional = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../../../../sis_parametros/control/regional/ActionListaRegionalEP.php?origen=filtro'}),
			reader: new Ext.data.XmlReader({
			record: 'ROWS',
			id: 'id_regional',
			totalRecords: 'TotalCount'
		}, ['id_regional','codigo_regional','nombre_regional','descripcion_regional','fecha_registro','hora_registro','fecha_ultima_modificacion','hora_ultima_modificacion'])
	});
	
	
	ds_programa = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../../../../sis_parametros/control/programa/ActionListaProgramaEP.php?origen=filtro'}),
			reader: new Ext.data.XmlReader({
			record: 'ROWS',
			id: 'id_programa',
			totalRecords: 'TotalCount'
		}, ['id_programa','codigo_programa','nombre_programa','descripcion_programa','fecha_registro','hora_registro','fecha_ultima_modificacion','hora_ultima_modificacion'])
	});
	
	
	ds_proyecto = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../../../../sis_parametros/control/proyecto/ActionListaProyectoEP.php?origen=filtro'}),
			reader: new Ext.data.XmlReader({
			record: 'ROWS',
			id: 'id_proyecto',
			totalRecords: 'TotalCount'
		}, ['id_proyecto','codigo_proyecto','nombre_proyecto','descripcion_proyecto','fecha_registro','hora_registro','fecha_ultima_modificacion','hora_ultima_modificacion'])
	});
	
	
	ds_actividad = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../../../../sis_parametros/control/actividad/ActionListaActividadEP.php?origen=filtro'}),
			reader: new Ext.data.XmlReader({
			record: 'ROWS',
			id: 'id_actividad',
			totalRecords: 'TotalCount'
		}, ['id_actividad','codigo_actividad','nombre_actividad','descripcion_actividad','fecha_registro','hora_registro','fecha_ultima_modificacion','hora_ultima_modificacion'])
	});
	
	
	ds_almacen = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../../../control/almacen/ActionListarAlmacenEP.php?origen=filtro'}),
		reader: new Ext.data.XmlReader({
			record: 'ROWS',
			id: 'id_almacen',
			totalRecords: 'TotalCount'
		}, ['id_almacen','nombre','descripcion'])
		});

	
	//FUNCIONES RENDER
	function renderRegional(value, p, record){return String.format('{0}', record.data['desc_regional']);}
	// Template combo
	var resultTplRegional=new Ext.Template(
	'<div class="search-item">',
	'<b><i>{nombre_regional}</i></b>',
	'<br><FONT COLOR="#B5A642">{codigo_regional}</FONT>',
	'</div>'
	);
	
	function renderFinanciador(value, p, record){return String.format('{0}', record.data['nombre_financiador']);}
	function renderPrograma(value, p, record){return String.format('{0}', record.data['nombre_programa']);}
	function renderProyecto(value, p, record){return String.format('{0}', record.data['nombre_proyecto']);}
	function renderActividad(value, p, record){return String.format('{0}', record.data['nombre_actividad']);}
	function render_id_almacen(value, p, record){return String.format('{0}', record.data['desc_almacen']);}
	
		
	// Definici�n de datos //
	/////////////////////////
	// hidden id_almacen
	//en la posici�n 0 siempre esta la llave primaria
	
	var param_id_financiador={
		validacion:{
			fieldLabel:'Financiador',
			allowBlank:false,
			vtype:'texto',
			emptyText:'Financiador...',
			name:'id_financiador',
			desc:'desc_financiador',
			store:ds_financiador,
			valueField:'id_financiador',
			displayField:'nombre_financiador',
			queryParam:'filterValue_0',
			filterCol:'nombre_financiador',
			typeAhead:true,
			forceSelection:true,
			renderer:renderFinanciador,
			mode:'remote',
			queryDelay:50,
			pageSize:10,
			minListWidth:300,
			width:200,
			resizable:true,
			queryParam:'filterValue_0',
			minChars:0,
			triggerAction:'all',
			editable:true,
			grid_visible:true,
			grid_editable:false,
			width_grid:180
		},
		save_as:'txt_id_financiador',
		tipo:'ComboBox',
		id_grupo:0
	};
	vectorAtributos[0] = param_id_financiador;
	filterCols_regional=new Array();
	filterValues_regional=new Array();
	filterCols_regional[0]='frppa.id_financiador';
	filterValues_regional[0]='%';
	filterCols_almacen=new Array();
	filterValues_almacen=new Array();
	
	var param_id_regional={
		validacion:{
			fieldLabel:'Regional',
			allowBlank:false,
			vtype:'texto',
			emptyText:'Regional...',
			name:'id_regional',
			desc:'desc_regional',
			store:ds_regional,
			valueField:'id_regional',
			displayField:'nombre_regional',
			queryParam:'filterValue_0',
			filterCol:'REGION.codigo_regional#REGION.descripcion_regional',
			filterCols:filterCols_regional,
			filterValues:filterValues_regional,
			typeAhead:true,
			forceSelection:true,
			renderer:renderRegional,
			mode:'remote',
			queryDelay:50,
			pageSize:10,
			minListWidth:300,
			width:200,
			resizable:true,
			queryParam:'filterValue_0',
			minChars:0,
			triggerAction:'all',
			editable:true,
			grid_visible:true,
			grid_editable:false,
			width_grid:150
		},
		
		save_as:'txt_id_regional',
		tipo:'ComboBox',
		id_grupo:0
	};
	vectorAtributos[1]=param_id_regional;
	filterCols_programa=new Array();
	filterValues_programa=new Array();
	filterCols_programa[0]='frppa.id_financiador';
	filterValues_programa[0]='%';
	filterCols_programa[1]='frppa.id_regional';
	filterValues_programa[1]='%';
	
	var param_id_programa={
		validacion:{
			fieldLabel:'Programa',
			allowBlank:false,
			vtype:'texto',
			emptyText:'Programa...',
			name:'id_programa',
			desc:'desc_programa',
			store:ds_programa,
			valueField:'id_programa',
			displayField:'nombre_programa',
			queryParam:'filterValue_0',
			filterCol:'nombre_programa',
			filterCols:filterCols_programa,
			filterValues:filterValues_programa,
			typeAhead:true,
			forceSelection:true,
			renderer:renderPrograma,
			mode:'remote',
			queryDelay:50,
			pageSize:10,
			minListWidth:300,
			width:200,
			resizable:true,
			queryParam:'filterValue_0',
			minChars:0,
			triggerAction:'all',
			editable:true,
			grid_visible:true,
			grid_editable:false,
			width_grid:110
		},
		
		save_as:'txt_id_programa',
		tipo:'ComboBox',
		id_grupo:0
	};
	
	vectorAtributos[2]=param_id_programa;
	filterCols_proyecto=new Array();
	filterValues_proyecto=new Array();
	filterCols_proyecto[0]='frppa.id_financiador';
	filterValues_proyecto[0]='%';
	filterCols_proyecto[1]='frppa.id_regional';
	filterValues_proyecto[1]='%';
	filterCols_proyecto[2]='PGPYAC.id_programa';
	filterValues_proyecto[2]='%';
	
	var paramId_proyecto={
		validacion:{
			fieldLabel:'Proyecto',
			allowBlank:false,
			vtype:'texto',
			emptyText:'Proyecto...',
			name:'id_proyecto',
			desc:'desc_proyecto',
			store:ds_proyecto,
			valueField:'id_proyecto',
			displayField:'nombre_proyecto',
			queryParam:'filterValue_0',
			filterCol:'nombre_proyecto',
			filterCols:filterCols_proyecto,
			filterValues:filterValues_proyecto,
			typeAhead:true,
			forceSelection:true,
			renderer:renderProyecto,
			mode:'remote',
			queryDelay:50,
			pageSize:10,
			minListWidth:300,
			width:200,
			resizable:true,
			queryParam:'filterValue_0',
			minChars:0,
			triggerAction:'all',
			editable:true,
			grid_visible:true,
			grid_editable:false,
			width_grid:260
		},
		
		save_as:'txt_id_proyecto',
		tipo:'ComboBox',
		id_grupo:0
	};
	vectorAtributos[3]=paramId_proyecto;
	filterCols_actividad=new Array();
	filterValues_actividad=new Array();
	filterCols_actividad[0]='frppa.id_financiador';
	filterValues_actividad[0]='%';
	filterCols_actividad[1]='frppa.id_regional';
	filterValues_actividad[1]='%';
	filterCols_actividad[2]='PGPYAC.id_programa';
	filterValues_actividad[2]='%';
	filterCols_actividad[3]='PGPYAC.id_proyecto';
	filterValues_actividad[3]='%';
	
	var param_id_actividad={
		validacion:{
			fieldLabel:'Actividad',
			allowBlank:false,
			vtype:'texto',
			emptyText:'Actividad...',
			name:'id_actividad',
			desc:'desc_actividad',
			store:ds_actividad ,
			valueField:'id_actividad',
			displayField:'nombre_actividad',
			queryParam:'filterValue_0',
			filterCol:'nombre_actividad',
			filterCols:filterCols_actividad,
			filterValues:filterValues_actividad,
			typeAhead:true,
			forceSelection:true,
			renderer:renderActividad,
			mode:'remote',
			queryDelay:50,
			pageSize:10,
			minListWidth:300,
			width:200,
			resizable:true,
			queryParam:'filterValue_0',
			minChars:0,
			triggerAction:'all',
			editable:true,
			grid_visible:true,
			grid_editable:false,
			width_grid:110
		},
		
		save_as:'txt_id_actividad',
		tipo:'ComboBox',
		id_grupo:0
	};
	vectorAtributos[4]=param_id_actividad;
	var param_id_almacen= {
			validacion: {
				name:'id_almacen',
				fieldLabel:'Almac�n F�sico',
				allowBlank:true,
				emptyText:'Almac�n F�sico...',
				name: 'id_almacen',     //indica la columna del store principal ds del que proviane el id
				desc: 'desc_almacen', //indica la columna del store principal ds del que proviane la descripcion
				store:ds_almacen,
				valueField: 'id_almacen',
				displayField: 'nombre',
				queryParam: 'filterValue_0',
				filterCol:'ALMACE.nombre#ALMACE.descripcion',
				filterCols:filterCols_almacen,
				filterValues:filterValues_almacen,
				typeAhead:true,
				forceSelection:false,
				//tpl: resultTplAlmacen,
				mode:'remote',
				queryDelay:150,
				pageSize:100,
				minListWidth:200,
				grow:true,
				width:200,//'100%',
				//grow:true,
				resizable:true,
				queryParam:'filterValue_0',
				minChars:1, ///caracteres m�nimos requeridos para iniciar la busqueda
				triggerAction:'all',
				editable:true,
				renderer:render_id_almacen,
				grid_visible:false,
				grid_editable:false,
				width_grid:100 // ancho de columna en el gris
			},
			tipo:'ComboBox',
			filtro_0:false,
			filtro_1:false,
			filterColValue:'ALMACE.nombre',
			defecto: '',
			save_as:'txt_id_almacen',
			id_grupo:1
			
		};
		vectorAtributos[5] = param_id_almacen;		
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
	var config={
		titulo_maestro:'Almacen Logico'	
	};
	layout_almacen_logico=new DocsLayoutProceso(idContenedor);
	layout_almacen_logico.init(config);
	////////////////////////
	// INICIAMOS HERENCIA //
	////////////////////////
	/// HEREDAMOS DE LA CLASE MADRE
	this.pagina = BaseParametrosReporte;
	//-- pagina (array PARAMETROS DE CONFIGURACION, array DEFINICION DE ATRIBUTOS, SELECTION MODEL, DATA STORE, COLUM MODEL)
	this.pagina(paramConfig,vectorAtributos,layout_almacen_logico,idContenedor);
	
	//--------------- HERENCIA DE LA CLASE MADRE ---------------------//
    var getSelectionModel=this.getSelectionModel;
	var ClaseMadre_getComponente=this.getComponente;
	var ClaseMadre_getDialog=this.getDialog;
	var ClaseMadre_save=this.Save;
	var ClaseMadre_getGrid=this.getGrid;
	var ClaseMadre_getFormulario=this.getFormulario;
	var ClaseMadre_conexionFailure=this.conexionFailure;
	var ClaseMadre_btnNew=this.btnNew;
	var ClaseMadre_onResize=this.onResize;
	var ClaseMadre_SaveAndOther=this.SaveAndOther;
	var CM_mostrarComponente=this.mostrarComponente;
	var CM_ocultarComponente=this.ocultarComponente;
	var CM_ocultarTodosComponente=this.ocultarTodosComponente;
	var CM_mostrarTodosComponente=this.mostrarTodosComponente;
	var ClaseMadre_btnEdit=this.btnEdit;
	var ClaseMadre_btnEliminar = this.btnEliminar;
	var ClaseMadre_btnActualizar = this.btnActualizar;
	
	///////////////////////////////////
	// DEFINICI�N DE LA BARRA DE MEN�//
	///////////////////////////////////
	
    //////////////////////////////////////////////////////////////////////////////
	//----------------------  DEFINICI�N DE FUNCIONES ------------------------- //
	//  aqu� se parametrizan las funciones que se ejecutan en la clase madre    //
	//////////////////////////////////////////////////////////////////////////////
	
	function obtenerTitulo()
	{
		//var combo_financiador = ClaseMadre_getComponente('id_financiador');
		var titulo = "Almacen logico";
		return titulo;
	}
	//datos necesarios para el filtro
	var paramFunciones = {
		Formulario:{html_apply:'dlgInfo-'+idContenedor,
		height:'70%',
		url:direccion+'../../../../../control/_reportes/almacen_logico/ActionReporteAlmacenLogico.php',
		abrir_pestana:true, //abrir pestana
		titulo_pestana:obtenerTitulo,
		fileUpload:false,
		width:'70%',
		columnas:['50%'],
		minWidth:150,minHeight:200,	closable:true,titulo:'Almacen',
		grupos:[{
			tituloGrupo:'Estructura Program�tica',
			columna: 0,
			id_grupo:0
		},
		{	tituloGrupo:'Almac�n',
			columna:0,
			id_grupo:1
		}
	]}};
	//-------------- DEFINICI�N DE FUNCIONES PROPIAS --------------//
	//Para manejo de eventos
	function iniciarEventosFormularios(){	
		//para iniciar eventos en el formulario
		combo_financiador = ClaseMadre_getComponente('id_financiador');
		combo_regional = ClaseMadre_getComponente('id_regional');
		combo_programa = ClaseMadre_getComponente('id_programa');
		combo_proyecto = ClaseMadre_getComponente('id_proyecto');
		combo_actividad = ClaseMadre_getComponente('id_actividad');
		combo_almacen = ClaseMadre_getComponente('id_almacen');
	var onFinanciadorSelect = function(e) {
		var id = combo_financiador.getValue()
			combo_regional.filterValues[0] =  id;
			combo_regional.modificado = true;
			combo_programa.filterValues[0] =  id;
			combo_programa.modificado = true;
			combo_proyecto.filterValues[0] =  id;
			combo_proyecto.modificado = true;
			combo_actividad.filterValues[0] =  id;
			combo_actividad.modificado = true;
			combo_regional.setValue('');
			combo_programa.setValue('');
			combo_proyecto.setValue('');
			combo_actividad.setValue('');
			var  params1 = new Array();
			params1['id_regional'] = '%';
			params1['nombre_regional'] = 'Todos las Regionales';
			var aux1 = new Ext.data.Record(params1,'%');
			combo_regional.store.add(aux1)
			combo_regional.setValue('%');
			///////
			//Carga el valor por defecto del programa
			var  params0 = new Array();
			params0['id_programa'] = '%';
			params0['nombre_programa'] = 'Todos los Programas';
			var aux0 = new Ext.data.Record(params0,'%');
			combo_programa.store.add(aux0)
			combo_programa.setValue('%');
			///////
			//Carga el valor por defecto a la moneda principal como Bolivianos
			var  params2 = new Array();
			params2['id_proyecto'] = '%';
			params2['nombre_proyecto'] = 'Todos los Proyectos';
			var aux2 = new Ext.data.Record(params2,'%');
			combo_proyecto.store.add(aux2)
			combo_proyecto.setValue('%');
			///////
			//Carga el valor por defecto de la actividad
			var  params3 = new Array();
			params3['id_actividad'] = '%';
			params3['nombre_actividad'] = 'Todos las Actividades';
			var aux3 = new Ext.data.Record(params3,'%');
			combo_actividad.store.add(aux3)
			combo_actividad.setValue('%');
			
			
			var  params4 = new Array();
			params4['id_almacen'] = '%';
			params4['nombre'] = 'Todos los Almacenes';
			var aux4 = new Ext.data.Record(params4,'%');
			combo_almacen.store.add(aux4)
			combo_almacen.setValue('%');
		};
		var onRegionalSelect = function(e) {
			var id = combo_regional.getValue()
			combo_programa.filterValues[1] =  id;
			combo_programa.modificado = true;
			combo_proyecto.filterValues[1] =  id;
			combo_proyecto.modificado = true;
			combo_actividad.filterValues[1] =  id;
			combo_actividad.modificado = true;
			combo_programa.setValue('');
			combo_proyecto.setValue('');
			combo_actividad.setValue('');
			
			var  params0 = new Array();
			params0['id_programa'] = '%';
			params0['nombre_programa'] = 'Todos los Programas';
			var aux0 = new Ext.data.Record(params0,'%');
			combo_programa.store.add(aux0)
			combo_programa.setValue('%');
			///////
			//Carga el valor por defecto a la moneda principal como Bolivianos
			var  params2 = new Array();
			params2['id_proyecto'] = '%';
			params2['nombre_proyecto'] = 'Todos los Proyectos';
			var aux2 = new Ext.data.Record(params2,'%');
			combo_proyecto.store.add(aux2)
			combo_proyecto.setValue('%');
			///////
			//Carga el valor por defecto de la actividad
			var  params3 = new Array();
			params3['id_actividad'] = '%';
			params3['nombre_actividad'] = 'Todos las Actividades';
			var aux3 = new Ext.data.Record(params3,'%');
			combo_actividad.store.add(aux3)
			combo_actividad.setValue('%');
			
			var  params4 = new Array();
			params4['id_almacen'] = '%';
			params4['nombre'] = 'Todos los Almacenes';
			var aux4 = new Ext.data.Record(params4,'%');
			combo_almacen.store.add(aux4)
			combo_almacen.setValue('%');
						
		};
		var onProgramaSelect = function(e) {
			var id = combo_programa.getValue()
			
			combo_proyecto.filterValues[2] =  id;
			combo_proyecto.modificado = true;
			combo_actividad.filterValues[2] =  id;
			combo_actividad.modificado = true;
			combo_proyecto.setValue('');
			combo_actividad.setValue('');
			var  params2 = new Array();
			params2['id_proyecto'] = '%';
			params2['nombre_proyecto'] = 'Todos los Proyectos';
			var aux2 = new Ext.data.Record(params2,'%');
			combo_proyecto.store.add(aux2)
			combo_proyecto.setValue('%');
			///////
			//Carga el valor por defecto de la actividad
			var  params3 = new Array();
			params3['id_actividad'] = '%';
			params3['nombre_actividad'] = 'Todos las Actividades';
			var aux3 = new Ext.data.Record(params3,'%');
			combo_actividad.store.add(aux3)
			combo_actividad.setValue('%');
			
			var  params4 = new Array();
			params4['id_almacen'] = '%';
			params4['nombre'] = 'Todos los Almacenes';
			var aux4 = new Ext.data.Record(params4,'%');
			combo_almacen.store.add(aux4)
			combo_almacen.setValue('%');
						
		};
		var onProyectoSelect = function(e) {
			var id = combo_proyecto.getValue()
			
			combo_actividad.filterValues[3] =  id;
			combo_actividad.modificado = true;
			combo_actividad.setValue('');
			var  params3 = new Array();
			params3['id_actividad'] = '%';
			params3['nombre_actividad'] = 'Todos las Actividades';
			var aux3 = new Ext.data.Record(params3,'%');
			combo_actividad.store.add(aux3)
			combo_actividad.setValue('%');
			
			var  params4 = new Array();
			params4['id_almacen'] = '%';
			params4['nombre'] = 'Todos los Almacenes';
			var aux4 = new Ext.data.Record(params4,'%');
			combo_almacen.store.add(aux4)
			combo_almacen.setValue('%');
						
		};

		
		var onActividadSelect= function(e) {
			var id = combo_actividad.getValue()
			data_ep='id_financiador='+ ClaseMadre_getComponente('id_financiador').getValue() +	'&id_regional='+ ClaseMadre_getComponente('id_regional').getValue()  +'&id_programa='+  ClaseMadre_getComponente('id_programa').getValue() +  '&id_proyecto='+ ClaseMadre_getComponente('id_proyecto').getValue() +'&id_actividad='+ ClaseMadre_getComponente('id_actividad').getValue();
			verificar_ep();
			
			var  params4 = new Array();
			params4['id_almacen'] = '%';
			params4['nombre'] = 'Todos los Almacenes';
			var aux4 = new Ext.data.Record(params4,'%');
			combo_almacen.store.add(aux4)
			combo_almacen.setValue('%');
		};
		
		
		
		var onAlmacenSelect = function(e) {
					var id = combo_almacen.getValue();
					data_ep='id_financiador='+ ClaseMadre_getComponente('id_financiador').getValue() +	'&id_regional='+ ClaseMadre_getComponente('id_regional').getValue()  +'&id_programa='+  ClaseMadre_getComponente('id_programa').getValue() +  '&id_proyecto='+ ClaseMadre_getComponente('id_proyecto').getValue() +'&id_actividad='+ ClaseMadre_getComponente('id_actividad').getValue();
					if(id=='') id='x';
					combo_almacen.modificado=true;
				};
		combo_financiador.on('select', onFinanciadorSelect);
		combo_financiador.on('change', onFinanciadorSelect);
		combo_regional.on('select', onRegionalSelect);
		combo_regional.on('change', onRegionalSelect);
		combo_programa.on('select', onProgramaSelect);
		combo_programa.on('change', onProgramaSelect);
		combo_proyecto.on('select', onProyectoSelect);
		combo_proyecto.on('change', onProyectoSelect);
		combo_actividad.on('select', onActividadSelect);
		combo_actividad.on('change', onActividadSelect);
		combo_almacen.on('select', onAlmacenSelect);
		combo_almacen.on('change', onAlmacenSelect);
		
   				
	}
	
   function verificar_ep()
			{	
				if(ClaseMadre_getComponente('id_financiador').getValue()>0 &&ClaseMadre_getComponente('id_regional').getValue()>0 &&ClaseMadre_getComponente('id_programa').getValue()>0 &&ClaseMadre_getComponente('id_proyecto').getValue()>0 &&ClaseMadre_getComponente('id_actividad').getValue()>0 )
				
				  combo_almacen.store.proxy = new Ext.data.HttpProxy({url: direccion+'../../../../../control/almacen/ActionListarAlmacenEP.php?origen=filtro&'+data_ep})
			}
		  
	//para que los hijos puedan ajustarse al tama�o
	this.getLayout=function(){return layout_almacen_logico.getLayout();};
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
				//this.InitBarraMenu(paramMenu);
				//InitBarraMenu(array DE PAR�METROS PARA LAS FUNCIONES DE LA CLASE MADRE);
				this.InitFunciones(paramFunciones);
				//para agregar botones
				
				this.iniciaFormulario();
				iniciarEventosFormularios();
				//layout_almacen.getLayout().addListener('layout',this.onResize);//aregla la forma en que se ve el grid dentro del layout
				ContenedorPrincipal.getContenedorPrincipal().addListener('layout',this.onResizePrimario);
}