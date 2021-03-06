<?php

/**
 * API Unit tests for PEAR_PackageFileManager package.
 * 
 * @version    $Id: PEAR_PackageFileManager_TestCase_addDependency.php,v 1.1 2003/10/18 03:52:23 cellog Exp $
 * @author     Laurent Laville <pear@laurent-laville.org> portions from HTML_CSS
 * @author     Greg Beaver
 * @package    PEAR_PackageFileManager
 */

/**
 * @package PEAR_PackageFileManager
 */

class PEAR_PackageFileManager_TestCase_addDependency extends PHPUnit_TestCase
{
    /**
     * A PEAR_PackageFileManager object
     * @var        object
     */
    var $packagexml;

    function PEAR_PackageFileManager_TestCase_addDependency($name)
    {
        $this->PHPUnit_TestCase($name);
    }

    function setUp()
    {
        error_reporting(E_ALL);
        $this->errorOccured = false;
        set_error_handler(array(&$this, 'errorHandler'));

        $this->packagexml = new PEAR_PackageFileManager;
        PEAR::pushErrorHandling(PEAR_ERROR_CALLBACK, array(&$this, 'PEARerrorHandler'));
        $this->errorThrown = false;
        $this->_expectedMessage = 'NO ERROR TRIGGERED';
        $this->_expectedCode = -1;
        $this->_testMethod = 'unknown';
    }

    function tearDown()
    {
        unset($this->packagexml);
        PEAR::popErrorHandling();
    }

    function errorCodeToString($code)
    {
        $codes = array_flip(array(
            'OOPS' => -1,
            'PEAR_PACKAGEFILEMANAGER_NOSTATE' => PEAR_PACKAGEFILEMANAGER_NOSTATE,
            'PEAR_PACKAGEFILEMANAGER_NOVERSION' => PEAR_PACKAGEFILEMANAGER_NOVERSION,
            'PEAR_PACKAGEFILEMANAGER_NOPKGDIR' => PEAR_PACKAGEFILEMANAGER_NOPKGDIR,
            'PEAR_PACKAGEFILEMANAGER_NOBASEDIR' => PEAR_PACKAGEFILEMANAGER_NOBASEDIR,
            'PEAR_PACKAGEFILEMANAGER_GENERATOR_NOTFOUND' => PEAR_PACKAGEFILEMANAGER_GENERATOR_NOTFOUND,
            'PEAR_PACKAGEFILEMANAGER_GENERATOR_NOTFOUND_ANYWHERE' => PEAR_PACKAGEFILEMANAGER_GENERATOR_NOTFOUND_ANYWHERE,
            'PEAR_PACKAGEFILEMANAGER_CANTWRITE_PKGFILE' => PEAR_PACKAGEFILEMANAGER_CANTWRITE_PKGFILE,
            'PEAR_PACKAGEFILEMANAGER_DEST_UNWRITABLE' => PEAR_PACKAGEFILEMANAGER_DEST_UNWRITABLE,
            'PEAR_PACKAGEFILEMANAGER_CANTCOPY_PKGFILE' => PEAR_PACKAGEFILEMANAGER_CANTCOPY_PKGFILE,
            'PEAR_PACKAGEFILEMANAGER_CANTOPEN_TMPPKGFILE' => PEAR_PACKAGEFILEMANAGER_CANTOPEN_TMPPKGFILE,
            'PEAR_PACKAGEFILEMANAGER_PATH_DOESNT_EXIST' => PEAR_PACKAGEFILEMANAGER_PATH_DOESNT_EXIST,
            'PEAR_PACKAGEFILEMANAGER_NOCVSENTRIES' => PEAR_PACKAGEFILEMANAGER_NOCVSENTRIES,
            'PEAR_PACKAGEFILEMANAGER_DIR_DOESNT_EXIST' => PEAR_PACKAGEFILEMANAGER_DIR_DOESNT_EXIST,
            'PEAR_PACKAGEFILEMANAGER_RUN_SETOPTIONS' => PEAR_PACKAGEFILEMANAGER_RUN_SETOPTIONS,
            'PEAR_PACKAGEFILEMANAGER_NOPACKAGE' => PEAR_PACKAGEFILEMANAGER_NOPACKAGE,
            'PEAR_PACKAGEFILEMANAGER_WRONG_MROLE' => PEAR_PACKAGEFILEMANAGER_WRONG_MROLE,
            'PEAR_PACKAGEFILEMANAGER_NOSUMMARY' => PEAR_PACKAGEFILEMANAGER_NOSUMMARY,
            'PEAR_PACKAGEFILEMANAGER_NODESC' => PEAR_PACKAGEFILEMANAGER_NODESC,
            'PEAR_PACKAGEFILEMANAGER_ADD_MAINTAINERS' => PEAR_PACKAGEFILEMANAGER_ADD_MAINTAINERS,
            'PEAR_PACKAGEFILEMANAGER_NO_FILES' => PEAR_PACKAGEFILEMANAGER_NO_FILES,
            'PEAR_PACKAGEFILEMANAGER_IGNORED_EVERYTHING' => PEAR_PACKAGEFILEMANAGER_IGNORED_EVERYTHING,
            'PEAR_PACKAGEFILEMANAGER_INVALID_PACKAGE' => PEAR_PACKAGEFILEMANAGER_INVALID_PACKAGE,
            'PEAR_PACKAGEFILEMANAGER_INVALID_REPLACETYPE' => PEAR_PACKAGEFILEMANAGER_INVALID_REPLACETYPE,
            'PEAR_PACKAGEFILEMANAGER_INVALID_ROLE' => PEAR_PACKAGEFILEMANAGER_INVALID_ROLE,
            'PEAR_PACKAGEFILEMANAGER_PHP_NOT_PACKAGE' => PEAR_PACKAGEFILEMANAGER_PHP_NOT_PACKAGE
        ));
        return $codes[$code];
    }

