/* Javascript File */
window.qgames={
	iEnd:undefined,
	start: function() {
		if (!qgames.introSetup) {
			var cont=elm("div");
			cont.style.width="100%";
			cont.style.height="100%";
			cont.style.position="absolute";
			cont.style.top=0;
			cont.style.left=0;
			cont.style.background="#ffffff";
			cont.style.zIndex=10000;
			var d=elm("div");
			d.style.width=345;
			d.style.height=194;
			d.style.position="absolute";
			d.style.marginTop="auto";
			d.style.marginRight="auto";
			d.style.marginBottom="auto";
			d.style.marginLeft="auto";
			d.style.top=-100;
			d.style.right=0;
			d.style.bottom=0;
			d.style.left=0;
			d.style.background="url(./img/QGamesFCombine.png) no-repeat";
			cont.ap(d);
			qgames.intro={
				d: d,
				cont: cont
			};
			var is=new imgSeq({nd: d, count: 56, ms: 50, width: 194, loop: false,end: qgames.iEnd});
			qgames.intro.imgSeq=is;
			document.body.appendChild(cont);
		}
	}
}
