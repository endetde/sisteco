/**
* Nombre:		  	    pagina_adjudicacion_item.js
* Prop�sito: 			pagina objeto principal
* Autor:				Generado Automaticamente
* Fecha creaci�n:		2008-05-28 17:32:15
*/
function pagina_adjudicacion_item(idContenedor,direccion,paramConfig,maestro,idContenedorPadre)
{
	var Atributos=new Array,sw=0;
	var sw_grup=true,gridG,gSm,ds_g,gDlg;
	var cantidad=0;
	var adj=0;
	var bandera=false;
	/////////////////
	//  DATA STORE //
	/////////////////
	var ds = new Ext.data.Store({
		// asigna url de donde se cargaran los datos
		proxy: new Ext.data.HttpProxy({url: direccion+'../../../control/cotizacion_det/ActionListarCotizacionDet.php'}),
		// aqui se define la estructura del XML
		reader: new Ext.data.XmlReader({
			record: 'ROWS',
			//id: 'id_cotizacion_det',
			id:'id_item',
			totalRecords: 'TotalCount'

		}, [
		// define el mapeo de XML a las etiquetas (campos)
		
		'supergrupo', 'gru','subgrupo','id1','id2','id3','codigo','id_item','cantidad_solicitada',
		'cantidad','garantia','id_item_cotizado','observaciones','precio','tiempo_entrega','observado','item','id_cotizacion','nombre_cotizado',
		'num_convocatoria','id_adjudicacion'
		,'id_item_aprobado','estado','id_proceso_compra','cant_adj'
		
		]),remoteSort:true});
		//carga datos XML
		ds.load({
			params:{
				start:0,
				limit: paramConfig.TamanoPagina,
				CantFiltros:paramConfig.CantFiltros,
				m_id_cotizacion:maestro.id_cotizacion,
				cotizado:1
			}
		});
		// DEFINICI�N DATOS DEL MAESTRO

		var div_grid_detalle=Ext.DomHelper.append(idContenedor,{tag:'div',id:'grid_detalle-'+idContenedor},true);
		Ext.DomHelper.applyStyles(div_grid_detalle,"background-color:#FFFFFF");
	
		//DATA STORE COMBOS


		var ds_item = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../sis_almacenes/control/item/ActionListarItem.php'}),
		reader: new Ext.data.XmlReader({record:'ROWS',id:'id_item',totalRecords:'TotalCount'},['id_item','codigo','nombre','descripcion','precio_venta_almacen','costo_estimado','stock_min','observaciones','nivel_convertido','estado_registro','fecha_reg','id_unidad_medida_base','id_id3','id_id2','id_id1','id_subgrupo','id_grupo','id_supergrupo','peso_kg','mat_bajo_responsabilidad'])
		});

		//FUNCIONES RENDER


		function render_id_item(value, p, record){return String.format('{0}', record.data['desc_item']);}
		var tpl_id_item=new Ext.Template('<div class="search-item">','<b><i>{codigo}</i></b>','<br><FONT COLOR="#B5A642">{nombre}</FONT>','</div>');


		/////////////////////////
		// Definici�n de datos //
		/////////////////////////

		// hidden id_cotizacion_det
		//en la posici�n 0 siempre esta la llave primaria

		Atributos[0]={
			validacion:{
				//fieldLabel: 'Id',
				labelSeparator:'',
				name: 'id_item',
				inputType:'hidden',
				grid_visible:false,
				grid_editable:false
			},
			tipo: 'Field',
			filtro_0:false,
			save_as:'id_item',
			id_grupo:0
		};


		Atributos[1]={
			validacion:{
				name:'codigo',
				fieldLabel:'Codigo Item',
				allowBlank:true,
				maxLength:50,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				width_grid:70,
				width:'100%',
				disable:false,
				grid_indice:1
			},
			tipo: 'TextField',
			form: false,
			filtro_0:false,
			id_grupo:3
		};



		/********/
		Atributos[2]={
			validacion:{
				name:'supergrupo',
				fieldLabel:'Supergrupo',
				allowBlank:true,
				maxLength:50,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				width_grid:70,
				width:'100%',
				disable:false,
				grid_indice:2
			},
			tipo: 'TextField',
			form: false,
			filtro_0:false,
			id_grupo:3
		};


		Atributos[3]={
			validacion:{
				name:'gru',
				fieldLabel:'Grupo',
				allowBlank:true,
				maxLength:50,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				width_grid:70,
				width:'100%',
				disable:false,
				grid_indice:3
			},
			tipo: 'TextField',
			form: false,
			filtro_0:false,
			id_grupo:3
		};



		Atributos[4]={
			validacion:{
				name:'subgrupo',
				fieldLabel:'Subgrupo',
				allowBlank:true,
				maxLength:50,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				width_grid:70,
				width:'100%',
				disable:false,
				grid_indice:4
			},
			tipo: 'TextField',
			form: false,
			filtro_0:false,
			id_grupo:3
		};


		Atributos[5]={
			validacion:{
				name:'id1',
				fieldLabel:'ID1',
				allowBlank:true,
				maxLength:50,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				width_grid:70,
				width:'100%',
				disable:false,
				grid_indice:5
			},
			tipo: 'TextField',
			form: false,
			filtro_0:false,
			id_grupo:3
		};


		Atributos[6]={
			validacion:{
				name:'id2',
				fieldLabel:'ID2',
				allowBlank:true,
				maxLength:50,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				width_grid:50,
				width:'100%',
				disable:false,
				grid_indice:6
			},
			tipo: 'TextField',
			form:false,
			filtro_0:false,
			id_grupo:3
		};


		Atributos[7]={
			validacion:{
				name:'id3',
				fieldLabel:'ID3',
				allowBlank:true,
				maxLength:50,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				width_grid:50,
				width:'100%',
				disable:false,
				grid_indice:7
			},
			tipo: 'TextField',
			form: false,
			filtro_0:false,
			id_grupo:3
		};



		Atributos[8]={
			validacion:{
				name:'item',
				fieldLabel:'Item',
				allowBlank:false,
				maxLength:50,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				width_grid:70,
				width:'100%',
				disabled:true,
				grid_indice:8,
				renderer:formatAdjudicado
			},
			tipo: 'TextField',
			form: true,
			filtro_0:true,
			filterColValue:'item.nombre',
			save_as:'item',
			id_grupo:1
		};



		Atributos[9]={
			validacion:{
				name:'cantidad_solicitada',
				fieldLabel:'Cant. Sol.',
				maxLength:50,
				minLength:0,
				selectOnFocus:true,
				allowDecimals:false,
				decimalPrecision:0,//para numeros float
				allowNegative:false,
				minValue:0,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				width_grid:45,
				width:'40%',
				align:'right',
				disabled:true,
				grid_indice:9
			},
			tipo:'NumberField',
			form: true,
			filtro_0:true,
			filterColValue:'PRODET.cantidad',
			save_as:'cantidad_solicitada',
			id_grupo:1
		};


		// txt cantidad
		Atributos[10]={
			validacion:{
				name:'cantidad',
				fieldLabel:'Cant.Cot.',
				allowBlank:false,
				maxLength:50,
				minLength:0,
				selectOnFocus:true,
				allowDecimals:true,
				decimalPrecision:0,//para numeros float
				allowNegative:false,
				minValue:1,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				align:'right',
				width_grid:45,
				width:'40%',
				disabled:false,
				grid_indice:10
			},
			tipo: 'NumberField',
			form: true,
			filtro_0:true,
			filterColValue:'COTDET.cantidad',
			save_as:'cantidad',
			id_grupo:3
		};

		// txt precio
		Atributos[11]={
			validacion:{
				name:'precio',
				fieldLabel:'PU Bs.',
				allowBlank:false,
				maxLength:50,
				minLength:0,
				selectOnFocus:true,
				allowDecimals:true,
				decimalPrecision:2,//para numeros float
				allowNegative:false,
				minValue:1,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				align:'right',
				width_grid:55,
				width:'40%',
				disabled:false,
				grid_indice:11
			},
			tipo: 'NumberField',
			form: true,
			filtro_0:true,
			filterColValue:'COTDET.precio',
			save_as:'precio',
			id_grupo:3
		};

		// txt tiempo_entrega
		Atributos[12]={
			validacion:{
				name:'tiempo_entrega',
				fieldLabel:'Tiempo Entrega Pedido(dias)',
				allowBlank:true,
				maxLength:3,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:false,
				decimalPrecision:0,
				allowDecimals:false,
				grid_editable:false,
				width_grid:85,
				width:'40%',
				disabled:false,
				grid_indice:12
			},
			tipo: 'NumberField',
			form: true,
			filtro_0:false,
			filterColValue:'COTDET.tiempo_entrega',
			save_as:'tiempo_entrega',
			id_grupo:0
		};

		// txt garantia
		Atributos[13]={
			validacion:{
				name:'garantia',
				fieldLabel:'Garantia',
				allowBlank:false,
				maxLength:300,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				width_grid:100,
				width:'100%',
				disabled:false,
				grid_indice:13
			},
			tipo: 'TextArea',
			form: true,
			filtro_0:true,
			filterColValue:'COTDET.garantia',
			save_as:'garantia',
			id_grupo:3
		};

		// txt observado
		Atributos[14]={
			validacion:{
				name:'observado',
				fieldLabel:'Observado',
				allowBlank:false,
				typeAhead:true,
				loadMask:true,
				triggerAction:'all',
				store:new Ext.data.SimpleStore({fields:['ID','valor'],data:[['si','si'],['no','no']]}),
				valueField:'ID',
				displayField:'valor',
				lazyRender:true,
				forceSelection:true,
				grid_visible:true,
				grid_editable:false,
				width_grid:50,
				pageSize:100,
				minListWidth:'100%',
				disabled:false,
				grid_indice:14
			},
			tipo:'ComboBox',
			form: true,
			filtro_0:true,
			filterColValue:'COTDET.observado',
			defecto:'si',
			save_as:'observado',
			id_grupo:3
		};


		// txt observaciones
		Atributos[15]={
			validacion:{
				name:'observaciones',
				fieldLabel:'Observaciones',
				allowBlank:true,
				maxLength:500,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				width_grid:100,
				width:'100%',
				disable:false,
				grid_indice:15
			},
			tipo: 'TextArea',
			form: true,
			filtro_0:true,
			filterColValue:'COTDET.observaciones',
			save_as:'observaciones',
			id_grupo:3
		};

		// txt id_cotizacion
		Atributos[16]={
			validacion:{
				name:'id_cotizacion',
				labelSeparator:'',
				inputType:'hidden',
				grid_visible:false,
				grid_editable:false,
				disabled:true
			},
			tipo:'Field',
			filtro_0:false,
			defecto:maestro.id_cotizacion,
			save_as:'id_cotizacion',
			id_grupo:0
		};
	//	 txt id_item_aprobado
		Atributos[17]={
			validacion:{
				name:'id_item_aprobado',
				fieldLabel:'Id Item',
				allowBlank:true,
				maxLength:50,
				minLength:0,
				selectOnFocus:true,
				allowDecimals:false,
				decimalPrecision:2,//para numeros float
				allowNegative:false,
				minValue:0,
				vtype:'texto',
				grid_visible:false,
				grid_editable:false,
				width_grid:70,
				width:'100%',
				disable:false
			},
			tipo: 'NumberField',
			form: true,
			filtro_0:false,
			filterColValue:'COTDET.id_item_aprobado',
			save_as:'id_item_aprobado',
			id_grupo:0
		};


		Atributos[18]={
			validacion:{
				name:'id_item_cotizado',
				desc:'nombre_cotizado',
				fieldLabel:'Codigo Item',
				allowBlank:true,
				maxLength:100,
				minLength:0,
				store:ds_item,
				valueField: 'id_item',
				displayField: 'nombre',
				renderer:render_id_item,
				selectOnFocus:true,
				vtype:"texto",
				grid_visible:false,
				grid_editable:false,
				width_grid:70,
				width:200,
				pageSize:10,
				direccion:direccion,
				grid_indice:20,
				disabled:false
			},
			tipo:'LovItemsAlm',
			save_as:'id_item_cotizado',
			form:true,
			filtro_0:false,
			defecto:'',
			filterColValue:'item_cotizado.nombre',
			id_grupo:2
		};


		Atributos[19]={
			validacion:{
				name:'nombre_cotizado',
				fieldLabel:'Item Cotizado',
				allowBlank:true,
				maxLength:50,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:true,
				grid_editable:false,
				width_grid:70,
				width:'100%',
				disabled:false
			},
			tipo: 'TextField',
			form: true,
			filtro_0:false,
			filterColValue:'',
			save_as:'nombre_cotizado',
			id_grupo:0
		};



		Atributos[20]={
			validacion:{
				name:'detalle',
				fieldLabel:'Detalle',
				allowBlank:false,
				maxLength:500,
				minLength:0,
				selectOnFocus:true,
				vtype:'texto',
				grid_visible:false,
				grid_editable:false,
				width_grid:100,
				width:'100%',
				disabled:true,
				grid_indice:15
			},
			tipo: 'TextArea',
			form: true,
			filtro_0:false,
			save_as:'detalle',
			id_grupo:2
		};

		Atributos[21]={
			validacion:{
				//fieldLabel: 'Id',
				labelSeparator:'',
				name: 'num_convocatoria',
				inputType:'hidden',
				grid_visible:false,
				grid_editable:false
			},
			tipo: 'Field',
			filtro_0:false,
			save_as:'num_convocatoria',
			id_grupo:0
		};
		
		
		Atributos[22]={
			validacion:{
				//fieldLabel: 'Id',
				labelSeparator:'',
				name: 'estado',
				inputType:'hidden',
				grid_visible:false,
				grid_editable:false
			},
			tipo: 'Field',
			filtro_0:false,
			save_as:'estado',
			id_grupo:0
		};

		Atributos[23]={
			validacion:{
				//fieldLabel: 'Id',
				labelSeparator:'',
				name: 'id_proceso_compra',
				inputType:'hidden',
				grid_visible:false,
				grid_editable:false
			},
			tipo: 'Field',
			filtro_0:false,
			save_as:'id_proceso_compra',
			id_grupo:0
		};
		
		//----------- FUNCIONES RENDER

		function formatDate(value){return value?value.dateFormat('d/m/Y'):''};

		function formatAdjudicado(val,cell,record,row,colum,store){
		    //alert(record.data.cant_adj+"*****"+record.data.cantidad_solicitada);
		   if(record.data.estado=='cotizado'||(record.data.cant_adj<record.data.cantidad_solicitada)){
			  return '<span style="color:red;font-size:8pt">' + val + '</span>';
	       }else{
	          return val;
	    	}
	   };
	
		
		//---------- INICIAMOS LAYOUT DETALLE
		var config={titulo_maestro:'Adjudicacion',titulo_detalle:'Detalle de Adjudicacion',grid_maestro:'grid-'+idContenedor};
		layout_adjudicacion_item = new DocsLayoutDetalle(idContenedor,idContenedorPadre);
		layout_adjudicacion_item.init(config);



		//---------- INICIAMOS HERENCIA
		this.pagina = Pagina;
		this.pagina(paramConfig,Atributos,ds,layout_adjudicacion_item,idContenedor);
		var getComponente=this.getComponente;
		var getSelectionModel=this.getSelectionModel;
		var CM_btnNew=this.btnNew;
		var CM_btnEdit=this.btnEdit;
		var CM_ocultarGrupo=this.ocultarGrupo;
		var CM_mostrarGrupo=this.mostrarGrupo;
		var CM_ocultarComponente=this.ocultarComponente;
		var CM_mostrarComponente=this.mostrarComponente;
		var Cm_conexionFailure=this.conexionFailure;
		var getDialog=this.getDialog;
		var EstehtmlMaestro=this.htmlMaestro;
		var enableSelect=this.EnableSelect;
		//DEFINICI�N DE LA BARRA DE MEN�
		var paramMenu={
			
			actualizar:{crear:true,separador:false}
		};
		//DEFINICI�N DE FUNCIONES

		var paramFunciones={
			Formulario:{html_apply:'dlgInfo-'+idContenedor,height:340,width:485,minWidth:150,minHeight:222,	closable:true,titulo:'Detalle de Cotizaci�n',
			grupos:[{
				tituloGrupo:'Oculto',
				columna:0,
				id_grupo:0
			},{
				tituloGrupo:'Detalle Solicitud',
				columna:0,
				id_grupo:1
			},
			{	tituloGrupo:'Reformular',
			columna:0,
			id_grupo:3
			},
			{	tituloGrupo:'Detalle de Cotizaci�n',
			columna:0,
			id_grupo:4
			},
			{tituloGrupo:'Adjudicacion',
			columna:0,
			id_grupo:2
			}]}};

			var ds_maestro = new Ext.data.Store({proxy: new Ext.data.HttpProxy({url: direccion+'../../../../sis_adquisiciones/control/cotizacion/ActionListarCotizacion.php?id_cotizacion='+maestro.id_cotizacion}),
		reader:new Ext.data.XmlReader({record:'ROWS',id:'id_cotizacion',totalRecords: 'TotalCount'},['id_cotizacion',
		'forma_pago','num_cotizacion',
		'desc_proveedor','desc_tipo_categoria_adq','lugar_entrega'
		])
		});

		ds_maestro.load({
			params:{
				start:0,
				limit: paramConfig.TamanoPagina,
				CantFiltros:paramConfig.CantFiltros,
				m_id_cotizacion:maestro.id_cotizacion

			},
			callback:cargar_maestro
		});

		function cargar_maestro(){
			data1=[['N� Cotizacion',ds_maestro.getAt(0).get('num_cotizacion')],  ['Categoria',ds_maestro.getAt(0).get('desc_tipo_categoria_adq')],  
			 ['Forma Pago',ds_maestro.getAt(0).get('forma_pago')],['Proveedor',ds_maestro.getAt(0).get('desc_proveedor')],['Lugar Entrega',ds_maestro.getAt(0).get('lugar_entrega')],  ];
			Ext.DomHelper.overwrite('grid_detalle-'+idContenedor,EstehtmlMaestro(data1));
		}
			
			//-------------- Sobrecarga de funciones --------------------//
			this.reload=function(params){
				
				this.btnActualizar();
				var datos=Ext.urlDecode(decodeURIComponent(params));
				maestro.id_cotizacion=datos.m_id_cotizacion;
				maestro.observaciones=datos.m_observaciones;
				maestro.num_proceso=datos.m_num_proceso;
				maestro.desc_proveedor=datos.m_desc_proveedor;
				maestro.estado_vigente=datos.m_estado_vigente;
				maestro.id_moneda=datos.m_id_moneda;
				maestro.id_moneda_base=datos.m_id_moneda_base;
				ds_maestro.load({
				params:{
					start:0,
					limit: paramConfig.TamanoPagina,
					CantFiltros:paramConfig.CantFiltros,
					id_cotizacion:maestro.id_cotizacion

				},
				callback:cargar_maestro
			}); 
				ds.lastOptions={
					params:{
						start:0,
						limit: paramConfig.TamanoPagina,
						CantFiltros:paramConfig.CantFiltros,
						m_id_cotizacion:maestro.id_cotizacion,
						cotizado:1
					}
				};
				this.btnActualizar();
				iniciarEventosFormularios();
		
				
				Atributos[16].defecto=maestro.id_cotizacion;
				this.iniciarEventosFormularios;
				this.InitFunciones(paramFunciones)
			};

			//Para manejo de eventos
			function iniciarEventosFormularios(){
				//para iniciar eventos en el formulario
				txt_cantidad_solicitada=getComponente('cantidad_solicitada');
				txt_cantidad=getComponente('cantidad');
				var txt_cantidad_adjudicada;
				txt_descripcion=getComponente('detalle');
				


				var onCantidad=function(){
                	if(txt_cantidad.getValue() >txt_cantidad_solicitada.getValue()){
    					txt_cantidad.markInvalid("La cantidad cotizada no puede ser mayor a la solicitada");
					}
					else{
						txt_cantidad.clearInvalid();
						var Dialog= getDialog();
					}
				}


				var onCantidadAdj=function(){
					if(txt_cantidad_adjudicada.getValue() >txt_cantidad.getValue()){
						txt_cantidad_adjudicada.markInvalid("La cantidad adjudicada no puede ser mayor a "+txt_cantidad.getValue());
						txt_cantidad_adjudicada.allowBlank=false;
						var Dialog= getDialog();
					}
					else{
						txt_cantidad_adjudicada.clearInvalid();
						var Dialog= getDialog();
					}
				}


			}


            function btn_reformulacion(){
					var sm=getSelectionModel();
					var filas=ds.getModifiedRecords();
					var cont=filas.length;
					var NumSelect=sm.getCount();
					adj=0;
					if(NumSelect!=0){
						if(maestro.estado_vigente=='cotizado'){
					       var SelectionsRecord=sm.getSelected();
					 
						   if(SelectionsRecord.data.estado=='adjudicado'){
						      Ext.MessageBox.alert('Estado','No es posible reformular el registro porque ya fue adjudicado');	
						   }
						   bandera=false;
							var item_cotiz, serv_cotiz;
								if(sw_grup){
									if(SelectionsRecord.data.id_item_aprobado>0){
						 				if(SelectionsRecord.data.id_item_cotizado>0){
								    		item_cotiz=SelectionsRecord.data.id_item_cotizado;
										}else{
											item_cotiz=0;
										}
										
										InitDetalleAdj(SelectionsRecord.data.id_item_aprobado,SelectionsRecord.data.id_cotizacion,SelectionsRecord.data.cantidad,item_cotiz,adj);
									}
								}else{
									  if(SelectionsRecord.data.id_item_aprobado>0){
											 if(SelectionsRecord.data.id_item_cotizado>0){
											     item_cotiz=SelectionsRecord.data.id_item_cotizado;
											}else{
												item_cotiz=0;
											}
									   reloadDetalleGrupo(SelectionsRecord.data.id_item_aprobado,SelectionsRecord.data.id_cotizacion, SelectionsRecord.data.cantidad,item_cotiz,adj);
								      }
								}
					   }else{
						      Ext.MessageBox.alert('Estado', 'Antes debe finalizar el registro de propuestas de cotizacion')
					   }
					}else{
					  	Ext.MessageBox.alert('Estado', 'Antes debe seleccionar un item.')
					 }
			  }


		 function btn_detalle_adjudicacion(){
				var sm=getSelectionModel();
				var filas=ds.getModifiedRecords();
				var cont=filas.length;
				var NumSelect=sm.getCount();
				adj=1;
				if(NumSelect!=0){
					if(maestro.estado_vigente=='cotizado'){
						var SelectionsRecord=sm.getSelected();
						bandera=true;
							if(SelectionsRecord.data.estado=='cotizado' || SelectionsRecord.data.estado=='adjudicado'){

						     	 var item_cotiz;
						       		if(sw_grup){
							        	if(SelectionsRecord.data.id_item_aprobado>0){
						                	 if(SelectionsRecord.data.id_item_cotizado>0){
								            	  item_cotiz=SelectionsRecord.data.id_item_cotizado;
								         	}else{
									          	  item_cotiz=0;
								         	}
										 	InitDetalleAdj(SelectionsRecord.data.id_item_aprobado,SelectionsRecord.data.id_cotizacion,SelectionsRecord.data.cantidad,item_cotiz,adj);
							        	 }
							  		}else{
										if(SelectionsRecord.data.id_item_aprobado>0){
									    	if(SelectionsRecord.data.id_item_cotizado>0){
										    	 item_cotiz=SelectionsRecord.data.id_item_cotizado;
											}else{
									 			 item_cotiz=0;
											}
		
											  reloadDetalleGrupo(SelectionsRecord.data.id_item_aprobado,SelectionsRecord.data.id_cotizacion, SelectionsRecord.data.cantidad,item_cotiz,adj);
										}
									  }
					     	}else{
							     Ext.MessageBox.alert('Estado', 'Antes debe finalizar el registro de propuestas por cotizacion')
						}
				    }else{
					       Ext.MessageBox.alert('Estado', 'Antes debe Finalizar el registro de cotizacion')
					   }
                }else{
					Ext.MessageBox.alert('Estado', 'Antes debe seleccionar un item')
				}
			}



			/****************************desde aqui modificacion ***********************/
			function InitDetalleAdj(id_item,id_cotizacion,cantidad_cotizada,item_cotizado,adj){
  			   
				//crear ventana para para manejar grupos
				var Win=Ext.DomHelper.append(document.body,{tag:'div',id:"gDlg-"+idContenedor},true);
				var dGrid=Ext.DomHelper.append("gDlg-"+idContenedor,{tag:'div',id:"grid_g-"+idContenedor},true);
				
				gDlg = new Ext.LayoutDialog(Win,{
					modal: true,
					width: 700,
					height: 200,
					fixedCenter:true,
					closable: true,
					center:{title:'Grupos',titlebar:false,autoScroll:true}
				});

				
				    gDlg.addButton('Guardar',siAdj,gDlg);	
				  	gDlg.addButton('Cancelar',noAdj,gDlg);	
					
				function formatCA(value,p,record){	        
				    if(record.data.cantidad_adjudicada>0){
	                      return value;
                    }else{
   		                  return '<span style="color:red;font-size:8pt">' + 0 + '</span>';
	                }
                }

				ds_g = new Ext.data.Store({
					proxy: new Ext.data.HttpProxy({url:direccion+'../../../control/adjudicacion/ActionListarAdjudicacion.php'}),
					// aqui se define la estructura del XML
					reader: new Ext.data.XmlReader({record:'ROWS',id:'id_solicitud_compra_det',totalRecords:'TotalCount'},[

					'id_proceso_compra_det',
					'id_proceso_compra',
					'id_item','id_servicio',
					'cantidad_proceso',
					'precio_ref_proceso','cantidad_solicitada','precio_ref_solicitado','cantidad_cotizada','precio_cotizado','id_solicitud_compra_det','cantidad_adjudicada','item','reformular','id_cotizado','monto_aprobado','id_adjudicacion','adjudicado','id_cotizacion_det','cantidad','monto_ref_reformulado','num_sol']),remoteSort:false});

					ds_g.load(
					{
						params:{
							start:0,
							limit:100,
							id_item:id_item,
							id_cotizacion:id_cotizacion
						}
					});
					
					
					var fm = Ext.form, Ed = Ext.grid.GridEditor;
					var cant_adj= new Ed(new fm.NumberField({allowBlank:false,
               			allowNegative: false,
               			allowDecimals:false,
               			minValue:0
               		}));
						
									
				var check_adj= new Ed(new fm.Checkbox({disabled:false}));
					
					//if(adj>0){
						var cmG = new Ext.grid.ColumnModel(
							[{header:"Solicitud",width:55,dataIndex:'num_sol'},
							 {header:"Pedido",width:70,dataIndex:'item'},
							 //{header:"Solicitud",width:50,dataIndex:'id_solicitud_compra_det'},
							 {header:"Cant. Sol.",width:53,dataIndex:'cantidad'},
							 {header:"Falta Adjudicar",width:75,dataIndex:'cantidad_solicitada'},
							 {header:"PU Sol.",width:50,dataIndex:'precio_ref_solicitado'},
							 {header:"Cant. Cotizada",width:70,dataIndex:'cantidad_cotizada'},
							 {header:"PU Cotizado",width:50,dataIndex:'precio_cotizado'},
							 {header:"Cant. Adj.",width:65,dataIndex:'cantidad_adjudicada',renderer:formatCA,editor: cant_adj},
							 {header:"Reformular",width:70,dataIndex:'reformular',editor:check_adj, renderer:render_incluido}
							 ]);
					
					
					function render_incluido(value, p, record){
						var  inc;
						if(record.data.id_item>0 ){
							if(value==false || value=='no'){
							     inc='no'
							}else{if(value==true || value=='si'){
								inc='si';}else{
									inc='pendiente';
								}
							}
						}else{
							 if(value==false||value=='no'){
							     inc='no'
							}else{if(value==true||value=='si'){
								inc='si';}else{
									inc='pendiente';
								}
							}
						}
						return inc
					}
					
					
					gSm=new Ext.grid.RowSelectionModel({singleSelect:true});
					var glayout=gDlg.getLayout();
					
				    gridG=new Ext.grid.EditorGrid(dGrid,{ds:ds_g,cm:cmG,selModel:gSm});
					var gg= gridG.getGridEl();	
					var cmAdj=gridG.getColumnModel();
			       	ocultar();
			       	
					var reformularAdj= function(e){ //para deshabilitar la columna si no se tiene un item cotizado diferente al solicitado
						if(adj==0){
						   if(parseFloat(e.record.data.id_cotizado)>0){
							   if(e.record.data.reformular=='si'){
								 cmAdj.setEditable(7,true);
			       	      		 cmAdj.setEditable(8,false);	
								}
							   else{
							   	   if(e.record.data.reformular=='pendiente'){alert('Item pendiente de reformulacion');}else{
							   		  cmAdj.setEditable(7,true);
								   }
			       	      		}
			       			}else{
								cmAdj.setEditable(7,true);
								cmAdj.setEditable(8,false);
								e.record.set('reformular','no');
							}
					   }
			       	}
					
					var validarMonto=function(e){
						
						  if(parseFloat(e.record.data.cantidad)>parseFloat(e.record.data.cantidad_cotizada)){
						    cantidad=parseFloat(e.record.data.cantidad_cotizada);
						  }
						  else{
							cantidad=parseFloat(e.record.data.cantidad);
						  }
						  if(e.column==7){
						     if(parseFloat(e.record.data.id_cotizado)>0){
							    if(e.record.data.reformular=='si'){
							    	
							    	if((parseFloat(e.record.data.monto_aprobado)<parseFloat(e.record.data.precio_cotizado))&&(parseFloat(e.record.data.monto_ref_reformulado)<parseFloat(e.record.data.precio_cotizado))){
									  	Ext.MessageBox.alert('Estado','El monto aprobado es menor al cotizado, necesario reformular monto');
									  	return false;
									}
							    }
							    else{
							    	Ext.MessageBox.alert('Estado','Se cotiz� un item diferente al solicitado, necesita reformulacion');
			       	            	return false;
			       	            }
			       	        }else{// pudo haber reformulacion de monto
								if(parseFloat(e.record.data.monto_ref_reformulado)>0){
									if(e.record.data.reformular=='si'){
									    if(parseFloat(e.record.data.monto_ref_reformulado) < parseFloat(e.record.data.precio_cotizado)){
										    Ext.MessageBox.alert('Estado','El monto aprobado es menor al cotizado necesario reformular monto');
									  		return false;
										}
										else{
											if(parseFloat(e.record.data.cantidad_solicitada)<parseFloat(e.value)){
							   		   		    Ext.MessageBox.alert('Estado','La cantidad adjudicada no puede ser mayor a '+e.record.data.cantidad_solicitada);
							   		   			return false;
							    			}
										}
									}else{
										Ext.MessageBox.alert('Estado','La reformulacion de monto no fue aprobada aun');
			       	            	   	return false;
									}
								}else{
								   		if(parseFloat(e.record.data.monto_aprobado) < parseFloat(e.record.data.precio_cotizado)){
										    Ext.MessageBox.alert('Estado','El monto aprobado es menor al cotizado necesario reformular monto');
									  		return false;
										}
										else{
											if(parseFloat(e.record.data.cantidad_solicitada)<parseFloat(e.value)){
							   		   		    Ext.MessageBox.alert('Estado','La cantidad adjudicada no puede ser mayor a '+e.record.data.cantidad_solicitada);
							   		   			return false;
							   				}
								  		}
						 		   }
							  }
						  }
				     }
					
					
					
					
					var verificarCantAdj=function(e){
						if(e.column==7){
					  	      if(parseFloat(e.record.data.cantidad)>=parseFloat(e.record.data.cantidad_cotizada)){
					              if(parseFloat(e.value)>parseFloat(e.record.data.cantidad_cotizada)){
						        	  e.record.set('cantidad_adjudicada', e.originalValue);
								      Ext.MessageBox.alert('Cantidad','la cantidad a adjudicar no debe ser mayor a '+cantidad_cotizada);
								  }else{
							          if(parseFloat(e.value)==0){
							              //alert para indicar si ya se revirtieron presupuesto de detalles==> anular
							          }
								  }
					   		}else{
					   			if((parseFloat(e.value))>(parseFloat(e.record.data.cantidad))){
						        	  e.record.set('cantidad_adjudicada', e.originalValue);
								      Ext.MessageBox.alert('Cantidad','la cantidad a adjudicar no debe ser mayor a '+cantidad);
								   }else{
							           	 if(parseFloat(e.value)==0){ //gDlg.buttons[0].enable();
							           	     //alert para indicar si ya se revirtieron presupuesto de detalles==> anular
							           	     						           	     
							           	 }
						       			}
					   			}
				    	  }
					}
					
					
					var verificarAdjudicado=function(e){
						if(e.column==7){
					  		if(parseFloat(e.record.data.adjudicado)>0){
					   	  		if(parseFloat(e.record.data.id_adjudicacion)>0){ 
					   	  	 		cmAdj.setEditable(7,true);
					   	  	 		//gDlg.buttons[0].enable();
					   	  	 	}else{
					   	  	  	   	Ext.MessageBox.alert('Estado','El item ya fue adjudicado');
					   	   	 		gDlg.hide();
					   	   	 		return false;
					   	  	 	}
					   	 	}
					   }
					}
					
					
					
			function terminado(resp){
				this.getGrid().stopEditing()
				getSelectionModel().clearSelections();
				var regreso = Ext.util.JSON.decode(resp.responseText)
				Ext.MessageBox.hide();//ocultamos el loading
				if(regreso.success){
					 Ext.MessageBox.alert('Estado','Ejecuci�n satisfactoria');
					 if(gDlg.isVisible()){
 				       gDlg.hide();
					 }
				}
				else{
					Ext.MessageBox.alert('Estado','Ejecuci�n no realizada');
					    if(gDlg.isVisible()){
							gDlg.hide();
						}
						else{
							Actualizar()
						}
					}
				}
			
					
					
				   
					var g_panel=new Ext.GridPanel(gridG,{fitToFrame:true,closable:false});
										
					glayout.add('center',g_panel);
					gDlg.show();

					gridG.render();
					// add a paging toolbar to the grid's footer
					var gPaging=new Ext.PagingToolbar(gridG.getView().getFooterPanel(true),ds_g, {
						pageSize: 25,
						displayInfo:true,
						displayMsg:'Grupos {0} - {1} de {2}',
						emptyMsg:"No hay Grupos"
					});

				function siAdj(){if(gSm.getSelected()){
					
					/*desde aqui falta verificar el monto aprobado para que pueda adjudicar*/
					
				adjudicar(gSm.getSelected().data.reformular,gSm.getSelected().data.id_solicitud_compra_det, gSm.getSelected().data.cantidad_adjudicada,gSm.getSelected().data.id_cotizacion_det,gSm.getSelected().data.id_proceso_compra_det,id_item,gSm.getSelected().data.cantidad,gSm.getSelected().data.id_cotizado,gSm.getSelected().data.precio_cotizado,gSm.getSelected().data.monto_aprobado,gSm.getSelected().data.id_adjudicacion)}}
			
				function noAdj(){
					if(gDlg.isVisible()){
						gDlg.hide()
					}
				} 
				
				
				function adjudicar(reformular,id_solicitud_compra_det, cantidad_adjudicada,id_cotizacion_det,id_proceso_det,id_item,cantidad_solicitada,id_item_cotizado,precio_cotizado, monto_aprobado,id_adjudicacion){
				Actualizar();
				  // var record=getSelectionModel().getSelected(); //es el primer registro selecionado
				   var filas;
				   filas= ds_g.getModifiedRecords();
				   
				   var cont = filas.length;
				   /***/
				   if(cont>0){//cant de regis modif > 0?
			            if(confirm("�Est� seguro de guardar los cambios?")){
								//postData, para el envio de datos a la capa de control
							var postData="cantidad_ids="+cont;
							var i=0;
							
							for(i=0;i<cont;i++){
							    var record=filas[i].data;
							    postData=postData+"&id_solicitud_compra_det_"+i+"="+record['id_solicitud_compra_det']
							    			     +"&id_proceso_compra_det_"+i+"="+record['id_proceso_compra_det']
							    			     +"&id_item_"+i+"="+record['id_item']
							    			     +"&cantidad_adjudicada_"+i+"="+record['cantidad_adjudicada']
							    			     +"&id_item_cotizado_"+i+"="+record['id_cotizado']
							    			     +"&cantidad_solicitada_"+i+"="+record['cantidad_solicitada']
							    			     +"&id_cotizacion_det_"+i+"="+record['id_cotizacion_det']
							    			     +"&reformular_"+i+"="+record['reformular']
							    			     +"&precio_cotizado_"+i+"="+record['precio_cotizado']
							   					 +"&monto_aprobado_"+i+"="+record['monto_aprobado']
							   					 +"&bandera_"+i+"="+bandera
							   					 +"&id_adjudicacion_"+i+"="+record['id_adjudicacion']
							}
							 Ext.Ajax.request({
				   	  		    url:direccion+"../../../control/adjudicacion/ActionGuardarAdjudicacion.php",
				   	  		    params:postData,
				   	  		    method:'POST',
								success:terminado,
								failure:Cm_conexionFailure,
								timeout:100000//TIEMPO DE ESPERA PARA DAR FALLO
							});
							Actualizar();
					}
				}
			}
					gDlg.on('hide',function(){Actualizar()});
					sw_grup=false;
					
					gridG.on('afteredit',verificarCantAdj);
					gridG.on('beforeedit',reformularAdj);
					gridG.on('validateedit',validarMonto);
					gridG.on('validateedit',verificarAdjudicado);
						
			}
			
				function ocultar(){
					 if(bandera){//para adjudicar
					   	gridG.getColumnModel().setHidden(8,true);
						gridG.getColumnModel().setHidden(7,false);
						gridG.getColumnModel().setEditable(7,true);
						gridG.getColumnModel().setEditable(8,false);
					 }else{ //para reformular
					   	gridG.getColumnModel().setHidden(7,true);
						gridG.getColumnModel().setHidden(8,false);
						gridG.getColumnModel().setEditable(7,false);
						gridG.getColumnModel().setEditable(8,true);
					  }
				}
					
			

			function reloadDetalleGrupo(id_item,id_cotizacion,cantidad_cotizada,item_cotizado,adj){
			   
				gSm.clearSelections();
				ocultar();
				//gDlg.buttons[0].enable();
				gDlg.show();
				ds_g.rejectChanges();
				ds_g.reload({params:{
					start:0,
					limit:100,
					//id_proceso_det:id_proceso_det,
					
					id_item:id_item,
					id_cotizacion:id_cotizacion,
					adj:adj
					
				}})
			}

		
			
		    function Actualizar(){
				ds.load(ds.lastOptions);//actualizar
				ds.rejectChanges()//vacia el vector de records modificados
			}

			
			this.EnableSelect=function(x,z,y){
		      enable(x,z,y)
	        }
	