    function _stripWhitespace($str)
    {
        return preg_replace('/\\s+/', '', $str);
    }

    function _methodExists($name) 
    {
        if (in_array(strtolower($name), get_class_methods($this->packagexml))) {
            return true;
        }
        $this->assertTrue(false, 'method '. $name . ' not implemented in ' . get_class($this->packagexml));
        return false;
    }

    function errorHandler($errno, $errstr, $errfile, $errline) {
        //die("$errstr in $errfile at line $errline: $errstr");
        $this->errorOccured = true;
        $this->assertTrue(false, "$errstr at line $errline, $errfile");
    }

    function PEARerrorHandler($error) {
        $this->assertEquals($this->_expectedCode, $error->getCode(),
            $this->_testMethod . ' ' . $this->errorCodeToString($this->_expectedCode)
            . ' actual: ' . $this->errorCodeToString($error->getCode()));
        $this->assertEquals($this->_expectedMessage, $error->getMessage(), $this->_testMethod);
        $this->errorThrown = 'true';
    }
    
    function expectPEARError($method, $msg, $code = null)
    {
        $this->_expectedMessage = $msg;
        $this->_expectedCode = $code;
        $this->_testMethod = $method;
    }
    
    function test_invalid_nosetoptions()
    {
        if (!$this->_methodExists('addDependency')) {
            return;
        }
        $this->expectPEARError('no setOptions() test',
            'PEAR_PackageFileManager Error: Run $managerclass->setOptions() before any other methods',
            PEAR_PACKAGEFILEMANAGER_RUN_SETOPTIONS
        );
        $this->packagexml->addDependency('frog');
        $this->assertEquals('true', $this->errorThrown, 'error not thrown');
    }

    function test_invalid_phppkg()
    {
        if (!$this->_methodExists('setOptions')) {
            return;
        }
        if (!$this->_methodExists('addDependency')) {
            return;
        }
        $this->packagexml->setOptions(array('state' => 'alpha', 'version' => '1.0',
            'packagedirectory' => dirname(__FILE__), 'baseinstalldir' => 'Foo',
            'packagefile' => 'test1_package.xml',
            'filelistgenerator' => 'File'));
        $this->assertFalse($this->errorThrown, 'error thrown');
        $this->expectPEARError('no setOptions() test',
            'PEAR_PackageFileManager Error: addDependency had PHP as a package, use type="php"',
            PEAR_PACKAGEFILEMANAGER_PHP_NOT_PACKAGE
        );
        $this->packagexml->addDependency('php', '4.3.0');
        $this->assertEquals('true', $this->errorThrown, 'error not thrown');
    }

