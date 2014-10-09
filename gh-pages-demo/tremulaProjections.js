
	//====================
	// Below is a custom Projection template which allows you to specify your own bezier path
	// To use, modify the above configuration @ surfaceMap -->  surfaceMap : userProjection,

	//EXPERIMENTAL! Generally, this works, But it's not particularly tested. Some paths may not work as expected.
	//Please file bugs to https://github.com/garris/TremulaJS/issues


	var userPath = [
		{x:0.0,y:0},
		{x:0.5,y:0.7},
		{x:0.5,y:0.7},
		{x:1,y:0}
	];



	function userProjection1(x,y){

		var curve = userPath;

		var 
		grid0 = this.parent.gridDims[0],
		grid1 = this.parent.gridDims[1],
		axisLength = this.parent.currentGridContentDims,
		tRamp = this.waves.tailRamp,
		hRamp = this.waves.headRamp,
		tri = this.waves.triangle,
		xo,
		yo;

		var xyFactor = [
			grid0,
			grid1
		];

		var cubicBezier = jsBezier.factorCurveBy(curve,xyFactor);

		var p = jsBezier.pointOnCurve(cubicBezier, tRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, tRamp);

		// var xo = p.x - (this.dims[0]*.5);
		var xo = x;

		// var yo = grid1 - p.y - (this.dims[1]*.5) - (((axisLength[1]-this.dims[1])*.5) - y - this.itemMargins[1]);
		var yo = (grid1*.5) - (p.y*0) - (this.dims[1]*.5) - (((axisLength[1]-this.dims[1])*.5) - (y*0) - this.itemMargins[1]);

		var zo = (tri*100)*(tri*10)*.25;
		// if(this.index==1)console.log(tri)

		this.e.style.transformOrigin = this.e.style.webkitTransformOrigin = this.e.style.MozTransformOrigin = '50%';

		this.e.style.transform = this.e.style.MozTransform = this.e.style.webkitTransform = 
			'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)';
			//+' rotateY('+((tRamp*.7*90)-30)+'deg)';


		// var z = 10000-this.index;
		var z = 10000-this.index;
		this.e.style.zIndex = Math.abs(Math.floor(tri*100));
// if(this.index==1)console.log(Math.abs(Math.floor(tri*100)))
		this.e.style.opacity = Math.max(tri,.5);
		this.e.style.webkitBoxShadow = '0 0 30px rgba(0,0,0,'+Math.min(tri,.5)+')';

		this.pPos = [x,y];
	}




	//===== ctr bump projection ========

	var softKnee = [
		{x:0,y:.5},
		{x:.45,y:.5},
		{x:.55,y:.5},
		{x:1,y:.5}
	];

	function turntable2(x,y){

		var curve = softKnee;


		//var xoffset = box.width / 2;
		//var yoffset = box.height / 2;
		var
		grid0 = this.parent.gridDims[0],
		grid1 = this.parent.gridDims[1],
		axisLength = this.parent.currentGridContentDims,
		tRamp = this.waves.tailRamp,
		hRamp = this.waves.headRamp,
		tri = this.waves.triangle,
		//s = 1,
		r,
		xo,//xo=x,//-xoffset, 
		yo;//yo=y;//-yoffset;

		var xyFactor = [
			grid0, //Math.max(0,grid0),
			grid1 //Math.max(0,grid1)
		];
			
		var cubicBezier = factorCurveBy(curve,xyFactor);
			
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);

		var xo = (grid0-this.outerDims[0]*.5)-p.x;
		// var yo = (grid1-this.outerDims[1]*.5)-p.y;
		var yo = p.y-(this.dims[1]*.5)+y - ((axisLength[1]-this.dims[1])*.5) - this.itemMargins[1];
		var zo = Math.min(-400,((1-tri)*-1000));		
		
		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
			'translate3d(' + xo + 'px,' + yo +'px, '+ zo +'px)'
			+' rotateY('+((tRamp*180)-90)+'deg)';
		
		this.e.style.opacity = Math.min(1,((tri*2)-.5));
		
		this.pPos = [x,y];
	}//turntable()

