			
define([],function(){


	var exports = {};

	//===== bezier curve definitions ========

	var waterFallCurve = [
		{x:0,y:0},
		{x:.1,y:.5},
		{x:0,y:.01},
		{x:1,y:0}
	];

	var sunriseCurve = [
		{x:0,y:0},
		{x:.25,y:.50},
		{x:.75,y:.50},
		{x:1,y:0}
	];

	var mountainCurve = [
		{x:0,y:1},
		{x:.25,y:.35},
		{x:.75,y:.35},
		{x:1,y:1}
	];

	var softKnee = [
		{x:0,y:.5},
		{x:.45,y:.5},
		{x:.55,y:.5},
		{x:1,y:.5}
	];


	var enterTheDragonPath = [
		{x:-.1,y:.5},
		{x:.6,y:.5},
		{x:.4,y:.5},
		{x:1.1,y:.5}
	];






	var centerLinearPath = [
		{x:0,y:.5},
		{x:.33,y:.5},
		{x:.66,y:.5},
		{x:1,y:.5}
	];



	var pinterestPath = [
		{x:.5,y:0},
		{x:.5,y:.33},
		{x:.5,y:.66},
		{x:.5,y:1}
	];


	//====== curve helper =======

	function factorCurveBy(cubic,xy){
		var result = [
			{x:cubic[3].x*xy[0],y:cubic[3].y*xy[1]},
			{x:cubic[2].x*xy[0],y:cubic[2].y*xy[1]},
			{x:cubic[1].x*xy[0],y:cubic[1].y*xy[1]},
			{x:cubic[0].x*xy[0],y:cubic[0].y*xy[1]}
		]
		return result;
	}


	//===== bezier projections ========

	function turntable(x,y){

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
	exports.turntable = turntable;







	function enterTheDragon(x,y){

		var curve = enterTheDragonPath;


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
		var zo = Math.max(-800,((tri)*-1000));
		
		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
			'translate3d(' + xo + 'px,' + yo +'px, '+ zo +'px)'
			+' rotateY('+((hRamp*180)-90)+'deg)'
			// +' scale('+(tri*2)+')';
			//+' scale('+Math.min(1,(tri*120)/12)+')';
		
		this.e.style.opacity = Math.min(1,((tri*2)-.5));
		
		this.pPos = [x,y];
	}//enterTheDragon()
	exports.enterTheDragon = enterTheDragon;







	function sunrise(x,y){

		var curve = sunriseCurve;

		var 
			grid0 = this.parent.gridDims[0],
			grid1 = this.parent.gridDims[1],
			tRamp = this.waves.tailRamp,
			hRamp = this.waves.headRamp,
			tri = this.waves.triangle,
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
		var yo = y+this.itemMargins[1]+(grid1-this.outerDims[1]*.5)-p.y;
		
		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, 0)'//
		+' rotateZ('+g*60+'deg)';
		
		this.e.style.opacity = 1;

		this.pPos = [x,y];
	}//sunrise()
	exports.sunrise = sunrise;





	function mountain(x,y){

		var curve = mountainCurve;

		var
			minViewPortSa = 1000,
			grid0 = this.parent.gridDims[0],
			grid1 = this.parent.gridDims[1],
			viewOffset = (grid0>minViewPortSa)?0:(minViewPortSa-grid0)*.5,
			axisLength = this.parent.currentGridContentDims,
			tRamp = this.waves.tailRamp,
			hRamp = this.waves.headRamp,
			tri = this.waves.triangle,
			r,
			xo,//xo=x,//-xoffset, 
			yo;//yo=y;//-yoffset;

		grid0 = Math.max(minViewPortSa,grid0);  //

		var xyFactor = [
			grid0, //Math.max(0,grid0),
			grid1 //Math.max(0,grid1)
		];

		var cubicBezier = factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);

		var xo = (grid0-this.outerDims[0]*.5)-p.x;
		xo = xo -viewOffset;
		// var yo = y+this.itemMargins[1]+(grid1-this.outerDims[1]*.5)-p.y;
		var yo = p.y-(this.dims[1]*.5)+y - ((axisLength[1]-this.dims[1])*.5) - this.itemMargins[1];
		
		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, 0)'//
		+' rotateZ('+g*-60+'deg)';
		
		this.e.style.opacity = 1;

		this.pPos = [x,y];
	}//mountain()
	exports.mountain = mountain;






	var headExpansionPath = [
		{x:0,y:.5},
		{x:.10,y:.5},
		{x:.10,y:.5},
		{x:1,y:.5}
	];


	function headExpansion(x,y){

		var curve = headExpansionPath;

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


		// console.log(axisLength)

		var xyFactor = [
			grid0, //Math.max(0,grid0),
			grid1 //Math.max(0,grid1)
		];

		var cubicBezier = factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);

		var xo = (grid0-this.outerDims[0]*.5)-p.x;
		var yo = p.y-(this.dims[1]*.5)+y - ((axisLength[1]-this.dims[1])*.5) - this.itemMargins[1];
		// var yo = p.y-(this.dims[1]*.5)+y - ((axisLength[1]-(this.dims[1]+this.itemMargins[1]*(this.staticAxisCount+1)))*.5);// - this.itemMargins[1];
		var zo = 0;//Math.max(50,((tri)*100));

		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)'

		var z = 1000000-this.index;
		this.e.style.zIndex = z;

		this.e.style.opacity = 1;

		this.pPos = [x,y];
	}//headExpansion()
	exports.headExpansion = headExpansion;






	function centerLinear(x,y){

		var curve = centerLinearPath;

		var 
		gridDims = this.parent.gridDims,
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
			gridDims[0], //Math.max(0,gridDims[0]),
			gridDims[1] //Math.max(0,gridDims[1])
		];

		var cubicBezier = factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);

		var xo = (gridDims[0]-this.outerDims[0]*.5)-p.x;
		var yo = p.y-(this.dims[1]*.5)+y - ((axisLength[1]-this.dims[1])*.5) - this.itemMargins[1];
		// var yo = p.y-(this.dims[1]*.5)+y - ((axisLength[1]-(this.dims[1]+this.itemMargins[1]*(this.staticAxisCount+1)))*.5);// - this.itemMargins[1];
		var zo = 0;//Math.max(50,((tri)*100));

		this.e.style.webkitTransformOrigin = this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)'

		var z = 1000000-this.index;
		this.e.style.zIndex = z;

		this.e.style.opacity = 1;

		this.pPos = [x,y];
	}//centerLinear()
	exports.centerLinear = centerLinear;






	function pinterest(x,y){

		var curve = pinterestPath;

		var 
		gridDims = this.parent.gridDims,
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
			gridDims[0], //Math.max(0,gridDims[0]),
			gridDims[1] //Math.max(0,gridDims[1])
		];

		var cubicBezier = factorCurveBy(curve,xyFactor);
		
		var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
		var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);

		var xo = p.x-(this.dims[0]*.5)+x - ((axisLength[0]-this.dims[0])*.5);// - this.itemMargins[0]*-1;
		var yo = (gridDims[1]-this.outerDims[1]*.5)-p.y;
		var zo = 0;//Math.max(50,((tri)*100));

		this.e.style.webkitTransformOrigin = this.e.style.MozTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
		'translate3d(' + xo + 'px,' + yo +'px, ' + zo + 'px)'

		var z = 1000000-this.index;
		this.e.style.zIndex = z;

		this.e.style.opacity = 1;

		this.pPos = [x,y];
	}//pinterest()
	exports.pinterest = pinterest;







	// ========= 1:1 projection ========
			
	function xyPlane(x,y) {
	
		var 
			w = this.waves,
			tRamp = w.tailRamp,
			hRamp = w.headRamp,
			tri = w.triangle,
			xo,
			yo;
			
		xo=x;
		yo=y;
		
		this.e.style.webkitTransformOrigin = '50%';
		this.e.style.MozTransformOrigin = '50%';

		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform = 
			'translate3d(' + xo + 'px,' + yo +'px, 0) '

		this.e.style.opacity = 1;//tri;
		this.pPos = [x,y];

	} //xyPlane(x,y)
		
	exports.xyPlane = xyPlane;








	//=========== linear projections ===============

	function xyBumpTaper(x,y) {
	
		var 
		w = this.waves,
		tRamp = w.tailRamp,
		hRamp = w.headRamp,
		tri = w.triangle,
		xo,
		yo;
		
		xo=x;
		yo=y;
		
		//this.e.style.webkitTransformOrigin = '50%';
		
		this.e.style.transform = this.e.style.OTransform = this.e.style.MozTransform = this.e.style.webkitTransform =  
		'translate3d(' + xo + 'px,' + yo +'px, 0) '
			//+'rotateZ('+g*15+'deg)'
			+'scale('+(tri*1+.4)+')';
			
		//this.e.style.opacity = '';//clear opacity setting (if set by other mapping FN);
		this.e.style.opacity = tri;
		this.pPos = [x,y];
			
	} //xyPlane(x,y)				
	exports.xyBumpTaper = xyBumpTaper;

	return exports;


});


