<?php
/**
 * Nombre:		  	    solicitud_compra_item_det_main.php
 * Prop�sito: 			pagina que arranca la configuracion de la vista del Hijo
 * Autor:				Rensi Arteaga Copari
 * Fecha creaci�n:		2008-05-16 09:53:33
 *
 */
session_start();
?>
//<script>
var pSolItemMul;
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
	<?php if($_SESSION["ss_filtro_avanzado"]!=''){echo 'fa='.$_SESSION["ss_filtro_avanzado"].';';}?>
	var paramConfig={TamanoPagina:_CP.getConfig().ss_tam_pag,TiempoEspera:_CP.getConfig().ss_tiempo_espera,CantFiltros:1,FiltroEstructura:false,FiltroAvanzado:fa};
	var maestro={
		id_solicitud_proceso_compra:<?php echo $m_id_solicitud_proceso_compra;?>,
		id_solicitud_compra:<?php echo $m_id_solicitud_compra;?>,
		id_proceso_compra:<?php echo $m_id_proceso_compra;?>,
		id_tipo_adq:<?echo $m_id_tipo_adq;?>,
		tipo_adq:'<?echo$m_tipo_adq;?>',
		id_moneda:'<?echo$m_id_moneda;?>',
		solicitante:'<?echo$m_solicitante;?>',
		num_solicitud:'<?echo$m_num_solicitud;?>',
		num_solicitud_sis:'<?echo$m_num_solicitud_sis;?>',
		fecha_sol:'<?echo$m_fecha_sol;?>',
		simbolo:'<?echo$m_simbolo;?>'};
		idContenedorPadre='<?php echo $idContenedorPadre;?>';
		pSolItemMul=new p_sco_mul_item_det(idContenedor,direccion,paramConfig,maestro,idContenedorPadre);
		var elemento={idContenedor:idContenedor,pagina:pSolItemMul};
		_CP.setPagina(elemento);
}
Ext.onReady(main,main);