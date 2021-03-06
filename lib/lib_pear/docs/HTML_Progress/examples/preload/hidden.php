<?php
@include '../include_path.php';
/**
 * Simple example that hide a progress meter at end of process.
 *
 * @version    $Id: hidden.php,v 1.1 2004/06/27 18:30:54 farell Exp $
 * @author     Laurent Laville <pear@laurent-laville.org>
 * @package    HTML_Progress
 */

require_once 'HTML/Progress.php';

/*
    user callback: job to do while the progress meter is visible
 */
function myFunctionHandler($progressValue, &$obj)
{
    $obj->sleep();  // nothing to do here, except sleep a bit ...
}

$progress = new HTML_Progress();
$progress->setAnimSpeed(100);
$progress->setIncrement(10);
$progress->setProgressHandler('myFunctionHandler');
?>
<html>
<head>
<style type="text/css">
<!--
body {
	background-color: #CCCC99;
	color: #996;
	font-family: Verdana, Arial;
}

a:visited, a:active, a:link {
	color: yellow;
}

<?php echo $progress->getStyle(); ?>
// -->
</style>
<script type="text/javascript">
<!--
<?php echo $progress->getScript(); ?>
//-->
</script>
</head>
<body>

<?php 
echo $progress->toHtml();  
$progress->run();
$progress->hide();
?>

<h1>Your job is finished ! </h1>
<p>The progress meter is now hidden.</p>
<p>&lt;&lt; <a href="../index.html">Back examples TOC</a></p>

</body>
</html>
