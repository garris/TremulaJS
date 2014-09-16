
	//====================
	// Below is a custom Projection template which allows you to specify your own bezier path
	// To use, modify the above configuration @ surfaceMap -->  surfaceMap : userProjection,

	//EXPERIMENTAL! Generally, this works, But it's not particularly tested. Some paths may not work as expected.
	//Please file bugs to https://github.com/garris/TremulaJS/issues


	var userPath = [
		{x:.1,y:0},
		{x:0,y:1},
		{x:1,y:1},
		{x:.9,y:0}
	];



	function userProjection(x,y){

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

		var xo = p.x - (this.dims[0]*.5);

		var yo = grid1 - p.y - (this.dims[1]*.5) - (((axisLength[1]-this.dims[1])*.5) - y - this.itemMargins[1]);

		var zo = 0;

		this.e.style.transformOrigin = this.e.style.webkitTransformOrigin = this.e.style.MozTransformOrigin = '50%';

		this.e.style.transform = this.e.style.MozTransform = this.e.style.webkitTransform = 'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)'

		var z = 10000-this.index;
		this.e.style.zIndex = z;

		this.e.style.opacity = 1;

		this.pPos = [x,y];
	}

