
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



	function horizontalStepped(x,y){

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

		// tri = Math.min(.9,tri);
		
		
		var xyFactor = [
			grid0,
			grid1
		];

		var cubicBezier = jsBezier.factorCurveBy(curve,xyFactor);

		var p = jsBezier.pointOnCurve(cubicBezier, tRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, tRamp);

		// var xo = p.x - (this.dims[0]*.5);
		var xo = x+16;

		// var yo = grid1 - p.y - (this.dims[1]*.5) - (((axisLength[1]-this.dims[1])*.5) - y - this.itemMargins[1]);
		var yo = (grid1*.5) - (p.y*0) - (this.dims[1]*.5) - (((axisLength[1]-this.dims[1])*.5) - (y*0) - this.itemMargins[1]);

		var zo = 0;//(tri)*.5;

		// if(this.index==0)console.log(tri)

		this.e.style.transformOrigin = this.e.style.webkitTransformOrigin = this.e.style.MozTransformOrigin = '50%';

		this.e.style.transform = this.e.style.MozTransform = this.e.style.webkitTransform = 
			'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)';
			//+' rotateY('+((tRamp*.7*90)-30)+'deg)';


		// var z = 10000-this.index;
		var z = 10000-this.index;
		this.e.style.zIndex = Math.abs(Math.floor(tri*100));
		this.e.style.opacity = 1;//Math.max(tri,.5);
		this.e.style.webkitBoxShadow = '0 0 10px rgba(0,0,0,'+Math.min(tri,.3)+')';

		this.pPos = [x,y];
	}


//==============

	function horizontalPop(x,y){

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

		tri = Math.min(.9,tri);
		
		
		var xyFactor = [
			grid0,
			grid1
		];

		var cubicBezier = jsBezier.factorCurveBy(curve,xyFactor);

		var p = jsBezier.pointOnCurve(cubicBezier, tRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, tRamp);

		// var xo = p.x - (this.dims[0]*.5);
		var xo = x+16;

		// var yo = grid1 - p.y - (this.dims[1]*.5) - (((axisLength[1]-this.dims[1])*.5) - y - this.itemMargins[1]);
		var yo = (grid1*.5) - (p.y*0) - (this.dims[1]*.5) - (((axisLength[1]-this.dims[1])*.5) - (y*0) - this.itemMargins[1]);

		var zo = (tri*100)*(tri*10)*.5;

		// if(this.index==0)console.log(tri)

		this.e.style.transformOrigin = this.e.style.webkitTransformOrigin = this.e.style.MozTransformOrigin = '50%';

		this.e.style.transform = this.e.style.MozTransform = this.e.style.webkitTransform = 
			'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)';
			//+' rotateY('+((tRamp*.7*90)-30)+'deg)';


		// var z = 10000-this.index;
		var z = 10000-this.index;
		this.e.style.zIndex = Math.abs(Math.floor(tri*100));
		this.e.style.opacity = 1;//Math.max(tri,.5);
		this.e.style.webkitBoxShadow = '0 0 10px rgba(0,0,0,'+Math.min(tri,.3)+')';

		this.pPos = [x,y];
	}

// ========= carousel with bump =================




		var softKnee = [
			{x:0,y:.5},
			{x:.45,y:.5},
			{x:.55,y:.5},
			{x:1,y:.5}
		];

	function carouselWithPop(x,y){


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
			
		var cubicBezier = jsBezier.factorCurveBy(curve,xyFactor);
			
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);

		var xo = (grid0-this.outerDims[0]*.5)-p.x+10;
		// var yo = (grid1-this.outerDims[1]*.5)-p.y;

		var yo = p.y-(this.dims[1]*.5)+y - ((axisLength[1]-this.dims[1])*.5) - this.itemMargins[1];
		var zo = Math.min(-200,((1-tri)*-2000))+500;
		
		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
			'translate3d(' + xo + 'px,' + yo +'px, '+ zo +'px)'
			+' rotateY('+((tRamp*180)-96)+'deg)';
		
		this.e.style.opacity = Math.min(1,((tri*2)-.5));
		
		var z = 10000-this.index;
		this.e.style.zIndex = Math.abs(Math.floor(tri*100));

		this.e.style.webkitBoxShadow = '0 0 20px -3px rgba(0,0,0,'+Math.min(tri,.6)+')';


		this.pPos = [x,y];
	}//turntable()

	








// ========= thumbRollerDial =================


	var thumbRollerDialPath = [
		{x:0,y:0},				//p0
		{x:0,y:1},	//p1
		{x:1,y:0},	//p2
		{x:1,y:1} 				//p3
	];
	function thumbRollerDial(x,y){

		var curve = thumbRollerDialPath;

		var 
		count = this.parent.staticAxisCount+1,

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


		// console.log(axisLength)

		var xyFactor = [
			grid0,
			grid1
		];

		var cubicBezier = jsBezier.factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		// var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);
		// var gExt = (g<0)?156+(156+g*100):g*100;
		var gExt = tRamp * 90 -45;

		// var xo = grid0 - p.x - (this.dims[0]*.5) - (((axisLength[0]-this.dims[0])*.5) - x - this.itemMargins[0]);
		var zo = grid0 - p.x - (this.dims[0]*.5) - (((axisLength[0]-this.dims[0])*.5) - x - this.itemMargins[0]);
		var yo = (grid1-this.outerDims[1]*.5)-p.y;
		var xo = grid0*.5-this.dims[0]*.5;
// if(this.index==3)console.log(gExt)

		this.e.style.webkitTransformOrigin = this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)'
		//+' rotateX('+(gExt)+'deg)';

		var z = 1000000-this.index;
		this.e.style.zIndex = z;

		this.e.style.opacity = 1;//Math.min(1,zo*zo*0.00007);

		this.pPos = [x,y];
	}//thumbRollerDial()







