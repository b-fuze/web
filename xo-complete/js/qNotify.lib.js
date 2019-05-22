/* Javascript File */
window.qNotify= {
	newNote: function(text,loc) {
		var note=function(loc,orient,text) {
			var th=this;
			th.border=15;
			th.oldBorder=th.border;
			th.arrowOff=10;
			th.arrowDist=4;
			th.oldArrowDist=th.arrowDist;
			th.cWidth=16;
			th.x=0;
			th.y=0;
			th.orient="top";
			th.focus=false;
			th.curQS=false;
			th.isVisible=false;
			this.d=elm("div");
			this.sp=elm("span");
			this.c=elm("canvas");
			th.c.width=16;
			th.c.height=16;
			this.ctx=th.c.getContext("2d");
			this.ctxImage=new Image();
			th.ctxImage.src="img/qNotifyArrow.png";
			th.setText=function(t) {
				th.sp.innerHTML=t;
				th.text=t;
				th.rescale();
			};
			th.rescale=function() {
				th.d.style.opacity=1;
				th.d.style.display="block";
				th.d.style.width="auto";
				th.d.style.height="auto";
				th.d.style.left=-10000;
				th.d.style.top=-10000;
				th.d.style.paddingTop=3;
				th.d.style.paddingLeft=5;
				th.d.style.paddingRight=5;
				th.d.style.borderWidth=0;
				th.setWidth=th.d.offsetWidth;
				th.setHeight=th.d.offsetHeight;
				th.d.style.width=th.d.offsetWidth;
				th.d.style.height=th.d.offsetHeight;
				th.d.style.padding="0px 0px 0px 0px";
				th.d.style.paddingTop=3;
				th.d.style.borderWidth=1;
				th.move();
				if (!th.isVisible)
					th.d.style.display="none";
			};
			th.relocate=function(loc,orient) {
				if (typeof loc == "object" || loc == undefined) {
					if (loc==undefined)
						loc=th.focus;
					if (orient==undefined) 
						orient=th.orient;
					th.c.style.margin="auto auto auto auto";
					switch (orient) {
						case "bottom":
						var x=huntXOffset(loc)+(loc.offsetWidth/2)-(th.setWidth/2);
						var y=huntYOffset(loc)+loc.offsetHeight+(th.border+th.arrowOff);
						th.c.style.marginTop=0;
						th.c.style.top=(th.cWidth+th.arrowDist)*-1;
						th.ctx.clearRect(0,0,th.cWidth,th.cWidth);
						th.ctx.save();
						th.ctx.translate(th.cWidth/2,th.cWidth/2);
						th.ctx.rotate(Math.PI);
						th.ctx.drawImage(th.ctxImage,-8,-4.5,16,9);
						th.ctx.restore();
						break;
						case "top":
						var x=huntXOffset(loc)+(loc.offsetWidth/2)-(th.setWidth/2);
						var y=huntYOffset(loc)-th.setHeight-(th.border+th.arrowOff);
						th.c.style.marginBottom=0;
						th.c.style.bottom=(th.cWidth+th.arrowDist)*-1;
						th.ctx.clearRect(0,0,th.cWidth,th.cWidth);
						th.ctx.save();
						th.ctx.translate(th.cWidth/2,th.cWidth/2);
						th.ctx.rotate(Math.PI*2);
						th.ctx.drawImage(th.ctxImage,-8,-4.5,16,9);
						th.ctx.restore();
						break;
						case "left":
						var x=huntXOffset(loc)-th.setWidth-(th.border+th.arrowOff);
						var y=huntYOffset(loc)+(loc.offsetHeight/2)-(th.setHeight/2)-1;
						th.c.style.marginRight=0;
						th.c.style.right=(th.cWidth+th.arrowDist)*-1;
						th.c.style.marginTop=0;
						th.c.style.top=(th.setHeight/2)-(th.cWidth/2)+2;
						th.ctx.clearRect(0,0,th.cWidth,th.cWidth);
						th.ctx.save();
						th.ctx.translate(th.cWidth/2,th.cWidth/2);
						th.ctx.rotate(Math.PI*1.5);
						th.ctx.drawImage(th.ctxImage,-8,-4.5,16,9);
						th.ctx.restore();
						break;
						case "right":
						var x=huntXOffset(loc)+loc.offsetWidth+(th.border+th.arrowOff);
						var y=huntYOffset(loc)+(loc.offsetHeight/2)-(th.setHeight/2)-1;
						th.c.style.marginLeft=0;
						th.c.style.left=(th.cWidth+th.arrowDist)*-1;
						th.c.style.marginTop=0;
						th.c.style.top=(th.setHeight/2)-(th.cWidth/2)+2;
						th.ctx.clearRect(0,0,th.cWidth,th.cWidth);
						th.ctx.save();
						th.ctx.translate(th.cWidth/2,th.cWidth/2);
						th.ctx.rotate(Math.PI*-1.5);
						th.ctx.drawImage(th.ctxImage,-8,-4.5,16,9);
						th.ctx.restore();
						break;
					}
					th.focus=loc;
					th.orient=orient;
					th.x=x;
					th.y=y;
					th.move();
				} else {
					th.x=loc[0];
					th.y=loc[1];
					th.move();
				}
			};
			th.move=function() {
				th.d.style.left=th.x;
				th.d.style.top=th.y;
			};
			th.show=function() {
				if (!th.focus)
					return;
				if (th.isVisible)
					return;
				if (th.curQS&&th.curQS.timeOut)
					clearTimeout(th.curQS.timeOut);
				th.d.style.display="block";
				th.isVisible=true;
				var f=function(n){th.d.style.opacity=n;th.border=th.oldBorder*n;th.arrowDist=th.oldArrowDist*n;th.relocate();}
				var qs=qsFadein(f,0,1,0.095);
				th.curQS=qs;
			};
			th.hide=function() {
				if (!th.focus)
					return;
				if (!th.isVisible)
					return;
				if (th.curQS&&th.curQS.timeOut)
					clearTimeout(th.curQS.timeOut);
				th.d.style.display="block";
				th.isVisible=false;
				var f=function(n){th.d.style.opacity=n;th.border=th.oldBorder*n;th.relocate();}
				var endf=function(){th.d.style.display="none";};
				var qs=qsFadein(f,1,0,0.095,endf);
				th.curQS=qs;
			}
			th.d.style.position="absolute";
			th.d.style.background="rgba(255,255,255,0.56)";
			th.d.style.fontFamily="Arial";
			th.d.style.fontSize="13";
			th.d.style.textAlign="center";
			th.d.style.opacity=0;
			th.d.style.display="none";
			th.d.style.borderRadius="3px";
			th.d.style.border="1px solid #ffffff";
			th.d.style.boxShadow="0px 0px 4px rgba(255,255,255,0.9)";
			th.d.style.color="rgba(37,37,37,0.7)";
			th.d.style.fontWeight="bold";
			th.c.style.position="absolute";
			th.c.style.margin="auto auto auto auto";
			th.c.style.top=0;
			th.c.style.right=0;
			th.c.style.bottom=0;
			th.c.style.left=0;
			th.setText(text);
			document.body.appendChild(th.d);
			th.d.ap(th.c);
			th.d.ap(th.sp);
			th.rescale();
			
		}
		var noteInst=new note(loc,"bottom",text);
		return noteInst;
	},
	notes: [],
	delNote: function(i) {
		
	}
}
