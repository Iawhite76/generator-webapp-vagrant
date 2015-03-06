/**
 * --------------------------------------------------------------------
 * jQuery customInput plugin
 * Author: Maggie Costello Wachs maggie@filamentgroup.com, Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2009 Filament Group
 * Copyright (c) 2013 Bernd Matzner bernd@matznermatzner.de
 * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
 * --------------------------------------------------------------------
 */$.fn.customInput=function(){"use strict";return $(this).each(function(){if($(this).is('[type="checkbox"],[type="radio"]')){var e=$(this),t;t=$('label[for="'+e.attr("id")+'"]');t.prepend("<span></span>");e.add(t).add(e.siblings("input")).wrapAll('<div class="custom-'+e.attr("type")+'"></div>');t.on("mouseenter",function(){$(this).addClass("hover");e.is(":checked")&&$(this).addClass("checkedHover")});t.on("mouseleave",function(){$(this).removeClass("hover checkedHover")});e.on("updateState",function(){e.is(":checked")?t.addClass("checked"):t.removeClass("checked checkedHover checkedFocus");t.toggleClass("disabled",this.disabled)});t.on("click",function(){e.attr("type")==="radio"?e.removeAttr("checked").filter('[value="'+e.val()+'"]').prop("checked",!0).trigger("updateState"):e.trigger("updateState")});e.on("click",function(){e.attr("type")==="radio"?$('input[name="'+e.attr("name")+'"]').trigger("updateState"):e.trigger("updateState")});e.on("focus",function(){t.addClass("focus");e.is(":checked")&&$(this).addClass("checkedFocus")});e.on("blur",function(){t.removeClass("focus checkedFocus")});e.trigger("updateState")}})};
