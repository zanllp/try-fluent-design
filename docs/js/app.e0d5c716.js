(function(e){function t(t){for(var c,a,u=t[0],i=t[1],l=t[2],s=0,b=[];s<u.length;s++)a=u[s],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&b.push(r[a][0]),r[a]=0;for(c in i)Object.prototype.hasOwnProperty.call(i,c)&&(e[c]=i[c]);f&&f(t);while(b.length)b.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],c=!0,u=1;u<n.length;u++){var i=n[u];0!==r[i]&&(c=!1)}c&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var c={},r={app:0},o=[];function a(t){if(c[t])return c[t].exports;var n=c[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=c,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)a.d(n,c,function(t){return e[t]}.bind(null,c));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],i=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var f=i;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},2517:function(e,t,n){},"28cd":function(e,t,n){},"2d37":function(e,t,n){"use strict";n("8b00")},"41e6":function(e,t,n){},"4d05":function(e,t,n){},"53ae":function(e,t,n){},6101:function(e,t,n){"use strict";n("41e6")},"749c":function(e,t,n){"use strict";n("ba6e")},"82a4":function(e,t,n){"use strict";n("2517")},"8b00":function(e,t,n){},"918e":function(e,t,n){"use strict";n("28cd")},ad42:function(e,t,n){"use strict";n("4d05")},b474:function(e,t,n){},ba6e:function(e,t,n){},bcf1:function(e,t,n){"use strict";n("b474")},cd49:function(e,t,n){"use strict";n.r(t);n("4160"),n("b0c0"),n("159b"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var c=n("7a23");function r(e,t){var n=Object(c["t"])("calculator"),r=Object(c["t"])("calendar"),o=Object(c["t"])("layout"),a=Object(c["t"])("window-container");return Object(c["k"])(),Object(c["d"])(a,{class:"window-manage","bg-url":e.bgUrl},{default:Object(c["x"])((function(){return[Object(c["f"])(n),Object(c["f"])(r),Object(c["f"])(o)]})),_:1},8,["bg-url"])}var o=Object(c["o"])({darkMode:!0,idPool:{window:[],"block-container":[]}}),a=(n("cb29"),n("4de4"),n("d81d"),n("4fad"),n("2909")),u=function(e){var t=e>>16,n=e>>8&255,c=255&e;return[t,n,c]},i=function(e){var t=o.idPool[e],n=0!==t.length?t[t.length-1]+1:0;return t.push(n),n},l=function(e,t){return Array(e).fill(null).map((function(e,n){return t(n)}))},f={xs:0,sm:-1,md:-2,lg:-3,xl:-4},s=Object(c["p"])(["xs","sm","md","lg","xl"]),b=Object(c["p"])(Object(a["a"])(s).reverse()),d=function(){var e=Object(c["h"])("window-size");if(!e)throw new Error("useReactiveBreakPoint必须在window组件的包裹的组件内");return Object(c["b"])((function(){var t=e.width;return{xs:t<578,sm:t<768,md:t<992,lg:t<1200,xl:!0}}))},O=function(){var e=d();return Object(c["b"])((function(){return Object.entries(e.value).filter((function(e){return e[1]})).sort((function(e,t){return f[t[0]]-f[e[0]]})).map((function(e){return e[0]}))}))},j=Object(c["z"])("data-v-2d653d16");Object(c["n"])("data-v-2d653d16");var v={class:"temp-area"},p={class:"display-area"};Object(c["l"])();var h=j((function(e,t){var n=Object(c["t"])("block"),r=Object(c["t"])("block-container"),o=Object(c["t"])("window");return Object(c["k"])(),Object(c["d"])(o,{name:"计算器",dark:!1,size:{height:384,width:512}},{default:j((function(){return[Object(c["f"])(r,null,{default:j((function(){return[Object(c["f"])("div",v,Object(c["u"])(e.tempText),1),Object(c["f"])("div",p,Object(c["u"])(e.displayText),1),Object(c["f"])("div",null,[(Object(c["k"])(!0),Object(c["d"])(c["a"],null,Object(c["r"])(e.operators,(function(t){return Object(c["k"])(),Object(c["d"])(n,{key:t,class:"key-btn op-btn",onClick:function(n){return e.keydown(t)}},{default:j((function(){return[Object(c["e"])(Object(c["u"])(t),1)]})),_:2},1032,["onClick"])})),128))]),Object(c["f"])("div",null,[(Object(c["k"])(!0),Object(c["d"])(c["a"],null,Object(c["r"])(e.numKeys,(function(t){return Object(c["k"])(),Object(c["d"])(n,{key:t,class:"key-btn",onClick:function(n){return e.keydown(t)}},{default:j((function(){return[Object(c["e"])(Object(c["u"])(t),1)]})),_:2},1032,["onClick"])})),128))])]})),_:1})]})),_:1})})),w=(n("99af"),n("a15b"),n("a434"),n("a9e3"),Object(c["g"])({setup:function(){var e=Object(c["o"])([0]),t=Object(c["b"])((function(){return e.join("")})),n=Object(c["o"])(new Array),r=Object(c["b"])((function(){return n.join("")})),o=Object(c["o"])(l(10,(function(e){return e}))),u=function(e,t,n){switch(e){case"+":return t+n;case"-":return t-n;case"*":return t*n;case"/":return t/n}},i=function(){var e=function(){var e=n.shift();while(e&&"number"===typeof n[0])e="".concat(e).concat(n.shift());return Number(e)},t=e();while(n.length&&void 0!==t){var c=n.shift(),r=e();t=u(c,t,r)}return t},f=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),c=1;c<t;c++)n[c-1]=arguments[c];e.splice.apply(e,[0,e.length].concat(n))},s=function(t){var c=e;switch(t){case"c":f(c,0),f(n);break;case"+":case"-":case"*":case"/":c.push(t),n.push(t);break;case"ce":f(c,0);break;case"=":f.apply(void 0,[c].concat(Object(a["a"])(n),["=",i()]));break;case"del":c.pop(),n.pop();break;default:n.push(t),"number"!==typeof c[c.length-1]&&f(c),1===c.length&&0===c[0]&&c.pop(),c.push(t);break}},b=Object(c["o"])(["+","-","*","/","c","ce","=","del"]);return{numKeys:o,displayText:t,keydown:s,operators:b,tempText:r}}}));n("6101");w.render=h,w.__scopeId="data-v-2d653d16";var g=w,k=Object(c["z"])("data-v-47d02950");Object(c["n"])("data-v-47d02950");var y={class:"profile"},m={class:"action-bar"},x={class:"title"},z={key:1,class:"block-adapter table-cell"};Object(c["l"])();var _=k((function(e,t){var n=Object(c["t"])("block"),r=Object(c["t"])("block-container"),o=Object(c["t"])("window");return Object(c["k"])(),Object(c["d"])(o,{name:"日历",size:{height:550,width:448}},{default:k((function(){return[Object(c["f"])(r,null,{default:k((function(){return[Object(c["f"])("div",y,[Object(c["f"])("div",m,[Object(c["f"])(n,null,{default:k((function(){return[Object(c["f"])("div",{class:"action-icon",onClick:t[1]||(t[1]=function(t){return e.onActionBtnClick("decr")})},"←")]})),_:1}),Object(c["f"])(n,null,{default:k((function(){return[Object(c["f"])("div",{class:"action-icon",onClick:t[2]||(t[2]=function(t){return e.onActionBtnClick("incr")})},"→")]})),_:1})]),Object(c["f"])("div",x,Object(c["u"])(e.day.format("L")),1)]),Object(c["f"])("div",null,[(Object(c["k"])(),Object(c["d"])(c["a"],null,Object(c["r"])(7,(function(t){return Object(c["f"])("span",{key:t,class:"table-cell block-adapter"},"星期"+Object(c["u"])(e.bucketsMap[t-1]),1)})),64)),(Object(c["k"])(!0),Object(c["d"])(c["a"],null,Object(c["r"])(e.buckets,(function(t,r){return Object(c["k"])(),Object(c["d"])("div",{key:r},[(Object(c["k"])(!0),Object(c["d"])(c["a"],null,Object(c["r"])(t,(function(t,r){return Object(c["k"])(),Object(c["d"])("span",{key:r},[void 0!==t?Object(c["f"])(n,{key:0,class:"day table-cell","data-now":e.day.get("date")===t,onClick:function(n){return e.onDayBtnClick(t)}},{default:k((function(){return[Object(c["e"])(Object(c["u"])(t),1)]})),_:2},1032,["data-now","onClick"]):(Object(c["k"])(),Object(c["d"])("div",z))])})),128))])})),128))])]})),_:1})]})),_:1})})),S=(n("13d5"),n("5a0c")),C=n.n(S),M=n("23ad"),P=n.n(M);n("a471");C.a.locale("zh-cn"),C.a.extend(P.a);var R=function(e,t){return C()().set("year",t).set("month",e+1).set("date",-1).get("date")+1},I=Object(c["g"])({setup:function(){var e=Object(c["q"])(C()()),t=Object(c["b"])((function(){return R(e.value.get("month"),e.value.get("year"))})),n=function(t){switch(t){case"incr":e.value=e.value.add(1,"month");break;case"decr":e.value=e.value.subtract(1,"month");break}},r=function(t){e.value=e.value.set("date",t)},o=Object(c["b"])((function(){return l(t.value,(function(e){return e+1})).reduce((function(t,n){var c,r=e.value.set("date",n),o=r.get("day");return 0===o||t[t.length-1].length>6?(c=new Array,t.push(c)):c=t[t.length-1],c[o]=n,t}),[[]])})),a="天一二三四五六";return{days:t,day:e,onActionBtnClick:n,onDayBtnClick:r,bucketsMap:a,buckets:o}}});n("82a4");I.render=_,I.__scopeId="data-v-47d02950";var A=I,B=Object(c["e"])("hello"),q=Object(c["e"])("world");function E(e,t){var n=Object(c["t"])("block"),r=Object(c["t"])("fd-col"),o=Object(c["t"])("fd-row"),a=Object(c["t"])("block-container"),u=Object(c["t"])("window");return Object(c["k"])(),Object(c["d"])(u,{"init-pos":{top:512,left:480},name:"响应式24栏栅格"},{default:Object(c["x"])((function(){return[Object(c["f"])(a,null,{default:Object(c["x"])((function(){return[Object(c["f"])(o,null,{default:Object(c["x"])((function(){return[(Object(c["k"])(!0),Object(c["d"])(c["a"],null,Object(c["r"])(e.blocks,(function(e){return Object(c["k"])(),Object(c["d"])(r,{key:e,span:{xs:6,md:5,xl:4},offset:{xs:0,md:1,xl:2}},{default:Object(c["x"])((function(){return[Object(c["f"])(n,{value:e},{default:Object(c["x"])((function(){return[Object(c["e"])(Object(c["u"])(e),1)]})),_:2},1032,["value"])]})),_:2},1024)})),128))]})),_:1}),Object(c["f"])(o,null,{default:Object(c["x"])((function(){return[(Object(c["k"])(!0),Object(c["d"])(c["a"],null,Object(c["r"])(e.blocks,(function(e){return Object(c["k"])(),Object(c["d"])(r,{key:e,span:{xs:8,xl:6}},{default:Object(c["x"])((function(){return[Object(c["f"])(n,{value:e},{default:Object(c["x"])((function(){return[Object(c["e"])(Object(c["u"])(e),1)]})),_:2},1032,["value"])]})),_:2},1024)})),128))]})),_:1}),Object(c["f"])(o,null,{default:Object(c["x"])((function(){return[Object(c["f"])(r,{span:"4",offset:"3"},{default:Object(c["x"])((function(){return[B]})),_:1}),Object(c["f"])(r,{span:"4",offset:"3"},{default:Object(c["x"])((function(){return[q]})),_:1})]})),_:1})]})),_:1})]})),_:1})}var L=Object(c["g"])({name:"App",setup:function(){var e=Object(c["o"])(l(6,(function(e){return String.fromCharCode(65+e)})));return{blocks:e}}});L.render=E;var T=L,$="https://static.ioflow.link/0cfedb5240eadc505e723bf2bc4f14e8bf7eb3fb96fc6ea53e856f3f863c2ba0d38f83de492f609290bc6ad0a9a2b583.jpg",U=Object(c["g"])({components:{calculator:g,calendar:A,layout:T},name:"App",setup:function(){var e=Object(c["o"])(l(6,(function(e){return String.fromCharCode(65+e)})));return{window:window,darkMode:Object(c["v"])(o,"darkMode"),blocks:e,bgUrl:$}}});U.render=r;var X=U,Y=Object(c["z"])("data-v-5931e567");Object(c["n"])("data-v-5931e567");var G={class:"blur-layer"},N=Object(c["f"])("div",{class:"noise-layer"},null,-1);Object(c["l"])();var D=Y((function(e,t){return Object(c["k"])(),Object(c["d"])("div",{class:"container-wrap",style:e.style,onMousedown:t[1]||(t[1]=Object(c["y"])((function(){return e.control.apply(e,arguments)}),["left"])),onMouseup:t[2]||(t[2]=Object(c["y"])((function(){return e.release.apply(e,arguments)}),["left"])),onMouseleave:t[3]||(t[3]=function(){return e.release.apply(e,arguments)})},[Object(c["f"])("div",G,[Object(c["f"])("div",{class:"color-layer",style:e.colorLayerStyle},[N],4)]),Object(c["f"])("div",{class:"content",style:"color:".concat(e.darkMode?"white":"black")},[Object(c["s"])(e.$slots,"default")],4)],36)})),J=(n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),new Map),K=function(e,t){var n=J.get(e);n?n.push(t):J.set(e,[t])},Q=function(e){return J.get(e)||[]},W=(n("a630"),n("6062"),{start:"move",resize:"nwse-resize"}),F=function(e,t,n){return Object(c["o"])({offset:{top:0,left:0},size:n,zIndex:0,backgroundPos:{top:0,left:0},flagSet:new Set,initPos:e,name:t,id:i("window")})},H=function(e){var t=e,n=Object(c["b"])((function(){var e={top:-t.offset.top-t.initPos.top-2+16,left:-t.offset.left-t.initPos.left-2+16};return"\n          background-position:".concat(e.left,"px ").concat(e.top,"px;\n          transform:translate(").concat(t.offset.left,"px,").concat(t.offset.top,"px);\n          cursor:").concat(W[Array.from(t.flagSet.keys())[0]],";\n          width:").concat(t.size.width,"px;\n          height:").concat(t.size.height,"px;\n          top:").concat(t.initPos.top,"px;\n          left:").concat(t.initPos.left,"px;\n          z-index:").concat(t.zIndex)}));return{style:n}},V=1,Z=function(){return++V},ee=function(e){var t=function(t){e.flagSet.add("start"),e.zIndex<V&&(e.zIndex=V+1,V=e.zIndex)},n=new Array,c=e,r=function(t){var n=t.type;switch(n){case"mouseleave":!e.flagSet.has("resize")&&e.flagSet.clear();break;case"mouseup":e.flagSet.clear();break}},o=function(e){c.flagSet.has("start")&&(c.flagSet.has("resize")?(c.size.width+=e.movementX,c.size.height+=e.movementY):(c.offset.left+=e.movementX,c.offset.top+=e.movementY));var t=c.offset.left+c.initPos.left+c.size.width,r=c.offset.top+c.initPos.top+c.size.height,o=16;if(t-e.pageX>0&&t-e.pageX<o&&r-e.pageY>0&&r-e.pageY<o)c.flagSet.has("resize")||n.push(Array.from(c.flagSet)),c.flagSet.add("resize");else if(c.flagSet.has("resize")){var a=n.pop();a&&(c.flagSet.clear(),a.forEach((function(e){return c.flagSet.add(e)})))}};return{release:r,control:t,move:o}},te=Object(c["g"])({name:"window",props:{initPos:{default:function(){return{top:256,left:256}}},name:{type:String,default:""},dark:{type:Boolean,default:void 0},size:{default:function(){return{width:512,height:256}}}},setup:function(e){var t=e,n=F(t.initPos,t.name,t.size),r=H(n),a=r.style,i=ee(n),l=i.move,f=i.control,s=i.release;Object(c["m"])("window-size",n.size),Object(c["m"])("window-offset",n.offset);var b=Object(c["h"])("window-regist");Object(c["i"])((function(){K("mousemove",l),b&&b(n)}));var d=Object(c["q"])(void 0===e.dark?Object(c["v"])(o,"darkMode"):e.dark),O=Object(c["b"])((function(){return"background: rgba(".concat(u(d.value?0:16777215),", 0.4)")}));return{style:a,colorLayerStyle:O,release:s,control:f,darkMode:d,state:n}}});n("cfe2");te.render=D,te.__scopeId="data-v-5931e567";var ne=te,ce=Object(c["z"])("data-v-68e90022");Object(c["n"])("data-v-68e90022");var re={class:"block",ref:"domRef"};Object(c["l"])();var oe=ce((function(e,t){return Object(c["k"])(),Object(c["d"])("div",re,[Object(c["s"])(e.$slots,"default")],512)})),ae=Object(c["g"])({name:"block",props:{value:{type:String}},setup:function(e){var t,n=Object(c["q"])(),r=Object(c["q"])(null),o=Object(c["q"])(),a=Object(c["h"])("unmounted-block"),u=Object(c["h"])("regist-any-block"),i=Object(c["h"])("update-block-state"),l=Object(c["h"])("on-will-update-rect");return Object(c["i"])((function(){var c=n.value;if(!c)throw new Error("任意形状块获取dom失败!!!");if(!(u&&i&&l))throw new Error("block组件必须在block-container组件的包裹下");t=new ResizeObserver((function(t){r.value=t[0].target.getBoundingClientRect(),i({value:e.value,rect:r.value,id:o.value||-1})})),t.observe(c),o.value=u({value:e.value,rect:r.value,id:-1}),l((function(){r.value=c.getBoundingClientRect(),i({value:e.value,rect:r.value,id:o.value})}),o.value)})),Object(c["j"])((function(){var e=n.value;e&&t&&t.disconnect(),a&&a(o.value)})),{domRef:n}}});n("2d37");ae.render=oe,ae.__scopeId="data-v-68e90022";var ue=ae,ie=Object(c["z"])("data-v-3cf8892c");Object(c["n"])("data-v-3cf8892c");var le=Object(c["f"])("stop",{offset:"0%","stop-color":"white"},null,-1),fe=Object(c["f"])("stop",{offset:"100%","stop-color":"transparent"},null,-1);Object(c["l"])();var se=ie((function(e,t){return Object(c["k"])(),Object(c["d"])("div",{class:"block-container",onMousemove:t[1]||(t[1]=function(){return e.control.apply(e,arguments)}),onMouseleave:t[2]||(t[2]=function(){return e.release.apply(e,arguments)}),ref:"blockContainerRef"},[Object(c["s"])(e.$slots,"default"),(Object(c["k"])(),Object(c["d"])("svg",{class:"svg-mask",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 ".concat(Math.max(e.windowSize.width-32,0)," ").concat(Math.max(e.windowSize.height-32,0)),ref:"svgRef"},[Object(c["f"])("defs",null,[Object(c["f"])("radialGradient",{id:"Gradient-".concat(e.id),cx:e.svgCursorPercent.x,cy:e.svgCursorPercent.y,r:"0.2"},[le,fe],8,["id","cx","cy"]),Object(c["f"])("mask",{id:"Mask-".concat(e.id)},[(Object(c["k"])(!0),Object(c["d"])(c["a"],null,Object(c["r"])(e.layout,(function(e){return Object(c["k"])(),Object(c["d"])("rect",{x:e.x-1,y:e.y-1,width:e.width,height:e.height,key:e.i,fill:"black",stroke:"white","stroke-width":"2"},null,8,["x","y","width","height"])})),128))],8,["id"])]),Object(c["f"])("rect",{x:"0",y:"0",width:e.maxSide,height:e.maxSide,fill:e.isStart?"url('#Gradient-".concat(e.id,"')"):"transparent",mask:e.isStart?"url('#Mask-".concat(e.id,"')"):void 0},null,8,["width","height","fill","mask"])],8,["viewBox"]))],544)})),be=(n("c740"),n("2ef0")),de=function(e,t){var n=Object(c["q"])(),r=Object(c["q"])(),o={ro:new ResizeObserver((function(e){r.value=n.value.getBoundingClientRect()})),mounted:function(){var e=n.value;if(!e)throw new Error("获取svg dom失败!!!");r.value=e.getBoundingClientRect(),o.ro.observe(e)},unmounted:function(){o.ro.disconnect()}},a=Object(c["q"])({x:0,y:0}),u=Object(c["b"])((function(){return Math.max(e.value.height-32,e.value.width-32,0)})),i=Object(c["o"])(new Set),l=function(){i.add("start")},f=function(){i.delete("start")},s=function(e){var t=n.value;if(i.has("start")&&t){var c=t.getBoundingClientRect(),r=e.x-c.x,o=e.y-c.y;a.value={x:r/u.value,y:o/u.value}}},b=Object(c["o"])(new Array),d=Object(c["b"])((function(){var e=n.value,t=e?e.getBoundingClientRect():{x:0,y:0},c=b.filter((function(e){return e.rect})).map((function(e){return{width:e.rect.width,height:e.rect.height,i:e.id,x:e.rect.x-t.x,y:e.rect.y-t.y}}));return c})),O=Object(c["b"])((function(){return i.has("start")}));return{layout:d,svgCursorPercent:a,svgRef:n,control:l,release:f,cursorMove:s,blocks:b,isStart:O,maxSide:u,svgObserver:o}},Oe=function(e){var t=Object(c["q"])(0),n=new Array;return Object(c["m"])("regist-any-block",(function(n){return n.id=++t.value,e.push(n),n.id})),Object(c["m"])("update-block-state",(function(t){var n=e.findIndex((function(e){return e.id===t.id}));-1!==n&&(e[n]=t)})),Object(c["m"])("on-will-update-rect",(function(e,t){n.push({cb:e,id:t})})),Object(c["m"])("unmounted-block",(function(t){n.splice(n.findIndex((function(e){return e.id===t})),1),e.splice(e.findIndex((function(e){return e.id===t})),1)})),{updateQuene:n}},je=Object(c["g"])({name:"blockContainer",setup:function(){var e=i("block-container"),t={top:0,left:0},n=Object(c["q"])({width:200,height:200}),r=Object(c["q"])(t),o=de(n,r),a=o.layout,u=o.svgCursorPercent,l=o.svgRef,f=o.cursorMove,s=o.control,b=o.release,d=o.blocks,O=o.isStart,j=o.maxSide,v=o.svgObserver,p=Oe(d),h=p.updateQuene,w=Object(be["debounce"])((function(){h.forEach((function(e){return e.cb()}))}),100),g=Object(c["q"])(),k=new ResizeObserver(w);return Object(c["i"])((function(){var e=g.value;e&&k.observe(e);var t=Object(c["h"])("window-size"),o=Object(c["h"])("window-offset");if(!t)throw new Error("block-container组件必须在window组件的包裹下或手动注入窗口尺寸");n.value=t,o&&(r.value=o),v.mounted(),n.value&&Object(c["w"])((function(){return n.value}),w,{deep:!0,immediate:!0}),K("mousemove",f)})),Object(c["j"])((function(){v.unmounted(),k.disconnect()})),{layout:a,svgCursorPercent:u,svgRef:l,control:s,release:b,windowSize:n,isStart:O,maxSide:j,id:e,blockContainerRef:g}}});n("918e");je.render=se,je.__scopeId="data-v-3cf8892c";var ve=je,pe=Object(c["z"])("data-v-048d79a8");Object(c["n"])("data-v-048d79a8");var he={class:"aside-manage-bar"},we={class:"windows-list",ref:"windowsListRef"};Object(c["l"])();var ge=pe((function(e,t){var n=Object(c["t"])("block"),r=Object(c["t"])("block-container");return Object(c["k"])(),Object(c["d"])("div",{class:"window-container",ref:"selfRef",onMousemove:t[1]||(t[1]=function(){return e.onMouseMove.apply(e,arguments)}),style:e.style},[Object(c["s"])(e.$slots,"default"),Object(c["f"])("div",he,[Object(c["f"])(r,null,{default:pe((function(){return[Object(c["f"])("ul",we,[(Object(c["k"])(!0),Object(c["d"])(c["a"],null,Object(c["r"])(e.windows,(function(t){return Object(c["k"])(),Object(c["d"])("li",{key:t.id},[Object(c["f"])(n,null,{default:pe((function(){return[Object(c["f"])("div",{class:"profile",onClick:function(n){return e.pullWindow(t)}},Object(c["u"])(t.name),9,["onClick"])]})),_:2},1024)])})),128))],512)]})),_:1})])],36)})),ke=Object(c["g"])({name:"window-container",props:{bgUrl:{type:String,required:!0}},setup:function(e){var t=Object(c["o"])(new Array),n=Object(c["q"])();Object(c["m"])("window-regist",(function(e){t.push(e)}));var r=Object(c["q"])(null),o=function(e){Q("mousemove").forEach((function(t){return t(e)}))},a=Object(c["b"])((function(){return"background-image:url(".concat(e.bgUrl,")")})),u=Object(c["o"])({width:0,height:0});Object(c["m"])("window-size",u),Object(c["i"])((function(){var e=function e(){var t,c=null===(t=n.value)||void 0===t?void 0:t.getBoundingClientRect();if(!c||c&&0===c.height)return setTimeout(e,300);u.width=c.width+32,u.height=c.height+32};e()}));var i=function(e){e.zIndex=Z()};return{window:window,selfRef:r,onMouseMove:o,style:a,windows:t,windowsListRef:n,pullWindow:i}}});n("749c");ke.render=ge,ke.__scopeId="data-v-048d79a8";var ye=ke,me=Object(c["z"])("data-v-1c65c784"),xe=me((function(e,t){return Object(c["k"])(),Object(c["d"])("div",{class:[].concat(Object(a["a"])(e.classList),["base-col-class"])},[Object(c["s"])(e.$slots,"default")],2)})),ze=(n("c975"),function(e,t,n){var r=Object(c["b"])((function(){var c=new Array,r=t.value,o=n.value,a=e.value;if("number"===typeof r)c.push("col-offset-".concat(r));else{var u=a.filter((function(e){return r[e]}))[0];if(u)c.push("col-offset-".concat(r[u]));else for(var i=b,l=a[0],f=i.indexOf(l)+1;f<i.length;f++)if(r[i[f]]){c.push("col-offset-".concat(r[i[f]]));break}}if("number"===typeof o)c.push("col-span-".concat(o));else{var s=a.filter((function(e){return o[e]}))[0];if(s)c.push("col-span-".concat(o[s]));else for(var d=b,O=a[0],j=d.indexOf(O)+1;j<d.length;j++)if(o[d[j]]){c.push("col-span-".concat(o[d[j]]));break}}return c}));return{classList:r}}),_e=Object(c["g"])({name:"fd-col",props:{span:{default:function(){if(" ".length)throw new Error("col组件的span必填！");return 0}},offset:{default:0}},setup:function(e){var t=O(),n=Object(c["b"])((function(){var t=e.span,n="string"===typeof t?Number(t):t;return n})),r=Object(c["b"])((function(){var t=e.offset,n="string"===typeof t?Number(t):t;return n})),o=ze(t,r,n),a=o.classList;return{classList:a}}});n("ad42");_e.render=xe,_e.__scopeId="data-v-1c65c784";var Se=_e,Ce=Object(c["z"])("data-v-8052f986"),Me=Ce((function(e,t){return Object(c["k"])(),Object(c["d"])("div",null,[Object(c["s"])(e.$slots,"default")])})),Pe=Object(c["g"])({name:"fd-row",props:{},setup:function(){return{}}});n("bcf1");Pe.render=Me,Pe.__scopeId="data-v-8052f986";var Re=Pe,Ie=Object(c["c"])(X),Ae=[ne,ue,ve,ye,Se,Re];Ae.forEach((function(e){Ie.component(e.name,e)})),Ie.mount("#app")},cfe2:function(e,t,n){"use strict";n("53ae")}});
//# sourceMappingURL=app.e0d5c716.js.map