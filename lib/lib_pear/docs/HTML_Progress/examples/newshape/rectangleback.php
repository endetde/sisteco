<?php 
@include '../include_path.php';
/**
 * Reverse Rectangle Progress example.
 * 
 * @version    $Id: rectangleback.php,v 1.1 2004/06/29 20:48:52 farell Exp $
 * @author     Laurent Laville <pear@laurent-laville.org>
 * @package    HTML_Progress
 */

require_once 'HTML/Progress.php';

$bar = new HTML_Progress();
$bar->setAnimSpeed(100);
$bar->setIncrement(10);

$ui =& $bar->getUI();
$ui->setFillWay('reverse');
$ui->setOrientation(HTML_PROGRESS_POLYGONAL);
$ui->setCellAttributes(array(
        'width'  => 10,
        'height' => 10,
        'active-color'   => 'red',
        'inactive-color' => 'orange',
        )
);
$ui->setCellCoordinates(15,3);         // Rectangle 15x3
?>
<html>
<head>
<title>Reverse Rectangle ProgressBar example</title>
<style type="text/css">
<!--
<?php echo $bar->getStyle(); ?>

body {
	background-color: #FFFFFF;
	color: #000000;
	font-family: Verdana, Arial;
}

a:visited, a:active, a:link {
	color: navy;
}
// -->
</style>
<script type="text/javascript">
<!--
<?php echo $ui->getScript(); ?>
//-->
</script>
</head>
<body>
<h1><?php echo basename(__FILE__); ?></h1>

<?php 
echo $bar->toHtml(); 
$bar->run();
?>

<p>&lt;&lt; <a href="../index.html">Back examples TOC</a></p>

</body>
</html>