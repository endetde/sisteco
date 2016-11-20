--------------- SQL ---------------

CREATE OR REPLACE FUNCTION alma.f_tai_item_sel (
  pm_id_usuario integer,
  pm_ip_origen varchar,
  pm_mac_maquina text,
  pm_codigo_procedimiento varchar,
  pm_proc_almacenado varchar,
  pm_cant integer,
  pm_puntero integer,
  pm_sortcol varchar,
  pm_sortdir varchar,
  pm_criterio_filtro varchar,
  pm_id_financiador varchar,
  pm_id_regional varchar,
  pm_id_programa varchar,
  pm_id_proyecto varchar,
  pm_id_actividad varchar
)
RETURNS SETOF record AS
$body$
/************************************************************************** SISTEMA ENDESIS - SISTEMA DE ALMACEN
***************************************************************************
 SCRIPT:          alma.f_tai_item_sel
 DESCRIPCI�??N:     Devuelve las consultas a la tabla train.tai_item
 AUTOR:           Ruddy Luj�?¡n Bravo
 FECHA:           27-08-2013 17:10:00
 COMENTARIOS:    

***************************************************************************/
--------------------------
-- CUERPO DE LA FUNCI�??N --
--------------------------

-- PAR�?METROS FIJOS
/*
pm_id_usuario                               integer (si))
pm_ip_origen                                varchar(40) (si)
pm_mac_maquina                              macaddr (si)
pm_log_error                                varchar -- log -- error //variable interna (si)
pm_codigo_procedimiento                     varchar  // valor que identifica el tipo
                                                        de operacion a realizar
                                                        insert  (insertar)
                                                        delete  (eliminar)
                                                        update  (actualizar)
                                                        select  (visualizar)
pm_proc_almacenado                          varchar  // para colocar el nombre del procedimiento en caso de ser llamado
                                                        por otro procedimiento
pm_cant
pm_puntero
pm_sortcol
pm_sortdir
pm_criterio_filtro
pm_id_financiador
pm_id_regional
pm_id_programa
pm_id_proyecto
pm_id_actividad

*/

-- DECLARACI�??N DE VARIABLES PARTICULARES


-- DECLARACI�??N DE VARIABLES DE LA FUNCI�??N (LOCALES)

DECLARE

  --PAR�?METROS FIJOS
  g_id_subsistema integer; -- ID SUBSISTEMA
  g_id_lugar integer; -- ID LUGAR
  g_numero_error varchar; -- ALMACENA EL N�??MERO DE ERROR
  g_mensaje_error varchar; -- ALMACENA MENSAJE DEL ERROR

  g_privilegio_procedimiento boolean;
  -- BANDERA PARA VERIFICAR LLAMADA DE PROCEDIMIENTO
  --BANDERA PARA VERIFICAR LLAMADA DE PROCEDIMIENTO
  g_privilegio_procedimiento_resp_dist boolean;
  -- BANDERA PARA VERIFICAR LLAMADA DE PROCEDIMIENTO
  g_privilegio_procedimiento_resp_sis_dist boolean;
  -- BANDERA PARA VERIFICAR LLAMADA DE PROCEDIMIENTO
  g_privilegio_procedimiento_resp_entifin boolean;
  -- BANDERA PARA VERIFICAR LLAMADA DE PROCEDIMIENTO


  g_descripcion_log_error text; -- PARA ALMACENAR EL MENSAJE DE ERROR O LOG
  g_reg_evento boolean;
  g_reg_error boolean;
  g_registros record;
  -- PARA ALMACENAR EL CONJUNTO DE DATOS RESULTADO DEL SELECT
  g_respuesta varchar; -- VARIABLE QUE CONTENDR�? LOS MENSAJES DE ERROR
  g_consulta text; -- VARIABLE QUE CONTENDR�? LA CONSULTA DIN�?MICA PARA EL FILTRO
  g_nivel_error varchar; -- VARIABLE QUE CONTIENE EL NIVEL DE ERROR
  --      ERROR DE SINTAXIS (cuando llega a exception) = 1
  --      ERROR L�??GICO (CR�?TICO) = 2
  --      ERROR L�??GICO (INTERMEDIO) = 3
  --      ERROR L�??GICO (ADVERTENCIA) = 4
  g_nombre_funcion varchar; --NOMBRE F�?SICO DE LA FUNCI�??N
  g_separador varchar(10);
  --Caracteres que servir�?¡n para separar el mensaje, nivel y origen del error
  g_rol_adm boolean; -- Identifica si el usuario tiene rol administrador
  g_id_usuario_rol integer;
  g_id_item integer;

  g_cantidad_ituc numeric;	
  g_reservados				numeric;
  g_reserva_items	record;

