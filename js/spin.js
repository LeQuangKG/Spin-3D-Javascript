function GetNumber(str){
	var l = str.length;
	var i,c,beg,end;
	for(i=0; i< l; i++){
		c = str.charAt(i);
		if(c=='(') beg = i+1;
		if(c=='d') end = i;
	}
	return parseInt(str.substring(beg,end));
}

function Ring3D(div,subDiv){
	var my = this;
	this.div = div;
	this.index = 0;
	this.subDiv = subDiv;
	this.timer;
	this.init = function(){
		my.AutoRotate();
		//my.div.addEventListener('mousedown',my.MouseDown,false);
	};
	this.Rotate = function(){
		my.div.style.webkitTransitionDuration = '4s';
		my.div.style.webkitTransform = 'rotateY('+-90+'deg)';
	};
	this.AutoRotate = function(){
		if(my.index==0){
			my.div.style.webkitTransitionDuration = '4s';
			my.div.style.webkitTransform = 'rotateY('+360+'deg)';
			my.index = 1;
			my.timer = setTimeout(my.AutoRotate,3800,my);
		}
		else{
			my.div.style.webkitTransitionDuration = '0s';
			my.div.style.webkitTransform = 'rotateY('+0+'deg)';
			my.index = 0;
			my.timer = setTimeout(my.AutoRotate,5,my);			
		}		
	};
	this.MouseDown = function(e){
		clearTimeout(my.timer);
		my.div.style.webkitTransitionDuration = '0s';
		var str = String(my.div.style.webkitTransform);
		my.div.style.webkitTransform = 'rotateY('+GetNumber(str)+'deg)';
	};
	this.init();
}

window.onload = function(){
	var div = document.getElementById('shape');
	var subDiv =[];
	subDiv[0] = document.getElementById('shape0');
	subDiv[1] = document.getElementById('shape1');
	subDiv[2] = document.getElementById('shape2');
	subDiv[3] = document.getElementById('shape3');
	subDiv[4] = document.getElementById('shape4');
	subDiv[5] = document.getElementById('shape5');
	var ring = new Ring3D(div,subDiv);
	var div1 = document.getElementById('container');
	var move = new Croll(0,360,0,div,ring.timer,div1);
}