function salta(){
       ContenedorPrincipal.getPagina(idContenedorPadre).pagina.btnActualizar();
	}
			//para que los hijos puedan ajustarse al tama�o
			this.getLayout=function(){return layout_adjudicacion_item.getLayout()};
			//para el manejo de hijos

			this.Init(); //iniciamos la clase madre
			this.InitBarraMenu(paramMenu);
			this.InitFunciones(paramFunciones);
			//para agregar botones
			
			this.AdicionarBoton('../../../lib/imagenes/menu-show.gif','Detalle de Adjudicacion',btn_detalle_adjudicacion,true,'detalle_adjudicacion','Adjudicar');
			this.AdicionarBoton('../../../lib/imagenes/menu-show.gif','Reformular Solicitud',btn_reformulacion,true,'reformular','Reformular');

			var CM_getBoton=this.getBoton;
        	
        	CM_getBoton('detalle_adjudicacion-'+idContenedor).enable();
        	CM_getBoton('reformular-'+idContenedor).enable();
        	
        	function  enable(sel,row,selected){
        		var record=selected.data; 
        			if(selected&&record!=-1){
        				     				
        			}
        
        			enableSelect(sel,row,selected);
        		}
        			this.iniciaFormulario();
			iniciarEventosFormularios();
			layout_adjudicacion_item.getLayout().addListener('layout',this.onResize);
			layout_proceso_adjudicacion_det.getVentana().addListener('beforehide',salta);
			ContenedorPrincipal.getPagina(idContenedorPadre).pagina.getLayout().addListener('layout',this.onResizePrimario);

}