BEGIN

  ---*** INICIACI�??N DE VARIABLES
  g_privilegio_procedimiento := FALSE;
  g_separador = '#@@@#'; --Separador para mensajes devueltos por la funci�?³n
  g_nombre_funcion :='f_tai_item_sel';
  g_rol_adm:= false;
  ---*** VERIFICACI�??N ROL ADMINISTRADOR

  IF EXISTS(
    SELECT 1
    FROM sss.tsg_usuario_rol usrol
    WHERE usrol.id_usuario = pm_id_usuario AND
          usrol.id_rol = 1) THEN
    g_rol_adm := true;
  END IF;

  ---*** OBTENCI�??N DEL ID DEL SUBSISTEMA

  SELECT id_subsistema
  INTO g_id_subsistema
  FROM sss.tsg_procedimiento_db
  WHERE codigo_procedimiento = pm_codigo_procedimiento;

  ---*** OBTENCI�??N DEL ID DEL LUGAR ASIGNADO AL USUARIO

  SELECT ul.id_lugar
  INTO g_id_lugar
  FROM sss.tsg_usuario_lugar ul
  WHERE ul.id_usuario = pm_id_usuario;

  ---*** VALIDACI�??N DE LLAMADA POR USUARIO O FUNCI�??N
  IF pm_proc_almacenado IS NOT NULL THEN
    IF NOT EXISTS(
      SELECT 1
      FROM pg_proc
      WHERE proname = pm_proc_almacenado) THEN
      g_descripcion_log_error := 'Procedimiento ejecutor inexistente';
      g_nivel_error := '2';
      g_respuesta := param.f_pm_mensaje_error(g_descripcion_log_error,
        g_nombre_funcion, g_nivel_error, pm_codigo_procedimiento);

      --REGISTRA EL LOG
      g_reg_evento:= sss.f_tsg_registro_evento(pm_id_usuario            ,
        g_id_subsistema           ,g_id_lugar         ,g_descripcion_log_error,
        pm_ip_origen              ,pm_mac_maquina            ,'error'
          ,NULL,
        pm_codigo_procedimiento   ,pm_proc_almacenado);
      --DEVUELVE MENSAJE DE ERROR
      RAISE EXCEPTION '%', g_respuesta;
      ELSE
      g_privilegio_procedimiento := TRUE;
    END IF;
  END IF;

  ---*** VERIFICACI�??N DE PERMISOS DEL USUARIO
  IF NOT g_privilegio_procedimiento THEN
    g_privilegio_procedimiento := sss.f_sg_validacion_procedimiento(
      pm_id_usuario,pm_codigo_procedimiento,NULL);
  END IF;




  ---*** SI NO SE TIENE PERMISOS DE EJECUCI�??N SE RETORNA EL MENSAJE DE ERROR
  --IF NOT g_privilegio_procedimiento THEN
  IF NOT (g_privilegio_procedimiento ) THEN

    g_nivel_error := '3';
    g_descripcion_log_error :=
      'El usuario no tiene permisos de ejecuci�?³n del procedimiento';
    g_respuesta := param.f_pm_mensaje_error(g_descripcion_log_error,
      g_nombre_funcion, g_nivel_error, pm_codigo_procedimiento);

    --REGISTRA EL LOG
    g_reg_evento:= sss.f_tsg_registro_evento(pm_id_usuario             ,
      g_id_subsistema           ,g_id_lugar         ,g_descripcion_log_error,
      pm_ip_origen              ,pm_mac_maquina            ,'error'            ,
        NULL,
      pm_codigo_procedimiento   ,pm_proc_almacenado);
    --DEVUELVE MENSAJE DE ERROR
    RAISE EXCEPTION '%',g_descripcion_log_error;
  END IF;

  ---***SELECCI�??N DE OPERACI�??N A REALIZAR
  IF pm_codigo_procedimiento  = 'AL_ITEMAI_SEL' THEN
    BEGIN
      g_consulta := 'SELECT
                                al.usuario_reg,
                                COALESCE(to_char(al.fecha_reg,''dd-mm-yyyy''),''0'') AS fecha_reg,
                                al.id_item,
                                al.id_clasificacion,
                                al.id_unidad_medida,
                                al.codigo,
                                al.nombre,
                                al.descripcion,
                                al.codigo_fabrica,
                                al.num_por_clasificacion,
                                al.bajo_responsabilidad,
                                al.estado,
                                al.metodo_valoracion,
                                cla.nombre as nombre_clasificacion,
                                UNMEDB.nombre as nombre_medida
                                ,''0''::numeric
                                ,al.peso
                                ,al.calidad 
                                ,al.orden   
                                ,''0''::numeric 
                                ,tip.id_tipo_material,tip.cod_tipo_material||'' - ''||tip.nombre_tipo_material as desc_tipo_material                       
							FROM alma.tai_item al
        					INNER JOIN alma.tai_clasificacion cla ON cla.id_clasificacion = al.id_clasificacion
                            INNER JOIN param.tpm_unidad_medida_base UNMEDB ON UNMEDB.id_unidad_medida_base = al.id_unidad_medida
                            LEFT JOIN alma.tai_tipo_material tip on tip.id_tipo_material=al.id_tipo_material
                            WHERE ';
                            
      g_consulta := g_consulta || pm_criterio_filtro;
      -- SE AUMENTA EL ORDEN Y LOS PAR�?METROS DE LA CANTIDAD DE REGISTROS A DESPLEGAR
      g_consulta := g_consulta || ' ORDER BY ' || pm_sortcol;
      g_consulta := g_consulta || ' LIMIT ' || pm_cant || ' OFFSET ' ||pm_puntero;
	  raise notice '%',g_consulta;	
      FOR g_registros in      EXECUTE (g_consulta)
      LOOP
        RETURN NEXT g_registros;
      END LOOP;

      -- DESCRIPCI�??N DE �??XITO PARA GUARDAR EN EL LOG
      g_descripcion_log_error := 'Consulta ejecutada';
    END;
	
    ELSIF pm_codigo_procedimiento = 'AL_ITEMSOLIC_SEL' THEN
    BEGIN
    	--lista los items que tienen una existencia > 0 de acuerdo al almacen seleccionado 
    	g_consulta := '	SELECT 
                            al.usuario_reg,	COALESCE(to_char(al.fecha_reg,''dd-mm-yyyy''),''0'') AS fecha_reg,
                            al.id_item,
                            al.id_clasificacion,	al.id_unidad_medida,	al.codigo,	al.nombre,
                            al.descripcion,	al.codigo_fabrica,	al.num_por_clasificacion,	al.bajo_responsabilidad,
                            al.estado,	al.metodo_valoracion,	cla.nombre as nombre_clasificacion,	UNMEDB.nombre as nombre_medida 
                            ,val.cantidad ::numeric
                            ,al.peso
                            ,al.calidad
                            ,al.orden   
                            ,''0''::numeric as reservados    
                            ,tip.id_tipo_material,tip.cod_tipo_material||'' - ''||tip.nombre_tipo_material as desc_tipo_material                                 
                            FROM alma.tai_item al
                            INNER JOIN alma.tai_clasificacion cla ON cla.id_clasificacion = al.id_clasificacion
                            INNER JOIN param.tpm_unidad_medida_base UNMEDB ON UNMEDB.id_unidad_medida_base = al.id_unidad_medida
                            INNER JOIN alma.tai_item_valoracion_pp val on val.id_item=al.id_item
                            LEFT JOIN alma.tai_tipo_material tip on tip.id_tipo_material=al.id_tipo_material
                            
                            WHERE  ';
             	g_consulta := g_consulta || pm_criterio_filtro;
              -- SE AUMENTA EL ORDEN Y LOS PAR�?METROS DE LA CANTIDAD DE REGISTROS A DESPLEGAR
              g_consulta := g_consulta || ' ORDER BY ' || pm_sortcol;
              g_consulta := g_consulta || ' LIMIT ' || pm_cant || ' OFFSET ' || pm_puntero;
              

              FOR g_registros in      EXECUTE (g_consulta)
              LOOP
              	--g_reservados = alma.f_ai_totai_items(g_registros.id_item,CAST(pm_id_actividad as integer));
              	g_reserva_items = alma.f_ai_calculo_saldo(NULL,NULL,CAST(pm_id_actividad as integer),g_registros.id_item,'SOLIC');
              	g_registros.reservados = g_reserva_items.al_saldo_item;

                RETURN NEXT g_registros;
              END LOOP;

              -- DESCRIPCI�??N DE �??XITO PARA GUARDAR EN EL LOG
              g_descripcion_log_error := 'Consulta ejecutada';
    END;
    
    ELSIF pm_codigo_procedimiento = 'AL_ITEMSOLIC_COUNT' THEN
    BEGIN
    	  --count para filtrar cantidad de items, de acuerdo a la solicitud de salida
      		g_consulta := '	SELECT  COUNT(al.id_item) AS total                                         
                            FROM alma.tai_item al
                            INNER JOIN alma.tai_clasificacion cla ON cla.id_clasificacion = al.id_clasificacion
                            INNER JOIN param.tpm_unidad_medida_base UNMEDB ON UNMEDB.id_unidad_medida_base = al.id_unidad_medida
                            INNER JOIN alma.tai_item_valoracion_pp val on val.id_item=al.id_item
                            LEFT JOIN alma.tai_tipo_material tip on tip.id_tipo_material=al.id_tipo_material
                            WHERE  ';
            g_consulta := g_consulta || pm_criterio_filtro;
            FOR g_registros in      EXECUTE (g_consulta)
            LOOP
              	RETURN NEXT g_registros;
      		END LOOP;
            -- DESCRIPCI�??N DE �??XITO PARA GUARDAR EN EL LOG
            g_descripcion_log_error := 'Consulta de cantidad registrada';
    
    END;
    -- PARA LA CONSULTA DE CONTEO  
    ELSIF pm_codigo_procedimiento  = 'AL_ITEMAI_COUNT' THEN
    BEGIN
      --Cuenta todos los registros
      g_consulta :=     '	SELECT	COUNT(al.id_item) AS total
        					FROM alma.tai_item al
        					INNER JOIN alma.tai_clasificacion cla ON cla.id_clasificacion = al.id_clasificacion
                            INNER JOIN param.tpm_unidad_medida_base UNMEDB ON UNMEDB.id_unidad_medida_base = al.id_unidad_medida
                            LEFT JOIN alma.tai_tipo_material tip on tip.id_tipo_material=al.id_tipo_material
                            WHERE  ';

      g_consulta := g_consulta || pm_criterio_filtro;

      FOR g_registros in      EXECUTE (g_consulta)
      LOOP
        RETURN NEXT g_registros;
      END LOOP;

      -- DESCRIPCI�??N DE �??XITO PARA GUARDAR EN EL LOG
      g_descripcion_log_error := 'Consulta de cantidad registrada';
    END;
    
    ELSIF pm_codigo_procedimiento  = 'AL_ITEMUC_COUNT' THEN
    BEGIN
      --Cuenta todos los registros
      g_consulta :=     '	SELECT	COUNT(detuc.id_item) AS total
        					FROM alma.tai_detalle_unidad_constructiva detuc
							INNER JOIN alma.tai_item it on it.id_item=detuc.id_item
                            INNER JOIN param.tpm_unidad_medida_base um on um.id_unidad_medida_base=it.id_unidad_medida and um.estado_registro=''activo''
                            WHERE  ';

      g_consulta := g_consulta || pm_criterio_filtro;

      FOR g_registros in      EXECUTE (g_consulta)
      LOOP
        RETURN NEXT g_registros;
      END LOOP;

      -- DESCRIPCI�??N DE �??XITO PARA GUARDAR EN EL LOG
      g_descripcion_log_error := 'Consulta de cantidad registrada';
    END;
    
    ELSIF pm_codigo_procedimiento  = 'AL_ITEMUC_SEL' THEN
    BEGIN
      g_consulta :=     '	SELECT
                                al.usuario_reg,
                                COALESCE(to_char(al.fecha_reg,''dd-mm-yyyy''),''0'') AS fecha_reg,
                                al.id_item,
                                al.id_clasificacion,
                                al.id_unidad_medida,
                                al.codigo,
                                al.nombre,
                                al.descripcion,
                                al.codigo_fabrica,
                                al.num_por_clasificacion,
                                al.bajo_responsabilidad,
                                al.estado,
                                al.metodo_valoracion,
                                cla.nombre as nombre_clasificacion,
                                UNMEDB.nombre as nombre_medida
                                ,''0''::numeric
                                ,al.peso
                                ,al.calidad 
                                ,al.orden 
                                ,''0''::integer AS seleccionado
                                ,''0''::numeric AS cantidad_ituc                         
							FROM alma.tai_item al
        					INNER JOIN alma.tai_clasificacion cla ON cla.id_clasificacion = al.id_clasificacion
                            INNER JOIN param.tpm_unidad_medida_base UNMEDB ON UNMEDB.id_unidad_medida_base = al.id_unidad_medida
                            WHERE  ';

      g_consulta := g_consulta || pm_criterio_filtro;
         -- SE AUMENTA EL ORDEN Y LOS PAR�?METROS DE LA CANTIDAD DE REGISTROS A DESPLEGAR
      g_consulta := g_consulta || ' ORDER BY ' || pm_sortcol;
      g_consulta := g_consulta || ' LIMIT ' || pm_cant || ' OFFSET ' || pm_puntero;

      FOR g_registros in      EXECUTE (g_consulta)
      LOOP
      		--condicion para saber si el item fue registrado en la UC
          /*  IF EXISTS(SELECT 1 FROM alma.tai_detalle_unidad_constructiva uc WHERE uc.id_item = g_registros.id_item AND uc.id_unidad_constructiva = CAST(pm_id_regional as int4) )
            THEN
            	SELECT det.cantidad INTO g_cantidad_ituc
                FROM alma.tai_detalle_unidad_constructiva det
                WHERE det.id_unidad_constructiva=CAST(pm_id_regional as int4) AND det.id_item=g_registros.id_item
                ORDER BY det.id_detalle_unidad_constructiva DESC
                LIMIT 1;
            	g_registros.seleccionado = 1;
                g_registros.cantidad_ituc = g_cantidad_ituc;
            END IF;*/
      
        RETURN NEXT g_registros;
      END LOOP;

      -- DESCRIPCI�??N DE �??XITO PARA GUARDAR EN EL LOG
      g_descripcion_log_error := 'Consulta de cantidad registrada';
    END;
    
    ELSIF pm_codigo_procedimiento = 'AL_ITVALORIZ_COUNT' THEN
   	BEGIN
    	g_consulta:=' SELECT count(val.id_item_valoracion) as total
        			  FROM alma.tai_item_valoracion_pp val
                      INNER JOIN alma.tai_item ite on ite.id_item=val.id_item AND ite.estado=''activo''
                      INNER JOIN param.tpm_unidad_medida_base um on um.id_unidad_medida_base=ite.id_unidad_medida AND um.estado_registro=''activo'' 
                      WHERE  ';
        g_consulta := g_consulta || pm_criterio_filtro;
        

      FOR g_registros in EXECUTE (g_consulta)
      LOOP
        RETURN NEXT g_registros;
      END LOOP;
      -- DESCRIPCI�??N DE �??XITO PARA GUARDAR EN EL LOG
      g_descripcion_log_error := 'Consulta de cantidad registrada';
   	END;
    ELSIF pm_codigo_procedimiento = 'AL_ITVALORIZ_SEL' THEN
    BEGIN
    	g_consulta := '	SELECT 	val.id_item_valoracion,ite.id_item,val.cantidad,um.nombre as unidad_medida,
        						ite.nombre,ite.codigo||'' - ''||ite.nombre as desc_item
                        FROM alma.tai_item_valoracion_pp val
                        INNER JOIN alma.tai_item ite on ite.id_item=val.id_item AND ite.estado=''activo''
                        INNER JOIN param.tpm_unidad_medida_base um on um.id_unidad_medida_base=ite.id_unidad_medida AND um.estado_registro=''activo''
                        WHERE  ';
             	g_consulta := g_consulta || pm_criterio_filtro;
              -- SE AUMENTA EL ORDEN Y LOS PAR�?METROS DE LA CANTIDAD DE REGISTROS A DESPLEGAR
              g_consulta := g_consulta || ' ORDER BY ' || pm_sortcol;
              g_consulta := g_consulta || ' LIMIT ' || pm_cant || ' OFFSET ' || pm_puntero;
              raise notice '%',g_consulta;

              FOR g_registros in      EXECUTE (g_consulta)
              LOOP
                RETURN NEXT g_registros;
              END LOOP;

              -- DESCRIPCI�??N DE �??XITO PARA GUARDAR EN EL LOG
              g_descripcion_log_error := 'Consulta ejecutada';
    END;
		
    ELSE
    --Procedimiento inexistente
    g_nivel_error := '2';
    g_descripcion_log_error := 'Procedimiento inexistente';
    g_respuesta := param.f_pm_mensaje_error(g_descripcion_log_error,
      g_nombre_funcion, g_nivel_error, pm_codigo_procedimiento);

    --REGISTRA EL LOG
    g_reg_evento:= sss.f_tsg_registro_evento(pm_id_usuario            ,
      g_id_subsistema           ,g_id_lugar         ,g_descripcion_log_error,
      pm_ip_origen              ,pm_mac_maquina            ,'log'              ,
        NULL,
      pm_codigo_procedimiento   ,pm_proc_almacenado);
    --DEVUELVE MENSAJE DE ERROR
    RAISE EXCEPTION '%', g_respuesta;
  END IF;

  ---*** REGISTRO EN EL LOG EL �??XITO DE LA EJECUCI�??N DEL PROCEDIMIENTO
  g_reg_evento:= sss.f_tsg_registro_evento(pm_id_usuario             ,
    g_id_subsistema           ,g_id_lugar         ,g_descripcion_log_error,
    pm_ip_origen              ,pm_mac_maquina            ,'log'              ,
      NULL,
    pm_codigo_procedimiento   ,pm_proc_almacenado);
  RETURN;

  EXCEPTION

  WHEN others THEN
  BEGIN

    --SE OBTIENE EL MENSAJE Y EL N�??MERO DEL ERROR LANZADO POR EL GESTOR DE BASE DE DATOS
    g_mensaje_error:=SQLERRM;
    g_numero_error:=SQLSTATE;
    g_reg_error:= sss.f_tsg_registro_evento (pm_id_usuario            ,
      g_id_subsistema          ,g_id_lugar         ,g_mensaje_error,
      pm_ip_origen             ,pm_mac_maquina           ,'error'            ,
        g_numero_error,
      pm_codigo_procedimiento  ,pm_proc_almacenado);

    --SE DEVUELVE EL MENSAJE DE ERROR
    g_nivel_error := '1';
    g_descripcion_log_error := g_numero_error || ' - ' || g_mensaje_error;
    g_respuesta := param.f_pm_mensaje_error(g_descripcion_log_error,
      g_nombre_funcion, g_nivel_error, pm_codigo_procedimiento);

    RAISE EXCEPTION '%', 'f' || g_separador || g_respuesta;

  END;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER;