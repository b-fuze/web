/* Javascript File */
/* Quad slide smooth script, make stuff slide smoothly*/
function qsmoothp(arg) {
var th=this;
this.qsmoth = {
pro: 0
};
this.qsmooth = function(arg) {
/*
arg.{
func: function to be executed every cycle,
n: begining number,
n1: destination number
pro: process number
off: offset between both numbers
end: Ending function to execute
endarg: arguments to send t ending function
speed: Speed (Can Be No Bigger than 1 e.g. 0.2)
noRound: mainly for fading in operations, should set to false or undefined if for movement
checkIncr: a number that will be added to the operation every cycle. If it is equal to arg.n1 or exceeds it, arg.end is executed and its finished.
}
0.15
*/
if (arg.pro==undefined) {
var n=arg.n;
var n1=arg.n1;
//Done setting vars
//var i1=1; // get fraction
//var i2=Math.floor(i1)+1; // convert to integer
var i3=1; // Flip number/float
var thr=(arg.speed ? arg.speed : 0.1);
var i4=(n1-n)*thr; // get the offset and cut out a fifteenth of it
var i5=i3*i4; // get
var i6=i5+n;
arg.func(i6);
th.qsmoth.pro+=1;
var pro=th.qsmoth.pro;
//console.log(i6)
th.timeOut=setTimeout(function(){ th.qsmooth({func: arg.func,n: n,n1: n1,pro: pro,cur: i6,off: i4,end: arg.end,endarg: arg.endarg,noRound: arg.noRound,checkIncr: arg.checkIncr}) },10);
} else {
if (arg.pro!=th.qsmoth.pro) {
return false;
}
// gotta set a few vars
var n=arg.n;
var n1=arg.n1;
var off=arg.off;
var nmin=0-arg.checkIncr;
var chkIncr=(n1 < n ? nmin : arg.checkIncr),
    chkITrue=false;
// Done setting a few vars, now for the math
var i=(arg.cur-n)/(n1-n);
var ii1=1-i;
var i2=off*ii1;
var i3=i2+arg.cur;
//console.log(chkIncr+i3+" "+arg.n1+" "+i3+" "+arg.end);
// a quick tester in the checkIncr variable
if (n1 < n) { if (chkIncr+i3<=arg.n1) chkITrue=true; } else {  if (chkIncr+i3>=arg.n1) chkITrue=true; };
// Done quick testing
if (!arg.noRound&&Math.round(i3)==n1||i3==n1||arg.checkIncr&&chkITrue) {
arg.func(n1);
if (typeof arg.end == "function") {
var arguments=(arg.endarg != undefined ? arg.endarg : undefined);
arg.end(arguments);
}
return;
}
//console.log(i2)
// Done the math's, now send the function its honey!
arg.func(i3);
th.timeOut=setTimeout(function(){ th.qsmooth({func: arg.func,pro: arg.pro,cur: i3,off: off,n: n,n1: n1,end: arg.end,endarg: arg.endarg,noRound: arg.noRound,checkIncr: arg.checkIncr}) },10);
}
}
this.timeOut=null;
this.qsmooth(arg);
} 
window.qsFadein=function(func, n, n1,speed,end,offset,noRound,chkIncr) {
	var qs=new qsmoothp({func: func, n: n, n1: n1, off: (offset ? offset : 0.2), speed: (speed ? speed : 0.032), noRound: (noRound ? noRound : true), checkIncr: (chkIncr ? chkIncr : 0.001), end: (end ? end : undefined)});
	return qs;
};
