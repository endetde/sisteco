<?php
require('../../../../lib/fpdf/fpdf.php');
require('../../../../lib/funciones.inc.php');
include_once("../../../../lib/configuracion.log.php");
//include_once("../../rcm_LibModeloAlmacenes.php");
include_once("../../LibModeloControlAsistencia.php");
define('FPDF_FONTPATH','font/');

class PDF extends FPDF
{    //Cargar los datos
	//Cabecera de p�gina

	function Header()
	{	global $title;
	$this->SetLeftMargin(15);
	$funciones = new funciones();
	//Logo
	$this->Image('../../../../lib/images/logo_reporte.jpg',160,4,36,13);
	$this->Ln(8);
		$this->SetLineWidth(.1);

		$this->SetFont('Arial','B',12);
		$this->Cell(200,10,'TOTAL DE TIEMPO NO TRABAJADO',0,0,'C');
		$this->Ln(7);
		$this->SetFont('Arial','B',10);
		$this->Cell(30,8,'FUNCIONARIO:',0,0,'L');
		$this->SetFont('Arial','',10);
		$this->Cell(170,8,$_SESSION['funcionario'],0,0,'L');
		$this->Ln(7);
		$this->SetFont('Arial','B',10);
		$this->Cell(20,8,'DESDE:',0,0,'L');
		$this->SetFont('Arial','',10);
		$this->Cell(30,8,cambiarFormatoFecha($_SESSION['fecha_desde'],1),0,0,'L');
		$this->SetFont('Arial','B',10);
		$this->Cell(20,8,'HASTA:',0,0,'L');
		$this->SetFont('Arial','',10);
		$this->Cell(50,8,cambiarFormatoFecha($_SESSION['fecha_hasta'],1),0,0,'L');
		$this->Ln(8);
		$this->SetDrawColor(103,113,157);
		$this->SetFillColor(253,184,19);
		$this->SetFont('Arial','B',8);		
		$this->Cell(70,8,'TOTAL DE TIEMPO NO TRABAJADO',1,0,'C',1);
		$this->Ln(8);
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
		$this->Cell(90,10,'Usuario: '.$_SESSION["ss_nombre_usuario"] ,0,0,'L');
		$this->Cell(75,10,'P�gina '.$this->PageNo().' de {nb}',0,0,'L');
		$this->Cell(70,10,'Fecha: '.$fecha ,0,0,'L');
		$this->ln(3);
		$this->Cell(90,10,'',0,0,'L');
		$this->Cell(75,10,'',0,0,'L');
		$this->Cell(70,10,'Hora: '.$hora ,0,0,'L');
		
	}

  	/////////////////////////////////////////////////////////////////////////////
  	function LoadData($id_empleado,$fecha_ini,$fecha_fin)
	{     $cant=10000;
		  $puntero=0;
	      $sortcol='lr.fecha';
	      $sortdir='asc';
		  $criterio_filtro=" lr.id_empleado=".$id_empleado;
		  $criterio_filtro=$criterio_filtro." AND lr.fecha >= ''$fecha_ini''";
	      $criterio_filtro=$criterio_filtro." AND lr.fecha <= ''$fecha_fin''";			
		 
		
           	//Leer las l�neas del fichero
	
	$Custom=new cls_CustomDBControlAsistencia();
	$Custom->ListarTiempoNoTrab($cant,$puntero,$sortcol,$sortdir,$criterio_filtro,$id_financiador,$id_regional,$id_programa,$id_proyecto,$id_actividad);
	$var1=$Custom->salida;
	return $var1;
	}

	//Tabla coloreada
	function FancyTable($data)
	{  
				
		
		
	    $this->SetLineWidth(.1);//grosor de la linea
		//Cabecera
	  	$this->SetFont('Arial','B',8);
		$w=array(70);
			//Datos					
			$this->SetFont('Arial','',8);
			$i=1;	
			$this->SetDrawColor(103,113,157);
		    $this->SetFillColor(221,221,221);            	        
	        foreach($data as $row){
	        	$relleno=0;
	        	    if($i%2==0){
	        	    	$relleno=1;
	        	    }
	        	   $this->Cell($w[0],5,$row[0],1,0,'C',$relleno);//desc_ret_incor
					$this->Ln(5);
					$i=$i+1;
			}
					      
	}

}
function cambiarFormatoFecha($fecha,$band){ 
    if($band==0){
    list($anio,$mes,$dia)=explode("-",$fecha); 
    return $dia."-".$mes."-".$anio;	
    }
	 else{
	 	list($mes,$dia,$anio)=explode("/",$fecha); 
    return $dia."/".$mes."/".$anio;
	 }
}
$pdf=new PDF('P','mm','Letter');
$pdf->AliasNbPages();
//T�tulos de las columnas
        $id_empleado=$id_empleado;
		$fecha_ini=$fecha_ini;
		$fecha_fin=$fecha_fin;
$data=$pdf->LoadData($id_empleado,$fecha_ini,$fecha_fin);
  	/*echo($fecha_inicio);
	exit();*/
$pdf->SetFont('Arial','',12);
$pdf->SetAutoPageBreak(1,35);
$pdf->SetTopMargin(15);
$pdf->SetRightMargin(10);
$pdf->SetLeftMargin(10);
$pdf->AddPage();
$pdf->FancyTable($data);
$pdf->Output();
?>