/**
 * Created with JetBrains WebStorm.
 * User: apple
 * Date: 13-2-14
 * Time: AM10:00
 * To change this template use File | Settings | File Templates.
 */
var Index = (function() {

  /**
   * 循环的判断每个区块是否展示默认提示信息
   */
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

  /**
   * 清楚全部的输入框
   */
  var _clearAllInput = function() {
    $('.item-wrap').remove();
  };

  /**
   * 输入框的模版 用于构造输入框片段
   */
  var inputTmpl = ['<li class="item-wrap">',
    '<div class="input-wrap">',
    '<div><input type="text" class="input-item" name="input-item" value="${name}" /></div>',
    '<div><input type="button" class="submit" value="保存" /><em>或</em><input type="button" class="cancel" value="取消" /></div>',
    '</div>',
    '</li>'].join('');

  /**
   * 增加输入框片段到列表(itemList)
   */
  var _appendInputItem = function(itemList) {
    _clearAllInput();
    $(itemList).find('.item-wrap').remove();
    $.tmpl(inputTmpl, {name: ''}).appendTo(itemList);
    _initInputListener();
    _checkShowDefault();
  };

  /**
   * 绑定输入框的事件
   */
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
      $(this).find('.submit').click(function(event) {
        event.stopPropagation();
        _appendShowItem(itemList);
      });
      $(this).find('.cancel').click(function(event) {
        event.stopPropagation();
        _cancelItemWrap(itemWrap);
      });
    });
  };


  /**
   * 点击输入框的取消按钮
   */
  var _cancelItemWrap = function(itemWrap) {
    $(itemWrap).remove();
    _checkShowDefault();
  };

  /**
   * 通过输入框添加的内容展示模版
   */
  var _showTmpl = ['<li class="show-item"><div class="row-fluid">' +
    '<div class="span10 text-left show-item-name">${name}</div>',
    '<div class="span2 show-item-delete"><a class="delete" href="javascript:{}"></a></div>',
  '</div></li>'].join('');

  /**
   * 增加展示片段到列表(itemList)
   */
  var _appendShowItem = function(itemList) {
    var name = $(itemList).find('.input-item').first().val();
    if(name && name !== '') {
      var itemWrap = $(itemList).find('.item-wrap');
      if(itemWrap.size() > 0) {
        itemWrap.replaceWith($($.tmpl(_showTmpl, {name: name})));
      } else {
        $.tmpl(_showTmpl, {name: name}).appendTo(itemList);
      }
      _appendInputItem(itemList);
    } else {
      $(itemList).remove();
    }
    _checkShowDefault();
    _initShowItem();
  };

  /**
   * 为垃圾桶图标绑定删除事件
   */
  var _initDelItem = function() {
    $('.delete').unbind('click');
    $('.delete').click(function(event) {
      event.stopPropagation();
      var showItem = $(this).parents('.show-item');
      showItem.remove();
      _clearAllInput();
      _checkShowDefault();
      _initShowItem();
    });
  };

  /**
   * 为已有的内容绑定点击事件 点击后转换为编辑状态
   */
  var _initEditItem = function() {
    $('.show-item-name').unbind('click');
    $('.show-item-name').click(function(event) {
      event.stopPropagation();
      _clearAllInput();
      var name = $(this).html();
      $(this).parents('.show-item').replaceWith($($.tmpl(inputTmpl, {name: name})));
      _initInputListener();
      _checkShowDefault();
    });
  };

  /**
   * 为列表中展示的内容绑定退拽事件 用户可以通过拖拽调整内容的顺序
   */
  var _initShowItem = function() {
    $('.item-list').sortable();
    $('.item-list').disableSelection();
    _initEditItem();
    _initDelItem();
  };

  /**
   * 绑定帮助按钮点击事件
   */
  var _initHelp = function() {
    $('.help').click(function(event) {
      event.stopPropagation();
      $('<div></div>')
        .html('正在建设中...')
        .dialog({
          autoOpen: false,
          title: '帮助'
        }).dialog('open');
    })
  };

  /**
   * 绑定评论点击事件
   */
  var _initFeed = function() {
    $('.show-feed').click(function(event) {
      event.stopPropagation();
      $('<div></div>').html(['<div>',
          '<textarea style="width:240px;height:90px;line-height:16px;"></textarea>',
        '</div>',
        '<div><input type="button" value="提交" /></div>'].join('')).dialog({
          autoOpen: false,
          title: '发表评论'
        }).dialog('open');
    })
  };

  /**
   * 初始化页面
   */
  var init = function() {
    $('.show-grid').click(function(event) {
      event.stopPropagation();
      var itemList = $(this).find('.item-list').first();
      _appendInputItem(itemList);
    });
    _initShowItem();
    _initHelp();
    _initFeed();
  };

  return {
    init: init
  };
}).call(this);
