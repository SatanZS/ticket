/**
 * @fileOverview Overlay \u6a21\u5757\u7684\u5165\u53e3
 * @ignore
 */define("bui/overlay",["bui/common","bui/overlay/overlay","bui/overlay/dialog","bui/overlay/message"],function(e){var t=e("bui/common"),n=t.namespace("Overlay");return t.mix(n,{Overlay:e("bui/overlay/overlay"),Dialog:e("bui/overlay/dialog"),Message:e("bui/overlay/message")}),t.mix(n,{OverlayView:n.Overlay.View,DialogView:n.Dialog.View}),t.Message=t.Overlay.Message,n}),define("bui/overlay/overlay",["bui/common"],function(e){var t=e("bui/common"),n=t.Component,r="x-align-arrow",i=n.UIBase,s=n.View.extend([i.PositionView,i.CloseView]),o=n.Controller.extend([i.Position,i.Align,i.Close,i.AutoShow,i.AutoHide],{renderUI:function(){var e=this,t=e.get("el"),n=e.get("arrowContainer"),r=n?t.one(n):t;e.get("showArrow")&&$(e.get("arrowTpl")).appendTo(r)},show:function(){function o(){r==="visibility"?n.css({display:"block"}):e.set("visible",!0),t.callback&&t.callback.call(e);var i=e.get("autoHideDelay"),s=e.get("delayHandler");i&&(s&&clearTimeout(s),s=setTimeout(function(){e.hide(),e.set("delayHandler",null)},i),e.set("delayHandler",s))}var e=this,t=e.get("effect"),n=e.get("el"),r=e.get("visibleMode"),i=t.effect,s=t.duration;e.get("rendered")||(e.set("visible",!0),e.render(),e.set("visible",!1),n=e.get("el")),r==="visibility"&&(e.set("visible",!0),n.css({display:"none"}));switch(i){case"linear":n.show(s,o);break;case"fade":n.fadeIn(s,o);break;case"slide":n.slideDown(s,o);break;default:o()}},hide:function(){function s(){e.get("visibleMode")==="visibility"&&n.css({display:"block"}),e.set("visible",!1),t.callback&&t.callback.call(e)}var e=this,t=e.get("effect"),n=e.get("el"),r=t.effect,i=t.duration;switch(r){case"linear":n.hide(i,s);break;case"fade":n.fadeOut(i,s);break;case"slide":n.slideUp(i,s);break;default:s()}}},{ATTRS:{effect:{value:{effect:"none",duration:0,callback:null}},autoHideDelay:{},closeable:{value:!1},showArrow:{value:!1},arrowContainer:{view:!0},arrowTpl:{value:'<s class="'+r+'"><s class="'+r+'-inner"></s></s>'},visibleMode:{value:"visibility"},visible:{value:!1},xview:{value:s}}},{xclass:"overlay"});return o.View=s,o}),define("bui/overlay/dialog",["bui/overlay/overlay"],function(e){var t=e("bui/overlay/overlay"),n=BUI.Component.UIBase,r="header-title",i=BUI.prefix,s=20,o=t.View.extend([n.StdModView,n.MaskView],{getContentElement:function(){return this.get("body")},_uiSetTitle:function(e){var t=this,n=t.get("el");n.find("."+r).html(e)},_uiSetContentId:function(e){var t=this,n=t.get("body"),r=$("#"+e).children();r.appendTo(n)},_uiSetHeight:function(e){var t=this,n=e,r=t.get("header"),i=t.get("body"),o=t.get("footer");n-=r.outerHeight()+o.outerHeight(),n-=s*2,i.height(n)},_removeContent:function(){var e=this,t=e.get("body"),n=e.get("contentId");n?t.children().appendTo($("#"+n)):t.children().remove()}},{xclass:"dialog-view"}),u=t.extend([n.StdMod,n.Mask,n.Drag],{show:function(){var e=this;align=e.get("align"),u.superclass.show.call(this),e.set("align",align)},bindUI:function(){var e=this;e.on("closeclick",function(){return e.onCancel()})},onCancel:function(){var e=this,t=e.get("cancel");return t.call(this)},_uiSetButtons:function(e){var t=this,n=t.get("footer");n.children().remove(),BUI.each(e,function(e){t._createButton(e,n)})},_createButton:function(e,t){var n=this,r='<button class="'+e.elCls+'">'+e.text+"</button>",i=$(r).appendTo(t);i.on("click",function(){e.handler.call(n,n,this)})},destructor:function(){var e=this,t=e.get("contentId"),n=e.get("body"),r=e.get("closeAction");r=="destroy"&&(e.hide(),t&&n.children().appendTo("#"+t))}},{ATTRS:{closeTpl:{view:!0,value:'<a tabindex="0" href=javascript:void("\u5173\u95ed") role="button" class="'+i+'ext-close" style=""><span class="'+i+'ext-close-x x-icon x-icon-normal">\u00d7</span></a>'},buttons:{value:[{text:"\u786e\u5b9a",elCls:"button button-primary",handler:function(){var e=this,t=e.get("success");t&&t.call(e)}},{text:"\u53d6\u6d88",elCls:"button button-primary",handler:function(e,t){this.onCancel()!==!1&&this.close()}}]},contentId:{view:!0},success:{value:function(){this.close()}},cancel:{value:function(){}},dragNode:{valueFn:function(){return this.get("header")}},defaultLoaderCfg:{valueFn:function(){var e=this;return{property:"bodyContent",autoLoad:!1,lazyLoad:{event:"show"},loadMask:{el:e.get("body")}}}},title:{view:!0,value:""},align:{value:{node:window,points:["cc","cc"]}},mask:{value:!0},maskShared:{value:!1},headerContent:{value:'<div class="'+r+'">\u6807\u9898</div>'},footerContent:{},closeable:{value:!0},xview:{value:o}}},{xclass:"dialog"});return u.View=o,u}),define("bui/overlay/message",["bui/overlay/dialog"],function(e){function o(e,t){return function(n,r,i){return BUI.isString(r)&&(i=r,r=null),i=i||t,r=r||f,u({buttons:e,icon:i,msg:n,success:r}),s}}function u(e){s||(s=new i({icon:"info",title:""})),s.set(e),s.show()}function a(){var e=this,t=e.get("success");t&&(t.call(e),e.hide())}function f(){this.hide()}var t=e("bui/overlay/dialog"),n=BUI.prefix,r={info:"i",error:"\u00d7",success:'<i class="icon-ok icon-white"></i>',question:"?",warning:"!"},i=t.extend({renderUI:function(){this._setContent()},bindUI:function(){var e=this,t=e.get("body");e.on("afterVisibleChange",function(n){if(n.newVal&&BUI.UA.ie<8){var r=t.outerWidth();BUI.UA.ie==6&&(r=r>350?350:r),e.get("header").width(r-20),e.get("footer").width(r)}})},_setContent:function(){var e=this,t=e.get("body"),n=BUI.substitute(e.get("contentTpl"),{msg:e.get("msg"),iconTpl:e.get("iconTpl")});t.empty(),$(n).appendTo(t)},_uiSetIcon:function(e){if(!this.get("rendered"))return;this._setContent()},_uiSetMsg:function(e){if(!this.get("rendered"))return;this._setContent()}},{ATTRS:{icon:{},msg:{},iconTpl:{getter:function(){var e=this,t=e.get("icon");return'<div class="x-icon x-icon-'+t+'">'+r[t]+"</div>"}},contentTpl:{value:'{iconTpl}<div class="'+n+'message-content">{msg}</div>'}}},{xclass:"message",priority:0}),s,l=o([{text:"\u786e\u5b9a",elCls:"button button-primary",handler:a}],"info"),c=o([{text:"\u786e\u5b9a",elCls:"button button-primary",handler:a},{text:"\u53d6\u6d88",elCls:"button button-primary",handler:f}],"question");return i.Alert=l,i.Confirm=c,i.Show=u,i});
