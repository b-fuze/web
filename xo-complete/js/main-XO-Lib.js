/* Javascript File */
window.undf=undefined;
window.colorChars=[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
window.colorCharsTable=[{char: 0, value: 0},{char: 1, value: 1},{char: 2, value: 2},{char: 3, value: 3},{char: 4, value: 4},{char: 5, value: 5},{char: 6, value: 6},{char: 7, value: 7},{char: 8, value: 8},{char: 9, value: 9},{char: "a", value: 10},{char: "b", value: 11},{char: "c", value: 12},{char: "d", value: 13},{char: "e", value: 14},{char: "f", value: 15}]
window.getCharValue=function(char) {var val="nothin";for (i=0;i<colorCharsTable.length;i++){if (colorCharsTable[i].char==char) val=colorCharsTable[i].value;}return val;}
window.hexToRGB=function(h) {var fnum=getCharValue(h[0])*16;fnum=fnum+getCharValue(h[1]);return fnum;};
window.RGBToHex=function(n) {var r1=n/16;var fchar=parseInt(r1);var schar=n-(parseInt(r1)*16);return colorChars[fchar]+colorChars[schar];}
window.xolib={
	won: false,
	clickTimes: 0,
	xoround: 1,
	withai: false,
	clickable: true,
	scanNBOR: function(x,y) {
		var scanDia=function(xd,yd,xl,yl,end){var count=0;var iy=yl;for (ix=xl;ix!=end&&ix!=-1;) {if (iy!=end&&iy!=-1) {var n1=xolib.data[iy][ix].value;if (n1===xolib.curUser)count+=1;iy+=yd;};ix+=xd;}if (count==xolib.sqs) return 1;else return 0;};
		var scanRow=function(yrow){var count=0;for (i=0;i<xolib.sqs;i++) {var n1=xolib.data[yrow][i].value;if (n1===xolib.curUser)count+=1;}if (count==xolib.sqs) return 1;else return 0;};
		var scanColumn=function(xcol){var count=0;for (i=0;i<xolib.sqs;i++) {var n1=xolib.data[i][xcol].value;if (n1===xolib.curUser)count+=1;}if (count==xolib.sqs) return 1;else return 0;};
		var result=0;
		for (iy=0;iy<xolib.sqs;iy++) {
			var r=scanRow(iy);
			result+=r;
			//console.log(r);
		}
		for (ix=0;ix<xolib.sqs;ix++) {
			var r=scanColumn(ix);
			result+=r;
			//console.log(r);
		}
		result+=scanDia(-1,-1,xolib.sqs-1,xolib.sqs-1,xolib.sqs);
		result+=scanDia(1,-1,0,xolib.sqs-1,xolib.sqs);
		if (result!=0){
			if (!xolib.won)
			xolib.uWon(xolib.curUser);
		}
	},
	aiChoose: function() {
		var scanDia = function (xd, yd, xl, yl, end, u) {
			var count = 0;
			var iy = yl;
			var val = []; 
			var inv = [];
			var noBody = [];
			for (ix = xl; ix != end && ix != -1;) {
				if (iy != end && iy != -1) {
					var n1 = xolib.data[iy][ix].value;
					if (n1 === u) {
					count += 1;
						val.push([iy,ix,xolib.data[iy][ix]]);
					} else {
						inv.push([iy,ix,xolib.data[iy][ix]]);
					}
					if (n1 === false)
						noBody.push([iy,ix,xolib.data[iy][ix]]);
					iy += yd;
				};
				ix += xd;
			}
			return [count,val,inv,noBody];
		};
		var scanRow = function (yrow,u) {
			var count = 0;
			var val = []; // valid the ones that pass the test
			var inv = []; // the ones that (obviously) dont pass it
			var noBody = [];
			for (i = 0; i < xolib.sqs; i++) {
				var n1 = xolib.data[yrow][i].value;
				if (n1 === u) {
					count += 1;
					val.push([yrow,i,xolib.data[yrow][i]]);
				} else {
					inv.push([yrow,i,xolib.data[yrow][i]]);
				}
				if (n1 === false)
					noBody.push([yrow,i,xolib.data[yrow][i]]);
			}
			return [count,val,inv,noBody];
		};
		var scanColumn = function (xcol,u) {
			var count = 0;
			var val = [];
			var inv = [];
			var noBody = [];
			for (i = 0; i < xolib.sqs; i++) {
				var n1 = xolib.data[i][xcol].value;
				if (n1 === u) {
					count += 1;
					val.push([i,xcol,xolib.data[i][xcol]]);
				} else {
					inv.push([i,xcol,xolib.data[i][xcol]]);
				}
				if (n1 === false)
					noBody.push([i,xcol,xolib.data[i][xcol]]);
			}
			return [count,val,inv,noBody];
		};
		var op=1-xolib.curUser; //////// Opponent
		var me=xolib.curUser;   //////// Meeee yaaay!!!
		var winf=[]; //// a little array to store my winning functions
		var addf=[]; //// additions
		var stepUp=[];
		var deff=[]; //// defense
		var mFunc=function(x,y) {
			this.x=x;
			this.y=y;
			var th=this;
			this.run=function() {
				xolib.set(th.x,th.y);
				
			}
		}
		var compCount=0;
		//   here we'll scan and see how everything looks
		for (iy=0;iy<xolib.sqs;iy++) {
			var r=scanRow(iy,me);
			var r2=scanRow(iy,op);
			if (r[0]==2) {
				if (r[2][0]&&r2[3].length>0) {
					var xof=r2[3][0][1];
					var yof=r2[3][0][0];
					var f=new mFunc(xof,yof);
					winf.push(f);
				}
			} else if (r2[0]==2&&r2[3].length>0) { /// okkaay, hes done it. that human's tryna win
				if (r2[2][0]&&r2[3].length>0) {
					//console.log(r2[3][0]);
					var xof=r2[3][0][1];
					var yof=r2[3][0][0];
					var f=new mFunc(xof,yof);
					deff.push(f);
				}
			} else {
				if (r[3].length>0&&r[0]>0&&r2[0]==0) {
					var xof=r2[3][0][1];
					var yof=r2[3][0][0];
					var f=new mFunc(xof,yof);
					stepUp.push(f);
				} else if (r[3].length>0) {
					var xof=r2[3][0][1];
					var yof=r2[3][0][0];
					var f=new mFunc(xof,yof);
					addf.push(f);
				}
			}
		}
		for (ix=0;ix<xolib.sqs;ix++) {
			var r=scanColumn(ix,me);
			var r2=scanColumn(ix,op);
			if (r[0]==2) {
				if (r[2][0]&&r2[3].length>0) {
					var xof=r2[3][0][1];
					var yof=r2[3][0][0];
					var f=new mFunc(xof,yof);
					winf.push(f);
				}
			} else if (r2[0]==2&&r2[3].length>0) { /// okkaay, hes done it. that human's tryna win
				if (r2[2][0]&&r2[3].length>0) {
					//console.log(r2[3][0]);
					var xof=r2[3][0][1];
					var yof=r2[3][0][0];
					var f=new mFunc(xof,yof);
					deff.push(f);
				}
			} else {
				if (r[3].length>0&&r[0]>0&&r2[0]==0) {
					var xof=r2[3][0][1];
					var yof=r2[3][0][0];
					var f=new mFunc(xof,yof);
					stepUp.push(f);
				} else if (r[3].length>0) {
					var xof=r2[3][0][1];
					var yof=r2[3][0][0];
					var f=new mFunc(xof,yof);
					addf.push(f);
				}
			}
		}
		var x1=scanDia(-1,-1,xolib.sqs-1,xolib.sqs-1,xolib.sqs,me);
		var x2=scanDia(-1,-1,xolib.sqs-1,xolib.sqs-1,xolib.sqs,op);
		if (x1[0]==2) {
			if (x1[2][0]&&x2[3].length>0) {
				var xof=x2[3][0][1];
				var yof=x2[3][0][0];
				var f=new mFunc(xof,yof);
				winf.push(f);
			}
		} else if (x2[0]==2&&x2[3].length>0) { /// okkaay, hes done it. that human's tryna win
			if (x2[2][0]&&x2[3].length>0) {
				var xof=x2[3][0][1];
				var yof=x2[3][0][0];
				var f=new mFunc(xof,yof);
				deff.push(f);
			}
		} else {
			if (x1[3].length>0&&x1[0]>0&&x2[0]==0) {
				var xof=x2[3][0][1];
				var yof=x2[3][0][0];
				var f=new mFunc(xof,yof);
				stepUp.push(f);
			} else if (x1[3].length>0) {
				var xof=x2[3][0][1];
				var yof=x2[3][0][0];
				var f=new mFunc(xof,yof);
				addf.push(f);
			}
		}
		var x3=scanDia(1,-1,0,xolib.sqs-1,xolib.sqs,me);
		var x4=scanDia(1,-1,0,xolib.sqs-1,xolib.sqs,op);
		if (x3[0]==2) {
			if (x3[2][0]&&x4[3].length>0) {
				var xof=x4[3][0][1];
				var yof=x4[3][0][0];
				var f=new mFunc(xof,yof);
				winf.push(f);
			}
		} else if (x4[0]==2&&x4[3].length>0) { /// okkaay, hes done it. that human's tryna win
			if (x4[2][0]&&x4[3].length>0) {
				//console.log(x4[3][0]);
				var xof=x4[3][0][1];
				var yof=x4[3][0][0];
				var f=new mFunc(xof,yof);
				deff.push(f);
			}
		} else {
			if (x3[3].length>0&&x3[0]>0&&x4[0]==0) {
				var xof=x4[3][0][1];
				var yof=x4[3][0][0];
				var f=new mFunc(xof,yof);
				stepUp.push(f);
			} else if (x3[3].length>0) {
				var xof=x4[3][0][1];
				var yof=x4[3][0][0];
				var f=new mFunc(xof,yof);
				addf.push(f);
			}
		}
		if (winf.length > 0) {
			winf[0].run();
			//console.log("I'll win! func:"+winf[0]);
		}
		else if (deff.length > 0) {
			deff[0].run();
			//console.log("I'll defend :) func:"+deff[0]);
		} else if (stepUp.length > 0) {
			stepUp[0].run();
			//console.log("I'll step up }:] func:"+stepUp[0]);
		}
		else {
			addf[Math.round(Math.random()*(addf.length-1))].run();
			//console.log("I'll just click H| func:"+addf[0]);
		}
	},
	set: function(x,y) {
		if (xolib.won) 
			return;
		if (xolib.gOver) {
			return false;
		}
		if (xolib.data[y][x].value!==false) {
			eQuake();
			return false;
		}
		xolib.clickTimes+=1;
		//console.log(xolib.data[y][x].value);
		xolib.data[y][x].value=xolib.curUser;
		xolib.data[y][x].d.setSym(xolib.curUser+1);
		xolib.scanNBOR(x,y);
		if (xolib.clickTimes===(xolib.sqs*xolib.sqs)) {
			xolib.showReset();
			if (xolib.getCU().isAI)
				xolib.switchUser();
		} else {
			if (!xolib.won)
				xolib.switchUser();
			else if (xolib.getCU().isAI)
				xolib.switchUser();
		}
	},
	resetAll: function() {
		for (i=0;i<xolib.data.length;i++) {
			for (k=0;k<xolib.data[i].length;k++) {
				if (xolib.data[i][k].d.qs1.timeOut)
					clearTimeout(xolib.data[i][k].d.qs1.timeOut);
				xolib.data[i][k].value=false;
				xolib.data[i][k].d.style.backgroundPosition="-100% 100%";
				xolib.data[i][k].d.style.backgroundColor="#c8c8c8";
				xolib.data[i][k].d.style.top="0px";
				xolib.data[i][k].d.style.opacity=1;
				xolib.data[i][k].d.set=false;
			}
		};
		xolib.flickerOk=undefined;
		xolib.clickTimes=0;
		xolib.xoround+=1;
		var u1points=gid("hudppoints1");
		u1points.innerHTML=xolib.user1.points+" Points";
		var u2points=gid("hudppoints2");
		u2points.innerHTML=xolib.user2.points+" Points";
	},
	uWon: function(user) {
		if (xolib.won)
			return;
		xolib.won=true;
		for (i=0;i<xolib.data.length;i++) {
			for (k=0;k<xolib.data[i].length;k++) {
				if (xolib.data[i][k].value===user)
					xolib.data[i][k].d.flicker();
			}
		}
		xolib.flickerOk=true;
		xolib["user"+(user+1)].points+=1;
		if (xolib.getCU.isAI)
		xolib.switchUser();
		setTimeout(function(){xolib.showReset();},1500);
	},
	setGOver: function() {
		
	},
	flyAway: function(endFunc) {
		xolib.fa_y=0;
		xolib.fa_x=0;
		xolib.flyAwayInit=function(endf) {
			var d=xolib.data[xolib.fa_y][xolib.fa_x].d;
			var func=function(n) {var offset=120*n;d.style.opacity=(1-n);d.style.top=offset;};
			if (xolib.fa_x==xolib.sqs-1) {
				xolib.fa_x=0;
				xolib.fa_y+=1;
			} else {
				xolib.fa_x+=1;
			}
			if (xolib.fa_y>xolib.sqs-1) {
				var qs=qsFadein(func,0,1,0.05,endf,undf,undf,0.1);
				d.qs1=qs;
				return;
			} else {
				var qs=qsFadein(func,0,1,0.05);
				d.qs1=qs;
			}
			if (xolib.fa_x<xolib.sqs-1)
			setTimeout(function(){xolib.flyAwayInit(endf);},120);
			else
			setTimeout(function(){xolib.flyAwayInit(endf);},120);
		};
		setTimeout(function(){xolib.flyAwayInit(endFunc);},200);
	},
	flash: function() {
		var flash=gid("flash");
		flash.style.display="block";
		flash.style.opacity=1;
		var flfunc=function(n){flash.style.opacity=n;};
		var flendfunc=function(){flash.style.display="none";}
		var qs=qsFadein(flfunc,1,0,0.03,flendfunc,undf,undf,0.02);
	},
	reset: function() {
		xolib.flyAway(function(){xolib.resetExec();});
	},
	resetExec: function() {
		var resetd=gid("refresh");
		if (resetd.qs.timeOut)
			clearTimeout(resetd.qs.timeOut);
		resetd.style.top="-33px";
		xolib.srIsVisible=undefined;
		xolib.resetAll();
		xolib.flash();
		setTimeout(function(){xolib.showRound(xolib.xoround);},100);
		xolib.won=false;
	},
	resetINST: function() {
		this.rot=(Math.PI*2)*-1;
	},
	showReset: function() {
		if (xolib.sResetRunning||xolib.srIsVisible)
			return;
		xolib.sResetRunning=true;
		var ct=gid("xorefreshctx");
		var cont=gid("refresh");
		cont.clicked=false;
		cont.onclick=function(){if (cont.clicked) return;xolib.reset();cont.clicked=true;};
		var ctx=ct.getContext("2d");
		xolib.ri=new xolib.resetINST();
		var img=new Image();img.src="img/RefreshBlack.png";
		var renderf=function(){ctx.save();ctx.clearRect(0,0,30,30);ctx.translate(15,15);ctx.rotate(xolib.ri.rot);ctx.drawImage(img,-15,-15,30,30);ctx.restore();};
		var setrot=function(n){var r=n/(Math.PI*2)*-1;cont.style.top="-"+(30*r);xolib.ri.rot=n;renderf();};
		var endFunc=function(){xolib.sResetRunning=undefined;xolib.srIsVisible=true;};
		var qs=qsFadein(setrot,(Math.PI*2)*-1,0,0.045,endFunc);
		cont.qs=qs;
	},
	showRound: function(index) {
		var xornd=gid("xoround");
		xornd.style.left=0;
		xornd.style.display="block";
		var xorsp=xornd.getElementsByClassName("sp")[0];
		xorsp.innerHTML=index;
		var xorsp2=xornd.getElementsByClassName("sp2")[0];
		var animate=function(n) {
			var xwidth=320-(n*160);
			if (index > 9) {
				var xwidth2=1100-(n*720);
				}
			else {
				xornd.style.left=60;
				var xwidth2=850-(n*470);
			}
			var xfsize=150-(n*100);
			var spfsize=234-(n*156);
			var sp2mtop=45-(n*30);
			var sp2mright=18-(n*12);
			xornd.style.height=xwidth;
			xornd.style.fontSize=xfsize;
			xornd.style.width=xwidth2;
			xorsp.style.fontSize=spfsize;
			xorsp2.style.marginTop=sp2mtop;
			xorsp2.style.marginRight=sp2mright;
			xornd.style.opacity=n;
		};
		var endAnimation=function(n) {
			xornd.style.left=n*1000+(index > 9 ? 0 : 60);
			xornd.style.opacity=1-n;
		};
		var finalEnd=function() {
			xornd.style.display="none";
		};
		var slide=function() {
			setTimeout(function(){
				var qs2=qsFadein(endAnimation,0,1,0.1,finalEnd);
			},500);
		}
		var qs=qsFadein(animate,0,1,0.23,slide);
	},
	getCU: function() { // Get Current User
		return xolib["user"+(xolib.curUser == 0 ? 1 : 2)];
	},
	switchUser: function(opt) {
		switch (xolib.curUser) {
			case 0:
				xolib.curUser=1;
				var spturn=gid("splayert");
				spturn.style.display="inline";
				var spturn2=gid("fplayert");
				spturn2.style.display="none";
				if (opt===undefined) {
				var isAI=false;
				if (xolib.getCU().isAI) {
					xolib.noClicks(true);
					isAI=true;
				}
				else if (!xolib.clickable) {
					xolib.noClicks(false);
				}
				if (isAI) {
					xolib.aiChoose();
				} else {
					if (!xolib.clickable) {
						xolib.noClicks(false);
					}
				}
				}
				break;
			case 1:
				xolib.curUser=0;
				var spturn=gid("fplayert");
				spturn.style.display="inline";
				var spturn2=gid("splayert");
				spturn2.style.display="none";
				if (opt===undefined) {
				var isAI=false;
				if (xolib.getCU().isAI) {
					xolib.noClicks(true);
					isAI=true;
				}
				else if (!xolib.clickable) {
					xolib.noClicks(false);
				}
				if (isAI) {
					xolib.aiChoose();
				} else {
					if (!xolib.clickable) {
						xolib.noClicks(false);
					}
				}
				}
				break;
		}
	},
	noClicks: function(opt) {
		var screen=gid("scover");
		switch (opt) {
			case true:
				screen.style.display="block";
				xolib.clickable=false;
			break;
			case false:
				screen.style.display="none";
				xolib.clickable=true;
			break;
		}
	},
	fillTable: function(sqs) {
		var d=gid("maincontainer");
		d.style.width=(xolib.sqlength+2)*sqs;
		d.style.height=(xolib.sqlength+2)*sqs;
		xolib.data=[];
		var setFunc=function(x,y,sym){
			
		};
		for (ys=0;ys<sqs;ys++) {
			var dataRow=[];
			for (xs=0;xs<sqs;xs++) {
			var sq=elm("div");
			sq.className="xocontainer";
			sq.setFunc=function() {
				var th=this;
				th.xs=xs;
				th.ys=ys;
				sq.id="sq-x"+th.xs+"y"+th.ys;
				var bgfadeout=function(n){var r1=(n*55)+200;var hex=RGBToHex(parseInt(r1));th.style.backgroundColor=hex+hex+hex;if (th.sym==1)var offset=parseInt(n*100)+-100;else if (th.sym==2)var offset=200-parseInt(n*100);th.style.backgroundPosition=offset+"% 100%";};
				th.setSym=function(sym){th.sym=sym;qsFadein(bgfadeout,0,1,0.062);};
				var highlight=function(n){th.style.opacity=n;th.opaCity=n;};
				var hlEnd=function(){if (th.opaCity==1)th.flIter+=1;if (th.flIter==th.flAmount) {th.flIter=0;th.opaCity=1;return;}th.flicker();}
				th.flAmount=3;
				th.flIter=0;
				th.opaCity=1;
				th.startFl=false;
				th.flicker=function(){if (!th.startFl) {th.startFl=true;setTimeout(function(){th.flicker();},500);return}if (th.opaCity==1) {qsFadein(highlight,1,0,0.27,hlEnd,1,false);}else{qsFadein(highlight,0,1,0.27,hlEnd,1,false);}; };
			};
			var sqsel=elm("div");
			sqsel.className="sqselect";
			sq.ap(sqsel);
			sq.sel=sqsel;
			sqsel.fading=false;
			sqsel.fadein=function() {
				this.fading=true;
				this.opaCity=0;
				var th=this;
				var opaSet=function(n){th.style.width=(100-(n*20))+"%";th.style.height=(100-(n*20))+"%";th.opaCity=n;th.style.opacity=n;};
				this.opaSwitch=function() {
					if (th.opaCity==1) {
						var qs=qsFadein(opaSet,1,0,0.04,th.opaSwitch,undf,undf,0.12);
						th.qsf=qs;
					} else {
						var qs=qsFadein(opaSet,0,1,0.04,th.opaSwitch,undf,undf,0.12);
						th.qsf=qs;
					}
				}
				var qs=qsFadein(opaSet,0,1,0.04,th.opaSwitch,undf,undf,0.12);
				th.qsf=qs;
			}
			sqsel.stopFade=function(){
				if (this.qsf&&this.qsf.timeOut)
					clearTimeout(this.qsf.timeOut);
				this.style.opacity=0;
				this.fading=false;
			}
			sq.onmouseover=function() {
				this.mouseover=true;
				if (!this.set) {
					if (!this.sel.fading)
					this.sel.fadein();
				}
			}
			sq.onmouseout=function() {
				this.mouseover=false;
				var th=this;
				setTimeout(function(){if (!th.mouseover)th.sel.stopFade();},100);
			}
			sq.onclick=function() {
				sqsel.stopFade();
				var th=this;
				xolib.set(th.xs,th.ys);
				if (!xolib.won)
				th.set=true;
			};
			d.appendChild(sq);
			sq.setFunc();
			dataRow.push({d: sq, value: false});
			}
			xolib.data.push(dataRow);
		};
		xolib.sqs=sqs;
	},
	choosePlayers: function() {
	
	},
	changeName: function(obj,n) {
		var inp=gid("nameinput");
		inp.style.display="block";
		inp.onblur=function() {
			inp.style.display="none";
		}
		var n1=obj;
		var xoff=huntXOffset(n1);
		var yoff=huntYOffset(n1);
		var xwidth=n1.offsetWidth;
		var yheight=n1.offsetHeight;
		inp.style.left=xoff+(n1.niaddx ? n1.niaddx : 0);
		inp.style.top=yoff+(n1.niaddy ? n1.niaddy : 0);
		inp.style.width=xwidth+2;
		inp.style.height=yheight+4;
		if (n==1)
		inp.value=xolib.user1.name;
		else
		inp.value=xolib.user2.name;
		inp.focus();
		inp.onkeydown=function(e){
			if (e.keyCode==13) {
				xolib.setName(n,inp.value);
				inp.style.display="none";
			}
		}
	},
	setName: function(u,n) {
		var u1sp=gid("firstplayer");
		var u2sp=gid("secondplayer");
		switch (u) {
			case 1:
				xolib.user1.name=n;
				u1sp.innerHTML=xolib.user1.name+(xolib.user1.isAI ? "[AI]" : "");
				var hudname=gid("hudpname1");
				hudname.innerHTML=xolib.user1.name+(xolib.user1.isAI ? "[AI]" : "");
			break;
			case 2:
				xolib.user2.name=n;
				u2sp.innerHTML=xolib.user2.name+(xolib.user2.isAI ? "[AI]" : "");
				var hudname=gid("hudpname2");
				hudname.innerHTML=xolib.user2.name+(xolib.user2.isAI ? "[AI]" : "");
			break;
		}
	}
}

window.onload=function() {
	xolib.user1={name: "b-fuze", symbol: "x",points: 0, isAI: false};
	xolib.user2={name: "KING", symbol: "y",points: 0, isAI: false};
	var u1sp=gid("firstplayer");
	u1sp.innerHTML=xolib.user1.name;
	var u2sp=gid("secondplayer");
	u2sp.innerHTML=xolib.user2.name;
	var hudname=gid("hudpname1");
	hudname.niaddy=3;
	hudname.niaddx=3;
	hudname.innerHTML=xolib.user1.name;
	var hudname2=gid("hudpname2");
	hudname2.niaddy=3;
	hudname2.niaddx=3;
	hudname2.innerHTML=xolib.user2.name;
	u1sp.onclick=function() {
	xolib.changeName(this,1);
	};
	u2sp.onclick=function() {
	xolib.changeName(this,2);
	};
	hudname.onclick=function() {
	xolib.changeName(this,1);
	};
	hudname2.onclick=function() {
	xolib.changeName(this,2);
	};
	xolib.curUser=parseInt(Math.random()*1);
	xolib.sqlength=80;
	
	xolib.fillTable(3);
	// Pretty movements at the beginning
	var suNote=gid("startupnote");
	var logo=gid("logo");
	var lglare=gid("logoglare");
	var slideOut=function(n){suNote.style.top=(n*100)+-100;logo.style.top=(n*100)+-90;};
	var lglareSlide=function(n){
		var offset=-310+(n*530);
		lglare.style.left=offset;
		var ostop=0.25;
		var ostop2=0.62;
		if (n < ostop) {
			var ftion=n/ostop;        // fraction
			lglare.style.opacity=ftion;
		} else if (n > ostop2) {
			var ftion=(n-ostop2)/(1-ostop2);
			ftion=1-ftion;
			lglare.style.opacity=ftion;
		}
	};
	var startAll=function() {
	var qs2=qsFadein(slideOut,0,1,0.04);
	logo.qs2=qs2;
	setTimeout(function(){
		var qs3=qsFadein(lglareSlide,0,1,0.013);
	},750);
	}
	qgames.iEnd=function() {
		var endIntro=function() {
			startAll();
			window.allReady=true;
		}
		var endIntroelm=function() {
			qgames.intro.cont.style.display="none";
		}
		var clearIntro=function(n) {
			qgames.intro.cont.style.opacity=n;
			if (Math.round(n*10)==8)
				endIntro();
		}
		setTimeout(function(){
			var qs=qsFadein(clearIntro,1,0,0.08,endIntroelm);
		},500);
	};
	qgames.start();
	document.body.style.display="block";
	qgames.intro.imgSeq.start();
	//xolib.start();
}
window.showGame=function() {
	var d=gid("daddy");
	d.style.display="block";
	var logo=gid("logo");
	var dcp=gid("chooseplayers");
	var dcsym=gid("choosesym");
	var qn=qNotify.newNote("Change your name by clicking on it"+(xolib.withai ? ", you can change my name to :)" : ""),[0,0])
	var f1=function(n){dcp.style.opacity=1-n;dcsym.style.opacity=1-n;var no=n;d.style.opacity=no;var oppo=(2-(n+1))/2;oppo=(oppo < 0 ? 0 : oppo);logo.style.opacity=oppo;};
	var f1end=function(){logo.style.display="none";dcp.style.display="none";dcsym.style.display="none";};
	if (logo.qs2.timeOut)
		clearTimeout(logo.qs2.timeOut);
	var qs=new qsmoothp({func: f1, n: 0, n1: 1, off: 0.2, speed: 0.12, noRound: true, checkIncr: 0.001, end: f1end});
	xolib.showRound(1);
	setTimeout(function(){
		qn.relocate(gid("pointscounter"),"bottom");
		qn.show();
		setTimeout(function(){
			qn.hide();
			setTimeout(function(){
				qn.setText("And here to");
				qn.rescale();
				qn.relocate(gid("notifications"),"top");
				qn.show();
				setTimeout(function(){qn.hide()},3300);
			},1400);
		},7300)
	},3000);
}
window.showSymChooser=function() {
	var d=gid("choosesym");
	d.style.opacity=0;
	d.style.display="block";
	var qn=qNotify.newNote("Choose your symbol",[0,0]);
	qn.relocate(d,"bottom");
	var qsFunc=function(n){d.style.opacity=n;d.style.top=-25+(n*25);}
	var qnShow=function(){qn.show();setTimeout(function(){qn.hide();},5000);};
	var qs=qsFadein(qsFunc,0,1,0.12,qnShow);
	// functions for choosing symbols
	var chsym1=gid("chsym1");
	var chsym2=gid("chsym2");
	var chSym=function(n) {
		xolib["user"+(n == 1 ? 2 : 1)].isAI=true;
		xolib.setName((n == 1 ? 2 : 1),"Computer");
		xolib.curUser=(n == 1 ? 1 : 0);
		xolib.switchUser();
	}
	chsym1.onclick=function() {
		chSym(1);
		window.showGame();
		qn.hide();
	}
	chsym2.onclick=function() {
		chSym(2);
		window.showGame();
		qn.hide();
	}

};
window.onclick=function() {
	if (!window.allReady)
		return false;
	if (!window.clicked) {
	var d=gid("chooseplayers");
	d.style.display="block";
	var fdIn=function(n){d.style.opacity=n;}
	var qsd=qsFadein(fdIn,0,1,0.1);
	d.qsd=d;
	var xocp1=gid("xocp1");
	xocp1.onclick=function(){
		xolib.withai=true;
		window.showSymChooser();
	}
	var xocp2=gid("xocp2");
	xocp2.onclick=function(){
		window.showGame();
	}
	}
	window.clicked=true;
}
