/**
 * Created with JetBrains WebStorm.
 * User: apple
 * Date: 13-2-14
 * Time: AM10:00
 * To change this template use File | Settings | File Templates.
 */
var Index = (function() {

  var _checkShowDefault = function() {
    $('.show-grid').each(function() {
      var showDefault = $(this).find('.show-default');
      var showTitleInfo = $(this).find('.show-title-info');
      if($(this).find('li').length > 0) {
        showDefault.hide();
        showTitleInfo.hide();
      } else {
        showDefault.show();
        showTitleInfo.show();
      }
    });
  };

  var _clearAllInput = function() {
    $('.item-wrap').remove();
  };

  //输入框模版
  var inputTmpl = ['<li class="item-wrap">',
    '<div class="input-wrap">',
    '<div><input type="text" class="input-item" name="input-item" /></div>',
    '<div><input type="button" class="submit" value="保存" /><em>或</em><input type="button" class="cancel" value="取消" /></div>',
    '</div>',
    '</li>'].join('');

  //绑定输入框模版
  var _appendInputItem = function(itemList) {
    _clearAllInput();
    $.tmpl(inputTmpl, {}).appendTo(itemList);
    _initInputListener();
    _checkShowDefault();
  };

  var _initInputListener = function() {
    $('.item-wrap').each(function() {
      var itemWrap = this;
      var itemList = $(itemWrap).parent();
      $(this).find('.input-item').focus().keypress(function(e) {
        var key = e.which;
        if(key === 13) {
          _appendShowItem(itemList);
        }
      });
      $(this).find('.submit').click(function() {
        _appendShowItem(itemList);
      });
      $(this).find('.cancel').click(function() {
        _cancelItemWrap(itemWrap);
      });
    });
  };


  var _cancelItemWrap = function(itemWrap) {
    $(itemWrap).remove();
    _checkShowDefault();
  };

  //展示模版
  var _showTmpl = ['<li class="show-item"><div class="row-fluid">' +
    '<div class="span10 text-left show-item-name">${name}</div>',
    '<div class="span2 show-item-delete"><a class="delete" href="javascript:{}" onclick="Index.delItem(this)"></a></div>',
  '</div></li>'].join('');

  var _appendShowItem = function(itemList) {
    var name = $(itemList).find('.input-item').first().val();
    if(name && name !== '') {
      $.tmpl(_showTmpl, {name: name}).appendTo(itemList);
      $(itemList).find('.item-wrap').remove();
      _appendInputItem(itemList);
    } else {
      $(itemList).remove();
    }
    _checkShowDefault();
    _initShowItem();
  };

  var _initShowItem = function() {
    $('.item-list').sortable();
    $('.item-list').disableSelection();
  };

  var delItem = function(e) {
    var showItem = $(e).parents('.show-item');
    showItem.remove();
    _clearAllInput();
    _checkShowDefault();
    _initShowItem();
  };

  var _initHelp = function() {
    $('.help').click(function() {
      $('<div></div>')
        .html('正在建设中...')
        .dialog({
          autoOpen: false,
          title: '帮助'
        }).dialog('open');
    })
  };

  var _initFeed = function() {
    $('.show-feed').click(function() {
      $('<div></div>').html(['<div>',
          '<textarea style="width:240px;height:90px;line-height:16px;"></textarea>',
        '</div>',
        '<div><input type="button" value="提交" /></div>'].join('')).dialog({
          autoOpen: false,
          title: '发表评论'
        }).dialog('open');
    })
  };

  var init = function() {
    $('.show-default').click(function() {
      var itemList = $(this).parent().find('.item-list').first();
      _appendInputItem(itemList);
    });
    _initShowItem();
    _initHelp();
    _initFeed();
  };

  return {
    init: init,
    delItem: delItem
  };
}).call(this);
