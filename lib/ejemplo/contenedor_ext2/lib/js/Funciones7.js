/*
**********************************************************
Nombre de la clase:	    Pagina
Prop�sito:				clse principal donde se definen todas las funcionalidas de una pagina
para ENDE
Valores de Retorno:		 invoca a funciones para el manejo de datos (insert, update y delete)
Fecha de Creaci�n:		02 - 05 - 07
Versi�n:				1.0.0
Autor:					Rensi Arteaga Copari
**********************************************************
*/
function Pagina(paramConfig,parametrosDatos,ds,ContenedorLayout,idContenedor){
	//********** Definicion de variables **********//
	var grid;
	var configuracion=new Array;
	var Grupos=new Array();
	//configuracion por defecto
	configuracion={
		TamanoPagina:12, //para definir el tama�o de la pagina
		TiempoEspera:120000,//tiempo de espera para dar falllo
		CantFiltros:1,//indica la cantidad de filtros que se tendran
		FiltroEstructura:false,//indica si se tiene el los 5 combos que la filtra la estructura programatica
		FiltroAvanzado:false,
		grid_html:'grid-'+idContenedor
	};
	//tama�o de pagina
	if(paramConfig.TamanoPagina){configuracion.TamanoPagina=paramConfig.TamanoPagina}
	//tiempo de espera
	if(paramConfig.TiempoEspera){configuracion.TiempoEspera=paramConfig.TiempoEspera}
	//cantidad de filtros
	if(paramConfig.CantFiltros){configuracion.CantFiltros=paramConfig.CantFiltros}
	//estructura programatica
	if(paramConfig.FiltroEstructura){configuracion.FiltroEstructura=paramConfig.FiltroEstructura}
	//filtro avanzado
	if(paramConfig.FiltroAvanzado){configuracion.FiltroAvanzado=paramConfig.FiltroAvanzado}
	//div para el grid
	if(paramConfig.grid_html){configuracion.grid_html=paramConfig.grid_html}

	var parametros_barra_menu;//parametros para la configuracion de la barra de menu
	var paging;// barra de paginacion
	var dlgInfo;//dialogo para el formulario
	var dlgLoading;
	var GuardarOtro=false;
	var Formulario; // para el manejo del formulario
	var GuardarOtro=false;
	var vectorDatos=new Array;
	var cantidadAtributosEntrada=parametrosDatos.length;
	var cantidadAtributos=parametrosDatos.length;

	/////////////////////
	// SELECTION MODEL //
	/////////////////////

	var sm = new Ext.grid.RowSelectionModel({singleSelect:false});

	//////////////////////////////
	//CREACION DELOS COMPONENTES//
	//////////////////////////////

	//-------- varibles para el grid --------//

	Ed = Ext.grid.GridEditor;
	var Componentes=new Array();
	var Componentes_grid=new Array();
	var parametrosCM=new Array();

	for(var i=0;i<cantidadAtributos;i++){
		var vA=parametrosDatos[i].validacion;
		if(parametrosDatos[i].tipo=='LovTriggerField'||parametrosDatos[i].tipo=='LovItemsAlm'){
			//para el que va en el formulario*/
			//vA.contenedor_id = Componentes[vA.indice_id];//formulario
			vA.origen='formulario';
			Componentes[i]=new Ext.form[parametrosDatos[i].tipo](vA);


			//si el datos  es editable para el grid se crea su componente
			if(vA.grid_editable!= undefined&&vA.grid_editable!=null&&vA.grid_editable!=false){
				//para el que va en el grid
				//vA.contenedor_id = parametrosDatos[vA.indice_id].validacion.name;//grid
				vA.sm=sm;//para el grid le pasamos grid el selection model
				vA.origen='grid';
				Componentes_grid[i] = new Ext.form[parametrosDatos[i].tipo](vA)
			}
		}
		else{
			if(parametrosDatos[i].form!=false){
				Componentes[i]=new Ext.form[parametrosDatos[i].tipo](vA)
			}
			//si el dato  es editable para el grid se crea su componente
			if(vA.grid_editable===true&&vA.grid_visible===true){ //este componentes se muestra en el grid
				Componentes_grid[i] = new Ext.form[parametrosDatos[i].tipo](vA)
			}
		}
		if(parametrosDatos[i].tipo=='ComboBox'){
			vA.store.addListener('loadexception',ContenedorPrincipal.conexionFailure)
		}

		var elemento;
		if(parametrosDatos[i].tipo==='epField'){
			parametrosDatos[i].lf=!parametrosDatos[i].lf?'Financiador':parametrosDatos[i].lf;
			parametrosDatos[i].lr=!parametrosDatos[i].lr?'Regional':parametrosDatos[i].lr;
			parametrosDatos[i].lp=!parametrosDatos[i].lp?'Programa':parametrosDatos[i].lp;
			parametrosDatos[i].lpr=!parametrosDatos[i].lpr?'Sub Programa':parametrosDatos[i].lpr;
			parametrosDatos[i].la=!parametrosDatos[i].la?'Actividad':parametrosDatos[i].la;
			parametrosDatos[i].nf=!parametrosDatos[i].nf?'nombre_financiador':parametrosDatos[i].nf;
			parametrosDatos[i].nr=!parametrosDatos[i].nr?'nombre_regional':parametrosDatos[i].nr;
			parametrosDatos[i].np=!parametrosDatos[i].np?'nombre_programa':parametrosDatos[i].np;
			parametrosDatos[i].npr=!parametrosDatos[i].npr?'nombre_proyecto':parametrosDatos[i].npr;
			parametrosDatos[i].na=!parametrosDatos[i].na?'nombre_actividad':parametrosDatos[i].na;
			parametrosDatos[i].cf=!parametrosDatos[i].cf?'codigo_financiador':parametrosDatos[i].cf;
			parametrosDatos[i].cr=!parametrosDatos[i].cr?'codigo_regional':parametrosDatos[i].cr;
			parametrosDatos[i].cp=!parametrosDatos[i].cp?'codigo_programa':parametrosDatos[i].cp;
			parametrosDatos[i].cpr=!parametrosDatos[i].cpr?'codigo_programa':parametrosDatos[i].cpr;
			parametrosDatos[i].ca=!parametrosDatos[i].ca?'codigo_actividad':parametrosDatos[i].ca;
			parametrosDatos[i].f=!parametrosDatos[i].f?'id_financiador':parametrosDatos[i].f;
			parametrosDatos[i].r=!parametrosDatos[i].r?'id_regional':parametrosDatos[i].r;
			parametrosDatos[i].p=!parametrosDatos[i].p?'id_programa':parametrosDatos[i].p;
			parametrosDatos[i].pr=!parametrosDatos[i].pr?'id_proyecto':parametrosDatos[i].pr;
			parametrosDatos[i].a=!parametrosDatos[i].a?'id_actividad':parametrosDatos[i].a;

		}
		if(vA.grid_visible==true){//SE MUESTRA EN EL GRID?
			var  header=vA.name;
			if(vA.fieldLabel!== undefined){
				header=vA.fieldLabel
			}
			var align='left';
			if(vA.align!=undefined){align=vA.align}

			if(parametrosDatos[i].tipo!=='epField'){
				if(vA.grid_editable===true){
					elemento={grid_indice:vA.grid_indice,ind2:i,header:header,width:vA.width_grid,dataIndex:vA.name,renderer:vA.renderer,align:align,desc:vA.desc,editor: new Ed(Componentes_grid[i])}
				}
				else{
					elemento={grid_indice:vA.grid_indice,ind2:i,header:header,width:vA.width_grid,dataIndex:vA.name,renderer:vA.renderer,align:align,desc:vA.desc}
				}

				parametrosCM.push(elemento)
			}
			else{
				elemento={grid_indice:vA.grid_indice,ind2:i,ind3:1,header:parametrosDatos[i].lf,width:200,dataIndex:parametrosDatos[i].nf};
				parametrosCM.push(elemento);
				elemento={grid_indice:vA.grid_indice,ind2:i,ind3:2,header:parametrosDatos[i].lr,width:100,dataIndex:parametrosDatos[i].nr};
				parametrosCM.push(elemento);
				elemento={grid_indice:vA.grid_indice,ind2:i,ind3:3,header:parametrosDatos[i].lp,width:100,dataIndex:parametrosDatos[i].np};
				parametrosCM.push(elemento);
				elemento={grid_indice:vA.grid_indice,ind2:i,ind3:4,header:parametrosDatos[i].lpr,width:250,dataIndex:parametrosDatos[i].npr};
				parametrosCM.push(elemento);
				elemento={grid_indice:vA.grid_indice,ind2:i,ind3:5,header:parametrosDatos[i].la,width:100,dataIndex:parametrosDatos[i].na};
				parametrosCM.push(elemento)
			}
		}
	}
	//COLUMN MODEL
	//ordenamos la posicion de las columnas en el grid
	function ordenacionAsc(x,y){
		if(x.grid_indice!=undefined&&y.grid_indice!=undefined){
			if(x.grid_indice<y.grid_indice){return-1}
			if( x.grid_indice>y.grid_indice){return 1}
		}
		if((x.grid_indice==undefined&&y.grid_indice==undefined)||x.grid_indice===y.grid_indice){
			if(x.ind2<y.ind2){return-1}
			if(x.ind2>y.ind2){return 1}
			if(x.ind2==y.ind2&&x.ind2!=undefined){
				if(x.ind3<y.ind3){return-1}
				if(x.ind3>y.ind3){return 1}
				return 0
			}
			return 0
		}
		if(x.grid_indice==undefined&&y.grid_indice!=undefined){return 1}
		if(x.grid_indice!=undefined&&y.grid_indice==undefined){return -1}
		return 0
	}
	parametrosCM.sort(ordenacionAsc);
	/*fin ordenacion  grid*/
	var cm=new Ext.grid.DefaultColumnModel(parametrosCM);
	cm.defaultSortable=true;
	// se establece por defecto que las columnas sean ordenables
	this.Init=function(){
		Ext.QuickTips.init();
		Ext.form.Field.prototype.msgTarget='qtip'; //muestra mensajes de error en el formulario
		// para capturar un error
		ds.addListener('loadexception',this.conexionFailure); //se recibe un error
		sm.addListener('rowselect',this.EnableSelect);
		// Se crea un grid editable
		this.grid=new Ext.grid.EditorGrid(configuracion.grid_html,{
			ds:ds,
			cm:cm,
			selModel:sm,
			//autoSizeColumns: true,
			autoSizeHeaders: true,
			loadMask:true,
			enableColLock:true
		});
		grid=this.grid;
		this.grid.render();
		/*se crea la barra de paginacion y la coloca al pie*/
		var gridFoot=this.grid.getView().getFooterPanel(true);
		paging=new Ext.PagingToolbar(gridFoot,ds,{pageSize:configuracion.TamanoPagina,displayInfo:true,displayMsg:'Registros {0} - {1} de {2}',emptyMsg:"No hay registros para mostrar"});
		//manejo de eventos de layoput
		//aregla la forma en que se ve el grid dentro del layout
		this.onResize=function(){
			var gridView=grid.getView();
			gridView.layout()
		};

		this.onResizePrimario=function(){
			ContenedorLayout.getLayout().layout()
		};

		/*iniciamos el filtro */
		InitFiltro(paging,configuracion.CantFiltros);
		/////////////////////////////////////////////////////////////
		//              INICIO DE LA ESTRUCTURA PROGRAMATICA       //
		////////////////////////////////////////////////////////////

		if(configuracion.FiltroEstructura==true){
			/// HEREDAMOS DE LA CLASE FiltroEstructuraProgramatica
			this.filtro_ep = FiltroEstructuraProgramatica;
			this.filtro_ep("filtro-"+idContenedor);
			this.Init_FiltroEstructura(ds,conexionFailure,this.btnActualizar)
		}
	};
	
	this.reload=function(params){	
		alert("Necesita sobrecargar la funcion reload reload")	
	}

	//////////////////////////////////////////////////////////////
	//---------      FUNCIONES FORMULARIO            -----------//
	//////////////////////////////////////////////////////////////
	this.mostrarFormulario=function(){
		dlgInfo.show();
		Ext.form.Field.prototype.msgTarget = 'under'; /*muestra mensajes de error*/
		limpiarInvalidos()
	};mostrarFormulario=this.mostrarFormulario;

	this.ocultarFormulario=function(){
		dlgInfo.hide();
		Ext.form.Field.prototype.msgTarget='qtip'
	};var ocultarFormulario = this.ocultarFormulario;

	this.iniciaFormulario=function(){
		marcas_html="<div class='x-dlg-bd'><div id='form-ct2_"+Funcion_Formulario.html_apply+"'></div></div>";
		//var div_dlgInfo=Ext.DomHelper.append('layout-'+idContenedor,{tag:'div',id:Funcion_Formulario.html_apply,html:marcas_html});
		var div_dlgInfo=Ext.DomHelper.append(document.body,{tag:'div',id:Funcion_Formulario.html_apply,html:marcas_html});
		Formulario = new Ext.form.Form({
			id: 'formulario_'+Funcion_Formulario.html_apply,
			name:'formulario_'+Funcion_Formulario.html_apply,
			labelWidth: Funcion_Formulario.labelWidth, // label settings here cascade unless overridden
			method:Funcion_Formulario.method,
			method:'post',
			//waitMsgTarget: 'box-bd', //DEFINE EL TIPO DE LOADING QUE SE VERA AL CARGAR
			url:Funcion_Save.url,
			fileUpload:Funcion_Formulario.upload,
			success:Funcion_Save.success,
			failure:Funcion_Save.failure
		});
		dlgInfo=new Ext.BasicDialog(div_dlgInfo,{
			title:Funcion_Formulario.titulo,
			modal:Funcion_Formulario.modal,
			autoTabs:Funcion_Formulario.autoTabs,
			width:Funcion_Formulario.width,
			height:Funcion_Formulario.height,
			shadow:Funcion_Formulario.shadow,
			minWidth:Funcion_Formulario.minWidth,
			minHeight:Funcion_Formulario.minHeight,
			fixedcenter:Funcion_Formulario.fixedcenter,
			constraintoviewport:Funcion_Formulario.constraintoviewport,
			draggable:Funcion_Formulario.draggable,
			proxyDrag:Funcion_Formulario.proxyDrag,
			closable:Funcion_Formulario.closable
		});

		dlgInfo.addKeyListener(27, Funcion_Formulario.cancelar);//tecla escape
		dlgInfo.addButton('Guardar',Funcion_Formulario.guardar);
		dlgInfo.addButton('Guardar + Nuevo',Funcion_Formulario.guardarOtro).hide();
		dlgInfo.addButton('Declinar',Funcion_Formulario.cancelar);
		//declaracion de los parametros y varibles del formulario
		//se arma la estructura del formulario

		for(var i=0;i<Funcion_Formulario.columnas.length;i++){
			Formulario.column({width: Funcion_Formulario.columnas[i],style:'margin-left:10px',clear:true});
			for(var j = 0 ; j < Funcion_Formulario.grupos.length;j++){
				if(Funcion_Formulario.grupos[j].columna == i){
					Grupos[j] = Formulario.fieldset({legend:Funcion_Formulario.grupos[j].tituloGrupo});
					for(var k=0;k<cantidadAtributosEntrada;k ++){
						var id_grupo=0;
						if(parametrosDatos[k].id_grupo != undefined && parametrosDatos[k].id_grupo != null){
							id_grupo = parametrosDatos[k].id_grupo
						}
						if(id_grupo==j){
							if(Componentes[k]){
								Formulario.add(Componentes[k])

								vectorDatos[k]= Componentes[k];
								vectorDatos[k].on('valid',function(){dlgInfo.buttons[0].enable()})
							}

						}
					}
					Formulario.end()// close the grupo
				}
			}
			Formulario.end()// close the column
		}
		Formulario.render("form-ct2_"+Funcion_Formulario.html_apply)//dibuja el formulario

	};var iniciaFormulario=this.iniciaFormulario;


	this.getFormulario=function(){
		return Formulario
	};var getFormulario=this.getFormulario;

	this.renderFormulario=function(){
		Formulario.render("form-ct2_"+Funcion_Formulario.html_apply)/*dibuja el formulario*/
	};var renderFormulario=this.renderFormulario;


	///validacion de campos //
	this.ValidarCampos=function(){
		return Formulario.isValid()
	};var ValidarCampos=this.ValidarCampos;

	//limpiar invalidos
	this.limpiarInvalidos=function(){
		return Formulario.clearInvalid()
	};var limpiarInvalidos=this.limpiarInvalidos;
	///////////////////////////
	//FUNCION ENABLE SELECT  //
	//Funcion que se llama   //
	//al seleccionar una fila//
	///////////////////////////

	this.EnableSelect=function(selModel,row,selected){
		var record=selModel.getSelected().data; //es el primer registro selecionado
		if(selected&&record!=-1){
			for(var i=0;i<cantidadAtributos;i++){

				if(parametrosDatos[i].form!=false){
					if(parametrosDatos[i].validacion.inputType!='file'&&parametrosDatos[i].tipo!='ComboBox'&&parametrosDatos[i].tipo!='epField'&&parametrosDatos[i].tipo!='LovItemsAlm'){
						if(record[parametrosDatos[i].validacion.name]===undefined){
							vectorDatos[i].setValue('')
						}
						else{
							vectorDatos[i].setValue(record[parametrosDatos[i].validacion.name])
						}
					}
					else{
						//para combos que se llenan remotamente
						//el store principal de proveer el id y la descripcion
						if(parametrosDatos[i].tipo=='ComboBox'){
							if(vectorDatos[i].mode == 'remote'){
								if(vectorDatos[i].store.getById(record[parametrosDatos[i].validacion.name])===undefined){
									var  params = new Array();
									params[vectorDatos[i].valueField] = record[parametrosDatos[i].validacion.name];
									params[vectorDatos[i].displayField] = record[parametrosDatos[i].validacion.desc];
									var aux = new Ext.data.Record(params,record[parametrosDatos[i].validacion.name]);
									vectorDatos[i].store.add(aux)
								}
								vectorDatos[i].setValue(record[parametrosDatos[i].validacion.name])
							}
							else{
								vectorDatos[i].setValue(record[parametrosDatos[i].validacion.name])
							}
						}
						if(parametrosDatos[i].tipo=='LovItemsAlm'){
							var  p = new Array();
							p={id:record[parametrosDatos[i].validacion.name],desc:record[parametrosDatos[i].validacion.desc]};
							vectorDatos[i].setValue(p)
						}
						if(parametrosDatos[i].tipo=='epField'){
							var p = new Array();
							p={
								id_financiador:record[parametrosDatos[i].f],
								codigo_financiador:record[parametrosDatos[i].cf],
								nombre_financiador:record[parametrosDatos[i].nf],
								id_regional:record[parametrosDatos[i].r],
								codigo_regional:record[parametrosDatos[i].cr],
								nombre_regional:record[parametrosDatos[i].nr],
								id_programa:record[parametrosDatos[i].p],
								codigo_programa:record[parametrosDatos[i].cp],
								nombre_programa:record[parametrosDatos[i].np],
								id_proyecto:record[parametrosDatos[i].pr],
								codigo_proyecto:record[parametrosDatos[i].cpr],
								nombre_proyecto:record[parametrosDatos[i].npr],
								id_actividad:record[parametrosDatos[i].a],
								codigo_actividad:record[parametrosDatos[i].ca],
								nombre_actividad:record[parametrosDatos[i].na]

							};
							vectorDatos[i].setValue(p)
						}

					}
				}
			}
		}
	};var EnableSelect=this.EnableSelect;
	/////////////////-/////
	// FUNCION ACTUALIZAR//
	///////////////////////
	this.btnActualizar=function(){
		var filas = ds.getModifiedRecords();//recupera la catidad de modificaciones hechas
		var cont = filas.length;
		if(cont>0){//verifica si existen modificaciones hechas en los registros del grid
			if(confirm("Tiene registros pendientes sin guardar que se perderan, desea continuar?")){
				ds.load(ds.lastOptions);//actualizar
				ds.rejectChanges()//vacia el vector de records modificados
			}
		}
		else{
			ds.load(ds.lastOptions);//actualizar
			ds.rejectChanges()//vacia el vector de records modificados
		}
	};var btnActualizar=this.btnActualizar;
	////////////////////////////////////////////////////////////////////////////
	//----------------      FUNCION NUEVO               ----------------------//
	////////////////////////////////////////////////////////////////////////////
	//Se llama cuando se elige la opcion "nuevo" en la barra de menu
	//this.btnNew = function()
	btnNew=function(){
		//dlgInfo.buttons[0].disable();
		dlgInfo.buttons[1].show();
		sm.clearSelections();//limpiar selecion

		for(var i=0;i<cantidadAtributos;i++){
			if(parametrosDatos[i].form!=false){
				var value="";
				if(parametrosDatos[i].defecto!=undefined){value=parametrosDatos[i].defecto}
				vectorDatos[i].setValue(value)
			}
		}
		var filas=ds.getModifiedRecords();//recupera la catidad de modificaciones hechas
		var cont=filas.length;
		if(cont>0){//verifica si existen modificaciones hechas en los registros del grid
			if(confirm("Tiene registros pendientes sin guardar que se perderan, desea continuar?")){
				Funcion_Formulario.mostrar()
			}
		}
		else{
			Funcion_Formulario.mostrar()
		}
	};this.btnNew=btnNew;

	///////////////////////////////////////////////////////////////-////////////
	//----------------      FUNCION EDITAR              ----------------------//
	////////////////////////////////////////////////////////////////////////////

	this.btnEdit=function(){
		dlgInfo.buttons[1].hide(); //apaga el boton de guardar nuevo
		var filas = ds.getModifiedRecords();
		var cont = filas.length;
		var NumSelect = sm.getCount();//recupera la cantidad de filas selecionadas
		sm.clearSelections();//limpiar las selecciones realizadas
		if(NumSelect!=0){//Verifica si hay filas seleccionadas
			if(cont>0){//Para verificar si existen modificaciones hechas
				//if(confirm('Tiene registros pendientes sin guardar que se perderan, desea continuar?'))
				var confirmar=function(btn){if(btn=='yes'){	Funcion_Formulario.mostrar()}};
				Ext.MessageBox.confirm('Confirmar', 'Tiene registros pendientes sin guardar que se perderan, desea continuar?',confirmar)
			}
			else{
				Funcion_Formulario.mostrar()
			}
		}
		else{
			Ext.MessageBox.alert('Estado', 'Seleccione un item primero.')
		}
		dlgInfo.buttons[0].disable(); //apaga el boton de guardar
	};var btnEdit=this.btnEdit;

	///////////////////////////////////////////////////////////////-////////////
	//----------------      FUNCION PARA ELIMINAR       ----------------------//
	//   Funcion que se llama al para iniciar el formulario de edicion        //
	////////////////////////////////////////////////////////////////////////////
	//confirmacion para eliminar
	this.btnEliminar=function(pextra){
		var NumSelect = sm.getCount(); //recupera la cantidad de filas selecionadas
		if(NumSelect!=0){
			var filas=ds.getModifiedRecords();
			var cont=filas.length;
			var sw=false;
			var confirmar;
			if(cont>0){//Para verificar si existen modificaciones hechas
				if(confirm('Tiene registros pendientes sin guardar que se perderan, desea continuar?')){
					sw=true
				}
			}
			else{
				sw=true
			}
			if(sw){
				if(confirm(Funcion_btnEliminar.mensaje)){
					var SelectionsRecord=sm.getSelections(); //es el primer registro selecionado
					var postData="cantidad_ids="+NumSelect;
					parametrosFiltro="";
					//coloca los parametros del filtro
					for(var i=0;i<configuracion.CantFiltros;i++){
						parametrosFiltro=parametrosFiltro+"&filterCol_"+i+"="+ds.lastOptions.params["filterCol_"+i];
						parametrosFiltro=parametrosFiltro+"&filterValue_"+i+"="+ds.lastOptions.params["filterValue_"+i]
					}
					if(pextra){
						postData=postData+encodeURIComponent(pextra)
					}
					postData=postData+parametrosFiltro+Funcion_btnEliminar.parametros;
					
					//coloca parametros ds
					for(j=0;j<Funcion_ConfirmSave.parametros_ds.length;j++){
						var aux=Funcion_ConfirmSave.parametros_ds[j];
						postData=postData+"&"+aux+"="+ds.lastOptions.params[aux];
					}
					for(var i=0;i<NumSelect;i++){
						//en la pos 0 del vector de atributo siempre estara la llave primaria
						idSelect = SelectionsRecord[i].data[parametrosDatos[0].validacion.name];
						var postData= postData+"&"+parametrosDatos[0].save_as+"_"+i+"="+idSelect
					}
					/*-----loading----*/
					Ext.MessageBox.show({
						title: 'Espere Por Favor...',
						msg:"<div><img src='../../../lib/ext-yui/resources/images/default/grid/loading.gif'/> Guardando...</div>",
						width:150,
						height:200,
						closable:false
					});
					Ext.Ajax.request({
						url:Funcion_btnEliminar.url,
						params: postData,
						method:'POST',
						success:  Funcion_btnEliminar.success,
						failure:  Funcion_btnEliminar.failure,
						timeout:  configuracion.TiempoEspera//TIEMPO DE ESPERA PARA DAR FALLO
					});
				}
			}
		}
		else{
			Ext.MessageBox.alert('Estado', 'Seleccione un item primero.')
		}
	};var btnEliminar=this.btnEliminar;

	//Se llama cuando los datos de eliminacion se han enviado satisfactoriamente
	this.eliminarSucess=function(resp){
		Ext.MessageBox.hide();//ocultamos el loading
		if(resp.responseXML!=undefined&&resp.responseXML.documentElement!=undefined){
			var root = resp.responseXML.documentElement;//recuperamos el resultado en formato XML
			var tc = root.getElementsByTagName('TotalCount')[0].firstChild.nodeValue;
			Ext.mensajes.msg('Eliminaci�n Exitosa', 'Se tienen "{0}" registros.', tc);
			var total_registros=new Number(tc);
			var total_paginas=Math.ceil(total_registros / configuracion.TamanoPagina);
			var paginaData=paging.getPageData();//los datos de la pagina
			var pagina=paginaData.activePage; //recupera el numero de pagina
			var puntero=0;
			if(pagina>total_paginas){
				pagina=pagina-1
			}
			if(pagina>1){puntero=(pagina-1)*configuracion.TamanoPagina}
			//para hacer que orden se mantenga
			ds.lastOptions.params.start=puntero;
			ds.load(ds.lastOptions);
			ds.rejectChanges();////vacia el vector de records modificados
			//sm.clearSelections()

			// ----------- registro  de eventos ----------//
			origen=undefined;
			if(root.getElementsByTagName('origen')[0]!= undefined){
				origen=root.getElementsByTagName('origen')[0].firstChild.nodeValue
			}
			parametros_mensaje={
				origen:origen,
				mensaje:root.getElementsByTagName('mensaje')[0].firstChild.nodeValue,
				tiempo_resp: root.getElementsByTagName('tiempo_resp')[0].firstChild.nodeValue,
				TotalCount:root.getElementsByTagName('TotalCount')[0].firstChild.nodeValue
			};
			ContenedorPrincipal.setEventoLog(parametros_mensaje)
		}
		else{
			conexionFailure(resp)
		}
	};var eliminarSucess=this.eliminarSucess;
	///////////////////////////////////////////////////////
	//FUNCION PARA GRAVAR LOS DATOS MODIFICADOS DEL GRID//
	/////////////////////////////////////////////////////
	this.ConfirmSave=function(){
		var filas=ds.getModifiedRecords();
		var cont=filas.length;
		if(cont>0){//cant de regis modif > 0?
			if(confirm("�Est� seguro de guardar los cambios?")){
				//postData, para el envio de datos a la capa de control
				var postData="cantidad_ids="+cont;
				var i=0;
				for(i=0;i<cont;i++){
					var record=filas[i].data;
					for(var j=0;j<cantidadAtributos;j++){
						if(parametrosDatos[j].tipo!='DateField'&&parametrosDatos[i].form!=false){
							if(parametrosDatos[j].tipo=='epField'){
								postData=postData+"&txt_id_financiador_"+i+"="+record['id_financiador']+"&txt_id_regional_"+i+"="+record['id_regional']+"&txt_id_programa_"+i+"="+record['id_programa']+"&txt_id_proyecto_"+i+"="+record['id_proyecto']+"&txt_id_actividad_"+i+"="+record['id_actividad']
							}
							else{
								postData=postData+"&"+parametrosDatos[j].save_as+"_"+i+"="+record[parametrosDatos[j].validacion.name]
							}
						}
						else{
							if(record[parametrosDatos[j].validacion.name]!=""){
								postData=postData+"&"+parametrosDatos[j].save_as+"_"+i+"="+record[parametrosDatos[j].validacion.name].dateFormat(parametrosDatos[j].dateFormat)
							}
							else{
								postData=postData+"&"+parametrosDatos[j].save_as+"_"+i+"="+record[parametrosDatos[j].validacion.name]
							}
						}
					}
				}

				parametrosFiltro="";
				for(var i=0;i<configuracion.CantFiltros;i++){
					parametrosFiltro=parametrosFiltro+"&filterCol_"+i+"="+ds.lastOptions.params["filterCol_"+i];
					parametrosFiltro=parametrosFiltro+"&filterValue_"+i+"="+ds.lastOptions.params["filterValue_"+i]
				}
				postData=postData+parametrosFiltro+Funcion_ConfirmSave.parametros; //parametros extra
				for(j=0;j<Funcion_ConfirmSave.parametros_ds.length;j++){
					var aux=Funcion_ConfirmSave.parametros_ds[j];
					postData=postData+"&"+aux+"="+ds.lastOptions.params[aux]
				}//Envio de los datos a la capa de control para su posterior almacenamiento
				Ext.Ajax.request({
					url:Funcion_ConfirmSave.url,
					params:postData,
					method:'POST',
					success:Funcion_ConfirmSave.success,
					failure:Funcion_ConfirmSave.failure,
					argument:Funcion_ConfirmSave.argument,
					timeout:Funcion_ConfirmSave.timeout//TIEMPO DE ESPERA PARA DAR FALLO
				});
			}
		}
	};var ConfirmSave=this.ConfirmSave;

	//////////////////////////////////////
	// SAVE								//
	//GUARDA EL LOS DATOS DEL FORMULARIO//
	/////////////////////////////////////
	this.Save=function(){
		if(Funcion_Save.validar()){
			var postData="cantidad_ids=1";
			parametrosFiltro="";
			for(var i = 0 ;i < configuracion.CantFiltros;i ++){
				parametrosFiltro = parametrosFiltro + "&filterCol_"+i+"="+ds.lastOptions.params["filterCol_"+i];
				parametrosFiltro = parametrosFiltro + "&filterValue_"+i+"="+ds.lastOptions.params["filterValue_"+i]
			}
			postData = postData +parametrosFiltro+ Funcion_Save.parametros;
			var cantidadAtributos = parametrosDatos.length;
			var postCadena = Formulario.getValues;
			for(var i = 0 ; i <  cantidadAtributos; i ++){
				if(parametrosDatos[i].save_as && parametrosDatos[i].form!=false){
					if(parametrosDatos[i].tipo=='DateField'&&parametrosDatos[i].form!=false){
						hora=vectorDatos[i].getValue();
						if(hora != ""){//preguntamos si existe el objeto de fecha
							postData= postData+"&"+parametrosDatos[i].save_as+"_0="+ hora.dateFormat(parametrosDatos[i].dateFormat)
						}
						else{
							postData= postData+"&"+parametrosDatos[i].save_as+"_0="+hora
						}
					}
					else{
						if(parametrosDatos[i].tipo=='epField'){
							var p=vectorDatos[i].getValue();
							postData=postData+"&txt_id_financiador_0="+p['id_financiador']+"&txt_id_regional_0="+p['id_regional']+"&txt_id_programa_0="+p['id_programa']+"&txt_id_proyecto_0="+p['id_proyecto']+"&txt_id_actividad_0="+p['id_actividad']
						}
						else{
							postData= postData+"&"+parametrosDatos[i].save_as+"_0="+vectorDatos[i].getValue()
						}
					}
				}
			}
			for(j=0;j<Funcion_ConfirmSave.parametros_ds.length;j++){
				var aux = Funcion_ConfirmSave.parametros_ds[j];
				postData = postData + "&"+ aux +"="+ds.lastOptions.params[aux]
			}

			//loading
			Ext.MessageBox.show({
				title: 'Espere Por Favor...',
				msg:"<div><img src='../../../lib/ext-yui/resources/images/default/grid/loading.gif'/> Guardando...</div>",
				width:150,
				height:200,
				closable:false
			});


			if(Formulario.fileUpload==true){

				Ext.Ajax.request({
					form:'formulario_'+Funcion_Formulario.html_apply,
					url:Formulario.url,
					//params: postData,
					//isUpload:Formulario.fileUpload,
					isUpload:false,
					method:Formulario.method,
					success:Formulario.success,
					argument:Funcion_Save.argument,
					failure:Formulario.failure,
					timeout:Funcion_Save.timeout//TIEMPO DE ESPERA PARA DAR FALLO
				});

			}
			else{
				Ext.Ajax.request({					
					url:Formulario.url,
					params: postData,
					isUpload:Formulario.fileUpload,
					method:Formulario.method,
					success:Formulario.success,
					argument:Funcion_Save.argument,
					failure:Formulario.failure,
					timeout:Funcion_Save.timeout//TIEMPO DE ESPERA PARA DAR FALLO
				});
			}
		}
	};var Save = this.Save;

	//Funcion que se llama cuando se elige la opcion "guargar + nuevo" el el formulario
	this.SaveAndOther=function(){
		GuardarOtro = true;
		Funcion_Formulario.guardar()
	};var SaveAndOther=this.SaveAndOther;
	//Funcion que se invoca cuando el envio de datos es satisfactorio

	/////////////////////////////////////////////////////////////////////////////
	//---------------    SAVE	SUCCESS    - -------------------------------  //
	//   GUARDA  LOS DATOS DEL FORMULARIO                                    //
	//////////////////////////////////////////////////////////////////////////


	//this.saveSuccess  = function(resp)
	this.saveSuccess=function(resp){


		Ext.MessageBox.hide();
		//alert()
		if(resp.responseXML != undefined&&resp.responseXML.documentElement!= undefined){
			var root = resp.responseXML.documentElement;
			if(!resp.argument.multi){
				Funcion_Formulario.ocultar();
				if(GuardarOtro){
					parametros_barra_menu.nuevo.sobrecarga();
					GuardarOtro=false
				}
			}
			var tc=root.getElementsByTagName('TotalCount')[0].firstChild.nodeValue;
			Ext.mensajes.msg('Grabaci�n exitosa', 'Se tienen "{0}" registros.',tc);
			var total_registros= new Number(tc);
			var total_paginas=Math.ceil(total_registros/configuracion.TamanoPagina);
			var paginaData=paging.getPageData();//los datos de la pagina
			var pagina=paginaData.activePage; //recupera el numero de pagina
			var puntero=0;
			if(pagina>total_paginas){
				pagina=pagina-1
			}
			if(pagina>1){puntero=(pagina-1)*configuracion.TamanoPagina}
			ds.lastOptions.params.start=puntero;

			ds.load(ds.lastOptions);
			////vacia el vector de records modificados
			ds.rejectChanges();
			sm.clearSelections();
			// ----------- registro  de eventos ----------//
			origen=undefined;
			if(root.getElementsByTagName('origen')[0]!= undefined){
				origen=root.getElementsByTagName('origen')[0].firstChild.nodeValue
			}
			parametros_mensaje={
				origen:origen,
				mensaje:root.getElementsByTagName('mensaje')[0].firstChild.nodeValue,
				tiempo_resp: root.getElementsByTagName('tiempo_resp')[0].firstChild.nodeValue,
				TotalCount:root.getElementsByTagName('TotalCount')[0].firstChild.nodeValue
			};
			ContenedorPrincipal.setEventoLog(parametros_mensaje);
			// ----------- fin  registro  de eventos ----------//
		}
		else{
			conexionFailure (resp)
		}
	};saveSuccess=this.saveSuccess;

	////////////////////////////////////////////////////////////////////////////////////////////
	//        ----------------      FUNCION CONEXIONFAILURE            ---------------------- //
	////////////////////////////////////////////////////////////////////////////////////////////

	function conexionFailure(resp1,resp2,resp3,resp4){		
		ContenedorPrincipal.conexionFailure(resp1,resp2,resp3,resp4)
	};this.conexionFailure=conexionFailure;

	//////////////////////////////////////////////////////////////////////////
	//---------------      FUNCION INIT BARRA MENU--------------------------//
	//////////////////////////////////////////////////////////////////////////

	this.InitBarraMenu=function(param){
		parametros_barra_menu=param;
		this.barra=Boton;
		//grid.getView().getHeaderPanel(true)
		var g_head = this.grid.getView().getHeaderPanel(true)
		this.barra(g_head,idContenedor);
		//Barra de menus
		if(param.guardar){
			if(!param.guardar.sobrecarga){
				param.guardar.sobrecarga=this.ConfirmSave
			}
			this.AdicionarBoton("../../../lib/imagenes/save.jpg",'<b>Guardar<b>',param.guardar.sobrecarga,param.guardar.separador,'guardar','')
		}
		if(param.nuevo){
			//alert("en la barra  de menu" +this.btnNew)
			if(!param.nuevo.sobrecarga){
				param.nuevo.sobrecarga=this.btnNew
			}
			this.AdicionarBoton("../../../lib/imagenes/nuevo.png",'<b>Nuevo<b>',param.nuevo.sobrecarga,param.nuevo.separador,'nuevo','')
		}
		if(param.editar){
			if(!param.editar.sobrecarga){
				param.editar.sobrecarga = this.btnEdit
			}
			this.AdicionarBoton("../../../lib/imagenes/editar.png",'<b>Editar<b>',param.editar.sobrecarga,param.editar.separador,'editar','')
		}
		if(param.eliminar){
			if(!param.eliminar.sobrecarga){
				param.eliminar.sobrecarga = this.btnEliminar
			}
			this.AdicionarBoton("../../../lib/imagenes/eliminar.png",'<b>Eliminar<b>',param.eliminar.sobrecarga,param.eliminar.separador,'eliminar','')
		}
		if(param.actualizar){
			if(!param.actualizar.sobrecarga){
				param.actualizar.sobrecarga=this.btnActualizar
			}
			this.AdicionarBoton("../../../lib/imagenes/actualizar.jpg",'<b>Actualizar<b>',param.actualizar.sobrecarga,param.actualizar.separador,'actualizar','')
		}
	};

	//FUNCION INIT FILTRO
	this.InitFiltro=function(Barra,Cantidad){
		var Menus = new Array();
		var Combos = new Array();
		var MenusItems = new  Array();
		for(var i=0;i<Cantidad;i++){ //para inicializar filtro por filtro
			Barra.addSeparator();
			//para  colocar la opcion de apagar el filtro avanzado
			if(configuracion.FiltroAvanzado==true){
				MenusItems["quickMenuItems_"+i]=new Array();
				MenusItems["quickMenuItems_"+i].push(new Ext.menu.CheckItem({ value:'filterAvanzado',text:'Filtro Avanzado', checked:false }));
				MenusItems["quickMenuItems_"+i].push('-');
				MenusItems["quickMenuItems_"+i].push('<b class="menu-title">Filtrar Por :</b>')
			}
			else{
				MenusItems["quickMenuItems_"+i]=new Array('<b class="menu-title">Filtrar Por :</b>')
			}
			// llena los elementos en el combo
			var filtroIni=0;
			for(var j=0;j<cantidadAtributos;j++){
				if(parametrosDatos[j]["filtro_"+i]!=null&&parametrosDatos[j]["filtro_"+i]==true){
					if(parametrosDatos[j].filterColValue){
						value=parametrosDatos[j].filterColValue
					}
					else{
						value=parametrosDatos[j].validacion.name
					}
					if(parametrosDatos[j].validacion.fieldLabel){
						text=parametrosDatos[j].validacion.fieldLabel
					}
					else{
						text=parametrosDatos[j].validacion.name
					}
					filtroIni++;
					if(filtroIni==1){
						MenusItems["quickMenuItems_"+i].push(new Ext.menu.CheckItem({ value:value,text:text, checked: true }))
					}
					else{
						MenusItems["quickMenuItems_"+i].push(new Ext.menu.CheckItem({ value:value,text:text, checked:false }))
					}
				}

			}
			Menus["quickMenu_"+i] = new Ext.menu.Menu({
				items: MenusItems["quickMenuItems_"+i]
			});
			Barra.add({
				text: 'Filtro',
				tooltip: 'Columnas por las que se filtra',
				icon: '../../../lib/images/m.png',
				cls: 'x-btn-text-icon btn-search-icon',
				menu: Menus["quickMenu_"+i]
			});
			var sftb = Barra.addDom({
				tag: 'input',
				id: 'quicksearch_'+i+"-"+configuracion.grid_html,
				type: 'text',
				size: 30,
				value: '',
				style: 'background: #F0F0F9;'
			});

			Combos["searchBox_"+i]=new Ext.form.TextField({
				emptyText: "Criterio de B�squeda",
				width:110
			});
			Combos["searchBox_"+i].applyTo('quicksearch_'+i+"-"+configuracion.grid_html);
			var onFilteringBeforeQuery=function(e){

				for(k=0;k<Cantidad;k++){
					var sw = true; //primera vez que entra al for
					var cuentaCol=0;
					var filterCol="";
					var filterAvanzado=false;
					for(var p=0,items=MenusItems["quickMenuItems_"+k],len=items.length; p<len; p++){
						//mientras sea distinto de de filtro avanzado son columas por la que se deberia filtrar
						if(items[p].value !='filterAvanzado'){
							if(items[p].checked){
								cuentaCol ++;
								if(sw){
									filterCol=items[p].value;
									sw=false
								}
								else{
									filterCol = filterCol+"#"+items[p].value
								}
							}
						}
						else{
							filterAvanzado = items[p].checked
						}
					}
					if(cuentaCol==0){
						Combos["searchBox_"+k].setValue("")
					}

					if(cuentaCol==0){
						Combos["searchBox_"+k].setValue("");
						Combos["searchBox_"+k].disable()
					}
					else{
						Combos["searchBox_"+k].enable()
					}
					var value = Combos["searchBox_"+k].getValue();
					ds.lastOptions.params["filterCol_"+k]=filterCol;
					ds.lastOptions.params["filterValue_"+k]=value;
					ds.lastOptions.params["filterAvanzado_"+k]=filterAvanzado
				}
				ds.lastOptions.params.start=0;
				ds.load(ds.lastOptions)
			};
			//Menus["quickMenu_"+i].on('click', onFilteringBeforeQuery);
			//Combos["searchBox_"+i].el.on("keyup", onFilteringBeforeQuery)
			Combos["searchBox_"+i].el.addKeyListener(13, onFilteringBeforeQuery)

		}
	};var InitFiltro=this.InitFiltro;

	/////////////////////////////////////////////////////////////////////////////////////
	//--- Definicion de los parametros por defectos para las fucniones ---------------//
	////////////////////////////////////////////////////////////////////////////////////
	//aqui se pueden  colocar parametros constantes
	parametrosFiltro="&CantFiltros="+paramConfig.CantFiltros;
	var Funcion_btnEliminar={
		success:this.eliminarSucess, //funcion que se ejecuta cuando se tiene exito la conexion
		//argument: {multi: true},//arcumentos que se pasan a la funcion de succes
		failure:this.conexionFailure,//funcion que se ejecuta al fallar la conexion
		timeout:configuracion.TiempoEspera,//tiempo de espera para dar dallo
		url:"../../control/",  //sino tiene sobrecarga
		parametros: parametrosFiltro,
		parametros_ds:[],//parametros variables que tomaran su valos del ds.lastoption
		mensaje: "�Est� seguro de eliminar el registro?"
	};
	var Funcion_Save={
		success:this.saveSuccess,
		argument:{multi: false},
		failure:this.conexionFailure,
		timeout:configuracion.TiempoEspera,
		url:"../../control/",
		parametros:parametrosFiltro,
		parametros_ds:[],
		validar:ValidarCampos
	};
	var Funcion_ConfirmSave={
		success:  this.saveSuccess, //funcion que se ejecuta cuando se tiene exito la conexion (la funcion generaliza de la clase madre)
		argument: {multi: true},//arcumentos que se pasan a la funcion de succes
		failure:  this.conexionFailure,//funcion que se ejecuta al fallar la conexion
		timeout: configuracion.TiempoEspera,//tiempo de espera para dar dallo (sobrecargado)
		url:"../../control/",    //si no tiene sobrecarga se especidica cual es la direccion del Action en la capa de control
		parametros_ds:[],//parametros variables que tomaran su valos del ds.lastoption
		parametros_ds:[]
	};
	//alert("save and " + this.SaveAndOther);
	var Funcion_Formulario={
		titulo:'Formulario ...',
		html_apply:"dlgInfo-"+idContenedor,
		guardar: this.Save,
		guardarOtro: this.SaveAndOther ,
		cancelar: ocultarFormulario,
		ocultar: ocultarFormulario,
		mostrar:mostrarFormulario,
		modal:true,
		autoTabs:false,
		width:450,
		height:500,
		shadow:false,
		minWidth:150,
		minHeight:200,
		fixedcenter: true,
		constraintoviewport: true,
		draggable:true,
		proxyDrag: true,
		closable:true,
		upload:false,
		labelWidth:100,
		method:'post',
		columnas:['96%'],
		grupos:[{tituloGrupo:'Datos',columna:0,id_grupo:0}]
	};

	// -------------------- DEFINICION DE FUNCIONES --------------------//
	this.InitFunciones=function(param){
		if(param.btnEliminar){
			if(param.btnEliminar.url){Funcion_btnEliminar.url=param.btnEliminar.url;}
			if(param.btnEliminar.mensaje){Funcion_btnEliminar.mensaje=param.btnEliminar.mensaje}
			if(param.btnEliminar.parametros){Funcion_btnEliminar.parametros=Funcion_btnEliminar.parametros + param.btnEliminar.parametros}
			if(param.btnEliminar.failure){Funcion_btnEliminar.failure=param.btnEliminar.failure}
			if(param.btnEliminar.success){Funcion_btnEliminar.success=param.btnEliminar.success}
			if(param.btnEliminar.argument){Funcion_btnEliminar.argument=param.btnEliminar.argument}
			if(param.btnEliminar.parametros_ds){Funcion_btnEliminar.parametros_ds=param.btnEliminar.parametros_ds}
		}
		if(param.Save){
			if(param.Save.url){Funcion_Save.url=param.Save.url}
			if(param.Save.parametros){Funcion_Save.parametros=Funcion_Save.parametros+param.Save.parametros}
			if(param.Save.argument){Funcion_Save.argument=param.Save.argument}
			if(param.Save.timeout){Funcion_Save.timeout=param.Save.timeout}
			if(param.Save.failure){Funcion_Save.failure=param.Save.failure}
			if(param.Save.success){Funcion_Save.success=param.Save.success}
			if(param.Save.validar){Funcion_Save.validar = param.Save.validar}
			if(param.Save.parametros_ds){Funcion_Save.parametros_ds= param.Save.parametros_ds}
		}
		if(param.ConfirmSave){
			if(param.ConfirmSave.url){Funcion_ConfirmSave.url=param.ConfirmSave.url}
			if(param.ConfirmSave.parametros){Funcion_ConfirmSave.parametros=Funcion_ConfirmSave.parametros+param.ConfirmSave.parametros}
			if(param.ConfirmSave.argument){Funcion_ConfirmSave.argument=param.ConfirmSave.argument}
			if(param.ConfirmSave.timeout){Funcion_ConfirmSave.timeout=param.ConfirmSave.timeout}
			if(param.ConfirmSave.failure){Funcion_ConfirmSave.failure=param.ConfirmSave.failure}
			if(param.ConfirmSave.success){Funcion_ConfirmSave.success=param.ConfirmSave.success}
			if(param.ConfirmSave.parametros_ds){Funcion_ConfirmSave.parametros_ds=param.ConfirmSave.parametros_ds}
		}
		if(param.Formulario){
			if(param.Formulario.titulo){Funcion_Formulario.titulo=param.Formulario.titulo}
			if(param.Formulario.guardar){Funcion_Formulario.guardar=param.Formulario.guardar}
			if(param.Formulario.guardarOtro){Funcion_Formulario.guardarOtro=param.Formulario.guardarOtro}
			if(param.Formulario.cancelar){Funcion_Formulario.cancelar=param.Formulario.cancelar}
			if(param.Formulario.ocultar){Funcion_Formulario.ocultar=param.Formulario.ocultar}
			if(param.Formulario.mostrar){Funcion_Formulario.mostrar=param.Formulario.mostrar}
			if(param.Formulario.modal){Funcion_Formulario.modal=param.Formulario.modal}
			if(param.Formulario.autoTabs){Funcion_Formulario.autoTabs=param.Formulario.autoTabs}
			if(param.Formulario.width){Funcion_Formulario.width=param.Formulario.width}
			if(param.Formulario.height){Funcion_Formulario.height=param.Formulario.height}
			if(param.Formulario.shadow){Funcion_Formulario.shadow=param.Formulario.shadow}
			if(param.Formulario.minWidth){Funcion_Formulario.minWidth=param.Formulario.minWidth}
			if(param.Formulario.minHeight){Funcion_Formulario.minHeight=param.Formulario.minHeight}
			if(param.Formulario.fixedcenter){Funcion_Formulario.fixedcenter=param.Formulario.fixedcenter}
			if(param.Formulario.constraintoviewport){Funcion_Formulario.constraintoviewport=param.Formulario.constraintoviewport}
			if(param.Formulario.draggable){Funcion_Formulario.draggable=param.Formulario.draggable}
			if(param.Formulario.proxyDrag){Funcion_Formulario.proxyDrag=param.Formulario.proxyDrag}
			if(param.Formulario.closable){Funcion_Formulario.closable=param.Formulario.closable}
			if(param.Formulario.upload){Funcion_Formulario.upload=param.Formulario.upload}
			if(param.Formulario.method){Funcion_Formulario.method = param.Formulario.method}
			if(param.Formulario.labelWidth){Funcion_Formulario.labelWidth=param.Formulario.labelWidth}
			if(param.Formulario.columnas){Funcion_Formulario.columnas= param.Formulario.columnas}
			if(param.Formulario.grupos){Funcion_Formulario.grupos=param.Formulario.grupos}
			if(param.Formulario.html_apply){Funcion_Formulario.html_apply=param.Formulario.html_apply}
		}
	};

	//////////////////////////////////////////////////
	//      DEFINICION DEMETODOS  					//
	// Lugar reservado para la definiciond emetodos //
	//////////////////////////////////////////////////

	this.getSelectionModel=function(){
		return sm
	};getSelectionModel=this.getSelectionModel;

	this.getVectorDatos=function(){
		return vectorDatos
	};getVectorDatos=this.getVectorDatos;

	//-----   retorna un componete correspondiente al nombre intoroducido ----//
	this.getComponente=function(componente_name){
		var i=0;
		for(i=0;i<parametrosDatos.length;i++){
			if(parametrosDatos[i].validacion.name===componente_name){
				break
			}
		}
		return vectorDatos[i]
	};getComponente=this.getComponente;

	// ocultar componente
	this.ocultarComponente=function(comp){
		comp.el.up('.x-form-item').down('label').update('');
		comp.hide()
	};ocultarComponente=this.ocultarComponente;

	this.mostrarComponente=function(comp){
		comp.el.up('.x-form-item').down('label').update(comp.fieldLabel);
		comp.show()
	};mostrarComponente=this.mostrarComponente;

	//oculta todos los componentes del formulario
	this.ocultarTodosComponente=function(){
		for(var i=1;i<parametrosDatos.length;i++){
			vectorDatos[i].el.up('.x-form-item').down('label').update('');
			vectorDatos[i].hide()
		}
	};ocultarTodosComponente=this.ocultarTodosComponente;

	//muestra todos los componentes del formulario
	this.motrarTodosComponente=function(){
		for(var i=1;i<parametrosDatos.length;i++){
			vectorDatos[i].el.up('.x-form-item').down('label').update(vectorDatos[i].fieldLabel);
			vectorDatos[i].show()
		}
	};mostrarTodosComponente=this.mostrarTodosComponente;

	//mostrar grupos de datos
	this.mostrarGrupo=function(nom){
		j=0;
		tam=Funcion_Formulario.grupos.length;
		while(j<tam){if(Grupos[j].legend==nom){Grupos[j].show();j=tam}j++}
	};
	//ocultar grupos de datos
	this.ocultarGrupo=function(nom){
		j=0;
		tam= Funcion_Formulario.grupos.length;
		while(j<tam){if(Grupos[j].legend==nom){Grupos[j].hide();j=tam}j++}
	};

	//para capturar el dialogo
	this.getDialog=function(){
		return dlgInfo
	};getDialog=this.getDialog;



	this.getGrid=function(){
		return grid
	};getGrid=this.getGrid;
	//limpia las seleciones hechas en el grid
	this.clearSelections=function(){
		sm.clearSelections()
	}
	this.Destroy=function(){
		ContenedorLayout.getLayout().getEl().remove();
		delete paramConfig;
		delete parametrosDatos;
		delete ds;
		delete ContenedorLayout;
		delete idContenedor;
		delete Componentes;
		delete Componentes_grid;
		//destruir componentes
		for(var i=0;i<=Componentes.length;i++)
		{
			if(Componentes[i]){
				Componentes[i].destroy(true)
			}
			if(Componentes_grid[i]){
				Componentes_grid[i].destroy(true)
			}
		}
		Componentes=undefined;
		Componentes_grid=undefined;
		grid.destroy(true,true);
		dlgInfo.destroy(true,true);
		delete this
	};Destroy=this.Destroy;

}