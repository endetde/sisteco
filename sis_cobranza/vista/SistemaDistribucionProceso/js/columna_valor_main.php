<?php
/**
 * Nombre:		  	    registro_documento_main.php
 * Prop�sito: 			pagina que arranca la configuracion de la vista del Hijo
 * Autor:				Generado Automaticamente
 * Fecha creaci�n:		2008-09-16 17:57:13
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
<?php if($_SESSION["ss_filtro_avanzado"]!=''){echo 'fa='.$_SESSION["ss_filtro_avanzado"].';';}?>	
var paramConfig={TamanoPagina:_CP.getConfig().ss_tam_pag,TiempoEspera:_CP.getConfig().ss_tiempo_espera,CantFiltros:1,FiltroEstructura:false,FiltroAvanzado:fa};
var maestro={
				id_concepto_factura:'<?php echo utf8_decode($m_id_concepto_factura);?>',
				nombre_concepto:'<?php echo utf8_decode($m_nombre_concepto);?>',
				id_lugar:'<?php echo utf8_decode($m_id_lugar);?>',
				id_sistema_distribucion:'<?php echo utf8_decode($m_id_sistema_distribucion);?>',
				tipo_concepto:'<?php echo utf8_decode($m_tipo_concepto);?>',
				id_categoria_cliente:'<?php echo utf8_decode($m_id_categoria_cliente);?>',
				nombre_lugar:'<?php echo utf8_decode($m_nombre_lugar);?>',
				nombre_categoria_cliente:'<?php echo utf8_decode($m_nombre_categoria_cliente);?>',
				id_depto_conta:'<?php echo utf8_decode($m_id_depto_conta);?>',
				id_gestion:'<?php echo utf8_decode($m_id_gestion);?>'
};
var idContenedorPadre='<?php echo $idContenedorPadre;?>';
var elemento;
elemento={idContenedor:idContenedor,pagina:new pagina_ColumnaValor(idContenedor,direccion,paramConfig,maestro,idContenedorPadre)};
_CP.setPagina(elemento);
}
Ext.onReady(main,main);