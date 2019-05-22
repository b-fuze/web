function jshObj(obj) {
	obj.ap = obj.appendChild;
	obj.st = obj.style;
	
}
function elm(element,jsh) {
	var elm = document.createElement(element);
	if (jsh==undefined||!jsh) {
		jshObj(elm);
	}
	return elm;
}
function gid(id) {
	return document.getElementById(id);
}
function gName(name) {
	return document.getElementsByName(name);
}
function gTag(tag) {
	return document.getElementsByTagName(tag);
}
function gClass(classname) {
	return document.getElementsByClassName(classname);
}
function huntXOffset(obj) {
	var offset=obj.offsetLeft;
	var par=obj.parentNode;
	while (par!=document.body) {
		offset+=par.offsetLeft;
		par=par.parentNode;
	}
	return offset;
}
function huntYOffset(obj) {
	var offset=obj.offsetTop;
	var par=obj.parentNode;
	while (par!=document.body) {
		offset+=par.offsetTop;
		par=par.parentNode;
	}
	return offset;
}
function eQuake() {
var iter = 60;
var curIter = 0;
var dbody = document.body;
var eQuake = function () {
	if (curIter == iter) return false;
	var offset = parseInt(Math.random() * 10);
	offset = offset + (-5);
	offset = (1 - (iter / curIter)) * offset;
	// Offsetx
	var offsetx = parseInt(Math.random() * 10);
	offsetx = offsetx + (-5);
	offsetx = (1 - (iter / curIter)) * offsetx;
	dbody.style.marginTop = offset;
	dbody.style.marginLeft = offsetx;
	curIter += 1;
	setTimeout(function () {
		eQuake();
	}, 7);
}
eQuake(); // Go Nigga Go!
}
