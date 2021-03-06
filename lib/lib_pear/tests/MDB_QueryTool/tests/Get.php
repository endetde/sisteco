<?php
//
//  $Id: Get.php,v 1.1 2003/06/09 19:48:19 quipo Exp $
//


class tests_Get extends tests_UnitTest
{
    function test_AddGet()
    {
        $user = new tests_Common(TABLE_USER);
        $newData = array(   'login'     =>  'cain',
                            'password'  =>  '0',
                            'name'      =>  'Lutz Testern',
                            'address_id'=>  0,
                            'company_id'=>  0
                        );
        $userId = $user->add( $newData );
        $newData['id'] = $userId;
        $this->assertEquals($newData,$user->get($userId));

        $newData = array(   'login'     =>  '',
                            'password'  =>  '',
                            'name'      =>  '',
                            'address_id'=>  0,
                            'company_id'=>  0
                        );
        $userId = $user->add( $newData );
        $newData['id'] = $userId;
        $this->assertEquals($newData,$user->get($userId));
    }

    // test if column==table works, using the table TABLE_QUESTION
    function test_tableEqualsColumn()
    {
        $question = new tests_Common(TABLE_QUESTION);
        $newData = array(TABLE_QUESTION => 'Why does this not work?');
        $id = $question->add($newData);

        $newData['id'] = $id;
        $this->assertEquals($newData, $question->get($id));
    }

    // test if column==table works, using the table TABLE_QUESTION
    function test_tableEqualsColumnGetAll()
    {
        $question = new tests_Common(TABLE_QUESTION);
        $newData = array(TABLE_QUESTION => 'Why does this not work?');
        $id = $question->add($newData);

        $newData['id'] = $id;
        $data = $question->getAll();
        // assertEquals doesnt sort arrays recursively, so we have to extract the data :-(
        // we cant do this:     $this->assertEquals(array($newData),$question->getAll());
        $this->assertEquals($newData, $data[0]);
    }

    // test if column==table works, using the table TABLE_QUESTION
    // this fails in v0.9.3
    // a join makes it fail!!!, the tests above are just convinience tests
    // they are actually meant to work !always! :-)
    function test_tableEqualsColumnJoinedGetAll()
    {
        $theQuestion = 'Why does this not work?';
        $theAnswer   = 'I dont know!';

        $question = new tests_Common(TABLE_QUESTION);
        $newQuest = array(TABLE_QUESTION => $theQuestion);
        $qid=$question->add($newQuest);

        $answer = new tests_Common(TABLE_ANSWER);
        $newAnswer = array(TABLE_QUESTION.'_id' => $qid, TABLE_ANSWER => $theAnswer);
        $aid = $answer->add($newAnswer);

        $question->autoJoin(TABLE_ANSWER);
        //$newData['id'] = $id;
        $data = $question->getAll();

        $expected =  array( '_answer_id' => $aid,
                            '_answer_answer' => $theAnswer,
                            '_answer_question_id' => $qid,
                            'id' => $qid,
                            'question' => $theQuestion);
        // assertEquals doesnt sort arrays recursively, so we have to extract the data :-(
        // we cant do this:     $this->assertEquals(array($newData),$question->getAll());
        $this->assertEquals($expected, $data[0]);
    }

    /**
    *   This method actually checks if the functionality that needs to be changed
    *   for the above test to work will still work after the change ...
    *
    *   check if stuff like MAX(id), LOWER(question), etc. will be converted to
    *       MAX(TABLE_QUESTION.id), LOWER(TABLE_QUESTION.question)
    *   this is done for preventing ambigious column names, that's why it only applies
    *   in joined queries ...
    */
    function test_testSqlFunction()
    {
        $theQuestion = 'Why does this not work?';
        $theAnswer   = 'I dont know!';

        $question = new tests_Common(TABLE_QUESTION);
        $newQuest = array(TABLE_QUESTION => $theQuestion);
        $qid=$question->add($newQuest);

        $answer    = new tests_Common(TABLE_ANSWER);
        $newAnswer = array(TABLE_QUESTION.'_id' => $qid, TABLE_ANSWER => $theAnswer);
        $aid = $answer->add($newAnswer);

        $question->autoJoin(TABLE_ANSWER);
//        $question->setSelect('id, '.TABLE_QUESTION.' as question, '.TABLE_ANSWER.' as answer');
        $question->setSelect('MAX(id),'.TABLE_ANSWER.'.id');
        $this->assertTrue(strpos($question->_buildSelectQuery(), 'MAX('.TABLE_QUESTION.'.id)'));

        // check '(question)'
        $question->setSelect('LOWER(question),'.TABLE_ANSWER.'.*');
        $this->assertTrue(strpos($question->_buildSelectQuery(), 'LOWER('.TABLE_QUESTION.'.question)'));

        // check 'id,'
        $question->setSelect('id, '.TABLE_ANSWER.'.*');
        $this->assertTrue(strpos($question->_buildSelectQuery(), TABLE_QUESTION.'.id'));

        // check 'id as qid'
        $question->setSelect('id as qid, '.TABLE_ANSWER.'.*');
        $this->assertTrue(strpos($question->_buildSelectQuery(), TABLE_QUESTION.'.id as qid'));

        // check 'id as qid'
        $question->setSelect('LOWER( question ), '.TABLE_ANSWER.'.*');
        $this->assertTrue(strpos($question->_buildSelectQuery(), 'LOWER( '.TABLE_QUESTION.'.question )'));
    }

}
?>