    function test_valid_add_pkg_implicit()
    {
        if (!$this->_methodExists('setOptions')) {
            return;
        }
        if (!$this->_methodExists('addDependency')) {
            return;
        }
        $this->packagexml->setOptions(array('state' => 'alpha', 'version' => '1.0',
            'packagedirectory' => dirname(__FILE__), 'baseinstalldir' => 'Foo',
            'packagefile' => 'test1_package.xml',
            'filelistgenerator' => 'File'));
        $this->assertFalse($this->errorThrown, 'error thrown');
        $this->packagexml->_packageXml['release_deps'] = array();
        $this->packagexml->addDependency('frog', '4.3.0');
        $this->assertFalse($this->errorThrown, 'error thrown');
        $this->assertEquals(
            array('name' => 'frog', 'type' => 'pkg', 'version' => '4.3.0',
                  'rel' => 'ge', 'optional' => 'no'),
            $this->packagexml->_packageXml['release_deps'][0],
            'release_deps value wrong');
    }

    function test_valid_add_pkg_explicit()
    {
        if (!$this->_methodExists('setOptions')) {
            return;
        }
        if (!$this->_methodExists('addDependency')) {
            return;
        }
        $this->packagexml->setOptions(array('state' => 'alpha', 'version' => '1.0',
            'packagedirectory' => dirname(__FILE__), 'baseinstalldir' => 'Foo',
            'packagefile' => 'test1_package.xml',
            'filelistgenerator' => 'File'));
        $this->assertFalse($this->errorThrown, 'error thrown');
        $this->packagexml->_packageXml['release_deps'] = array();
        $this->packagexml->addDependency('frog', '4.3.0', 'has', 'pkg', true);
        $this->assertFalse($this->errorThrown, 'error thrown');
        $this->assertEquals(
            array('name' => 'frog', 'type' => 'pkg',
                  'rel' => 'has', 'optional' => 'yes'),
            $this->packagexml->_packageXml['release_deps'][0],
            'release_deps value wrong');
    }

    function test_valid_add_php()
    {
        if (!$this->_methodExists('setOptions')) {
            return;
        }
        if (!$this->_methodExists('addDependency')) {
            return;
        }
        $this->packagexml->setOptions(array('state' => 'alpha', 'version' => '1.0',
            'packagedirectory' => dirname(__FILE__), 'baseinstalldir' => 'Foo',
            'packagefile' => 'test1_package.xml',
            'filelistgenerator' => 'File'));
        $this->assertFalse($this->errorThrown, 'error thrown');
        $this->packagexml->_packageXml['release_deps'] = array();
        $this->packagexml->addDependency('php', '4.3.0', 'has', 'php');
        $this->assertFalse($this->errorThrown, 'error thrown');
        $this->assertEquals(
            array('type' => 'php',
                  'rel' => 'has', 'optional' => 'no'),
            $this->packagexml->_packageXml['release_deps'][0],
            'release_deps value wrong');
    }
    
    function test_valid_replace()
    {
        if (!$this->_methodExists('setOptions')) {
            return;
        }
        if (!$this->_methodExists('addDependency')) {
            return;
        }
        $this->packagexml->setOptions(array('state' => 'alpha', 'version' => '1.0',
            'packagedirectory' => dirname(__FILE__), 'baseinstalldir' => 'Foo',
            'packagefile' => 'test1_package.xml',
            'filelistgenerator' => 'File'));
        $this->assertFalse($this->errorThrown, 'error thrown');
        $this->packagexml->_packageXml['release_deps'] = array();
        $this->packagexml->addDependency('frog', '4.3.0', 'has', 'pkg', true);
        $this->assertFalse($this->errorThrown, 'error thrown');
        $this->assertEquals(
            array('name' => 'frog', 'type' => 'pkg',
                  'rel' => 'has', 'optional' => 'yes'),
            $this->packagexml->_packageXml['release_deps'][0],
            'release_deps value wrong');
        $this->packagexml->addDependency('frog', '4.3.0');
        $this->assertFalse($this->errorThrown, 'error thrown');
        $this->assertEquals(
            array('name' => 'frog', 'type' => 'pkg', 'version' => '4.3.0',
                  'rel' => 'ge', 'optional' => 'no'),
            $this->packagexml->_packageXml['release_deps'][0],
            'configure_options value wrong');
    }
}

?>