// ========= twelveToSix =================


	var twelveToSixPath = [
		//soft arc 12to6
		{x:1,y:0},				//p0
		{x:0.75,y:0.25},	//p1
		{x:0.75,y:0.75},	//p2
		{x:1,y:1} 				//p3


		//hard arc 12to6
		// {x:1,y:0},//p0
		// {x:0,y:0},//p1
		// {x:0,y:1},//p2
		// {x:1,y:1} //p3
	];


	function twelveToSix(x,y){

		var curve = twelveToSixPath;

		var 
		count = this.parent.staticAxisCount+1,

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


		// console.log(axisLength)

		var xyFactor = [
			grid0,
			grid1
		];

		var cubicBezier = jsBezier.factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		// var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);
		// var gExt = (g<0)?156+(156+g*100):g*100;
		var gExt = tRamp * 90 -45;
// if(this.index==3)console.log(gExt)

		var xo = grid0 - p.x - (this.dims[0]*.5) - (((axisLength[0]-this.dims[0])*.5) - x - this.itemMargins[0]);
		var yo = (grid1-this.outerDims[1]*.5)-p.y;
		var zo = 0;

		this.e.style.webkitTransformOrigin = this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)'
		+' rotateZ('+(gExt)+'deg)';

		var z = 1000000-this.index;
		this.e.style.zIndex = z;

		this.e.style.opacity = 1;//Math.min(1,zo*zo*0.00007);

		this.pPos = [x,y];
	}//thumbRollerDial()









// ========= sixToTwelvePath =================

	var sixToTwelvePath = [
		//soft arc 12to6
		{x:0,y:0},				//p0
		{x:0.25,y:0.25},	//p1
		{x:0.25,y:0.75},	//p2
		{x:0,y:1} 				//p3

	];
	function sixToTwelve(x,y){

		var curve = sixToTwelvePath;

		var 
		count = this.parent.staticAxisCount+1,

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


		// console.log(axisLength)

		var xyFactor = [
			grid0,
			grid1
		];

		var cubicBezier = jsBezier.factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		// var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);
		// var gExt = (g<0)?156+(156+g*100):g*100;
		var gExt = hRamp * 90 -45;
// if(this.index==3)console.log(gExt)

		var xo = grid0 - p.x - (this.dims[0]*.5) - (((axisLength[0]-this.dims[0])*.5) - x - this.itemMargins[0]);
		var yo = (grid1-this.outerDims[1]*.5)-p.y;
		var zo = 0;

		this.e.style.webkitTransformOrigin = this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)'
		+' rotateZ('+(gExt)+'deg)';

		var z = 1000000-this.index;
		this.e.style.zIndex = z;

		this.e.style.opacity = 1;//Math.min(1,zo*zo*0.00007);

		this.pPos = [x,y];
	}//sixToTwelvePath()





	






	//===== mountain with bump ========




	function mountainPop(x,y){


		var mountainCurve = [
			{x:0,y:.90},
			{x:.33,y:.40},
			{x:.66,y:.40},
			{x:1,y:.90}
		];
		var
			minViewPortSa = 1000,
			grid0 = this.parent.gridDims[0],
			grid1 = this.parent.gridDims[1],
			// viewOffset = grid0+10,//(grid0>minViewPortSa)?0:(minViewPortSa-grid0)*.5,
			axisLength = this.parent.currentGridContentDims,
			tRamp = this.waves.tailRamp,
			hRamp = this.waves.headRamp,
			tri = this.waves.triangle,
			r,
			xo,//xo=x,//-xoffset, 
			yo;//yo=y;//-yoffset;

		//compensation vvvvv
		//grid0 = Math.max(minViewPortSa,grid0);
		// grid0=grid0+viewOffset

		var xyFactor = [
			grid0, //Math.max(0,grid0),
			grid1 //Math.max(0,grid1)
		];

		//var curve = (grid0<minViewPortSa)?(grid0<641)?sunriseCurvePhone:mountainCurve;
		var curve = mountainCurve;
		var cubicBezier = jsBezier.factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);

		var xo = (grid0-this.outerDims[0]*.5)-p.x+30;

		//compensation vvvvv
		// xo = xo -viewOffset;

		var yo = p.y-(this.dims[1]*.5)+y - ((axisLength[1]-this.dims[1])*.5) - this.itemMargins[1];

		var zo = (tri*100)*(tri*10)*.5;

		this.e.style.transformOrigin = this.e.style.webkitTransformOrigin = this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)'
		+' rotateZ('+(-g*60+1)+'deg)';
		
		this.e.style.opacity = 1;

		var z = 10000-this.index;
		this.e.style.zIndex = Math.abs(Math.floor(tri*100));

		this.e.style.webkitBoxShadow = '0 0 20px rgba(0,0,0,'+Math.min(tri,.5)+')';

		this.pPos = [x,y];
	}//mountain()

