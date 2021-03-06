<?php
//
//  $Id: GetCount.php,v 1.1 2003/06/06 14:39:44 cain Exp $
//

class tests_GetCount extends tests_UnitTest
{
    function _setup($mode)
    {
        $this->user = new tests_Common(TABLE_USER);
        switch ($mode) {
            case '6':
                $this->user->add(array('name'=>'x'));       
                $this->user->add(array('name'=>'y'));       
                $this->user->add(array('name'=>'z'));       
            case '3':
                $this->user->add(array('name'=>'x'));       
                $this->user->add(array('name'=>'y'));       
                $this->user->add(array('name'=>'z'));       
                break;
        }
    }

    function test_getCount3()
    {
        $this->_setup(3);
        $this->assertEquals(3,$this->user->getCount(),'Wrong count after inserting 3 rows');
    }
            
    function test_getCount6()
    {
        $this->_setup(6);
        $this->assertEquals(6,$this->user->getCount(),'Wrong count after inserting 6 rows');
    }

    function test_getCountGrouped3()
    {
        $this->_setup(6);
        $this->user->setGroup('name');
        $this->assertEquals(3,$this->user->getCount(),'Wrong count after 6 inserted and grouping them by name');
    }

    function test_getCountGrouped2()
    {
        $this->_setup(6);
        $this->user->setWhere('name="z"');
        $this->assertEquals(2,$this->user->getCount(),'setWhere and setGroup should have resulted in two');
    }

    function test_getCountGrouped1()
    {
        $this->_setup(6);
        $this->user->setGroup('name');
        $this->user->setWhere('name="z"');
        $this->assertEquals(1,$this->user->getCount(),'setWhere and setGroup should have resulted in one');
    }

    function test_getCountGrouped0()
    {
        $this->_setup(6);
        $this->user->setGroup('name');
        $this->user->setWhere('name="xxx"');
        $this->assertEquals(0,$this->user->getCount(),'setWhere and setGroup should have resulted in one');
    }

}

?>
