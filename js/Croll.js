/* This num get from real test on device */
var _normal = 10;
var _medium = 20;
var _fast = 30;

/*
	@Funtion name: Croll
	@Use : to croll div from begin to end
	@Para :
		begin : begin position
		end : end position
		direction : 0 if croll left and right
					1 if croll up and down
		div : the div object will be crolled
*/

function Croll(begin,end,direction,div,timer,parent,subDiv){
	var my = this;
	this.begin = begin;
	this.end = end;
	this.direction = direction;
	this.div = div;
	this.timer = timer;
	this.isMouse = false;
	this.parent = parent;
	this.change = null;
	this.subDiv = subDiv;
	this.x; this.y; this.dx1; this.dx2; this.dy1; this.dy2; this.d;
	
	this.inti = function(){
		parent.addEventListener("touchstart",my.MouseDown,false);
		parent.addEventListener("touchmove",my.MouseMove,false);
		parent.addEventListener("touchend",my.MouseUp,false);
		parent.addEventListener("mousedown",my.MouseDown,false);
		parent.addEventListener("mousemove",my.MouseMove,false);
		parent.addEventListener("mouseup",my.MouseUp,false);
	};
	
	this.MouseDown = function(e){
		clearTimeout(my.timer);
		my.div.style.webkitTransitionDuration = '0s';
		var str = String(my.div.style.webkitTransform);
		my.div.style.webkitTransform = 'rotateY('+GetNumber(str)+'deg)';
		var evt = (e?e:(window.event));
		my.isMouse = true;
		if(evt.clientX) {
			my.x = evt.clientX;
			my.y = evt.clientY;
		}
		else{
			my.x = evt.changedTouches[0].clientX;
			my.y = evt.changedTouches[0].clientY;
		}
		my.dx1 = null;
		my.dx2=null;
		my.dy1=null;
		my.dy2=null;
	};
	// 
	this.MouseMove = function(e){
		if(my.isMouse == true){
			var evt = (e?e:(window.event));
			var x,y;
			evt.preventDefault();
			// Move left right
			if(my.direction == 0){
				if(evt.clientX) x = evt.clientX;
				else x = evt.changedTouches[0].clientX;
				my.MoveLeftRight(x);
				my.x = x;
			}
			// Move up down
			else{
				if(evt.clientY) y = evt.clientY;
				else y = evt.changedTouches[0].clientY;
				my.MoveUpDown(y);
				my.y = y;
			}
		}
	};
	
	this.MouseUp = function(){
		my.isMouse = false;
		// Move left right
		if(my.direction == 0 ) my.ExMoveLeftRight(my.dx1,my.dx2);
		// Move up down 
		else my.ExMoveUpDown(my.dy1,my.dy2);
	};
	
	this.CheckLimit = function(d){
		if(d < my.begin) return my.end;
		if(d > my.end) return my.begin;
		if((d <= my.end)&&(d >= my.begin)) return d;
		else return ;
	};
	
	this.MoveLeftRight = function(x){
		my.dx1 = my.dx2;
		my.dx2 = x - my.x;
		if(!my.dx1) my.dx1 = my.dx2;
		my.d = GetNumber(String(my.div.style.webkitTransform))+my.dx2/5;
		/*my.d = my.div.offsetLeft + my.dx2;*/
		my.d = my.CheckLimit(my.d);
		my.div.style.webkitTransitionDuration = '0ms';
		/*my.div.style.left = my.d + 'px';*/
		my.div.style.webkitTransform = 'rotateY('+my.d+'deg)'
		//my.HideShow(my.d);
	};
	
	this.MoveUpDown = function(y){
		my.dy1 = my.dy2;
		my.dy2 = y - my.y;
		my.d = my.div.offsetTop + my.dy2;
		my.d = my.CheckLimit(my.d);
		my.div.style.top = my.d + 'px';
	};
	
	this.ExMoveLeftRight = function(x1,x2){
		var d = x2-x1;
		var d1 = Math.abs(d);
		if(d1<=20) my.d = d*20;
		if((d1>20)&&(d1<=30)) my.d = d*30;
		if(d1>30) my.d = d*40;
		x1 = Math.abs(x1);
		x2 = Math.abs(x2);
		if(x2>x1){
			/*my.d = my.div.offsetLeft + my.d;*/
			my.d = GetNumber(String(my.div.style.webkitTransform))+my.dx2/5;
			my.d = my.CheckLimit(my.d);
			my.div.style.webkitTransitionDuration = '300ms';
			/*my.div.style.left = my.d + 'px';*/
			my.div.style.webkitTransform = 'rotateY('+my.d+'deg)';
			//my.HideShow(my.d);
		}
		else{
			//my.d = my.div.offsetLeft + x2;
			my.d = GetNumber(String(my.div.style.webkitTransform))+my.dx2/5;
			my.d = my.CheckLimit(my.d);
			my.div.style.webkitTransitionDuration = '300ms';
			/*my.div.style.left = my.d + 'px';*/
			my.div.style.webkitTransform = 'rotateY('+my.d+'deg)';
			//my.HideShow(my.d);
		}
	};
	
	this.ExMoveUpDown = function(y1,y2){
		var d = y2-y1;
		var d1 = Math.abs(d);
		if(d1<10) my.d = d*10;
		if((d1>10)&&(d1<=20)) my.d = d*20;
		if((d1>20)&&(d1<=30)) my.d = d*30;
		if(d1>30) my.d = d*40;
		y1 = Math.abs(y1);
		y2 = Math.abs(y2);
		if(y2>y1){
			my.d = my.div.offsetTop + my.d;
			my.d = my.CheckLimit(my.d);
			my.div.style.webkitTransitionDuration = '300ms';
			my.div.style.top = my.d + 'px';
		}
		else{
			my.d = my.div.offsetTop + y2;
			my.d = my.CheckLimit(my.d);
			my.div.style.webkitTransitionDuration = '300ms';
			my.div.style.top = my.d + 'px';
		}
	};
	
	this.HideShow = function(d){
		// If move left
		if(my.dx2<0){
			if((d>0)&&(d<60)){
				my.subDiv[3].style.opacity = 0;
				my.subDiv[4].style.opacity = 1;
			}
			if((d>60)&&(d<120)){
				my.subDiv[2].style.opacity = 0;
				my.subDiv[3].style.opacity = 1;
			}
			if((d>0)&&(d<60)){
				my.subDiv[1].style.opacity = 0;
				my.subDiv[2].style.opacity = 1;
			}
			if((d>0)&&(d<60)){
				my.subDiv[0].style.opacity = 0;
				my.subDiv[1].style.opacity = 1;
			}
			if((d>0)&&(d<60)){
				my.subDiv[5].style.opacity = 0;
				my.subDiv[0].style.opacity = 1;
			}
			if((d>0)&&(d<60)){
				my.subDiv[5].style.opacity = 0;
				my.subDiv[4].style.opacity = 1;
			}
		}
	}
	
	this.inti();
	
}