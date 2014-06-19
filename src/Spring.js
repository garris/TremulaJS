define([
	'Easings'
	,'Coil'
	,'Layouts'
],function(
	easings
	,Coil
	,layouts
){


	var Spring = function($target,options,parent){
		this.physicsLoopRAF = null;

		this.options = options;
		this.$e = $target;
		this.e  = $target[0];
		this.parent = parent;
		this.parentParentE = $target.parent();//this.parent.parent.$e[0];

		this.statsCache = {};//workspace node for instance-level data.

		this.onChangePub = options.onChangePub;
		
		this.surfaceMap = function(){};
		this.setSurfaceMap = function(fn){
			this.surfaceMap = fn;
		}
		this.setSurfaceMap(options.surfaceMap);
		
		this.boxCount 				= 0;	//count of data elements
		this.boxes      			= [];	//array of data elements

		this.springLimit 			= options.itemEasingParams.springLimit; //depth of item level movement when itemEasing is enabled

		this.boxAxisLengths 		= [0,0]; //The total H&W axis lengths after evaluating data (including item margin -- but does not include axis margin)
		//this.boxAxisLessScrollMargin	= [0,0]; //The total H&W axis lengths after evaluating data (including item margin -- but does not include axis margin)
		this.trailingEdgeScrollPos 	= null; //this is the scroll value in which the last data element is displayed with it's tail edge at the very end of the visible scroll axis
		
		//used to keep code readable -- used in axisOffset.x & axisOffset.y
		this.scrollAxisOffset 		= options.scrollAxisOffset; //default value (may be modified by this.setScrollAxis())
		this.staticAxisOffset 		= options.staticAxisOffset; //default value (may be modified by this.setScrollAxis())

		
		this.axisOffset 			= [];   
		this.gridDims 				= [];
		
		this.scrollPos 				= 0;
		this.absScrollPos 			= 0;
		

		var lastD 					= 0;
		var lastD_ 					= 0;
		
		this.setScrollPos = function(v,isDelta) {
			this.scrollPos = (isDelta)?this.scrollPos+v:v ;
		}
		
		this.setAbsScrollPos = function(v,isDelta) {
			this.scrollPos = (isDelta)?this.scrollPos+v:this.firstItemPos+v ;
			return this.scrollPos;
		}
		
		this.getScrollViewDim = function(){
			return this.gridDims[this.si];
		}
		this.getScrollDimCenter = function(){
			return this.gridDims[this.si]/2;
		}
		this.getScrollPos = function(){
			return this.scrollPos;
		}
		this.saEventPos = null;
		this.saEventPosProgress = 0;
		
		this.easingPercent = 100;
		this.isEasing=false;
		this.isEasingTo=false;
		this.marginScrollWarp = false;
		
		this.easeToThresh = 2;//px
		
		this.easingProgress     = 0;//time now - easingStartTime
		this.easingStartTime    = 0;//time when easing started
		
		this.schwingBackDuration = 500;
		this.schwingEasingFn = easings.easeOutCubic;
		this.easingDuration     = 1800;//in ms
		this.easeToDuration     = 300;//in ms
		//this.bounceBackDuration = 200;//ms
		this.activeDuration = this.easingDuration;
		
		this.easeToStart            = 0;
		this.easeToEnd              = 0;
		this.easeToDiff             = 0;
		
		this.dMomentum              = 100;
		this.momentum                   = 0;
		this.momentumLimit      = 150;
		
		
		this.mouseWheelReleaseTime = 100;//ms
		
		this.isLooping = (options.isLooping||false);
		
		this.isTouching = false;
		
		this.hasData = false;

		this.isInTailMargin = false;
		this.isInHeadMargin = false;
		this.hasShortGridDimsSi = false;//visual content does not fill scroll axis gridDim
		this.hasMediumGridDimsSi = false;//visual content extends beyond scroll axis gridDim but does not fill scroll axis gridDim plus scroll margin

		this.scrollDirection = 0;
		
		this.itemMargins = options.itemMargins;
		this.itemConstraint     = options.itemConstraint;//staticAxis value
		this.staticAxisCount = options.staticAxisCount;//
							
		this.scrollMarginFactor = 10;//this multiplies the size of the first element used in scroll margin
		this.scrollMargin =[0,0];//should be based on size of first & last element
		this.firstItemPos = 0;//this is probably always tied the the active scroll margin and is equal to the width of the first item

		this.frameCtr = 0;
		this.frameRateLog = [];
		this.frameRate = 0;
		this.lastFrameTime = new Date;
		this.trackFrameRate = function(){
			var sum,now = new Date;
			this.frameRateLog.push(now-this.lastFrameTime);
			
			if(this.frameRateLog.length>100)
				this.frameRateLog.shift();
				
			sum = this.frameRateLog.reduce(function(memo,val){return memo + val})
			this.frameRate = 1000/(sum/100);
			this.lastFrameTime = now;
		}
		
		
		this.lastSPL = 0;//track when the last call to startPhysicsLoop
		this.splReleaseTime = 500;//ms
		
		this.fastScrollThresh = 20;
		//this.isFastScroll = false;
		
		
		this.itemEasing=options.itemEasing;
		this.setItemEasing = function(torf){
			this.itemEasing = (torf)?true:false;
		}
		
		// this.lastOffscreen = null;
		// this.setLastOffScreen = function(o){
		// 	if(o){
		// 		return this.lastOffscreen = o;
		// 	}
		// }
		
		this.isChildEasing = false;

		this.lastSelected = null;
		

		this.getBoxFromIndex = function(i){
			return this.boxes[i];
		}

		this.getLastBoxFromIndex = function(){
			return this.boxes[this.boxes.length-1];
		}
		
		//initalizes / resets the grid per scrollAxis 
		this.setScrollAxis = function(axis){
			
			if(!axis)axis=this.sa;//if we are just refreshing window size then maintin scrollAxis state
		
			this.sa = (axis=='y')?'y':'x';//scrollAxis ['x'|'y']
			this.SA = this.sa.toUpperCase()
			this.sx = (this.sa=='x'); //scrolls X;  true if scrollAxis is X
			this.si = (this.sx)?0:1; //scroll axis index value data_xy_matrix[0|1]
			this.si_ = (!this.sx)?0:1; //scroll axis index value data_xy_matrix[0|1]
			this.saDim = (this.sx)?'width':'height',//scroll axis dimention property
			this.saDim_ = (!this.sx)?'width':'height',//scroll axis dimention property
			
			this.gridDims[0] = this.$e.width();
			this.gridDims[1] = this.$e.height();
			
			//this.staticAxisOffset = this.gridDims[this.si_]/2;//this is currently pinned to middle of the static axis
			//if(!this.sx)//scroll is y-axis
				//this.staticAxisOffset = this.gridDims[this.si_]/2;
			
			this.axisOffset[0] = (this.sx)?this.scrollAxisOffset:this.staticAxisOffset;
			this.axisOffset[1] = (!this.sx)?this.scrollAxisOffset:this.staticAxisOffset;
			
			if(this.scrollPos==undefined) this.scrollPos = 0;//this.gridDims[this.si];
			this.lastScrollPos      = 0;
			this.lastScrollDiff = 0;
			//this.touchMoveTension =1;//coefficient
			
			//bounce margin is the distance you can drag the item list beyond the head or tail of the item list.
			this.bounceMarginDefault = 50;
			this.bounceMargin = this.bounceMarginDefault;//this.gridDims[this.si]*.5;
			
			if(this.trailingEdgeScrollPos)
				this.trailingEdgeScrollPos=this.getTrailingEdgeScrollPos();
			
			//this.page                         = 0;
		}
		
		this.lastUserEvent = {time:new Date,evt:'init'};
		this.tagLastUserEvent = function(evt){
			this.lastUserEvent = {time:new Date,evt:evt};
		}
		
		//this primes easing config
		this.resetEasing();
		//initalize scroll axis params
		this.setScrollAxis(options.scrollAxis);
		

	}//END grid object
	
	Spring.prototype.updateConfig = function(config){
		$.extend(this,config);
		this.resetAllItemConstraints();
		this.setLayout(null,config);
	}


	Spring.prototype.toggleScrollAxis = function(axis){
		this.jumpToScrollProgress(0);
		
		if(!axis){
			axis =(this.sa=='x')?'y':'x';
		}
		this.setScrollAxis(axis);
		this.resetAllItemConstraints();
		
		
		var that=this;
		setTimeout(function(){
				that.setLayout(layouts.basicGridLayout,{axes:that.staticAxisCount});
	//      that.doTransition(basicGridLayout,{axes:2},0,easeOutElastic);
		}, 100)
		
		this.setLayout(layouts.basicGridLayout,{axes:this.staticAxisCount});

		//this.handleGesture({type:'touch'});
		
		//this.oneShotPaint();
	}
	
	Spring.prototype.toggleIsLooping = function(torf){
		if (typeof torf === "undefined") {
			torf = !this.isLooping;
		}
		this.isLooping = torf;
	}

	//evt can be the event object or an integer value (representing the scroll axis event position)
	// this thing sets saEventPos & saEventPosProgress
	
	Spring.prototype.setLastTouchOrigin = function(evt){
		
		//run only if we're doing item-level slinky action
		if(!this.itemEasing)return;
		
		//if we're in the margins don't change anything
		if(this.marginScrollWarp)return;
		
		//if this doensnt have the data we need then no deal.
		if(!evt) return;
		
		//get the scroll axis event position
		var sa = (isNaN(evt))?this.getPageSA_evt(evt):evt;
		
		//relative screen position translated to absolute position
		//var absSa = this.absScrollPos + sa;
		//this.$dbug.append('ABS:'+absSa+'<br>')
		
		var saEventPosProgress = sa/this.gridDims[this.si];
		//update the global value -- this may be moved to a different handler -- here for now.
		this.saEventPos = sa;//  /this.gridDims[this.si];
		this.saEventPosProgress = saEventPosProgress;
		
		
		//ok we're good
		return {saEventPos:sa,saEventPosProgress:saEventPosProgress};
		
	}//END this.setLastTouchOrigin()




	Spring.prototype.getScrollFrame = function(){
		//increment frame counter
		this.frameCtr++;
		
		//flag if we are in an Easing state
		this.isEasing = this.easingProgress < this.activeDuration;
		
		//easeFactor is our cached easing factor -- default is ZERO (no effect)
		var easeFactor = 0;
		
		
		if(this.isEasing){
			//increment easing progress by the amount of time that has passed
			this.easingProgress = new Date() - this.easingStartTime;                    
			easeFactor = easingFn(null,this.easingProgress,0,1,this.activeDuration);//if g_easingProgress == g_activeDuration then there will be no easing effect (i.e. x will be set to x * 1)
			this.easingPercent = Math.min(1,this.easingProgress/this.activeDuration);
		}else{
			//were done so stop calculating
			this.resetEasing();//easingProgress overrides any easeTo requests (if still in progress)
			
			var now = new Date;
			
			//u.log(now - this.lastSPL+' <--> '+this.splReleaseTime)
			
			if(!this.isChildEasing && (now - this.lastSPL) > this.splReleaseTime){
				this.stopPhysicsLoop();
			}
		}
		
		
		
		
		//======we are either in an easeTo transition or we are just having momentum====
		if(this.isEasingTo){
			var m = this.easeToDiff*(1-easeFactor);
			this.setScrollPos(this.easeToEnd - m);
		}else{
			var m = this.momentum*(1-easeFactor);
			if(m!=0)
				this.setScrollPos(this.scrollPos + m);
		}
		
		
		
		
		
		//======margin cases======
		this.isInTailMargin = false;
		this.isInHeadMargin = false;
		
		var D = this.lastScrollPos - this.scrollPos;
		this.lastScrollDiff = D;

		
		//this.isFastScroll = (this.lastScrollDiff>-this.fastScrollThresh && this.lastScrollDiff < this.fastScrollThresh)?false:true;//low speed



		//=====HEAD MARGIN=====
		//if we have scrolled to a position into the leading margin
		if (
					(!this.isLooping && this.scrollPos>this.firstItemPos)
					
			//TODO:  There is one last bug where you can not see a set of data which is longer than the viewable area 
			//but still shorter than the viewable area PLUS scrollMargin X 2.   
			//This can be fixed by working with working with something less crude than this.hasShortGridDimsSi.   
			//This binary property is not enough to handle the long-but-not-long-enough scrollAxis content problem.
			||(this.hasShortGridDimsSi && this.absScrollPos>2) //<--- TODO:  this bit here should kick off it's own block and implement a marginScrollWarp=true state

		){
			this.isInHeadMargin = true;



			//if we are moving deeper into the margin
			if(D < 0){
				
				this.setLastTouchOrigin(0);
				
				this.marginScrollWarp = true;//add tension if we are moving deeper
				
				//shorten the ease time if we are in the middle of a big throw
				if(this.isEasing && this.activeDuration - this.easingProgress > this.easeToDuration){
					this.activeDuration = this.easeToDuration;
				}
				
			}else if(D > 0){
				this.marginScrollWarp = false;//remove tension if we are moving out of the margin
			}

			
			//hit head on the wall point
			if(this.scrollPos>this.bounceMargin+this.firstItemPos){
				this.setScrollPos(this.bounceMargin+this.firstItemPos);
				this.resetEasing();
				//this.marginScrollWarp = false;
			}
			
			//schwing back
			if(!this.isTouching && !this.isEasing){
				this.easeTo(
					this.firstItemPos-1,
					this.schwingBackDuration,//this.easeToDuration
					this.schwingEasingFn
				);//offset 1px because easing has rounding errors
			}
		}//end leading-margin handling
		
		
		
		
		//=====TAIL MARGIN=====
		//if we have scrolled to a position into the trailing margin
		if (!this.isLooping && this.scrollPos<this.trailingEdgeScrollPos){
			this.isInTailMargin = true;
			
			//if we are moving deeper into trailing margin
			if(D > 0){
				
				this.setLastTouchOrigin(this.gridDims[this.si]);
				this.marginScrollWarp = true;//this.isTouching;
				
				//shorten the ease time if we are in the middle of a big throw
				if(this.activeDuration - this.easingProgress > this.easeToDuration){
					this.activeDuration = this.easeToDuration;
				}
			}else if(D < 0){
				this.marginScrollWarp = false;//remove tension if we are moving out of the margin
			}

			//hit tail on the wall point
			if(this.scrollPos<this.trailingEdgeScrollPos-this.bounceMargin){
				this.setScrollPos(this.trailingEdgeScrollPos-this.bounceMargin);
				this.resetEasing();
			}
			
			//schwing back
			if(!this.isTouching && !this.isEasing){
				this.easeTo(
					this.trailingEdgeScrollPos+1,
					this.schwingBackDuration,//this.easeToDuration
					this.schwingEasingFn
				);//offset 1px because easing has rounding errors
			}
			
		}//end trailing margin handling
		
		
		
		//make sure to release tension if we are not in the margin
		if(!this.isInHeadMargin && !this.isInTailMargin)
			this.marginScrollWarp = false;


		
		//warp head or tail margin space if touchMoveTension is active OR if we have less content than we have scroll dim
		if( (this.hasShortGridDimsSi || this.marginScrollWarp) && !this.isEasing){
			var ns;//this is our normalized scroll value

			if((this.hasShortGridDimsSi || this.hasMediumGridDimsSi) && this.absScrollPos>0){
				ns = this.absScrollPos;
			}else if(this.scrollPos>0){
				ns = this.scrollPos-this.firstItemPos;//normalized scroll
			}else{
				ns = -(this.scrollPos-this.trailingEdgeScrollPos);//normalized scroll
			}


			var r = Math.min(1,ns/this.bounceMargin);//percent of bounce margin traveled
			var ez = Math.min(1,easings.easeOutQuart(null,r,0,1,1));
			this.setScrollPos(D*ez,true)
		}
		
		//this.page = -Math.floor(this.scrollPos/this.boxAxisLengths[this.si])-1;//TODO: REMOVE if page number is not needed.

		if(D>0){
			this.scrollDirection=1;
		}else if(D<0){
			this.scrollDirection=-1;
		}else{
			this.scrollDirection=0;
		}
		
		this.lastScrollPos = this.scrollPos;
		
		this.absScrollPos       = -(this.scrollPos - this.firstItemPos);
		this.scrollProgress     = this.absScrollPos/this.absTrailingEdgeScrollPos;
		
		
		this.trackFrameRate();
		
		if(this.onChangePub)this.onChangePub(this)
		
		return this.scrollPos;//warpedScrollPos;
		
	}// getScrollFrame()
	

	Spring.prototype.startPhysicsLoop = function(){
		this.lastSPL = new Date;//track when the last call to startPhysicsLoop
		if(!this.physicsLoopRAF){
			var that = this;
			this.physicsLoopRAF = requestAnimationFrame( function(){that.assignBoxObjects()} );
		}
	}
	
	Spring.prototype.stopPhysicsLoop = function(){
		if(this.physicsLoopRAF){
			cancelAnimationFrame(this.physicsLoopRAF);
			this.physicsLoopRAF = null;
		}
	}

	Spring.prototype.oneShotPaint = function(ev){
		//this.stopPhysicsLoop();
		if(!ev) return;
		
		//TODO:  INSTEAD OF setLastTouchOrigin() we should use outerDims method to get all boxes at the saEventPos
		this.setLastTouchOrigin(ev);//CHANGE THIS !!!
		
		if(this.isEasing){
			this.resetEasing();
		}
		this.startPhysicsLoop();
	}
	
	Spring.prototype.getPageSA_evt = function(evt){
		//u.log(evt)
		if(!evt || !evt.gesture) return null;
		return evt.gesture.center['page'+this.SA];
	}

	Spring.prototype.jumpObjTo = function(p,obj,origin){//object or index of object
		
		this.resetEasing();
		
		if(!obj)obj=0;
		
		if(!isNaN(obj)){obj = this.getBoxFromIndex(obj);}
		
		if(p>this.firstItemPos)
			p=this.firstItemPos;

		if(p<this.trailingEdgeScrollPos)
			p=this.trailingEdgeScrollPos;
		
		//if(!isNaN(origin)){}//if origin is an axis value
		//u.log(origin)
		var oPoint = obj.headPointPos[this.si]+obj.width*.5;
		//this.$dbug.append(oPoint)
		
		//this.setScrollPos(p-oPoint+this.firstItemPos)
		this.setAbsScrollPos(p-oPoint)
		this.startPhysicsLoop();
	}
	
	//@param p = 0..1
	Spring.prototype.jumpToScrollProgress = function(p){
		if(p>1)p=0.999;
		if(p<0)p=0.001;
		//u.log(this.trailingEdgeScrollPos*p)
		//this.jumpObjTo(-this.absTrailingEdgeScrollPos*p)
		this.setAbsScrollPos(-this.absTrailingEdgeScrollPos*p)
		this.startPhysicsLoop();
	}



	Spring.prototype.easeTo = function(p,ms,eFn){
		ms = (ms==undefined)?this.easeToDuration:ms;
		
		if(eFn)
			easingFn = eFn;
		
		//var _p = Math.round(p), _sp = Math.round(this.scrollPos);
		
		if(p>this.firstItemPos)
			p=this.firstItemPos;
		
							
		if(p<this.trailingEdgeScrollPos)
			p=this.trailingEdgeScrollPos;
		
		
		//this.$dbug.html(r);
		this.momentum = 0;
		this.easingPercent = 0;

		this.isEasingTo = true;
		this.activeDuration=ms;
		this.easingStartTime = new Date();
		this.easingProgress=0;
		this.easeToStart = this.scrollPos;
		
		this.easeToEnd = p;
		this.easeToDiff = -1*(this.easeToStart-this.easeToEnd);//distance between start & end
		//if(this.easeToDiff<this.easeToThresh && this.easeToDiff>-this.easeToThresh)
		if(this.easeToDiff<2 && this.easeToDiff>-2)
			return false;

		this.startPhysicsLoop();
	}
	
	Spring.prototype.resetEasing = function(){
		//easingFn = easeInOutCubic;
		easingFn = easings.easeOutCubic;

		this.easingProgress = this.activeDuration;
		this.isEasingTo = false;
		this.isEasing = false;
		this.easeToDiff = 0;
		this.momentum = 0;
		
		
		//this.$dbug.html("resetEasing"+new Date().getMilliseconds())
	}


	Spring.prototype.startEasing = function(m,ev){
		if(m) m=Math.pow(m,3) * 20;

		if(this.isInHeadMargin || this.isInTailMargin){
			return;
		}
		if(m!=undefined)this.momentum = Math.min( Math.max(m,-this.momentumLimit), this.momentumLimit);
		this.isEasing = true;
		this.easingStartTime = new Date();
		this.easingProgress=0;
		this.activeDuration=this.easingDuration;
		
		//this.setLastSelected(this.setLastTouchOrigin(ev));
		
		this.startPhysicsLoop();
	}
	
				
/**
 * Add new data items to the view model. 
 * calls setDimentions() on each object
 * calls setLayout() after all items are processed
 *
 * @method initBoxes
 * @param {object} data - the data to add
 * @param {callback} adapter - a method that is called on each data iteration -- returns slinky formatted data object for each item node
 * @param {boolean} append - passing a true value will append new data to existing data set
 */
 
	Spring.prototype.initBoxes = function(data,adapter,options){
		if(!adapter)adapter=this.options.adapter;

		var LCB = this.options.lastContentBlock;

		//if we are not appending new items to our box list
		//call remove on each item then clear our model array & set boxCount cache to zero
		if(!options){
			$.each(this.boxes,function(i,o){o.remove();})
			this.boxes=[];
			this.boxCount = 0;//cached value of this.boxes.length

			if(LCB)data.splice(0,0,LCB);
		}

		if(!data){
			//you could put something here to update the DOM -- otherwise it will appear as if nothing happened until a DOM event triggers a repaint.
			return;
		};
		
		
		var ptr = this.boxCount;//if we are appending data then ptr = the current starting point of the boxes array
		var c = this.boxCount += data.length;//update our data count end point & cache the value to c for the for loop
		
		//loop through data and create new objects
		for(var i = ptr; i < c; i++){
			var b = new Coil(this);
			
			//each box gets a serial id
			//b.index = i;//this is moved because insert function shuffles the deck in a non-desirable way

			b.setModel(new adapter(data[i-ptr],this));//shim data through the adapter.  We will eventually want to add a DOM template configuration for this as well.

			//the getConstrainedItemDims array scales content to the staticAxis value 
			var scrollAxis_staticAxis_arr = (b.noScaling)?[b.model[this.saDim],b.model[this.saDim_]]:this.getConstrainedItemDims(b);

			b.setDimensions( 
				scrollAxis_staticAxis_arr[this.si],
				scrollAxis_staticAxis_arr[this.si_]
			);//setDimetions() takes w,h -- this is resolved vis-a-vis si & si_

			//updateContent() will initalize the content in the box object
			//subsequent hits to updateContent should update content based on current positioning values
				//b.updateContent() //TODO: this is disabled because we are going to do this after setting layout anyway -- we may want to run this here at some point if there are any interal dependant transformations -- but we dont have that need at this point.
			
			// if(ptr==0)
				// this.setAbsScrollPos(2000);//TODO:   THIS IS JUST A KLUDGE TO ENABLE *SCROLL ON* -- harmless until we see a scroll axis longer than 2000px, that is, assuming you want the stuff to scroll on...
			
			//if this is not the first item AND there is a Last Content Block then *insert* new items OTHERWISE append new items
			if(LCB && i>0){
				this.boxes.splice(-1,0,b);
			}else if(options=="insert"){
				this.boxes.splice(0,0,b);
			}else{
				this.boxes.push(b);
			}
			
			this.e.appendChild(b.e);


		}//END for loop
		this.setLayout(layouts.basicGridLayout,{axes:this.staticAxisCount,isNewSet:(ptr==0)?true:false});
	}//Grid.prototype.initBoxes
	
	Spring.prototype.resetAllItemConstraints = function(){
		var c = this.boxCount;
		
		for (var i = 0; i < c; i++) {
			var b = this.boxes[i];
		
			var scrollAxis_staticAxis_arr = this.getConstrainedItemDims(b);
			
			b.setDimensions( 
				scrollAxis_staticAxis_arr[this.si],
				scrollAxis_staticAxis_arr[this.si_]
			);//setDimetions() takes w,h -- this is resolved vis-a-vis si & si_
		}   
	}
	
	Spring.prototype.getConstrainedItemDims = function(b){
			var 
				staticAxisDim       = this.itemConstraint,                                  //cache the constraint value (for the static axis)
				constraintRatio     = staticAxisDim / b.model[this.saDim_], //how much we will enlarge/reduce the scroll axis to scale 1:1 with our staticAxis constraint
				scrollAxisDim       = b.model[this.saDim]*constraintRatio,  //calculate the scroll axis value
				scrollAxis_staticAxis_arr = [scrollAxisDim,staticAxisDim];//save as relative matrix for setDimentions(w,h)
			return scrollAxis_staticAxis_arr;
	}
	
	Spring.prototype.setLayout = function(layout,options){
		//options=(!options)?{}:options;
		
		//if there are absolutely no layout specs then just bump out of here because we're not ready to draw yet...
		if(!layout && (!this.lastLayoutOptions || !this.lastLayoutOptions.layout)){return};
		if(!options  && (!this.lastLayoutOptions || !this.lastLayoutOptions.options)){return};

		if(!layout)layout = this.lastLayoutOptions.layout;
		if(!options)options = this.lastLayoutOptions.options;
		this.lastLayoutOptions = {layout:layout,options:options};
		
		// var axes = options.axes;

		if(this.layout_cache) delete this.layout_cache;//clean up work files from last time a layout was run. layout.call() will 

		this.hasShortGridDimsSi 	= false;
		this.hasMediumGridDimsSi 	= false;
		this.boxAxisLengths 			= [0,0];//reset this value and reevalutate during layout build
		//this.boxAxisLessScrollMargin 	= [0,0];//reset this too?
		
		var b, c = this.boxCount
		//loop through data and create new objects
		for(var i = 0; i < c; i++){
			b = this.getBoxFromIndex(i);
			b.index=i;//moved here from initBoxes -- doing it here creates a sequential index regardless of calling insert or append.  watch out because index value will dynamicly change. 

			//this.layouts[layout](b,this,axes);
			layout.call(this,b,options);
			
			//we are currently basing scrollMargin on the first item h or w (per si)
			//if this is the first item then we should get the calculated values for h,w and position
			if(i==0){
				this.scrollMargin =[-b.width*this.si_*this.scrollMarginFactor,-b.height*this.si*this.scrollMarginFactor];//should be based on size of first & last element
				this.firstItemPos = (this.sx)?b.width*this.scrollMarginFactor:b.height*this.scrollMarginFactor;//this is probably always tied the the active scroll margin and is equal to the width of the first item
				this.bounceMargin = this.firstItemPos + this.bounceMarginDefault;
			}
			
		}//END for loop
		if(!b){
			this.hasData = false;
			if(console && console.error){console.error('slinky: no data found')}
			return
		}else{
			this.hasData = true;
		}

		//update boxAxisLengths[]
		//NOTE: the tail point values are equal to the start value plus the object dims plus margin. See Layouts.js for setting method
		if(this.boxAxisLengths[0]<b.tailPointPos[0])this.boxAxisLengths[0]=b.tailPointPos[0];
		if(this.boxAxisLengths[1]<b.tailPointPos[1])this.boxAxisLengths[1]=b.tailPointPos[1];
		
		var scrollAxisAndMargin = -2*parseInt(this.scrollMargin);
		var gridDimsSiPlusScrollMargin = this.gridDims[this.si]+scrollAxisAndMargin;
		//var gridDimsSiPlusFirstItemPos = this.gridDims[this.si]+this.firstItemPos;


		if(this.boxAxisLengths[this.si]<this.gridDims[this.si]){
			this.hasShortGridDimsSi = true;
		}
		
		//run short list compensation test before trailingEdgeScrollPos assignment if hasShortGridDimsSi
		//HACK WARNING:  this.boxAxisLengths[this.si] will have a different value if hasShortGridDimsSi is true
		if(this.hasShortGridDimsSi && this.boxAxisLengths[this.si]<gridDimsSiPlusScrollMargin){
			this.boxAxisLengths[this.si]=gridDimsSiPlusScrollMargin;
		}

		//cache the location of the trailing edge of the stream
		this.trailingEdgeScrollPos = -(this.scrollAxisOffset)+ Math.min(this.gridDims[this.si],this.getTrailingEdgeScrollPos());
		this.absTrailingEdgeScrollPos = this.firstItemPos - this.trailingEdgeScrollPos;

		//run medium list compansation test after trailingEdgeScrollPos assignment if hasShortGridDimsSi
		if(!this.hasShortGridDimsSi && (this.boxAxisLengths[this.si]<gridDimsSiPlusScrollMargin)){
			
			//if(this.boxAxisLengths[this.si]<this.gridDims[this.si]){
				this.hasMediumGridDimsSi = true;
			//}
			
			this.boxAxisLengths[this.si]=gridDimsSiPlusScrollMargin;
		}

		//set scroll to top if this is a new set of items
		if(options.isNewSet)
			this.setAbsScrollPos(1);

		this.oneShotPaint(1);
	}//setLayout()
	
	
	
	
	

	Spring.prototype.doTransition = function(layout,options,ms,easing,surfaceMap){
		options=(!options)?{}:options;
		// var axes = options.axes;
		
		if(isNaN(ms))ms=0;
		
		this.layoutXansEasing = easing || easeOutElastic;
		this.layoutXansMs = ms;//TODO: document& init this
		this.layoutIsXing = (ms>0)?true:false;//TODO: document& init this
		
		var that = this
		//if(this.ltTimer){clearTimeout(this.ltTimer);}//todo: get this going too...
		this.ltTimer = setTimeout(function(){
			that.layoutIsXing = false;
			that.ltTimer = null;
		}, ms+100)//TODO: document& init this
		
		this.setLayout(layout,options);
		
		if(surfaceMap)
			this.setSurfaceMap(surfaceMap)
		
		//oneShotPaint(value) value is the axis position (i.e. the origin or where the touch event would be) of the transition event. NOTE: zero doesn't work
		this.oneShotPaint(1);//this.getScrollDimCenter()
	}



	

	Spring.prototype.getTrailingEdgeScrollPos = function(){
		//cache the location of the trailing edge of the stream
		return -this.boxAxisLengths[this.si]+this.firstItemPos+this.gridDims[this.si];
	}
	


	Spring.prototype.assignBoxObjects = function(){
		function isOnFirstPage(b) {
			return ( b[this.sa] >= sMargin[si] && b[this.sa] <= (this.boxAxisLengths[si] + sMargin[si]) )?true:false;
		}
			
		function isInViewport(b) {
			return (
				soop[si] >= -(sMargin[0]+b.width+this.itemMargins[si]*2) && soop[si] <= (this.gridDims[si] - sMargin[si])
			)?true:false;
		}
		
		function invertNegSwing(x){
			if(x>=0) return x;
			return Math.abs( this.boxAxisLengths[si]+x );
		}
			
		var
			isChildEasing_l 	= false,
			that 				= this, //used for this.physicsLoopRAF call
			m 					= this.getScrollFrame(),
			si 					= this.si,
			si_ 				= this.si_,
			soo 				= [0,0], //scroll ordinal offset x/y matrix
			soop 				= [0,0], //scroll ordinal offset x/y matrix *OFFSET FOR PAINTING* This maps each "page" onto the current gridDims[this.sa]
			sMargin 			= this.scrollMargin; //scrollMargin extends viewport bounds so that object redraws and repositions happen offscreen
	
		for(var i = 0; i < this.boxCount; i++){

			var b = this.boxes[i];
			
			//calculate the active axis value
			soo[si] = b.headPointPos[si] + m;
			//calculate the static axis value
			soo[si_] = b.headPointPos[si_];
			
			//update the active & static axis values in the target obj
			b.setAbsPos(this.axisOffset[0] + soo[0], this.axisOffset[1] + soo[1]);
			
			//CALCULATE SCREEN POSITION
			//offset the scrollAxis by MOD of total length of the box objects.  origin value passthrough for non-scroll axis
			soop[0] = (this.sx)? b.x % this.boxAxisLengths[0] :b.x;
			soop[1] = (!this.sx)? b.y % this.boxAxisLengths[1] :b.y;
			
			//handle scrollAxis negativity in a positive context
			soop[si] = invertNegSwing.call(this,soop[si]);

			var itemPlusMarginDim = soop[si]+sMargin[si]+(b.dims[si]*.5)+this.itemMargins[si];
			var tailRamp = itemPlusMarginDim/this.gridDims[si];
			var headRamp = 1-tailRamp;
			var triangle = 2*((tailRamp<.5)?tailRamp:headRamp);
			//set DOM position
			if(
				isInViewport.call(this,b) 
				&& (this.isLooping || isOnFirstPage.call(this,b))
			){
				b.doOnScreen(true);
				b.setWaveforms({
					tailRamp:tailRamp,
					headRamp:headRamp,
					triangle:triangle
				});
				b.paintToSurfaceMap( soop[0]+sMargin[0], soop[1]+sMargin[1]);
				//b.updateContent();//this would ping the box object to update it's display based on current updated info
				//this.$dbug.append('--->');
			}else {
				b.doOnScreen(false);
				
				b.setWaveforms({
					tailRamp:false,
					headRamp:false,
					triangle:false
				});
			}
			

			//if this guy is still easing then let us know.
			if(b.isEasing)isChildEasing_l=true;//&&b.isOnScreen


			//this prevents item wrap around by determining is an object has scrolled off the page
			

		} // for this.boxCount
		
		this.isChildEasing = (isChildEasing_l)?true:false;
		
		
		//if the this.physicsLoopRAF is running -- then call it again
		if(this.physicsLoopRAF!==null){
			this.physicsLoopRAF = requestAnimationFrame( function(){that.assignBoxObjects()} );
		}
		
	}//Spring.prototype.assignBoxObjects
	
	


	var 
		mwEventsDetected = false,
		lastMwTime = new Date(),
		lastMahTime = new Date(),
		lastMoveAxisHold = '',
		fingeredOffset = 0,
		fingeredOffset_ = 0,
		lastD = 0,
		lastD_ = 0;
		
	//var touchHemisphere;//-1 if touching start in left field, +1 if in right field 

	function _mw(evt) {
		var that=this;
		
		lastMwTime = new Date();
		if(!mwEventsDetected){
			mwEventsDetected = true;
			var mwCheck = setInterval(function(){
				var now = new Date();
				
				if(now-lastMwTime>100){
					mwEventsDetected = false;
					//that.isTouching=false;
					//that.oneShotPaint();
					that.handleGesture({type:'release'})
					clearInterval(mwCheck);
				}
			},65)//mwCheck setInterval()
		}//!mwEventsDetected
	}//_mw()


	Spring.prototype.handleGesture = function(ev){

		if(window.isDragging) return;
		
		switch(ev.type) {

			case 'mousewheel':
			case 'DOMMouseScroll':
			case 'wheel':
				_mw.call(this,ev);
				//dont break here -- keep evaluation...
				
			case '_mw': //map events over for processing by dragleft

				var wheelEvent = ev.originalEvent;
				var //wheel events for webkit|| new moz || old moz
					dy = wheelEvent.wheelDeltaY*.5||-wheelEvent.deltaY||-wheelEvent.detail*3,
					dx = wheelEvent.wheelDeltaX*.5||-wheelEvent.deltaX||-wheelEvent.detail*3;

				var nextScrollPos = this.scrollPos + (this.sx)?dx:dy;
				var maxScroll = this.trailingEdgeScrollPos;
				var isNextHM = !this.hasMediumGridDimsSi && nextScrollPos>this.firstItemPos;
				var isNextFM = !this.hasMediumGridDimsSi && nextScrollPos<maxScroll;
				
				//add scroll tension if looping is OFF and the very next tick is going to put us beyound the first item or the last item
				if(!this.isLooping && (isNextHM||isNextFM)){
					if(this.sx){
						dx=Math.min(dx*.1,100);
					}else{
						dy=Math.min(dy*.1,100);
					}
				}
				
				ev.gesture                  = ev.gesture || {};
				ev.gesture.deltaX           = dx;
				ev.gesture.deltaY           = dy;
				ev.gesture.center           = ev.gesture.center || {};
				ev.gesture.center.pageX = ev.originalEvent.pageX;
				ev.gesture.center.pageY = ev.originalEvent.pageY;
				//fingeredOffset = this.scrollPos; moved below...
				
				
			case 'dragup':
			case 'dragdown':
			case 'dragright':
			case 'dragleft':

				this.isTouching=true;
				
				//incase we are at the begining of a touch event or incase this is a fallthrough WheelEvent
				if(fingeredOffset==0 || ev.originalEvent){
					fingeredOffset = this.scrollPos;
					lastD = 0;
				}
				//incase we are at the begining of a touch event or incase this is a fallthrough WheelEvent
				if(fingeredOffset_==0 || ev.originalEvent){
					fingeredOffset_ = this.parentParentE.scrollTop;
					lastD_ = 0;
				}
				
				var D = (this.sx)?ev.gesture.deltaX:ev.gesture.deltaY;
				var D_ = (!this.sx)?ev.gesture.deltaX:ev.gesture.deltaY;

				//if we are scrolling along the scrollaxis
				if(Math.abs(D)>Math.abs(D_)){
					this.setScrollPos( D-lastD, true );
					lastD = D;
					this.oneShotPaint(ev);
				}else{
					//if we are scrolling orthogonal to the scrollAxis
					var D_scroll = this.parentParentE.scrollTop;
					this.parentParentE.scrollTop(D_scroll-(D_-lastD_));
					lastD_ = D_;
				}


				//var D = ev.gesture.deltaX+ev.gesture.deltaY;
				
				

				this.tagLastUserEvent(ev);
				break;
				
			case 'swipeleft':
				if(!this.sx){return}
				ev.gesture.stopDetect();
				this.isTouching=false;
				//var m = this.momentum = -this.dMomentum;
				var m = -ev.gesture.velocityX;
				this.startEasing(m,ev)

				this.tagLastUserEvent(ev);
				break;

			case 'swiperight':
				if(!this.sx){return}
				ev.gesture.stopDetect();
				this.isTouching=false;
				//var m = this.momentum = this.dMomentum;
				var m = ev.gesture.velocityX;
				this.startEasing(m,ev)

				this.tagLastUserEvent(ev);
				break;
				
			case 'swipeup':
				if(this.sx){return}
				ev.gesture.stopDetect();
				this.isTouching=false;
				//var m = this.momentum = -this.dMomentum;
				var m = -ev.gesture.velocityY;
				this.startEasing(m,ev)

				this.tagLastUserEvent(ev);
				break;

			case 'swipedown':
				if(this.sx){return}
				ev.gesture.stopDetect();
				this.isTouching=false;
				//var m = this.momentum = this.dMomentum;
				var m = ev.gesture.velocityY;
				this.startEasing(m,ev)

				this.tagLastUserEvent(ev);
				break;
		
			case 'touch':
				//u.log('touch: '+new Date().getMilliseconds())
				fingeredOffset = 0;
				fingeredOffset_ = 0;
				this.isTouching=true;
				
				this.oneShotPaint(ev);

				this.tagLastUserEvent(ev);
				break;
				
				
			case 'release':
				//u.log('release: '+new Date().getMilliseconds())

				//test for last event being a touch AND being OVER x ms ago.  Also make sure we're not in the middle of easing.
				var lastTouchMs = new Date() - this.lastUserEvent.time;
				if(!this.isEasing && this.lastUserEvent.evt.type == 'touch' && lastTouchMs < 1000){
					this.$e.trigger('slinkyItemSelect',ev);
				}



				this.isTouching=false;
				this.oneShotPaint();

				this.tagLastUserEvent(ev);
				break;                  
				
		}//switch
	}//handleGesture



	return Spring

});









