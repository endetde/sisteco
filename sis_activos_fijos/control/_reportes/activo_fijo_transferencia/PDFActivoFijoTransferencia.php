<?php
require('../../../../lib/fpdf/fpdf.php');
require('../../../../lib/funciones.inc.php');
include_once("../../../../lib/configuracion.log.php");
//include_once("../../rcm_LibModeloAlmacenes.php");
include_once("../../LibModeloActivoFijo.php");
define('FPDF_FONTPATH','font/');

class PDF extends FPDF
{    //Cargar los datos
	//Cabecera de p�gina

	function Header()
	{	global $title;
	$this->SetLeftMargin(15);
	$funciones = new funciones();
	//Logo
	$this->Image('../../../../lib/images/logo_reporte.jpg',230,2,36,13);
	}

	function Footer()
	{	//Posici�n: a 1,5 cm del final
		$this->SetY(-15);
		//Arial italic 8
		$this->SetFont('Arial','I',6);
		//N�mero de p�gina
		$fecha=date("d-m-Y");
		//hora
		$hora=date("H:i:s");
		$this->Cell(120,10,'Usuario: '.$_SESSION["ss_nombre_usuario"] ,0,0,'L');
		$this->Cell(110,10,'P�gina '.$this->PageNo().' de {nb}',0,0,'L');
		$this->Cell(100,10,'Fecha: '.$fecha ,0,0,'L');
		$this->ln(3);
		$this->Cell(100,10,'',0,0,'L');
		$this->Cell(130,10,'',0,0,'L');
		$this->Cell(200,10,'Hora: '.$hora ,0,0,'L');
		
	}


	/////////////////////////////////////////////////////////////////////////////

	function LoadData($id_financiador,$id_regional,$id_programa,$id_proyecto,$id_actividad,$id_tipo_activo,$id_sub_tipo_activo,$id_activo_fijo,$id_unidad_organizacional,$fecha_asig1,$fecha_asig2)
	{     $cant=20;
	      $puntero=0;
	      //$sortcol='actif.codigo';
	      $sortcol='actif.codigo,afe.id_activo_fijo_empleado';
	$sortdir='asc';
	$criterio_filtro="actif.id_activo_fijo like ''$id_activo_fijo''";
	$criterio_filtro=$criterio_filtro." and subtip.id_sub_tipo_activo like ''$id_sub_tipo_activo''";
	$criterio_filtro=$criterio_filtro." and tipo.id_tipo_activo like ''$id_tipo_activo''";
	$criterio_filtro=$criterio_filtro." and uniorg.id_unidad_organizacional like ''$id_unidad_organizacional''";
	$criterio_filtro=$criterio_filtro." and afe.fecha_asig >= ''$fecha_asig1''";
	$criterio_filtro=$criterio_filtro." and afe.fecha_asig <= ''$fecha_asig2''";

	//Leer las l�neas del fichero
	$Custom=new cls_CustomDBActivoFijo();
	$Custom->ListarActivoTransferencia($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$id_financiador,$id_regional,$id_programa,$id_proyecto,$id_actividad);
	$var1=$Custom->salida;
	
	return $var1;
	}

	//Tabla coloreada
	function FancyTable($header,$data)
	{   $this->SetDrawColor(190,190,190);
		$this->SetLineWidth(.1);
		
		$this->SetFont('Arial','B',12);
		//Movernos a la derecha

		$this->Cell(250,10,'TRANSFERENCIA DE ACTIVOS FIJOS',0,0,'C');
		$this->Ln(8);
		$this->SetFont('Arial','B',7);
		$this->Cell(185,10,'Fecha Asignaci�n (inicio) :  '.$_SESSION['rep_af_det_fecha_asig1'],0,0,'L');
		$this->Ln(5);
		$this->Cell(185,10,'Fecha Asignaci�n (fin)      :  '.$_SESSION['rep_af_det_fecha_asig2'],0,0,'L');
		$this->Ln(8);
		
		/*//Colores, ancho de l�nea y fuente en negrita
		$this->SetFillColor(255,255,255);
		$this->SetTextColor(0);
		$this->SetDrawColor(0,33,91);
		//$this->SetLineWidth(0.3);*/
		$this->SetFont('','B',6);
        $data1=array();
        $cont=1;
        foreach($data as $d){
        	$aux=array();
        	
        	array_push($aux,$cont);
        	for($i=0;$i<9;$i++){
        		array_push($aux,$d[$i]);
        	}
        	$cont++;
        	array_push($data1,$aux);
        }
        
        $data=$data1;
    
		$this->SetWidths(array(15,22,50,42,41,42,41));
		//codigo, descripcion,estado,estado funcional,fecha compra,monto compra,ubicacion, responsable,unidad organizacional

		$this->SetAligns( array('C','C','C','C','C','C','C'));// para centrear los titulos del header

		///para dibujar la linea que no salia
		$y=$this->GetY();
		$this->Cell(253,0,'','T',1,'');
		$this->Row($header,1);
		$y2=$this->GetY();
		$this->Line(268,$y,268,$y2);
		$this->Cell(253,0,'','B',1,'');

		//$this->SetFillColor(0, 0, 0);

		$this->SetFont('','',6);//tama�o de la letra del detalle
		$this->SetAligns( array('C','L','L','L','L','L','L'));// para convertir el centrado lado izquierdo
		foreach ($data as $d)
		
		{  
			$y=$this->GetY();
			$this->Cell(253,0,'','T',1,'');
		
			$this->Row($d,1);
			$y2=$this->GetY();
			$this->Line(268,$y,268,$y2);
		}
		$this->Cell(253,0,'','B',1,'');
		$rama_nombre=array();
		$fecha=date("d-m-Y");


	}

}


$pdf=new PDF('L','mm','Letter');
$pdf->AliasNbPages();
//T�tulos de las columnas
$header=array('NUM','C�DIGO','DESCRIPCI�N','RESPONSABLE ANTERIOR','UNI.ORGANIZACIONAL ANTERIOR','RESPONSABLE NUEVO','UNI.ORGANIZACIONAL NUEVO');//toodo lo que quiero mostrar en mis columnas
//$header_item=array('C�digo','Material','Descripci�n','Cantidad');
//Carga de datos
//$tipo=$tipo;
/*echo "id_fin:".$id_financiador."<br>";
echo "id_reg:".$id_regional."<br>";
echo "id_prog:".$id_programa."<br>";
echo "id_proy:".$id_proyecto."<br>";
echo "id_act:".$id_actividad."<br>";
echo "id_tipo:".$id_tipo_activo."<br>";
echo "id_sub:".$id_sub_tipo_activo."<br>";
echo "id_activo:".$id_activo_fijo."<br>";
echo "fecha1:".$fecha_asig1."<br>";
echo "fecha2:".$fecha_asig2."<br>";
echo "id_uni:".$id_unidad_organizacional."<br>";
exit;*/
$data=$pdf->LoadData($id_financiador,$id_regional,$id_programa,$id_proyecto,$id_actividad,$id_tipo_activo,$id_sub_tipo_activo,$id_activo_fijo,$id_unidad_organizacional,$fecha_asig1,$fecha_asig2);

$pdf->SetFont('Arial','',12);
$pdf->SetAutoPageBreak(1,35);
$pdf->SetTopMargin(15);
$pdf->SetRightMargin(10);
$pdf->SetLeftMargin(10);
$pdf->AddPage();
$pdf->FancyTable($header,$data);
$pdf->Output();
?>