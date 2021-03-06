<?php
//
//  $Id: Common.php,v 1.1 2003/06/06 14:39:44 cain Exp $
//

require_once 'DB/QueryTool.php';

// so we have all errors saved in one place
// its just due to the strange error handling i implemented here ... gotta change that some day
$_Common_Errors = array();

class tests_Common extends DB_QueryTool
{
    var $tableSpec = array(
                        array('name'    =>  TABLE_QUESTION,     'shortName' =>  TABLE_QUESTION)
                        ,array('name'    =>  TABLE_ANSWER,      'shortName' =>  TABLE_ANSWER) 
                        );

    function tests_Common($table=null)
    {
        if ($table != null) {
            $this->table = $table;
        }
        parent::DB_QueryTool( DB_DSN );       
        $this->setErrorSetCallback( array(&$this,'errorSet') );
        $this->setErrorLogCallback( array(&$this,'errorLog') );
    }
    
    //
    //  just for the error handling
    //
    
    function errorSet($msg)
    {
        $GLOBALS['_Common_Errors'][] = array('set',$msg);
    }

    function errorLog($msg)
    {
        $GLOBALS['_Common_Errors'][] = array('log',$msg);
    }
    
    function getErrors()
    {
        return $GLOBALS['_Common_Errors'];
    }
    
}

?>
