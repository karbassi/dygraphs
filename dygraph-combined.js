Date.ext={};Date.ext.util={};Date.ext.util.xPad=function(x,pad,r){if(typeof (r)=="undefined"){r=10}for(;parseInt(x,10)<r&&r>1;r/=10){x=pad.toString()+x}return x.toString()};Date.prototype.locale="en-GB";if(document.getElementsByTagName("html")&&document.getElementsByTagName("html")[0].lang){Date.prototype.locale=document.getElementsByTagName("html")[0].lang}Date.ext.locales={};Date.ext.locales.en={a:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B:["January","February","March","April","May","June","July","August","September","October","November","December"],c:"%a %d %b %Y %T %Z",p:["AM","PM"],P:["am","pm"],x:"%d/%m/%y",X:"%T"};Date.ext.locales["en-US"]=Date.ext.locales.en;Date.ext.locales["en-US"].c="%a %d %b %Y %r %Z";Date.ext.locales["en-US"].x="%D";Date.ext.locales["en-US"].X="%r";Date.ext.locales["en-GB"]=Date.ext.locales.en;Date.ext.locales["en-AU"]=Date.ext.locales["en-GB"];Date.ext.formats={a:function(d){return Date.ext.locales[d.locale].a[d.getDay()]},A:function(d){return Date.ext.locales[d.locale].A[d.getDay()]},b:function(d){return Date.ext.locales[d.locale].b[d.getMonth()]},B:function(d){return Date.ext.locales[d.locale].B[d.getMonth()]},c:"toLocaleString",C:function(d){return Date.ext.util.xPad(parseInt(d.getFullYear()/100,10),0)},d:["getDate","0"],e:["getDate"," "],g:function(d){return Date.ext.util.xPad(parseInt(Date.ext.util.G(d)/100,10),0)},G:function(d){var y=d.getFullYear();var V=parseInt(Date.ext.formats.V(d),10);var W=parseInt(Date.ext.formats.W(d),10);if(W>V){y++}else{if(W===0&&V>=52){y--}}return y},H:["getHours","0"],I:function(d){var I=d.getHours()%12;return Date.ext.util.xPad(I===0?12:I,0)},j:function(d){var ms=d-new Date(""+d.getFullYear()+"/1/1 GMT");ms+=d.getTimezoneOffset()*60000;var doy=parseInt(ms/60000/60/24,10)+1;return Date.ext.util.xPad(doy,0,100)},m:function(d){return Date.ext.util.xPad(d.getMonth()+1,0)},M:["getMinutes","0"],p:function(d){return Date.ext.locales[d.locale].p[d.getHours()>=12?1:0]},P:function(d){return Date.ext.locales[d.locale].P[d.getHours()>=12?1:0]},S:["getSeconds","0"],u:function(d){var dow=d.getDay();return dow===0?7:dow},U:function(d){var doy=parseInt(Date.ext.formats.j(d),10);var rdow=6-d.getDay();var woy=parseInt((doy+rdow)/7,10);return Date.ext.util.xPad(woy,0)},V:function(d){var woy=parseInt(Date.ext.formats.W(d),10);var dow1_1=(new Date(""+d.getFullYear()+"/1/1")).getDay();var idow=woy+(dow1_1>4||dow1_1<=1?0:1);if(idow==53&&(new Date(""+d.getFullYear()+"/12/31")).getDay()<4){idow=1}else{if(idow===0){idow=Date.ext.formats.V(new Date(""+(d.getFullYear()-1)+"/12/31"))}}return Date.ext.util.xPad(idow,0)},w:"getDay",W:function(d){var doy=parseInt(Date.ext.formats.j(d),10);var rdow=7-Date.ext.formats.u(d);var woy=parseInt((doy+rdow)/7,10);return Date.ext.util.xPad(woy,0,10)},y:function(d){return Date.ext.util.xPad(d.getFullYear()%100,0)},Y:"getFullYear",z:function(d){var o=d.getTimezoneOffset();var H=Date.ext.util.xPad(parseInt(Math.abs(o/60),10),0);var M=Date.ext.util.xPad(o%60,0);return(o>0?"-":"+")+H+M},Z:function(d){return d.toString().replace(/^.*\(([^)]+)\)$/,"$1")},"%":function(d){return"%"}};Date.ext.aggregates={c:"locale",D:"%m/%d/%y",h:"%b",n:"\n",r:"%I:%M:%S %p",R:"%H:%M",t:"\t",T:"%H:%M:%S",x:"locale",X:"locale"};Date.ext.aggregates.z=Date.ext.formats.z(new Date());Date.ext.aggregates.Z=Date.ext.formats.Z(new Date());Date.ext.unsupported={};Date.prototype.strftime=function(fmt){if(!(this.locale in Date.ext.locales)){if(this.locale.replace(/-[a-zA-Z]+$/,"") in Date.ext.locales){this.locale=this.locale.replace(/-[a-zA-Z]+$/,"")}else{this.locale="en-GB"}}var d=this;while(fmt.match(/%[cDhnrRtTxXzZ]/)){fmt=fmt.replace(/%([cDhnrRtTxXzZ])/g,function(m0,m1){var f=Date.ext.aggregates[m1];return(f=="locale"?Date.ext.locales[d.locale][m1]:f)})}var str=fmt.replace(/%([aAbBCdegGHIjmMpPSuUVwWyY%])/g,function(m0,m1){var f=Date.ext.formats[m1];if(typeof (f)=="string"){return d[f]()}else{if(typeof (f)=="function"){return f.call(d,d)}else{if(typeof (f)=="object"&&typeof (f[0])=="string"){return Date.ext.util.xPad(d[f[0]](),f[1])}else{return m1}}}});d=null;return str};
DygraphLayout=function(_1,_2){
this.dygraph_=_1;
this.options={};
Dygraph.update(this.options,_2?_2:{});
this.datasets=new Array();
};
DygraphLayout.prototype.attr_=function(_3){
return this.dygraph_.attr_(_3);
};
DygraphLayout.prototype.addDataset=function(_4,_5){
this.datasets[_4]=_5;
};
DygraphLayout.prototype.evaluate=function(){
this._evaluateLimits();
this._evaluateLineCharts();
this._evaluateLineTicks();
};
DygraphLayout.prototype._evaluateLimits=function(){
this.minxval=this.maxxval=null;
for(var _6 in this.datasets){
if(!this.datasets.hasOwnProperty(_6)){
continue;
}
var _7=this.datasets[_6];
var x1=_7[0][0];
if(!this.minxval||x1<this.minxval){
this.minxval=x1;
}
var x2=_7[_7.length-1][0];
if(!this.maxxval||x2>this.maxxval){
this.maxxval=x2;
}
}
this.xrange=this.maxxval-this.minxval;
this.xscale=(this.xrange!==0?1/this.xrange:1);
this.minyval=this.options.yAxis[0];
this.maxyval=this.options.yAxis[1];
this.yrange=this.maxyval-this.minyval;
this.yscale=(this.yrange!==0?1/this.yrange:1);
};
DygraphLayout.prototype._evaluateLineCharts=function(){
this.points=new Array();
for(var _10 in this.datasets){
if(!this.datasets.hasOwnProperty(_10)){
continue;
}
var _11=this.datasets[_10];
for(var j=0;j<_11.length;j++){
var _13=_11[j];
var _14={x:((parseFloat(_13[0])-this.minxval)*this.xscale),y:1-((parseFloat(_13[1])-this.minyval)*this.yscale),xval:parseFloat(_13[0]),yval:parseFloat(_13[1]),name:_10};
if(_14.y<=0){
_14.y=0;
}
if(_14.y>=1){
_14.y=1;
}
if((_14.x>=0)&&(_14.x<=1)){
this.points.push(_14);
}
}
}
};
DygraphLayout.prototype._evaluateLineTicks=function(){
this.xticks=new Array();
for(var i=0;i<this.options.xTicks.length;i++){
var _16=this.options.xTicks[i];
var _17=_16.label;
var pos=this.xscale*(_16.v-this.minxval);
if((pos>=0)&&(pos<=1)){
this.xticks.push([pos,_17]);
}
}
this.yticks=new Array();
for(i=0;i<this.options.yTicks.length;i++){
_16=this.options.yTicks[i];
_17=_16.label;
pos=1-(this.yscale*(_16.v-this.minyval));
if((pos>=0)&&(pos<=1)){
this.yticks.push([pos,_17]);
}
}
};
DygraphLayout.prototype.evaluateWithError=function(){
this.evaluate();
if(!this.options.errorBars){
return;
}
var i=0;
for(var _19 in this.datasets){
if(!this.datasets.hasOwnProperty(_19)){
continue;
}
var _20=this.datasets[_19];
for(var j=0;j<_20.length;j++,i++){
var _21=_20[j];
var xv=parseFloat(_21[0]);
var yv=parseFloat(_21[1]);
if(xv===this.points[i].xval&&yv===this.points[i].yval){
this.points[i].errorMinus=parseFloat(_21[2]);
this.points[i].errorPlus=parseFloat(_21[3]);
}
}
}
};
DygraphLayout.prototype.removeAllDatasets=function(){
delete this.datasets;
this.datasets=new Array();
};
DygraphLayout.prototype.updateOptions=function(_24){
Dygraph.update(this.options,_24?_24:{});
};
DygraphCanvasRenderer=function(_25,_26,_27,_28){
this.dygraph_=_25;
this.options={"strokeWidth":0.5,"drawXAxis":true,"drawYAxis":true,"axisLineColor":"black","axisLineWidth":0.5,"axisTickSize":3,"axisLabelColor":"black","axisLabelFont":"Arial","axisLabelFontSize":9,"axisLabelWidth":50,"drawYGrid":true,"drawXGrid":true,"gridLineColor":"rgb(128,128,128)"};
Dygraph.update(this.options,_28);
this.layout=_27;
this.element=_26;
this.container=this.element.parentNode;
this.height=this.element.height;
this.width=this.element.width;
if(!this.isIE&&!(DygraphCanvasRenderer.isSupported(this.element))){
throw "Canvas is not supported.";
}
this.xlabels=new Array();
this.ylabels=new Array();
this.area={x:this.options.yAxisLabelWidth+2*this.options.axisTickSize,y:0};
this.area.w=this.width-this.area.x-this.options.rightGap;
this.area.h=this.height-this.options.axisLabelFontSize-2*this.options.axisTickSize;
this.container.style.position="relative";
this.container.style.width=this.width+"px";
};
DygraphCanvasRenderer.prototype.clear=function(){
var _29;
if(this.isIE){
try{
if(this.clearDelay){
this.clearDelay.cancel();
this.clearDelay=null;
}
_29=this.element.getContext("2d");
}
catch(e){
this.clearDelay=MochiKit.Async.wait(this.IEDelay);
this.clearDelay.addCallback(bind(this.clear,this));
return;
}
}
_29=this.element.getContext("2d");
_29.clearRect(0,0,this.width,this.height);
for(var i=0;i<this.xlabels.length;i++){
var el=this.xlabels[i];
el.parentNode.removeChild(el);
}
for(i=0;i<this.ylabels.length;i++){
el=this.ylabels[i];
el.parentNode.removeChild(el);
}
this.xlabels=new Array();
this.ylabels=new Array();
};
DygraphCanvasRenderer.isSupported=function(_31){
var _32=null;
try{
if(typeof (_31)==="undefined"||_31===null){
_32=document.createElement("canvas");
}else{
_32=_31;
}
var _33=_32.getContext("2d");
}
catch(e){
var ie=navigator.appVersion.match(/MSIE (\d\.\d)/);
var _35=(navigator.userAgent.toLowerCase().indexOf("opera")!==-1);
if((!ie)||(ie[1]<6)||(_35)){
return false;
}
return true;
}
return true;
};
DygraphCanvasRenderer.prototype.render=function(){
var ctx=this.element.getContext("2d"),ticks;
if(this.options.drawYGrid){
ticks=this.layout.yticks;
ctx.save();
ctx.strokeStyle=this.options.gridLineColor;
ctx.lineWidth=this.options.axisLineWidth;
for(var i=0;i<ticks.length;i++){
var x=this.area.x;
var y=this.area.y+ticks[i][0]*this.area.h;
ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x+this.area.w,y);
ctx.closePath();
ctx.stroke();
}
}
if(this.options.drawXGrid){
ticks=this.layout.xticks;
ctx.save();
ctx.strokeStyle=this.options.gridLineColor;
ctx.lineWidth=this.options.axisLineWidth;
for(i=0;i<ticks.length;i++){
x=this.area.x+ticks[i][0]*this.area.w;
y=this.area.y+this.area.h;
ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x,this.area.y);
ctx.closePath();
ctx.stroke();
}
}
this._renderLineChart();
this._renderAxis();
};
DygraphCanvasRenderer.prototype._renderAxis=function(){
if(!this.options.drawXAxis&&!this.options.drawYAxis){
return;
}
var _39=this.element.getContext("2d");
var _40={"position":"absolute","fontSize":this.options.axisLabelFontSize+"px","zIndex":10,"color":this.options.axisLabelColor,"width":this.options.axisLabelWidth+"px","overflow":"hidden"};
var _41=function(txt){
var div=document.createElement("div");
for(var _44 in _40){
if(_40.hasOwnProperty(_44)){
div.style[_44]=_40[_44];
}
}
div.appendChild(document.createTextNode(txt));
return div;
};
_39.save();
_39.strokeStyle=this.options.axisLineColor;
_39.lineWidth=this.options.axisLineWidth;
if(this.options.drawYAxis){
if(this.layout.yticks){
for(var i=0;i<this.layout.yticks.length;i++){
var _45=this.layout.yticks[i];
if(typeof (_45)==="function"){
return;
}
var x=this.area.x;
var y=this.area.y+_45[0]*this.area.h;
_39.beginPath();
_39.moveTo(x,y);
_39.lineTo(x-this.options.axisTickSize,y);
_39.closePath();
_39.stroke();
var _46=_41(_45[1]);
var top=(y-this.options.axisLabelFontSize/2);
if(top<0){
top=0;
}
if(top+this.options.axisLabelFontSize+3>this.height){
_46.style.bottom="0px";
}else{
_46.style.top=top+"px";
}
_46.style.left="0px";
_46.style.textAlign="right";
_46.style.width=this.options.yAxisLabelWidth+"px";
this.container.appendChild(_46);
this.ylabels.push(_46);
}
var _48=this.ylabels[0];
var _49=this.options.axisLabelFontSize;
var _50=parseInt(_48.style.top,10)+_49;
if(_50>this.height-_49){
_48.style.top=(parseInt(_48.style.top,10)-_49/2)+"px";
}
}
_39.beginPath();
_39.moveTo(this.area.x,this.area.y);
_39.lineTo(this.area.x,this.area.y+this.area.h);
_39.closePath();
_39.stroke();
}
if(this.options.drawXAxis){
if(this.layout.xticks){
for(i=0;i<this.layout.xticks.length;i++){
_45=this.layout.xticks[i];
if(typeof (dataset)==="function"){
return;
}
x=this.area.x+_45[0]*this.area.w;
y=this.area.y+this.area.h;
_39.beginPath();
_39.moveTo(x,y);
_39.lineTo(x,y+this.options.axisTickSize);
_39.closePath();
_39.stroke();
_46=_41(_45[1]);
_46.style.textAlign="center";
_46.style.bottom="0px";
var _51=x-this.options.axisLabelWidth/2;
if(_51+this.options.axisLabelWidth>this.width){
_51=this.width-this.options.xAxisLabelWidth;
_46.style.textAlign="right";
}
if(_51<0){
_51=0;
_46.style.textAlign="left";
}
_46.style.left=_51+"px";
_46.style.width=this.options.xAxisLabelWidth+"px";
this.container.appendChild(_46);
this.xlabels.push(_46);
}
}
_39.beginPath();
_39.moveTo(this.area.x,this.area.y+this.area.h);
_39.lineTo(this.area.x+this.area.w,this.area.y+this.area.h);
_39.closePath();
_39.stroke();
}
_39.restore();
};
DygraphCanvasRenderer.prototype._renderLineChart=function(){
var _52=this.element.getContext("2d");
var _53=this.options.colorScheme.length;
var _54=this.options.colorScheme;
var _55=this.layout.options.errorBars;
var _56=[];
for(var _57 in this.layout.datasets){
if(this.layout.datasets.hasOwnProperty(_57)){
_56.push(_57);
}
}
var _58=_56.length;
for(var i=0;i<this.layout.points.length;i++){
var _59=this.layout.points[i];
_59.canvasx=this.area.w*_59.x+this.area.x;
_59.canvasy=this.area.h*_59.y+this.area.y;
}
var _60=function(x){
return x&&!isNaN(x);
};
var ctx=_52;
if(_55){
for(i=0;i<_58;i++){
var _61=_56[i];
var _62=_54[i%_53];
ctx.save();
ctx.strokeStyle=_62;
ctx.lineWidth=this.options.strokeWidth;
var _63=-1;
var _64=[-1,-1];
var _65=0;
var _66=this.layout.yscale;
var rgb=new RGBColor(_62);
var _68="rgba("+rgb.r+","+rgb.g+","+rgb.b+",0.15)";
ctx.fillStyle=_68;
ctx.beginPath();
for(var j=0;j<this.layout.points.length;j++){
_59=this.layout.points[j];
_65++;
if(_59.name===_61){
if(!_59.y||isNaN(_59.y)){
_63=-1;
continue;
}
var _69=[_59.y-_59.errorPlus*_66,_59.y+_59.errorMinus*_66];
_69[0]=this.area.h*_69[0]+this.area.y;
_69[1]=this.area.h*_69[1]+this.area.y;
if(_63>=0){
ctx.moveTo(_63,_64[0]);
ctx.lineTo(_59.canvasx,_69[0]);
ctx.lineTo(_59.canvasx,_69[1]);
ctx.lineTo(_63,_64[1]);
ctx.closePath();
}
_64[0]=_69[0];
_64[1]=_69[1];
_63=_59.canvasx;
}
}
ctx.fill();
}
}
for(i=0;i<_58;i++){
_61=_56[i];
_62=_54[i%_53];
_52.save();
_59=this.layout.points[0];
var _70=this.dygraph_.attr_("pointSize");
_63=null;
var _71=null;
var _72=this.dygraph_.attr_("drawPoints");
var _73=this.layout.points;
for(j=0;j<_73.length;j++){
_59=_73[j];
if(_59.name===_61){
if(!_60(_59.canvasy)){
_63=_71=null;
}else{
var _74=(!_63&&(j===_73.length-1||!_60(_73[j+1].canvasy)));
if(!_63){
_63=_59.canvasx;
_71=_59.canvasy;
}else{
ctx.beginPath();
ctx.strokeStyle=_62;
ctx.lineWidth=this.options.strokeWidth;
ctx.moveTo(_63,_71);
_63=_59.canvasx;
_71=_59.canvasy;
ctx.lineTo(_63,_71);
ctx.stroke();
}
if(_72||_74){
ctx.beginPath();
ctx.fillStyle=_62;
ctx.arc(_59.canvasx,_59.canvasy,_70,0,2*Math.PI,false);
ctx.fill();
}
}
}
}
}
_52.restore();
};
var Dygraph=function(div,_75,_76){
if(arguments.length>0){
if(arguments.length===4){
this.warn("Using deprecated four-argument dygraph constructor");
this.__old_init__(div,_75,arguments[2],arguments[3]);
}else{
this.__init__(div,_75,_76);
}
}
};
Dygraph.NAME="Dygraph";
Dygraph.VERSION="1.2";
Dygraph.__repr__=function(){
return "["+this.NAME+" "+this.VERSION+"]";
};
Dygraph.toString=function(){
return this.__repr__();
};
Dygraph.DEFAULT_ROLL_PERIOD=1;
Dygraph.DEFAULT_WIDTH=480;
Dygraph.DEFAULT_HEIGHT=320;
Dygraph.AXIS_LINE_WIDTH=0.3;
Dygraph.DEFAULT_ATTRS={highlightCircleSize:3,pixelsPerXLabel:60,pixelsPerYLabel:30,labelsDivWidth:250,labelsDivStyles:{},labelsSeparateLines:false,labelsKMB:false,strokeWidth:1,axisTickSize:3,axisLabelFontSize:14,xAxisLabelWidth:50,yAxisLabelWidth:50,rightGap:5,showRoller:false,xValueFormatter:Dygraph.dateString_,xValueParser:Dygraph.dateParser,xTicker:Dygraph.dateTicker,delimiter:",",sigma:2,errorBars:false,fractions:false,wilsonInterval:true,customBars:false};
Dygraph.DEBUG=1;
Dygraph.INFO=2;
Dygraph.WARNING=3;
Dygraph.ERROR=3;
Dygraph.prototype.__old_init__=function(div,_77,_78,_79){
if(_78!==null){
var _80=["Date"];
for(var i=0;i<_78.length;i++){
_80.push(_78[i]);
}
Dygraph.update(_79,{"labels":_80});
}
this.__init__(div,_77,_79);
};
Dygraph.prototype.__init__=function(div,_81,_82){
if(!_82||_82===undefined||_82===null){
_82={};
}
this.maindiv_=div;
this.file_=_81;
this.rollPeriod_=_82.rollPeriod||Dygraph.DEFAULT_ROLL_PERIOD;
this.previousVerticalX_=-1;
this.fractions_=_82.fractions||false;
this.dateWindow_=_82.dateWindow||null;
this.valueRange_=_82.valueRange||null;
this.wilsonInterval_=_82.wilsonInterval||true;
div.innerHTML="";
if(div.style.width===""){
div.style.width=Dygraph.DEFAULT_WIDTH+"px";
}
if(div.style.height===""){
div.style.height=Dygraph.DEFAULT_HEIGHT+"px";
}
this.width_=parseInt(div.style.width,10);
this.height_=parseInt(div.style.height,10);
this.user_attrs_={};
Dygraph.update(this.user_attrs_,_82);
this.attrs_={};
Dygraph.update(this.attrs_,Dygraph.DEFAULT_ATTRS);
this.labelsFromCSV_=(this.attr_("labels")===null);
this.createInterface_();
this.layoutOptions_={"xOriginIsZero":false};
Dygraph.update(this.layoutOptions_,this.attrs_);
Dygraph.update(this.layoutOptions_,this.user_attrs_);
Dygraph.update(this.layoutOptions_,{"errorBars":(this.attr_("errorBars")||this.attr_("customBars"))});
this.layout_=new DygraphLayout(this,this.layoutOptions_);
this.renderOptions_={colorScheme:this.colors_,strokeColor:null,axisLineWidth:Dygraph.AXIS_LINE_WIDTH};
Dygraph.update(this.renderOptions_,this.attrs_);
Dygraph.update(this.renderOptions_,this.user_attrs_);
this.plotter_=new DygraphCanvasRenderer(this,this.hidden_,this.layout_,this.renderOptions_);
this.createStatusMessage_();
this.createRollInterface_();
this.createDragInterface_();
this.start_();
};
Dygraph.prototype.attr_=function(_83){
if(typeof (this.user_attrs_[_83])!=="undefined"){
return this.user_attrs_[_83];
}else{
if(typeof (this.attrs_[_83])!=="undefined"){
return this.attrs_[_83];
}else{
return null;
}
}
};
Dygraph.prototype.log=function(_84,_85){
if(typeof (console)!=="undefined"){
var msg="dygraphs: "+_85;
switch(_84){
case Dygraph.DEBUG:
console.debug(msg);
break;
case Dygraph.INFO:
console.info(msg);
break;
case Dygraph.WARNING:
console.warn(msg);
break;
case Dygraph.ERROR:
console.error(msg);
break;
}
}
};
Dygraph.prototype.info=function(_87){
this.log(Dygraph.INFO,_87);
};
Dygraph.prototype.warn=function(_88){
this.log(Dygraph.WARNING,_88);
};
Dygraph.prototype.error=function(_89){
this.log(Dygraph.ERROR,_89);
};
Dygraph.prototype.rollPeriod=function(){
return this.rollPeriod_;
};
Dygraph.addEvent=function(el,evt,fn){
var _92=function(e){
if(!e){
var e=window.event;
}
fn(e);
};
if(window.addEventListener){
el.addEventListener(evt,_92,false);
}else{
el.attachEvent("on"+evt,_92);
}
};
Dygraph.prototype.createInterface_=function(){
var _94=this.maindiv_;
this.graphDiv=document.createElement("div");
this.graphDiv.style.width=this.width_+"px";
this.graphDiv.style.height=this.height_+"px";
_94.appendChild(this.graphDiv);
this.canvas_=Dygraph.createCanvas();
this.canvas_.style.position="absolute";
this.canvas_.width=this.width_;
this.canvas_.height=this.height_;
this.canvas_.style.width=this.width_+"px";
this.canvas_.style.height=this.height_+"px";
this.graphDiv.appendChild(this.canvas_);
this.hidden_=this.createPlotKitCanvas_(this.canvas_);
var _95=this;
Dygraph.addEvent(this.hidden_,"mousemove",function(e){
_95.mouseMove_(e);
});
Dygraph.addEvent(this.hidden_,"mouseout",function(e){
_95.mouseOut_(e);
});
};
Dygraph.prototype.createPlotKitCanvas_=function(_96){
var h=Dygraph.createCanvas();
h.style.position="absolute";
h.style.top=_96.style.top;
h.style.left=_96.style.left;
h.width=this.width_;
h.height=this.height_;
h.style.width=this.width_+"px";
h.style.height=this.height_+"px";
this.graphDiv.appendChild(h);
return h;
};
Dygraph.hsvToRGB=function(hue,_99,_100){
var red;
var _102;
var blue;
if(_99===0){
red=_100;
_102=_100;
blue=_100;
}else{
var i=Math.floor(hue*6);
var f=(hue*6)-i;
var p=_100*(1-_99);
var q=_100*(1-(_99*f));
var t=_100*(1-(_99*(1-f)));
switch(i){
case 1:
red=q;
_102=_100;
blue=p;
break;
case 2:
red=p;
_102=_100;
blue=t;
break;
case 3:
red=p;
_102=q;
blue=_100;
break;
case 4:
red=t;
_102=p;
blue=_100;
break;
case 5:
red=_100;
_102=p;
blue=q;
break;
case 6:
case 0:
red=_100;
_102=t;
blue=p;
break;
}
}
red=Math.floor(255*red+0.5);
_102=Math.floor(255*_102+0.5);
blue=Math.floor(255*blue+0.5);
return "rgb("+red+","+_102+","+blue+")";
};
Dygraph.prototype.setColors_=function(){
var num=this.attr_("labels").length-1;
this.colors_=[];
var _109=this.attr_("colors");
if(!_109){
var sat=this.attr_("colorSaturation")||1;
var val=this.attr_("colorValue")||0.5;
for(var i=1;i<=num;i++){
var hue=(1*i/(1+num));
this.colors_.push(Dygraph.hsvToRGB(hue,sat,val));
}
}else{
for(var i=0;i<num;i++){
var _112=_109[i%_109.length];
this.colors_.push(_112);
}
}
this.renderOptions_.colorScheme=this.colors_;
Dygraph.update(this.plotter_.options,this.renderOptions_);
Dygraph.update(this.layoutOptions_,this.user_attrs_);
Dygraph.update(this.layoutOptions_,this.attrs_);
};
Dygraph.findPosX=function(obj){
var _114=0;
if(obj.offsetParent){
while(obj.offsetParent){
_114+=obj.offsetLeft;
obj=obj.offsetParent;
}
}else{
if(obj.x){
_114+=obj.x;
}
}
return _114;
};
Dygraph.findPosY=function(obj){
var _115=0;
if(obj.offsetParent){
while(obj.offsetParent){
_115+=obj.offsetTop;
obj=obj.offsetParent;
}
}else{
if(obj.y){
_115+=obj.y;
}
}
return _115;
};
Dygraph.prototype.createStatusMessage_=function(){
if(!this.attr_("labelsDiv")){
var _116=this.attr_("labelsDivWidth");
var _117={"position":"absolute","fontSize":"14px","zIndex":10,"width":_116+"px","top":"0px","left":(this.width_-_116-2)+"px","background":"white","textAlign":"left","overflow":"hidden"};
Dygraph.update(_117,this.attr_("labelsDivStyles"));
var div=document.createElement("div");
for(var name in _117){
if(_117.hasOwnProperty(name)){
div.style[name]=_117[name];
}
}
this.graphDiv.appendChild(div);
this.attrs_.labelsDiv=div;
}
};
Dygraph.prototype.createRollInterface_=function(){
var _119=this.attr_("showRoller")?"block":"none";
var _120={"position":"absolute","zIndex":10,"top":(this.plotter_.area.h-25)+"px","left":(this.plotter_.area.x+1)+"px","display":_119};
var _121=document.createElement("input");
_121.type="text";
_121.size="2";
_121.value=this.rollPeriod_;
for(var name in _120){
if(_120.hasOwnProperty(name)){
_121.style[name]=_120[name];
}
}
var pa=this.graphDiv;
pa.appendChild(_121);
var _123=this;
_121.onchange=function(){
_123.adjustRoll(_121.value);
};
return _121;
};
Dygraph.pageX=function(e){
if(e.pageX){
return (!e.pageX||e.pageX<0)?0:e.pageX;
}else{
var de=document;
var b=document.body;
return e.clientX+(de.scrollLeft||b.scrollLeft)-(de.clientLeft||0);
}
};
Dygraph.pageY=function(e){
if(e.pageY){
return (!e.pageY||e.pageY<0)?0:e.pageY;
}else{
var de=document;
var b=document.body;
return e.clientY+(de.scrollTop||b.scrollTop)-(de.clientTop||0);
}
};
Dygraph.prototype.createDragInterface_=function(){
var self=this;
var _127=false;
var _128=null;
var _129=null;
var _130=null;
var _131=null;
var _132=null;
var px=0;
var py=0;
var getX=function(e){
return Dygraph.pageX(e)-px;
};
var getY=function(e){
return Dygraph.pageX(e)-py;
};
Dygraph.addEvent(this.hidden_,"mousemove",function(_137){
if(_127){
_130=getX(_137);
_131=getY(_137);
self.drawZoomRect_(_128,_130,_132);
_132=_130;
}
});
Dygraph.addEvent(this.hidden_,"mousedown",function(_138){
_127=true;
px=Dygraph.findPosX(self.canvas_);
py=Dygraph.findPosY(self.canvas_);
_128=getX(_138);
_129=getY(_138);
});
Dygraph.addEvent(document,"mouseup",function(_139){
if(_127){
_127=false;
_128=null;
_129=null;
}
});
Dygraph.addEvent(this.hidden_,"mouseout",function(_140){
if(_127){
_130=null;
_131=null;
}
});
Dygraph.addEvent(this.hidden_,"mouseup",function(_141){
if(_127){
_127=false;
_130=getX(_141);
_131=getY(_141);
var _142=Math.abs(_130-_128);
var _143=Math.abs(_131-_129);
if(_142<2&&_143<2&&self.attr_("clickCallback")!==null&&self.lastx_!==undefined){
self.attr_("clickCallback")(_141,self.lastx_,self.selPoints_);
}
if(_142>=10){
self.doZoom_(Math.min(_128,_130),Math.max(_128,_130));
}else{
self.canvas_.getContext("2d").clearRect(0,0,self.canvas_.width,self.canvas_.height);
}
_128=null;
_129=null;
}
});
Dygraph.addEvent(this.hidden_,"dblclick",function(_144){
if(self.dateWindow_===null){
return;
}
self.dateWindow_=null;
self.drawGraph_(self.rawData_);
var _145=self.rawData_[0][0];
var _146=self.rawData_[self.rawData_.length-1][0];
if(self.attr_("zoomCallback")){
self.attr_("zoomCallback")(_145,_146);
}
});
};
Dygraph.prototype.drawZoomRect_=function(_147,endX,_149){
var ctx=this.canvas_.getContext("2d");
if(_149){
ctx.clearRect(Math.min(_147,_149),0,Math.abs(_147-_149),this.height_);
}
if(endX&&_147){
ctx.fillStyle="rgba(128,128,128,0.33)";
ctx.fillRect(Math.min(_147,endX),0,Math.abs(endX-_147),this.height_);
}
};
Dygraph.prototype.doZoom_=function(lowX,_151){
var _152=this.layout_.points;
var _153=null;
var _154=null;
for(var i=0;i<_152.length;i++){
var cx=_152[i].canvasx;
var x=_152[i].xval;
if(cx<lowX&&(_153===null||x>_153)){
_153=x;
}
if(cx>_151&&(_154===null||x<_154)){
_154=x;
}
}
if(_153===null){
_153=_152[0].xval;
}
if(_154===null){
_154=_152[_152.length-1].xval;
}
this.dateWindow_=[_153,_154];
this.drawGraph_(this.rawData_);
if(this.attr_("zoomCallback")){
this.attr_("zoomCallback")(_153,_154);
}
};
Dygraph.prototype.mouseMove_=function(_156){
var _157=Dygraph.pageX(_156)-Dygraph.findPosX(this.hidden_);
var _158=this.layout_.points;
var _159=-1;
var _160=-1;
var _161=1e+100;
var idx=-1;
for(var i=0;i<_158.length;i++){
var dist=Math.abs(_158[i].canvasx-_157);
if(dist>_161){
break;
}
_161=dist;
idx=i;
}
if(idx>=0){
_159=_158[idx].xval;
}
if(_157>_158[_158.length-1].canvasx){
_159=_158[_158.length-1].xval;
}
this.selPoints_=[];
for(var i=0;i<_158.length;i++){
if(_158[i].xval===_159){
this.selPoints_.push(_158[i]);
}
}
if(this.attr_("highlightCallback")){
this.attr_("highlightCallback")(_156,_159,this.selPoints_);
}
var _164=this.attr_("highlightCircleSize");
var ctx=this.canvas_.getContext("2d");
if(this.previousVerticalX_>=0){
var px=this.previousVerticalX_;
ctx.clearRect(px-_164-1,0,2*_164+2,this.height_);
}
var isOK=function(x){
return x&&!isNaN(x);
};
if(this.selPoints_.length>0){
var _157=this.selPoints_[0].canvasx;
var _166=this.attr_("xValueFormatter")(_159,this)+":";
var clen=this.colors_.length;
for(var i=0;i<this.selPoints_.length;i++){
if(!isOK(this.selPoints_[i].canvasy)){
continue;
}
if(this.attr_("labelsSeparateLines")){
_166+="<br/>";
}
var _168=this.selPoints_[i];
var c=new RGBColor(this.colors_[i%clen]);
_166+=" <b><font color='"+c.toHex()+"'>"+_168.name+"</font></b>:"+this.round_(_168.yval,2);
}
this.attr_("labelsDiv").innerHTML=_166;
this.lastx_=_159;
ctx.save();
for(var i=0;i<this.selPoints_.length;i++){
if(!isOK(this.selPoints_[i%clen].canvasy)){
continue;
}
ctx.beginPath();
ctx.fillStyle=this.colors_[i%clen];
ctx.arc(_157,this.selPoints_[i%clen].canvasy,_164,0,2*Math.PI,false);
ctx.fill();
}
ctx.restore();
this.previousVerticalX_=_157;
}
};
Dygraph.prototype.mouseOut_=function(_170){
var ctx=this.canvas_.getContext("2d");
ctx.clearRect(0,0,this.width_,this.height_);
this.attr_("labelsDiv").innerHTML="";
};
Dygraph.zeropad=function(x){
return x<10?"0"+x:""+x;
};
Dygraph.prototype.hmsString_=function(date){
var _172=Dygraph.zeropad;
var d=new Date(date);
if(d.getSeconds()){
return _172(d.getHours())+":"+_172(d.getMinutes())+":"+_172(d.getSeconds());
}else{
if(d.getMinutes()){
return _172(d.getHours())+":"+_172(d.getMinutes());
}else{
return _172(d.getHours());
}
}
};
Dygraph.dateString_=function(date,self){
var _174=Dygraph.zeropad;
var d=new Date(date);
var year=""+d.getFullYear();
var _176=_174(d.getMonth()+1);
var day=_174(d.getDate());
var ret="";
var frac=d.getHours()*3600+d.getMinutes()*60+d.getSeconds();
if(frac){
ret=" "+self.hmsString_(date);
}
return year+"/"+_176+"/"+day+ret;
};
Dygraph.prototype.round_=function(num,_180){
var _181=Math.pow(10,_180);
return Math.round(num*_181)/_181;
};
Dygraph.prototype.loadedEvent_=function(data){
this.rawData_=this.parseCSV_(data);
this.drawGraph_(this.rawData_);
};
Dygraph.prototype.months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
Dygraph.prototype.quarters=["Jan","Apr","Jul","Oct"];
Dygraph.prototype.addXTicks_=function(){
var _183,endDate;
if(this.dateWindow_){
_183=this.dateWindow_[0];
endDate=this.dateWindow_[1];
}else{
_183=this.rawData_[0][0];
endDate=this.rawData_[this.rawData_.length-1][0];
}
var _184=this.attr_("xTicker")(_183,endDate,this);
this.layout_.updateOptions({xTicks:_184});
};
Dygraph.SECONDLY=0;
Dygraph.TEN_SECONDLY=1;
Dygraph.THIRTY_SECONDLY=2;
Dygraph.MINUTELY=3;
Dygraph.TEN_MINUTELY=4;
Dygraph.THIRTY_MINUTELY=5;
Dygraph.HOURLY=6;
Dygraph.SIX_HOURLY=7;
Dygraph.DAILY=8;
Dygraph.WEEKLY=9;
Dygraph.MONTHLY=10;
Dygraph.QUARTERLY=11;
Dygraph.BIANNUAL=12;
Dygraph.ANNUAL=13;
Dygraph.DECADAL=14;
Dygraph.NUM_GRANULARITIES=15;
Dygraph.SHORT_SPACINGS=[];
Dygraph.SHORT_SPACINGS[Dygraph.SECONDLY]=1000;
Dygraph.SHORT_SPACINGS[Dygraph.TEN_SECONDLY]=10000;
Dygraph.SHORT_SPACINGS[Dygraph.THIRTY_SECONDLY]=30000;
Dygraph.SHORT_SPACINGS[Dygraph.MINUTELY]=60000;
Dygraph.SHORT_SPACINGS[Dygraph.TEN_MINUTELY]=600000;
Dygraph.SHORT_SPACINGS[Dygraph.THIRTY_MINUTELY]=1800000;
Dygraph.SHORT_SPACINGS[Dygraph.HOURLY]=3600000;
Dygraph.SHORT_SPACINGS[Dygraph.HOURLY]=21600000;
Dygraph.SHORT_SPACINGS[Dygraph.DAILY]=86400000;
Dygraph.SHORT_SPACINGS[Dygraph.WEEKLY]=604800000;
Dygraph.prototype.NumXTicks=function(_185,_186,_187){
if(_187<Dygraph.MONTHLY){
var _188=Dygraph.SHORT_SPACINGS[_187];
return Math.floor(0.5+1*(_186-_185)/_188);
}else{
var _189=1;
var _190=12;
switch(_187){
case Dygraph.QUARTERLY:
_190=3;
break;
case Dygraph.BIANNUAL:
_190=2;
break;
case Dygraph.ANNUAL:
_190=1;
break;
case Dygraph.DECADAL:
_190=1;
_189=10;
break;
}
var _191=31557807360;
var _192=1*(_186-_185)/_191;
return Math.floor(0.5+1*_192*_190/_189);
}
};
Dygraph.prototype.GetXAxis=function(_193,_194,_195){
var _196=[];
if(_195<Dygraph.MONTHLY){
var _197=Dygraph.SHORT_SPACINGS[_195];
var _198="%d%b";
if(_195<Dygraph.HOURLY){
_193=_197*Math.floor(0.5+_193/_197);
}
for(var t=_193;t<=_194;t+=_197){
var d=new Date(t);
var frac=d.getHours()*3600+d.getMinutes()*60+d.getSeconds();
if(frac===0||_195>=Dygraph.DAILY){
_196.push({v:t,label:new Date(t+3600000).strftime(_198)});
}else{
_196.push({v:t,label:this.hmsString_(t)});
}
}
}else{
var _199;
var _200=1;
switch(_195){
case Dygraph.MONTHLY:
_199=[0,1,2,3,4,5,6,7,8,9,10,11,12];
break;
case Dygraph.QUARTERLY:
_199=[0,3,6,9];
break;
case Dygraph.BIANNUAL:
_199=[0,6];
break;
case Dygraph.ANNUAL:
_199=[0];
break;
case Dygraph.DECADAL:
_199=[0];
_200=10;
break;
}
var _201=new Date(_193).getFullYear();
var _202=new Date(_194).getFullYear();
var _203=Dygraph.zeropad;
for(var i=_201;i<=_202;i++){
if(i%_200!==0){
continue;
}
for(var j=0;j<_199.length;j++){
var _204=i+"/"+_203(1+_199[j])+"/01";
var t=Date.parse(_204);
if(t<_193||t>_194){
continue;
}
_196.push({v:t,label:new Date(t).strftime("%b %y")});
}
}
}
return _196;
};
Dygraph.dateTicker=function(_205,_206,self){
var _207=-1;
for(var i=0;i<Dygraph.NUM_GRANULARITIES;i++){
var _208=self.NumXTicks(_205,_206,i);
if(self.width_/_208>=self.attr_("pixelsPerXLabel")){
_207=i;
break;
}
}
if(_207>=0){
return self.GetXAxis(_205,_206,_207);
}else{
}
};
Dygraph.numericTicks=function(minV,maxV,self){
var _211=[1,2,5];
var _212,low_val,high_val,nTicks;
var _213=self.attr_("pixelsPerYLabel");
for(var i=-10;i<50;i++){
var _214=Math.pow(10,i);
for(var j=0;j<_211.length;j++){
_212=_214*_211[j];
low_val=Math.floor(minV/_212)*_212;
high_val=Math.ceil(maxV/_212)*_212;
nTicks=(high_val-low_val)/_212;
var _215=self.height_/nTicks;
if(_215>_213){
break;
}
}
if(_215>_213){
break;
}
}
var _216=[];
for(var i=0;i<nTicks;i++){
var _217=low_val+i*_212;
var _218=self.round_(_217,2);
if(self.attr_("labelsKMB")){
var k=1000;
if(_217>=k*k*k){
_218=self.round_(_217/(k*k*k),1)+"B";
}else{
if(_217>=k*k){
_218=self.round_(_217/(k*k),1)+"M";
}else{
if(_217>=k){
_218=self.round_(_217/k,1)+"K";
}
}
}
}
_216.push({label:_218,v:_217});
}
return _216;
};
Dygraph.prototype.addYTicks_=function(minY,maxY){
var _222=Dygraph.numericTicks(minY,maxY,this);
this.layout_.updateOptions({yAxis:[minY,maxY],yTicks:_222});
};
Dygraph.prototype.extremeValues_=function(_223){
var minY=null,maxY=null;
var bars=this.attr_("errorBars")||this.attr_("customBars");
if(bars){
for(var j=0;j<_223.length;j++){
var y=_223[j][1][0];
if(!y){
continue;
}
var low=y-_223[j][1][1];
var high=y+_223[j][1][2];
if(low>y){
low=y;
}
if(high<y){
high=y;
}
if(maxY===null||high>maxY){
maxY=high;
}
if(minY===null||low<minY){
minY=low;
}
}
}else{
for(var j=0;j<_223.length;j++){
var y=_223[j][1];
if(!y){
continue;
}
if(maxY===null||y>maxY){
maxY=y;
}
if(minY===null||y<minY){
minY=y;
}
}
}
return [minY,maxY];
};
Dygraph.prototype.drawGraph_=function(data){
var minY=null,maxY=null;
this.layout_.removeAllDatasets();
this.setColors_();
this.attrs_["pointSize"]=0.5*this.attr_("highlightCircleSize");
for(var i=1;i<data[0].length;i++){
var _227=[];
for(var j=0;j<data.length;j++){
var date=data[j][0];
_227[j]=[date,data[j][i]];
}
_227=this.rollingAverage(_227,this.rollPeriod_);
var bars=this.attr_("errorBars")||this.attr_("customBars");
if(this.dateWindow_){
var low=this.dateWindow_[0];
var high=this.dateWindow_[1];
var _228=[];
for(var k=0;k<_227.length;k++){
if(_227[k][0]>=low&&_227[k][0]<=high){
_228.push(_227[k]);
}
}
_227=_228;
}
var _229=this.extremeValues_(_227);
var _230=_229[0];
var _231=_229[1];
if(!minY||_230<minY){
minY=_230;
}
if(!maxY||_231>maxY){
maxY=_231;
}
if(bars){
var vals=[];
for(var j=0;j<_227.length;j++){
vals[j]=[_227[j][0],_227[j][1][0],_227[j][1][1],_227[j][1][2]];
}
this.layout_.addDataset(this.attr_("labels")[i],vals);
}else{
this.layout_.addDataset(this.attr_("labels")[i],_227);
}
}
if(this.valueRange_!==null){
this.addYTicks_(this.valueRange_[0],this.valueRange_[1]);
}else{
var span=maxY-minY;
var _234=maxY+0.1*span;
var _235=minY-0.1*span;
if(_235<0&&minY>=0){
_235=0;
}
if(_234>0&&maxY<=0){
_234=0;
}
if(this.attr_("includeZero")){
if(maxY<0){
_234=0;
}
if(minY>0){
_235=0;
}
}
this.addYTicks_(_235,_234);
}
this.addXTicks_();
this.layout_.evaluateWithError();
this.plotter_.clear();
this.plotter_.render();
this.canvas_.getContext("2d").clearRect(0,0,this.canvas_.width,this.canvas_.height);
};
Dygraph.prototype.rollingAverage=function(_236,_237){
if(_236.length<2){
return _236;
}
var _237=Math.min(_237,_236.length-1);
var _238=[];
var _239=this.attr_("sigma");
if(this.fractions_){
var num=0;
var den=0;
var mult=100;
for(var i=0;i<_236.length;i++){
num+=_236[i][1][0];
den+=_236[i][1][1];
if(i-_237>=0){
num-=_236[i-_237][1][0];
den-=_236[i-_237][1][1];
}
var date=_236[i][0];
var _242=den?num/den:0;
if(this.attr_("errorBars")){
if(this.wilsonInterval_){
if(den){
var p=_242<0?0:_242,n=den;
var pm=_239*Math.sqrt(p*(1-p)/n+_239*_239/(4*n*n));
var _244=1+_239*_239/den;
var low=(p+_239*_239/(2*den)-pm)/_244;
var high=(p+_239*_239/(2*den)+pm)/_244;
_238[i]=[date,[p*mult,(p-low)*mult,(high-p)*mult]];
}else{
_238[i]=[date,[0,0,0]];
}
}else{
var _245=den?_239*Math.sqrt(_242*(1-_242)/den):1;
_238[i]=[date,[mult*_242,mult*_245,mult*_245]];
}
}else{
_238[i]=[date,mult*_242];
}
}
}else{
if(this.attr_("customBars")){
var low=0;
var mid=0;
var high=0;
var _247=0;
for(var i=0;i<_236.length;i++){
var data=_236[i][1];
var y=data[1];
_238[i]=[_236[i][0],[y,y-data[0],data[2]-y]];
if(y!==null&&!isNaN(y)){
low+=data[0];
mid+=y;
high+=data[2];
_247+=1;
}
if(i-_237>=0){
var prev=_236[i-_237];
if(prev[1][1]!==null&&!isNaN(prev[1][1])){
low-=prev[1][0];
mid-=prev[1][1];
high-=prev[1][2];
_247-=1;
}
}
_238[i]=[_236[i][0],[1*mid/_247,1*(mid-low)/_247,1*(high-mid)/_247]];
}
}else{
var _249=Math.min(_237-1,_236.length-2);
if(!this.attr_("errorBars")){
if(_237===1){
return _236;
}
for(var i=0;i<_236.length;i++){
var sum=0;
var _251=0;
for(var j=Math.max(0,i-_237+1);j<i+1;j++){
var y=_236[j][1];
if(y===null||isNaN(y)){
continue;
}
_251++;
sum+=_236[j][1];
}
if(_251){
_238[i]=[_236[i][0],sum/_251];
}else{
_238[i]=[_236[i][0],null];
}
}
}else{
for(var i=0;i<_236.length;i++){
var sum=0;
var _252=0;
var _251=0;
for(var j=Math.max(0,i-_237+1);j<i+1;j++){
var y=_236[j][1][0];
if(y===null||isNaN(y)){
continue;
}
_251++;
sum+=_236[j][1][0];
_252+=Math.pow(_236[j][1][1],2);
}
if(_251){
var _245=Math.sqrt(_252)/_251;
_238[i]=[_236[i][0],[sum/_251,_239*_245,_239*_245]];
}else{
_238[i]=[_236[i][0],[null,null,null]];
}
}
}
}
}
return _238;
};
Dygraph.dateParser=function(_253,self){
var _254;
var d;
if(_253.length===10&&_253.search("-")!==-1){
_254=_253.replace("-","/","g");
while(_254.search("-")!==-1){
_254=_254.replace("-","/");
}
d=Date.parse(_254);
}else{
if(_253.length===8){
_254=_253.substr(0,4)+"/"+_253.substr(4,2)+"/"+_253.substr(6,2);
d=Date.parse(_254);
}else{
d=Date.parse(_253);
}
}
if(!d||isNaN(d)){
self.error("Couldn't parse "+_253+" as a date");
}
return d;
};
Dygraph.prototype.detectTypeFromString_=function(str){
var _256=false;
if(str.indexOf("-")>=0||str.indexOf("/")>=0||isNaN(parseFloat(str))){
_256=true;
}else{
if(str.length===8&&str>"19700101"&&str<"20371231"){
_256=true;
}
}
if(_256){
this.attrs_.xValueFormatter=Dygraph.dateString_;
this.attrs_.xValueParser=Dygraph.dateParser;
this.attrs_.xTicker=Dygraph.dateTicker;
}else{
this.attrs_.xValueFormatter=function(x){
return x;
};
this.attrs_.xValueParser=function(x){
return parseFloat(x);
};
this.attrs_.xTicker=Dygraph.numericTicks;
}
};
Dygraph.prototype.parseCSV_=function(data){
var ret=[];
var _257=data.split("\n");
var _258=this.attr_("delimiter");
if(_257[0].indexOf(_258)===-1&&_257[0].indexOf("\t")>=0){
_258="\t";
}
var _259=0;
if(this.labelsFromCSV_){
_259=1;
this.attrs_.labels=_257[0].split(_258);
}
var _260;
var _261=false;
var _262=this.attr_("labels").length;
for(var i=_259;i<_257.length;i++){
var line=_257[i];
if(line.length===0){
continue;
}
if(line[0]==="#"){
continue;
}
var _264=line.split(_258);
if(_264.length<2){
continue;
}
var _265=[];
if(!_261){
this.detectTypeFromString_(_264[0]);
_260=this.attr_("xValueParser");
_261=true;
}
_265[0]=_260(_264[0],this);
if(this.fractions_){
for(var j=1;j<_264.length;j++){
var vals=_264[j].split("/");
_265[j]=[parseFloat(vals[0]),parseFloat(vals[1])];
}
}else{
if(this.attr_("errorBars")){
for(var j=1;j<_264.length;j+=2){
_265[(j+1)/2]=[parseFloat(_264[j]),parseFloat(_264[j+1])];
}
}else{
if(this.attr_("customBars")){
for(var j=1;j<_264.length;j++){
var vals=_264[j].split(";");
_265[j]=[parseFloat(vals[0]),parseFloat(vals[1]),parseFloat(vals[2])];
}
}else{
for(var j=1;j<_264.length;j++){
_265[j]=parseFloat(_264[j]);
}
}
}
}
ret.push(_265);
if(_265.length!==_262){
this.error("Number of columns in line "+i+" ("+_265.length+") does not agree with number of labels ("+_262+") "+line);
}
}
return ret;
};
Dygraph.prototype.parseArray_=function(data){
if(data.length===0){
this.error("Can't plot empty data set");
return null;
}
if(data[0].length===0){
this.error("Data set cannot contain an empty row");
return null;
}
if(this.attr_("labels")===null){
this.warn("Using default labels. Set labels explicitly via 'labels' "+"in the options parameter");
this.attrs_.labels=["X"];
for(var i=1;i<data[0].length;i++){
this.attrs_.labels.push("Y"+i);
}
}
if(Dygraph.isDateLike(data[0][0])){
this.attrs_.xValueFormatter=Dygraph.dateString_;
this.attrs_.xTicker=Dygraph.dateTicker;
var _266=Dygraph.clone(data);
for(var i=0;i<data.length;i++){
if(_266[i].length===0){
this.error("Row "<<(1+i)<<" of data is empty");
return null;
}
if(_266[i][0]===null||typeof (_266[i][0].getTime)!=="function"){
this.error("x value in row "<<(1+i)<<" is not a Date");
return null;
}
_266[i][0]=_266[i][0].getTime();
}
return _266;
}else{
this.attrs_.xValueFormatter=function(x){
return x;
};
this.attrs_.xTicker=Dygraph.numericTicks;
return data;
}
};
Dygraph.prototype.parseDataTable_=function(data){
var cols=data.getNumberOfColumns();
var rows=data.getNumberOfRows();
var _269=[];
for(var i=0;i<cols;i++){
_269.push(data.getColumnLabel(i));
if(i!==0&&this.attr_("errorBars")){
i+=1;
}
}
this.attrs_.labels=_269;
cols=_269.length;
var _270=data.getColumnType(0);
if(_270==="date"){
this.attrs_.xValueFormatter=Dygraph.dateString_;
this.attrs_.xValueParser=Dygraph.dateParser;
this.attrs_.xTicker=Dygraph.dateTicker;
}else{
if(_270==="number"){
this.attrs_.xValueFormatter=function(x){
return x;
};
this.attrs_.xValueParser=function(x){
return parseFloat(x);
};
this.attrs_.xTicker=Dygraph.numericTicks;
}else{
this.error("only 'date' and 'number' types are supported for column 1 "+"of DataTable input (Got '"+_270+"')");
return null;
}
}
var ret=[];
for(var i=0;i<rows;i++){
var row=[];
if(!data.getValue(i,0)){
continue;
}
if(_270==="date"){
row.push(data.getValue(i,0).getTime());
}else{
row.push(data.getValue(i,0));
}
if(!this.attr_("errorBars")){
for(var j=1;j<cols;j++){
row.push(data.getValue(i,j));
}
}else{
for(var j=0;j<cols-1;j++){
row.push([data.getValue(i,1+2*j),data.getValue(i,2+2*j)]);
}
}
ret.push(row);
}
return ret;
};
Dygraph.update=function(self,o){
if(typeof (o)!=="undefined"&&o!==null){
for(var k in o){
if(o.hasOwnProperty(k)){
self[k]=o[k];
}
}
}
return self;
};
Dygraph.isArrayLike=function(o){
var typ=typeof (o);
if((typ!=="object"&&!(typ==="function"&&typeof (o.item)==="function"))||o===null||typeof (o.length)!=="number"||o.nodeType===3){
return false;
}
return true;
};
Dygraph.isDateLike=function(o){
if(typeof (o)!=="object"||o===null||typeof (o.getTime)!=="function"){
return false;
}
return true;
};
Dygraph.clone=function(o){
var r=[];
for(var i=0;i<o.length;i++){
if(Dygraph.isArrayLike(o[i])){
r.push(Dygraph.clone(o[i]));
}else{
r.push(o[i]);
}
}
return r;
};
Dygraph.prototype.start_=function(){
if(typeof this.file_==="function"){
this.loadedEvent_(this.file_());
}else{
if(Dygraph.isArrayLike(this.file_)){
this.rawData_=this.parseArray_(this.file_);
this.drawGraph_(this.rawData_);
}else{
if(typeof this.file_==="object"&&typeof this.file_.getColumnRange==="function"){
this.rawData_=this.parseDataTable_(this.file_);
this.drawGraph_(this.rawData_);
}else{
if(typeof this.file_==="string"){
if(this.file_.indexOf("\n")>=0){
this.loadedEvent_(this.file_);
}else{
var req=new XMLHttpRequest();
var _276=this;
req.onreadystatechange=function(){
if(req.readyState===4){
if(req.status===200){
_276.loadedEvent_(req.responseText);
}
}
};
req.open("GET",this.file_,true);
req.send(null);
}
}else{
this.error("Unknown data format: "+(typeof this.file_));
}
}
}
}
};
Dygraph.prototype.updateOptions=function(_277){
if(_277.rollPeriod){
this.rollPeriod_=_277.rollPeriod;
}
if(_277.dateWindow){
this.dateWindow_=_277.dateWindow;
}
if(_277.valueRange){
this.valueRange_=_277.valueRange;
}
Dygraph.update(this.user_attrs_,_277);
this.labelsFromCSV_=(this.attr_("labels")===null);
this.layout_.updateOptions({"errorBars":this.attr_("errorBars")});
if(_277["file"]&&_277["file"]!==this.file_){
this.file_=_277["file"];
this.start_();
}else{
this.drawGraph_(this.rawData_);
}
};
Dygraph.prototype.adjustRoll=function(_278){
this.rollPeriod_=_278;
this.drawGraph_(this.rawData_);
};
Dygraph.createCanvas=function(){
var _279=document.createElement("canvas");
isIE=(/MSIE/.test(navigator.userAgent)&&!window.opera);
if(isIE){
_279=G_vmlCanvasManager.initElement(_279);
}
return _279;
};
Dygraph.GVizChart=function(_280){
this.container=_280;
};
Dygraph.GVizChart.prototype.draw=function(data,_281){
this.container.innerHTML="";
this.date_graph=new Dygraph(this.container,data,_281);
};
var DateGraph=Dygraph;
function RGBColor(_282){
this.ok=false;
if(_282.charAt(0)=="#"){
_282=_282.substr(1,6);
}
_282=_282.replace(/ /g,"");
_282=_282.toLowerCase();
var _283={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"};
for(var key in _283){
if(_282==key){
_282=_283[key];
}
}
var _285=[{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(bits){
return [parseInt(bits[1]),parseInt(bits[2]),parseInt(bits[3])];
}},{re:/^(\w{2})(\w{2})(\w{2})$/,example:["#00ff00","336699"],process:function(bits){
return [parseInt(bits[1],16),parseInt(bits[2],16),parseInt(bits[3],16)];
}},{re:/^(\w{1})(\w{1})(\w{1})$/,example:["#fb0","f0f"],process:function(bits){
return [parseInt(bits[1]+bits[1],16),parseInt(bits[2]+bits[2],16),parseInt(bits[3]+bits[3],16)];
}}];
for(var i=0;i<_285.length;i++){
var re=_285[i].re;
var _288=_285[i].process;
var bits=re.exec(_282);
if(bits){
channels=_288(bits);
this.r=channels[0];
this.g=channels[1];
this.b=channels[2];
this.ok=true;
}
}
this.r=(this.r<0||isNaN(this.r))?0:((this.r>255)?255:this.r);
this.g=(this.g<0||isNaN(this.g))?0:((this.g>255)?255:this.g);
this.b=(this.b<0||isNaN(this.b))?0:((this.b>255)?255:this.b);
this.toRGB=function(){
return "rgb("+this.r+", "+this.g+", "+this.b+")";
};
this.toHex=function(){
var r=this.r.toString(16);
var g=this.g.toString(16);
var b=this.b.toString(16);
if(r.length==1){
r="0"+r;
}
if(g.length==1){
g="0"+g;
}
if(b.length==1){
b="0"+b;
}
return "#"+r+g+b;
};
}

