(function(e){function t(t){for(var c,a,i=t[0],u=t[1],l=t[2],b=0,d=[];b<i.length;b++)a=i[b],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&d.push(r[a][0]),r[a]=0;for(c in u)Object.prototype.hasOwnProperty.call(u,c)&&(e[c]=u[c]);s&&s(t);while(d.length)d.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],c=!0,i=1;i<n.length;i++){var u=n[i];0!==r[u]&&(c=!1)}c&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var c={},r={app:0},o=[];function a(t){if(c[t])return c[t].exports;var n=c[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=c,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)a.d(n,c,function(t){return e[t]}.bind(null,c));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var s=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},2787:function(e,t,n){},"2acd":function(e,t,n){},"2d37":function(e,t,n){"use strict";n("8b00")},"40a7":function(e,t,n){"use strict";n("2acd")},6526:function(e,t,n){},"749c":function(e,t,n){"use strict";n("ba6e")},"8b00":function(e,t,n){},ad32:function(e,t,n){"use strict";n("6526")},b4cb:function(e,t,n){"use strict";n("f815")},ba6e:function(e,t,n){},ccae:function(e,t,n){"use strict";n("2787")},cd49:function(e,t,n){"use strict";n.r(t);n("4160"),n("b0c0"),n("159b"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var c=n("830f"),r=n("5c40"),o=n("9ff4"),a=Object(r["i"])("span",null,"暗黑模式",-1),i=Object(r["i"])("p",null," For an app to feel natural, it should adapt its layout to different screen sizes and devices. You can use automatic sizing, layout panels, visual states, and even separate UI definitions in XAML to create a responsive UI. ",-1),u=Object(r["h"])("1"),l=Object(r["h"])("hello world");function s(e,t){var n=Object(r["x"])("window"),s=Object(r["x"])("block"),b=Object(r["x"])("block-container"),d=Object(r["x"])("calculator"),f=Object(r["x"])("calendar"),j=Object(r["x"])("window-container");return Object(r["r"])(),Object(r["e"])(j,{class:"window-manage","bg-url":e.bgUrl},{default:Object(r["E"])((function(){return[(Object(r["r"])(!0),Object(r["e"])(r["b"],null,Object(r["v"])(e.windows,(function(u){return Object(r["r"])(),Object(r["e"])(n,{key:u.i,"init-pos":u,name:u.name},{default:Object(r["E"])((function(){return[a,Object(r["F"])(Object(r["i"])("input",{"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.darkMode=t}),type:"checkbox"},null,512),[[c["b"],e.darkMode]]),Object(r["i"])("h1",null,"Create a responsive layout-"+Object(o["F"])(u.i+1),1),i]})),_:2},1032,["init-pos","name"])})),128)),Object(r["i"])(n,{"init-pos":{top:512,left:480},name:"case"},{default:Object(r["E"])((function(){return[Object(r["i"])(b,null,{default:Object(r["E"])((function(){return[(Object(r["r"])(!0),Object(r["e"])(r["b"],null,Object(r["v"])(e.blocks,(function(e){return Object(r["r"])(),Object(r["e"])(s,{key:e,value:e,style:{padding:"4px"}},{default:Object(r["E"])((function(){return[Object(r["h"])(Object(o["F"])(e),1)]})),_:2},1032,["value"])})),128)),(Object(r["r"])(!0),Object(r["e"])(r["b"],null,Object(r["v"])(e.blocks,(function(e){return Object(r["r"])(),Object(r["e"])(s,{key:e,value:e,style:{margin:"4px"}},{default:Object(r["E"])((function(){return[Object(r["h"])(Object(o["F"])(e),1)]})),_:2},1032,["value"])})),128)),Object(r["i"])(s,null,{default:Object(r["E"])((function(){return[u]})),_:1}),Object(r["i"])(s,{style:{cursor:"pointer"}},{default:Object(r["E"])((function(){return[l]})),_:1})]})),_:1})]})),_:1}),Object(r["i"])(d),Object(r["i"])(f)]})),_:1},8,["bg-url"])}var b=n("a1e9"),d=Object(b["h"])({darkMode:!0,idPool:{window:[],"block-container":[]}}),f=(n("cb29"),n("d81d"),function(e){var t=e>>16,n=e>>8&255,c=255&e;return[t,n,c]}),j=function(e){var t=d.idPool[e],n=0!==t.length?t[t.length-1]+1:0;return t.push(n),n},O=function(e,t){return Array(e).fill(null).map((function(e,n){return t(n)}))},v=Object(r["G"])("data-v-54e276c8");Object(r["u"])("data-v-54e276c8");var p={class:"temp-area"},h={class:"display-area"};Object(r["s"])();var w=v((function(e,t){var n=Object(r["x"])("block"),c=Object(r["x"])("block-container"),a=Object(r["x"])("window");return Object(r["r"])(),Object(r["e"])(a,{name:"计算器",dark:!1,size:{height:384,width:512}},{default:v((function(){return[Object(r["i"])(c,null,{default:v((function(){return[Object(r["i"])("div",p,Object(o["F"])(e.tempText),1),Object(r["i"])("div",h,Object(o["F"])(e.displayText),1),Object(r["i"])("div",null,[(Object(r["r"])(!0),Object(r["e"])(r["b"],null,Object(r["v"])(e.operators,(function(t){return Object(r["r"])(),Object(r["e"])(n,{key:t,class:"key-btn op-btn",onClick:function(n){return e.keydown(t)}},{default:v((function(){return[Object(r["h"])(Object(o["F"])(t),1)]})),_:2},1032,["onClick"])})),128))]),Object(r["i"])("div",null,[(Object(r["r"])(!0),Object(r["e"])(r["b"],null,Object(r["v"])(e.numKeys,(function(t){return Object(r["r"])(),Object(r["e"])(n,{key:t,class:"key-btn",onClick:function(n){return e.keydown(t)}},{default:v((function(){return[Object(r["h"])(Object(o["F"])(t),1)]})),_:2},1032,["onClick"])})),128))])]})),_:1})]})),_:1})})),g=(n("99af"),n("a15b"),n("a434"),n("a9e3"),n("2909")),y=Object(r["j"])({setup:function(){var e=Object(b["h"])([0]),t=Object(r["d"])((function(){return e.join("")})),n=Object(b["h"])(new Array),c=Object(r["d"])((function(){return n.join("")})),o=Object(b["h"])(O(10,(function(e){return e}))),a=function(e,t,n){switch(e){case"+":return t+n;case"-":return t-n;case"*":return t*n;case"/":return t/n}},i=function(){var e=function(){var e=n.shift();while(e&&"number"===typeof n[0])e="".concat(e).concat(n.shift());return Number(e)},t=e();while(n.length&&void 0!==t){var c=n.shift(),r=e();t=a(c,t,r)}return t},u=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),c=1;c<t;c++)n[c-1]=arguments[c];e.splice.apply(e,[0,e.length].concat(n))},l=function(t){var c=e;switch(t){case"c":u(c,0),u(n);break;case"+":case"-":case"*":case"/":c.push(t),n.push(t);break;case"ce":u(c,0);break;case"=":u.apply(void 0,[c].concat(Object(g["a"])(n),["=",i()]));break;case"del":c.pop(),n.pop();break;default:n.push(t),"number"!==typeof c[c.length-1]&&u(c),1===c.length&&0===c[0]&&c.pop(),c.push(t);break}},s=Object(b["h"])(["+","-","*","/","c","ce","=","del"]);return{numKeys:o,displayText:t,keydown:l,operators:s,tempText:c}}});n("ccae");y.render=w,y.__scopeId="data-v-54e276c8";var k=y,m=Object(r["G"])("data-v-0395250a");Object(r["u"])("data-v-0395250a");var x={class:"profile"},S={class:"action-bar"},z={class:"title"},_={key:1,class:"block-adapter table-cell"};Object(r["s"])();var C=m((function(e,t){var n=Object(r["x"])("block"),c=Object(r["x"])("block-container"),a=Object(r["x"])("window");return Object(r["r"])(),Object(r["e"])(a,{name:"日历",size:{height:550,width:448}},{default:m((function(){return[Object(r["i"])(c,null,{default:m((function(){return[Object(r["i"])("div",x,[Object(r["i"])("div",S,[Object(r["i"])(n,null,{default:m((function(){return[Object(r["i"])("div",{class:"action-icon",onClick:t[1]||(t[1]=function(t){return e.onActionBtnClick("decr")})},"←")]})),_:1}),Object(r["i"])(n,null,{default:m((function(){return[Object(r["i"])("div",{class:"action-icon",onClick:t[2]||(t[2]=function(t){return e.onActionBtnClick("incr")})},"→")]})),_:1})]),Object(r["i"])("div",z,Object(o["F"])(e.day.format("L")),1)]),Object(r["i"])("div",null,[(Object(r["r"])(),Object(r["e"])(r["b"],null,Object(r["v"])(7,(function(t){return Object(r["i"])("span",{key:t,class:"table-cell block-adapter"},"星期"+Object(o["F"])(e.bucketsMap[t-1]),1)})),64)),(Object(r["r"])(!0),Object(r["e"])(r["b"],null,Object(r["v"])(e.buckets,(function(t,c){return Object(r["r"])(),Object(r["e"])("div",{key:c},[(Object(r["r"])(!0),Object(r["e"])(r["b"],null,Object(r["v"])(t,(function(t,c){return Object(r["r"])(),Object(r["e"])("span",{key:c},[void 0!==t?Object(r["i"])(n,{key:0,class:"day table-cell","data-now":e.day.get("date")===t,onClick:function(n){return e.onDayBtnClick(t)}},{default:m((function(){return[Object(r["h"])(Object(o["F"])(t),1)]})),_:2},1032,["data-now","onClick"]):(Object(r["r"])(),Object(r["e"])("div",_))])})),128))])})),128))])]})),_:1})]})),_:1})})),M=(n("13d5"),n("5a0c")),P=n.n(M),R=n("23ad"),I=n.n(R);n("a471");P.a.locale("zh-cn"),P.a.extend(I.a);var E=function(e,t){return P()().set("year",t).set("month",e+1).set("date",-1).get("date")+1},A=Object(r["j"])({setup:function(){var e=Object(b["i"])(P()()),t=Object(r["d"])((function(){return E(e.value.get("month"),e.value.get("year"))})),n=function(t){switch(t){case"incr":e.value=e.value.add(1,"month");break;case"decr":e.value=e.value.subtract(1,"month");break}},c=function(t){e.value=e.value.set("date",t)},o=Object(r["d"])((function(){return O(t.value,(function(e){return e+1})).reduce((function(t,n){var c,r=e.value.set("date",n),o=r.get("day");return 0===o||t[t.length-1].length>6?(c=new Array,t.push(c)):c=t[t.length-1],c[o]=n,t}),[[]])})),a="天一二三四五六";return{days:t,day:e,onActionBtnClick:n,onDayBtnClick:c,bucketsMap:a,buckets:o}}});n("b4cb");A.render=C,A.__scopeId="data-v-0395250a";var B=A,F="https://static.ioflow.link/0cfedb5240eadc505e723bf2bc4f14e8bf7eb3fb96fc6ea53e856f3f863c2ba0d38f83de492f609290bc6ad0a9a2b583.jpg",G=Object(r["j"])({components:{calculator:k,calendar:B},name:"App",setup:function(){var e=Object(b["h"])(O(2,(function(e){return{top:256+72*e,left:256+72*e,name:"window - "+e,i:e}}))),t=Object(b["h"])(O(26,(function(e){return String.fromCharCode(65+e)})));return{window:window,darkMode:Object(b["n"])(d,"darkMode"),windows:e,blocks:t,bgUrl:F}}});G.render=s;var T=G,U=Object(r["G"])("data-v-e742e2e4");Object(r["u"])("data-v-e742e2e4");var L={class:"blur-layer"},X=Object(r["i"])("div",{class:"noise-layer"},null,-1);Object(r["s"])();var Y=U((function(e,t){return Object(r["r"])(),Object(r["e"])("div",{class:"container-wrap",style:e.style,onMousedown:t[1]||(t[1]=Object(c["c"])((function(){return e.control.apply(e,arguments)}),["left"])),onMouseup:t[2]||(t[2]=Object(c["c"])((function(){return e.release.apply(e,arguments)}),["left"])),onMouseleave:t[3]||(t[3]=function(){return e.release.apply(e,arguments)})},[Object(r["i"])("div",L,[Object(r["i"])("div",{class:"color-layer",style:e.colorLayerStyle},[X],4)]),Object(r["i"])("div",{class:"content",style:"color:".concat(e.darkMode?"white":"black")},[Object(r["w"])(e.$slots,"default")],4)],36)})),$=(n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),new Map),D=function(e,t){var n=$.get(e);n?n.push(t):$.set(e,[t])},J=function(e){return $.get(e)||[]},K=(n("a630"),n("6062"),{start:"move",resize:"nwse-resize"}),Q=function(e,t,n){return Object(b["h"])({offset:{top:0,left:0},size:n,zIndex:0,backgroundPos:{top:0,left:0},flagSet:new Set,initPos:e,name:t,id:j("window")})},W=function(e){var t=e,n=Object(r["d"])((function(){var e={top:-t.offset.top-t.initPos.top-2+16,left:-t.offset.left-t.initPos.left-2+16};return"\n          background-position:".concat(e.left,"px ").concat(e.top,"px;\n          transform:translate(").concat(t.offset.left,"px,").concat(t.offset.top,"px);\n          cursor:").concat(K[Array.from(t.flagSet.keys())[0]],";\n          width:").concat(t.size.width,"px;\n          height:").concat(t.size.height,"px;\n          top:").concat(t.initPos.top,"px;\n          left:").concat(t.initPos.left,"px;\n          z-index:").concat(t.zIndex)}));return{style:n}},q=1,N=function(){return++q},V=function(e){var t=function(t){e.flagSet.add("start"),e.zIndex<q&&(e.zIndex=q+1,q=e.zIndex)},n=new Array,c=e,r=function(t){var n=t.type;switch(n){case"mouseleave":!e.flagSet.has("resize")&&e.flagSet.clear();break;case"mouseup":e.flagSet.clear();break}},o=function(e){c.flagSet.has("start")&&(c.flagSet.has("resize")?(c.size.width+=e.movementX,c.size.height+=e.movementY):(c.offset.left+=e.movementX,c.offset.top+=e.movementY));var t=c.offset.left+c.initPos.left+c.size.width,r=c.offset.top+c.initPos.top+c.size.height,o=16;if(t-e.pageX>0&&t-e.pageX<o&&r-e.pageY>0&&r-e.pageY<o)c.flagSet.has("resize")||n.push(Array.from(c.flagSet)),c.flagSet.add("resize");else if(c.flagSet.has("resize")){var a=n.pop();a&&(c.flagSet.clear(),a.forEach((function(e){return c.flagSet.add(e)})))}};return{release:r,control:t,move:o}},H=Object(r["j"])({name:"window",props:{initPos:{default:function(){return{top:256,left:256}}},name:{type:String,default:""},dark:{type:Boolean,default:void 0},size:{default:function(){return{width:512,height:256}}}},setup:function(e){var t=e,n=Q(t.initPos,t.name,t.size),c=W(n),o=c.style,a=V(n),i=a.move,u=a.control,l=a.release;Object(r["t"])("window-size",n.size),Object(r["t"])("window-offset",n.offset);var s=Object(r["n"])("window-regist");Object(r["o"])((function(){D("mousemove",i),s&&s(n)}));var j=Object(b["i"])(void 0===e.dark?Object(b["n"])(d,"darkMode"):e.dark),O=Object(r["d"])((function(){return"background: rgba(".concat(f(j.value?0:16777215),", 0.4)")}));return{style:o,colorLayerStyle:O,release:l,control:u,darkMode:j}}});n("ad32");H.render=Y,H.__scopeId="data-v-e742e2e4";var Z=H,ee=Object(r["G"])("data-v-68e90022");Object(r["u"])("data-v-68e90022");var te={class:"block",ref:"domRef"};Object(r["s"])();var ne=ee((function(e,t){return Object(r["r"])(),Object(r["e"])("div",te,[Object(r["w"])(e.$slots,"default")],512)})),ce=Object(r["j"])({name:"block",props:{value:{type:String}},setup:function(e){var t,n=Object(b["i"])(),c=Object(b["i"])(null),o=Object(b["i"])(),a=Object(r["n"])("unmounted-block"),i=Object(r["n"])("regist-any-block"),u=Object(r["n"])("update-block-state"),l=Object(r["n"])("on-will-update-rect");return Object(r["o"])((function(){var r=n.value;if(!r)throw new Error("任意形状块获取dom失败!!!");if(!(i&&u&&l))throw new Error("block组件必须在block-container组件的包裹下");t=new ResizeObserver((function(t){c.value=t[0].target.getBoundingClientRect(),u({value:e.value,rect:c.value,id:o.value||-1})})),t.observe(r),o.value=i({value:e.value,rect:c.value,id:-1}),l((function(){c.value=r.getBoundingClientRect(),u({value:e.value,rect:c.value,id:o.value})}),o.value)})),Object(r["p"])((function(){var e=n.value;e&&t&&t.disconnect(),a&&a(o.value)})),{domRef:n}}});n("2d37");ce.render=ne,ce.__scopeId="data-v-68e90022";var re=ce,oe=Object(r["G"])("data-v-baddbc5e");Object(r["u"])("data-v-baddbc5e");var ae=Object(r["i"])("stop",{offset:"0%","stop-color":"white"},null,-1),ie=Object(r["i"])("stop",{offset:"100%","stop-color":"transparent"},null,-1);Object(r["s"])();var ue=oe((function(e,t){return Object(r["r"])(),Object(r["e"])("div",{class:"block-container",onMousemove:t[1]||(t[1]=function(){return e.control.apply(e,arguments)}),onMouseleave:t[2]||(t[2]=function(){return e.release.apply(e,arguments)}),ref:"blockContainerRef"},[Object(r["w"])(e.$slots,"default"),(Object(r["r"])(),Object(r["e"])("svg",{class:"svg-mask",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 ".concat(Math.max(e.windowSize.width-32,0)," ").concat(Math.max(e.windowSize.height-32,0)),ref:"svgRef"},[Object(r["i"])("defs",null,[Object(r["i"])("radialGradient",{id:"Gradient-".concat(e.id),cx:e.svgCursorPercent.x,cy:e.svgCursorPercent.y,r:"0.2"},[ae,ie],8,["id","cx","cy"]),Object(r["i"])("mask",{id:"Mask-".concat(e.id)},[(Object(r["r"])(!0),Object(r["e"])(r["b"],null,Object(r["v"])(e.layout,(function(e){return Object(r["r"])(),Object(r["e"])("rect",{x:e.x-1,y:e.y-1,width:e.width,height:e.height,key:e.i,fill:"black",stroke:"white","stroke-width":"2"},null,8,["x","y","width","height"])})),256))],8,["id"])]),Object(r["i"])("rect",{x:"0",y:"0",width:e.maxSide,height:e.maxSide,fill:e.isStart?"url('#Gradient-".concat(e.id,"')"):"transparent",mask:e.isStart?"url('#Mask-".concat(e.id,"')"):void 0},null,8,["width","height","fill","mask"])],8,["viewBox"]))],544)})),le=(n("4de4"),n("c740"),n("2ef0")),se=function(e,t){var n=Object(b["i"])(),c=Object(b["i"])(),o={ro:new ResizeObserver((function(e){c.value=n.value.getBoundingClientRect()})),mounted:function(){var e=n.value;if(!e)throw new Error("获取svg dom失败!!!");c.value=e.getBoundingClientRect(),o.ro.observe(e)},unmounted:function(){o.ro.disconnect()}},a=Object(b["i"])({x:0,y:0}),i=Object(r["d"])((function(){return Math.max(e.value.height-32,e.value.width-32,0)})),u=Object(b["h"])(new Set),l=function(){u.add("start")},s=function(){u.delete("start")},d=function(e){var t=n.value;if(u.has("start")&&t){var c=t.getBoundingClientRect(),r=e.x-c.x,o=e.y-c.y;a.value={x:r/i.value,y:o/i.value}}},f=Object(b["h"])(new Array),j=Object(r["d"])((function(){var e=n.value,t=e?e.getBoundingClientRect():{x:0,y:0},c=f.filter((function(e){return e.rect})).map((function(e){return{width:e.rect.width,height:e.rect.height,i:e.id,x:e.rect.x-t.x,y:e.rect.y-t.y}}));return c})),O=Object(r["d"])((function(){return u.has("start")}));return{layout:j,svgCursorPercent:a,svgRef:n,control:l,release:s,cursorMove:d,blocks:f,isStart:O,maxSide:i,svgObserver:o}},be=function(e){var t=Object(b["i"])(0),n=new Array;return Object(r["t"])("regist-any-block",(function(n){return n.id=++t.value,e.push(n),n.id})),Object(r["t"])("update-block-state",(function(t){var n=e.findIndex((function(e){return e.id===t.id}));-1!==n&&(e[n]=t)})),Object(r["t"])("on-will-update-rect",(function(e,t){n.push({cb:e,id:t})})),Object(r["t"])("unmounted-block",(function(t){n.splice(n.findIndex((function(e){return e.id===t})),1),e.splice(e.findIndex((function(e){return e.id===t})),1)})),{updateQuene:n}},de=Object(r["j"])({name:"blockContainer",setup:function(){var e=j("block-container"),t={top:0,left:0},n=Object(b["i"])({width:200,height:200}),c=Object(b["i"])(t),o=se(n,c),a=o.layout,i=o.svgCursorPercent,u=o.svgRef,l=o.cursorMove,s=o.control,d=o.release,f=o.blocks,O=o.isStart,v=o.maxSide,p=o.svgObserver,h=be(f),w=h.updateQuene,g=Object(le["debounce"])((function(){w.forEach((function(e){return e.cb()}))}),100),y=Object(b["i"])(),k=new ResizeObserver(g);return Object(r["o"])((function(){var e=y.value;e&&k.observe(e);var t=Object(r["n"])("window-size"),o=Object(r["n"])("window-offset");if(!t)throw new Error("block-container组件必须在window组件的包裹下或手动注入窗口尺寸");n.value=t,o&&(c.value=o),p.mounted(),n.value&&Object(r["C"])((function(){return n.value}),g,{deep:!0,immediate:!0}),D("mousemove",l)})),Object(r["p"])((function(){p.unmounted(),k.disconnect()})),{layout:a,svgCursorPercent:i,svgRef:u,control:s,release:d,windowSize:n,isStart:O,maxSide:v,id:e,blockContainerRef:y}}});n("40a7");de.render=ue,de.__scopeId="data-v-baddbc5e";var fe=de,je=Object(r["G"])("data-v-048d79a8");Object(r["u"])("data-v-048d79a8");var Oe={class:"aside-manage-bar"},ve={class:"windows-list",ref:"windowsListRef"};Object(r["s"])();var pe=je((function(e,t){var n=Object(r["x"])("block"),c=Object(r["x"])("block-container");return Object(r["r"])(),Object(r["e"])("div",{class:"window-container",ref:"selfRef",onMousemove:t[1]||(t[1]=function(){return e.onMouseMove.apply(e,arguments)}),style:e.style},[Object(r["w"])(e.$slots,"default"),Object(r["i"])("div",Oe,[Object(r["i"])(c,null,{default:je((function(){return[Object(r["i"])("ul",ve,[(Object(r["r"])(!0),Object(r["e"])(r["b"],null,Object(r["v"])(e.windows,(function(t){return Object(r["r"])(),Object(r["e"])("li",{key:t.id},[Object(r["i"])(n,null,{default:je((function(){return[Object(r["i"])("div",{class:"profile",onClick:function(n){return e.pullWindow(t)}},Object(o["F"])(t.name),9,["onClick"])]})),_:2},1024)])})),128))],512)]})),_:1})])],36)})),he=Object(r["j"])({name:"window-container",props:{bgUrl:{type:String,required:!0}},setup:function(e){var t=Object(b["h"])(new Array),n=Object(b["i"])();Object(r["t"])("window-regist",(function(e){t.push(e)}));var c=Object(b["i"])(null),o=function(e){J("mousemove").forEach((function(t){return t(e)}))},a=Object(r["d"])((function(){return"background-image:url(".concat(e.bgUrl,")")})),i=Object(b["h"])({width:0,height:0});Object(r["t"])("window-size",i),Object(r["o"])((function(){var e=function e(){var t,c=null===(t=n.value)||void 0===t?void 0:t.getBoundingClientRect();if(!c||c&&0===c.height)return setTimeout(e,300);i.width=c.width+32,i.height=c.height+32};e()}));var u=function(e){e.zIndex=N()};return{window:window,selfRef:c,onMouseMove:o,style:a,windows:t,windowsListRef:n,pullWindow:u}}});n("749c");he.render=pe,he.__scopeId="data-v-048d79a8";var we=he,ge=Object(c["a"])(T),ye=[Z,re,fe,we];ye.forEach((function(e){ge.component(e.name,e)})),ge.mount("#app")},f815:function(e,t,n){}});
//# sourceMappingURL=app.e065e0c7.js.map