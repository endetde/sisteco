<?php 
/**
 * Nombre:		  	    tramo_main.php
 * Prop�sito: 			pagina que arranca la configuracion de la vista
 * Autor:				Generado Automaticamente
 * Fecha creaci�n:		2008-03-31 11:12:27
 *
 */
session_start();
?>
//<script>
var paginaTipoActivo;

	function main(){
	 	<?php
		//obtenemos la ruta absoluta
		$host  = $_SERVER['HTTP_HOST'];
		$uri  = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
		$dir = "http://$host$uri/";
		echo "\nvar direccion='$dir';";
	    echo "var idContenedor='$idContenedor';";
	?>
	
	
	var fa=false;
	<?php if($_SESSION["ss_filtro_avanzado"]!=''){
		echo 'fa='.$_SESSION["ss_filtro_avanzado"].';';
	}
	?>
var paramConfig={TamanoPagina:20,TiempoEspera:10000,CantFiltros:1,FiltroEstructura:false,FiltroAvanzado:fa};
var elemento={pagina:new pagina_tramo(idContenedor,direccion,paramConfig),idContenedor:idContenedor};
ContenedorPrincipal.setPagina(elemento);
}
Ext.onReady(main,main);



/**
* Nombre:		  	    pagina_tramo_main.js
* Prop�sito: 			pagina objeto principal
* Autor:				Generado Automaticamente
* Fecha creaci�n:		2008-03-31 11:12:27
*/
function pagina_tramo(idContenedor,direccion,paramConfig)
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
		proxy: new Ext.data.HttpProxy({url: direccion+'../../../control/tramo/ActionListarTramo.php'}),
		// aqui se define la estructura del XML
		reader: new Ext.data.XmlReader({
			record: 'ROWS',
			id: 'id_tramo',
			totalRecords: 'TotalCount'

		}, [
		// define el mapeo de XML a las etiquetas (campos)
		'id_tramo',
		'codigo',
		'descripcion',
		'observaciones',
		'id_prog_proy_acti',
		'desc_programa_proyecto_actividad',
		{name: 'fecha_reg',type:'date',dateFormat:'Y-m-d'}

		]),remoteSort:true});

		//carga datos XML
		ds.load({
			params:{
				start:0,
				limit: paramConfig.TamanoPagina,
				CantFiltros:paramConfig.CantFiltros
			}
		});
		
	ds_programa_proyecto_actividad = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../../sis_parametros/control/programa_proyecto_actividad/ActionListarProgramaProyectoActividad.php'}),
			reader: new Ext.data.XmlReader({
			record: 'ROWS',
			id: 'id_prog_proy_acti',
			totalRecords: 'TotalCount'
		}, ['id_prog_proy_acti','id_programa','id_proyecto','id_actividad','desc_prog_proy_acti'])
	});
	
	
		//DATA STORE COMBOS

		//FUNCIONES RENDER

    function render_id_prog_proy_acti(value, p, record){return String.format('{0}', record.data['desc_programa_proyecto_actividad']);}
	
	


		/////////////////////////
		// Definici�n de datos //
		/////////////////////////

		// hidden id_tramo
		//en la posici�n 0 siempre esta la llave primaria

		var param_id_tramo = {
			validacion:{
				//fieldLabel: 'Id',
				labelSeparator:'',
				name: 'id_tramo',
				inputType:'hidden',
				grid_visible:false,
				grid_editable:false
			},
			tipo: 'Field',
			filtro_0:false,
			save_as:'hidden_id_tramo'
		};
		vectorAtributos[0] = param_id_tramo;
		// txt codigo
		var param_codigo= {
			validacion:{
				name:'codigo',
				fieldLabel:'C�digo',
				allowBlank:false,
				maxLength:20,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:true,
				grid_editable:true,
				width_grid:85
			},
			tipo: 'TextField',
			filtro_0:true,
			filtro_1:true,
			filterColValue:'TRAMO.codigo',
			save_as:'txt_codigo'
		};
		vectorAtributos[1] = param_codigo;
		// txt descripcion
		var param_descripcion= {
			validacion:{
				name:'descripcion',
				fieldLabel:'Descripci�n',
				allowBlank:false,
				maxLength:100,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:true,
				grid_editable:true,
				width_grid:180
			},
			tipo: 'TextArea',
			filtro_0:true,
			filtro_1:true,
			filterColValue:'TRAMO.descripcion',
			save_as:'txt_descripcion'
		};
		vectorAtributos[2] = param_descripcion;
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
				width_grid:180
			},
			tipo: 'TextArea',
			filtro_0:true,
			filtro_1:true,
			filterColValue:'TRAMO.observaciones',
			save_as:'txt_observaciones'
		};
		vectorAtributos[3] = param_observaciones;
		// txt fecha_reg
		var param_fecha_reg= {
			validacion:{
				name:'fecha_reg',
				fieldLabel:'Fecha de registro',
				allowBlank:true,
				format: 'd/m/Y', //formato para validacion
				minValue: '01/01/1900',
				disabledDaysText: 'D�a no v�lido',
				grid_visible:true,
				grid_editable:true,
				renderer: formatDate,
				width_grid:95,
				disabled:true
			},
			tipo:'DateField',
			filtro_0:true,
			filtro_1:true,
			filterColValue:'TRAMO.fecha_reg',
			dateFormat:'m-d-Y',
			defecto:'',
			save_as:'txt_fecha_reg'
		};
		vectorAtributos[4] = param_fecha_reg;
		
		vectorAtributos[5]= {
			validacion: {
			name:'id_prog_proy_acti',
			fieldLabel:'Relaci�n Prog/Proy/Acti',
			allowBlank:false,			
			emptyText:'Prog/Proy/Acti...',
			desc: 'desc_programa_proyecto_actividad', //indica la columna del store principal ds del que proviane la descripcion
			store:ds_programa_proyecto_actividad,
			valueField: 'id_prog_proy_acti',
			displayField: 'desc_prog_proy_acti',
			queryParam: 'filterValue_0',
			filterCol:'PGPYAC.nombre_programa#PGPYAC.nombre_proyecto#PGPYAC.nombre_actividad',
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
			renderer:render_id_prog_proy_acti,
			grid_visible:true,
			grid_editable:true,
			width_grid:250 // ancho de columna en el gris
		},
		tipo:'ComboBox',
		filtro_0:true,
		filtro_1:true,
		filterColValue:'PROGRA.nombre_programa#PROYEC.nombre_proyecto#ACTIVI.nombre_actividad',
		defecto: '',
		save_as:'txt_id_prog_proy_acti'
	};

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
			titulo_maestro:'tramo',
			grid_maestro:'grid-'+idContenedor
		};
		layout_tramo=new DocsLayoutMaestro(idContenedor);
		layout_tramo.init(config);

		////////////////////////
		// INICIAMOS HERENCIA //
		////////////////////////

		/// HEREDAMOS DE LA CLASE MADRE
		this.pagina = Pagina;
		//-- pagina (array PARAMETROS DE CONFIGURACION, array DEFINICION DE ATRIBUTOS, SELECTION MODEL, DATA STORE, COLUM MODEL)
		this.pagina(paramConfig,vectorAtributos,ds,layout_tramo,idContenedor);
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
		var paramFunciones = {
			btnEliminar:{url:direccion+'../../../control/tramo/ActionEliminarTramo.php'},
			Save:{url:direccion+'../../../control/tramo/ActionGuardarTramo.php'},
			ConfirmSave:{url:direccion+'../../../control/tramo/ActionGuardarTramo.php'},
			Formulario:{html_apply:'dlgInfo-'+idContenedor,height:340,
			width:480,
			minWidth:150,minHeight:200,	closable:true,titulo:'tramo'}};
			//-------------- DEFINICI�N DE FUNCIONES PROPIAS --------------//
			function btn_tramo_unidad_constructiva(){
				var sm=getSelectionModel();var filas=ds.getModifiedRecords();var cont=filas.length;var NumSelect=sm.getCount();
				if(NumSelect!=0){
					var SelectionsRecord=sm.getSelected();
					var data='m_id_tramo='+SelectionsRecord.data.id_tramo;
					data=data+'&m_codigo='+SelectionsRecord.data.codigo;
					data=data+'&m_descripcion='+SelectionsRecord.data.descripcion;
					data=data+'&m_id_prog_proy_acti='+SelectionsRecord.data.id_prog_proy_acti;
					data=data+'&m_desc_programa_proyecto_actividad='+SelectionsRecord.data.desc_programa_proyecto_actividad;

					var ParamVentana={Ventana:{width:'90%',height:'70%'}}
					layout_tramo.loadWindows(direccion+'../../../vista/tramo_unidad_constructiva/tramo_unidad_constructiva_det.php?'+data,'Relaci�n Tramos Unidades Constructivas',ParamVentana);
					layout_tramo.getVentana().on('resize',function(){
						layout_tramo.getLayout().layout();
					})
				}
				else
				{
					Ext.MessageBox.alert('Estado', 'Antes debe seleccionar un item.');
				}
			}
			function btn_tramo_subactividad(){
				var sm=getSelectionModel();var filas=ds.getModifiedRecords();var cont=filas.length;var NumSelect=sm.getCount();
				if(NumSelect!=0){
					var SelectionsRecord=sm.getSelected();
					var data='m_id_tramo='+SelectionsRecord.data.id_tramo;
					data=data+'&m_codigo='+SelectionsRecord.data.codigo;
					data=data+'&m_descripcion='+SelectionsRecord.data.descripcion;
					data=data+'&m_id_prog_proy_acti='+SelectionsRecord.data.id_prog_proy_acti;
					data=data+'&m_desc_programa_proyecto_actividad='+SelectionsRecord.data.desc_programa_proyecto_actividad;

					var ParamVentana={Ventana:{width:'90%',height:'70%'}}
					layout_tramo.loadWindows(direccion+'../../../vista/tramo_subactividad/tramo_subactividad_det.php?'+data,'Relaci�n Tramos Subactividad',ParamVentana);
					layout_tramo.getVentana().on('resize',function(){
						layout_tramo.getLayout().layout();
					})
				}
				else
				{
					Ext.MessageBox.alert('Estado', 'Antes debe seleccionar un item.');
				}
			}

			//Para manejo de eventos
			function iniciarEventosFormularios(){

				//para iniciar eventos en el formulario
			}

			//para que los hijos puedan ajustarse al tama�o
			this.getLayout=function(){return layout_tramo.getLayout();};
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

			this.AdicionarBoton('../../../lib/imagenes/menu-show.gif','',btn_tramo_unidad_constructiva,true,'tramo_unidad_constructiva','Relaci�n Tramos Unidades Constructivas');

			this.AdicionarBoton('../../../lib/imagenes/menu-show.gif','',btn_tramo_subactividad,true,'tramo_subactividad','Relaci�n Tramos Subactividad');

			this.iniciaFormulario();
			iniciarEventosFormularios();

			layout_tramo.getLayout().addListener('layout',this.onResize);//aregla la forma en que se ve el grid dentro del layout
			ContenedorPrincipal.getContenedorPrincipal().addListener('layout',this.onResizePrimario);
}