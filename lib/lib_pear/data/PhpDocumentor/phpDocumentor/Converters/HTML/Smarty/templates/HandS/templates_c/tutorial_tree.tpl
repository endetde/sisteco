<?php /* Smarty version 2.5.0, created on 2003-06-03 00:50:35
         compiled from tutorial_tree.tpl */ ?>
<?php $this->_load_plugins(array(
array('modifier', 'strip_tags', 'tutorial_tree.tpl', 2, false),)); ?><ul>
	<li type="square"><a href="<?php echo $this->_tpl_vars['main']['link']; ?>
"><?php echo $this->_run_mod_handler('strip_tags', true, $this->_tpl_vars['main']['title']); ?>
</a>
<?php if ($this->_tpl_vars['kids']): ?><?php echo $this->_tpl_vars['kids']; ?>
</li><?php endif; ?>
</ul>
