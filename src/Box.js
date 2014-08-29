define([
	'Easings'
	,'Animator'
],function(
	easings
	,Animator
){
    //var Draggable = draggable.Draggable;
    

	var Box = function (grid) {
		
		this.parent = grid;
		var that = this;
		
		this.ezEnabled = function(){return this.parent.itemEasing;}
		this.ezOptions = this.parent.options.itemEasingParams;
		this.doPreloading = this.parent.options.itemPreloading;
		this.getlayoutXansEasing = function(){return this.parent.layoutXansEasing;}
		this.getLayoutIsXing = function(){return this.parent.layoutIsXing;}
		this.getLayoutXingMs = function(){return this.parent.layoutXansMs;}
		this.springLimit = this.parent.springLimit;
		this.itemMargins = this.parent.itemMargins;
		//this.staticAxisCount = this.parent.staticAxisCount;
		//this.setSurfaceMap(this.parent.options.surfaceMap);
		//this.surfaceMap = this.parent.surfaceMap;

		this.index=null;//will be set by Grid.js

		this.x = this.y = 0;//init these -- incase needed prior to first stashPosition() 
		this.dims = [0,0];
		this.outerDims = [0,0];
		
		this.staticAxis = 0;
		this.headPointPos = [0,0];
		this.tailPointPos = [0,0];
		this.pPos = [0,0];//paint position
		this.prevObj = null;
		this.nextObj = null;
		
		this.targetPaintPos = [0,0];
		this.currentPaintPos = [0,0];
		this.targetXY   = [0,0];
		this.currentXY  = [0,0];
		this.sizeRatio = 0;
		this.displayClass   = '';
		
		this.isOnScreen = false;
		this.isLoaded = false;
		this.hasEntered = false;

		//this.contentObj = {};//init to {}
		this.ani_si = new Animator({easingCurve:easings.easeOutCubic,parent:this});
		this.ani_si_= new Animator({easingCurve:easings.easeOutCubic,parent:this});                 
		

		this.element = this.e = document.createElement('div');
		// this.element = this.e;
		this.$e = $(this.e);
		// this.element.classList.add("Box");
		this.element.classList.add("gridBox");
		this.e.style.display='none';

	  // if(this.Draggable)
	  //   this.draggable = new this.Draggable(this);//see:onDragConfigure() for options
                    

	
		this.model = {};
		
		this.setModel = function(obj) {

			//set data model reference
			this.model = obj;
			//this.model = JSON.parse(JSON.stringify(obj));//lifting ground is necessary to avoid pollution from getNextJudyItem & getPrevJudyItem when used in other modules
			
			// to support next and previous on ItemView Data
			
			this.model.data.getNextJudyItem = function(){
				var o = grid.getBoxFromIndex(that.index+1);
				if(o&&o.model)o=o.model.data;
				return o;
			}

			this.model.data.getPrevJudyItem = function(){
				var o = grid.getBoxFromIndex(that.index-1);
				if(o&&o.model)o=o.model.data;
				return o;
			}



			//set local display properties with defaults for missing nodes 
			this.layoutType = obj.layoutType || 'tremulaInLine';
			this.noScaling = obj.noScaling || false;

			//set DOM template and references ==> currently no support for template change -- because dom references seem to break...
			if(this.e.innerHTML.trim()==''){
				if(this.model.template){
					this.e.innerHTML = this.model.template;
				}else{
					this.e.innerHTML = '<div class="boxLabel">X</div><img draggable="false" class="moneyShot" onload="imageLoaded(this)" src=""/>';
				}
				this.$moneyShot = $('.moneyShot',this.$e);
				this.$c = $('.boxLabel',this.e);
			}

			//add a hook for resolving data via $e
			this.$e.data('model',this);

			//set local DOM classes 
			if(obj.auxClassList)this.$e.addClass(obj.auxClassList);
			if(obj.isLastContentBlock)this.$e.addClass('isLastContentBlock');
			if(obj.isFavorite){this.$e.addClass('isFavorite');}else{this.$e.removeClass('isFavorite');}

		}

		//grid.e.appendChild(this.e); 


	};// Box
	



                
	Box.prototype.updateContent = function(){
		if(this.$c.length){
			//push mapped index value into DOM
			this.$c.html( 
				this.index
				//+ "<br/>" + Math.round(this.currentXY[0])+':'+Math.round(this.targetXY[0])
				//+ "<br/>" + Math.round(this.x)+':'+Math.round(this.y)
				//+ "<br/>diff: " + Math.round(b.easeToDiff)
				//+ "<br/>" + Math.round(this.sizeRatio*1000)/1000
				//+ "<br/>" + this.isOnSaEvt
				//+ "<br/>" + this.saEvtDistPercent
				+ "<br/>" + this.waves.headRamp.toFixed(3)

				//+ "<br/>" + this.displayClass 
				
			);
			//this.$dbug.append("====>");
		}
	}//end updateContent()
	
	Box.prototype.setDimensions = function( w, h ) {
		this.e.style.width = w + 'px';
		this.e.style.height = h + 'px';
		this.dims[0] = this.width = this.w = w;
		this.dims[1] = this.height = this.h = h;
		this.sizeRatio = h/w;
		this.displayClass = this.getDisplayClass(this.sizeRatio);
		// this.$moneyShot.css({'width':this.w,'height':this.h})
	}
	
	Box.prototype.getDisplayClass = function(ratio){
		if(ratio > 1.1){
			return 'portrait';
		}else if(ratio < .9){
			return 'landscape';
		}else{
			return 'square';
		}
	}
	
	Box.prototype.paintToSurfaceMap = function(x,y){
		this.parent.surfaceMap.call(this,x,y);
	};
	
	Box.prototype.remove = function() {
		this.parent.e.removeChild( this.e );
	}

	Box.prototype.doOnScreen = function(torf) {
		if(torf!=undefined && this.isOnScreen !== torf){
			this.isOnScreen=torf;
			if(torf && !this.isLoaded)this.$moneyShot.attr('src',this.model.imgUrl);
			var c = this.e.classList, d = this.e.style.display;
			if(torf){
				if(!this.hasEntered){
					this.hasEntered = true;//this flag should only flips once per e lifetime when e is first placed onscreen
					setTimeout(function(){c.add('hasEntered')},10)
				}
				this.e.style.display = 'block';
				setTimeout(function(){c.add('onScreen')},10)
			}else{
				this.e.style.display = 'none';
				c.remove('onScreen')
			};
			this.isLoaded = true;//one could argue it might be better to call this after the DOM e load event. it's name implies that the content is loaded -- but in actuality this flag only signifies that we have made a load request.  This is not a huge deal currently since we are only using this parameter to prevent a second load call, however, other uses may not work as expected.
		}
		return this.isOnScreen;
	}
	
	Box.prototype.setWaveforms = function(o) {
		this.waves = o;
	}
	
	
	Box.prototype.getSaEvtStats = function(){
		var 
			si=this.parent.si, 
			pPos = this.pPos[si],
			ctr = pPos + this.outerDims[si]*.5,
			saEvtPos = this.parent.saEventPos,
			d = ctr - saEvtPos;
		
		return {
			d:d,
			dPercent:d/this.parent.gridDims[si],
			isOnEvtPos:(saEvtPos >= pPos && saEvtPos <= pPos + this.outerDims[si])?true:false
		}
	}
	
	
	
	/**
	* tremula is based on layouts that are [horizontally|vertically] offset by a master scroll value
	* as the master scroll value changes, each box item is assigned an updated position
	* each box updates its own x&y position through setAbsPos()
	* if item easing is enabled position updating happens over time
	*
	* @method setAbsPos
	* @param x - x value in absolute space
	* @param y - y value in absolute space
	* 
	*/
	
	
	Box.prototype.setAbsPos = function( x, y ) {
		
		
		//if this is the last selected item then disable easing
		if(!this.ezEnabled() && !this.getLayoutIsXing()){

			this.currentXY[0] = x;//+5;//this creates a little jump ideally to make you feel like you just put something down.  Kinda jumpy tho.  Would be good to tune this a little.
			this.x = x;
			this.currentXY[1] = y;
			this.y = y;
			
			return
		}
		
		
		var isOnSaEvt = this.isOnSaEvt;

		var stats = this.getSaEvtStats();
		this.isOnSaEvt = stats.isOnEvtPos;
		this.saEvtDistance = stats.d;
		this.saEvtDistPercent = stats.dPercent;					
		
		var touchRatio = stats.dPercent;
		var trThresh = Math.abs(touchRatio) < .09;
		
		//1-easeOutQuint_t(this.parent.easingPercent);
		var
			synchThresh = 5 * (1-this.parent.easingPercent), //in px. if delta > synchThresh then isSynchThreshTrig = 1 (else zero)
			si = this.parent.si, //active scroll index cache
			si_ = this.parent.si_, //active scroll index inverted cache
			axisArg = (si)?y:x,//si axis value
			axisArg_ = (si_)?y:x,//si_ axis value
									
			isSynchThreshTrig = (
				axisArg > this.targetXY[si] + synchThresh 
				|| axisArg < this.targetXY[si] - synchThresh
				|| trThresh
			)?1:0,
			
			isSynchThreshTrig_ = (
				axisArg_ > this.targetXY[si_] + synchThresh 
				|| axisArg_ < this.targetXY[si_] - synchThresh
				|| trThresh
			)?1:0;
			

		//=====EASING====
		
		
		
		//if there is a new target value on si or si_ then reset easing to new location
		if(
			(axisArg!=this.targetXY[si] && isSynchThreshTrig)
			|| (axisArg_!=this.targetXY[si_] && isSynchThreshTrig_)
		){
			//go ahead and update the new x&y target
			this.targetXY = [x,y];

			//set ease type and time
			var easeCurve, easeTime;
			
			if(this.getLayoutIsXing()){
				//if we are in a (potentially big) grid layout state change
				easeCurve = this.getlayoutXansEasing();
				easeTime = this.getLayoutXingMs();
			}else if(this.parent.isTouching){
				//or one of the boxes is being directly manipulated
				easeCurve = this.ezOptions.touchCurve
				easeTime = this.ezOptions.easeTime;
			}else{
				//or we are in a normal state traveling to our target position
				easeCurve = this.ezOptions.swipeCurve;
				easeTime = this.ezOptions.easeTime;
			}
			
			
			//initalize if we do not have credible runtime values
			if(this.currentXY[0]==0 && this.currentXY[1]==0){
				this.currentXY[0]=x;
				this.currentXY[1]=y;
			}
			
			
			//set or reset the animation program for each axis
			this.ani_si.animateFrTo(
				this.currentXY[si],
				this.targetXY[si],
				easeTime,
				easeCurve
			);
			this.ani_si_.animateFrTo(
				this.currentXY[si_],
				this.targetXY[si_],
				easeTime,
				easeCurve
			);
			
			
		}//end if
		

		// m is the current pixel-distance between the current x|y value and the target value
		var m = this.ani_si.getNextFrameDiff();
		//if(this.isEasingTo){
		if(Math.abs(m)>.001){
			this.currentXY[si]=this.targetXY[si] - m;
		}else{
			this.currentXY[si]=this.targetXY[si];
		}

		var m_ = this.ani_si_.getNextFrameDiff();
		if(Math.abs(m_)>.001){
			this.currentXY[si_]=this.targetXY[si_] - m;
		}else{
			this.currentXY[si_]=this.targetXY[si_];
		}


		//====SPRING LIMITS=====
		var _x = Math.min(Math.abs(touchRatio),1);
		
		var maxMove = this.springLimit;
		
		var maxSi = this.targetXY[si] + (maxMove * _x);
		var minSi = this.targetXY[si] - (maxMove * _x);
		
		var maxSi_ = this.targetXY[si_] + (maxMove * _x);
		var minSi_ = this.targetXY[si_] - (maxMove * _x);

		
		if(this.currentXY[si] > maxSi){
			this.currentXY[si] = maxSi;
		}
		
		if(this.currentXY[si] < minSi){
			this.currentXY[si] = minSi;
		}


		
		if(this.currentXY[si_] > maxSi_){
			this.currentXY[si_] = maxSi_;
		}
		
		if(this.currentXY[si_] < minSi_){
			this.currentXY[si_] = minSi_;
		}
		

		this.x = this.currentXY[0];
		this.y = this.currentXY[1];

	};//setAbsPos()

	
	return Box

});









