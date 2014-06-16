			
define({

	xyPlane : function xyPlane(x,y) {
				
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
					
					this.e.style.webkitTransform = 
						'translate3d(' + xo + 'px,' + yo +'px, 0) '
						//+'rotateZ('+g*15+'deg)'
						//+'scale('+(tRamp*2+.4)+')';
					
					this.e.style.opacity = 1;//tri;
					this.pPos = [x,y];
						
				}, //xyPlane(x,y)
				




			xyzBezier_1 : function xyzBezier_1(x,y){
					
					function factorCurveBy(cubic,xy){
						var result = [
							{x:cubic[0].x*xy[0],y:cubic[0].y*xy[1]},
							{x:cubic[1].x*xy[0],y:cubic[1].y*xy[1]},
							{x:cubic[2].x*xy[0],y:cubic[2].y*xy[1]},
							{x:cubic[3].x*xy[0],y:cubic[3].y*xy[1]}
						]
						return result;
					}
					
					//var xoffset = box.width / 2;
					//var yoffset = box.height / 2;
					var 
						tRamp = this.waves.tailRamp,
						hRamp = this.waves.headRamp,
						tri = this.waves.triangle,
						//s = 1,
						r,
						xo,//xo=x,//-xoffset, 
						yo;//yo=y;//-yoffset;

					var xyFactor = [
						Math.max(500,this.parent.gridDims[0]),
						Math.max(1000,this.parent.gridDims[1])
					];
					
					var waterFallCurve = [
						{x:0,y:0},
						{x:.1,y:.5},
						{x:0,y:.01},
						{x:1,y:0}
					];
					
					var cubicBezier = factorCurveBy(waterFallCurve,xyFactor);
					
					
					
					var p = jsBezier.pointOnCurve(cubicBezier, hRamp);
					var g = jsBezier.gradientAtPoint(cubicBezier, hRamp);
					//u.log(p);
					xo = p.x;
					yo = p.y+y;


					//this.e.style.webkitTransform = 'translate3d(' + xo + 'px,' + yo +'px, 0)';
					//this.e.style.left = xo + 'px';
					//this.e.style.top = yo + 'px';
					
					//yo+= this.waves.triangle*100
					//s = Math.max(this.waves.triangle*2,1)
					//xo = x;
					//xo = 500+hRamp*-500;
					//xo = 200+hRamp*-200;
					//r = 50*tRamp;
					//xo=x;
					//yo=y;
					
					
					this.e.style.webkitTransformOrigin = '50%';
					
					this.e.style.webkitTransform = 
						'translate3d(' + xo + 'px,' + yo +'px, 0) '
						+'rotateZ('+g*15+'deg)'
						+'scale('+(tRamp*2+.4)+')';
					
					this.e.style.opacity = tri;
					
					this.pPos = [x,y];
				}//xyzBezier_1()
				
				
				
				


});


