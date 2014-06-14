define(function(){

	//percentComplete(0.0 to 1.0),elapsedTime,startValue,endValue,totalDuration
	function linearOut(x,t,b,c,d){
		return (c * (t / d) + b);
	}
	
	//percentComplete(0.0 to 1.0),elapsedTime,startValue,endValue,totalDuration
	function easeOutSine(x,t,b,c,d){
		return c * Math.sin(t/d * (Math.PI/2)) + b;             
	}
	
	function easeInOutQuad(x, t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t + b;
		t--;
		return -c/2 * (t*(t-2) - 1) + b;
	};              

	function easeOutQuart(x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	}

	
	function easeOutCubic(x, t, b, c, d) {
		t /= d;
		t--;
		return c*(t*t*t + 1) + b;
	};
	
	function easeInOutCubic(x, t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2*t*t*t + b;
		t -= 2;
		return c/2*(t*t*t + 2) + b;
	};
	
	function easeInOutExpo(x, t, b, c, d) {
		t /= d/2;
		if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
		t--;
		return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
	};
	
	function easeInOutCirc(x, t, b, c, d) {
		t /= d/2;
		if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		t -= 2;
		return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
	};

	function easeOutElastic (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	}

	// accelerating from zero velocity
	function easeInQuint_t(t) { return t*t*t*t*t };
	// decelerating to zero velocity
	function easeOutQuint_t(t) { return 1+(--t)*t*t*t*t };


	return{
		linearOut:linearOut,
		easeOutSine:easeOutSine,
		easeInOutQuad:easeInOutQuad,
		easeOutQuart:easeOutQuart,
		easeOutCubic:easeOutCubic,
		easeInOutCubic:easeInOutCubic,
		easeOutElastic:easeOutElastic,
		easeInQuint_t:easeInQuint_t,
		easeOutQuint_t:easeOutQuint_t
	}



});









