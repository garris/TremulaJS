/** 
*   TremulaJS 1.3.1 https://github.com/garris/TremulaJS
*   Copyright (C) 2014, Art.com 
*
*   This program is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


requirejs.config({baseUrl: 'src'});//use this config line when building with almond.js



define([
	'Layouts'
	// ,'SurfaceMaps'
	,'Easings'
	,'DataAdapters'
	,'Projections'
	,'Grid'
],function(
	layouts
	// ,surfaceMaps
	,easings
	,dataAdapters
	,projections
	,Grid
){


	var Tremula = function(){
		this.Grid 					= {};
		this.dataAdapters 	= dataAdapters;
		this.layouts 				= layouts;
		this.easings 				= easings;
		this.projections 		= projections;
		this.cache = {};//for instance parameters
		this.updateConfig = function(){console && console.error && console.error('Tremula is not initalized. Request ignored.')};
		this.toggleScrollAxis = function(){console && console.error && console.error('Tremula is not initalized. Request ignored.')};
	}


	Tremula.prototype.resize = function(evt){
		if(this.$e[0].offsetWidth==0) return;//if the Tremula container does not have any width then there is no need to do any resizing
		this.Grid.setScrollAxis();
		this.Grid.setLayout();
		this.Grid.oneShotPaint();
	}	

	Tremula.prototype.appendData = function(data,dataAdapter){
		this.Grid.initBoxes(data,dataAdapter,true);
		this.cache.endOfScrollFlag = false;
	}

	Tremula.prototype.insertData = function(data,dataAdapter){
		this.Grid.initBoxes(data,dataAdapter,'insert');
		this.cache.endOfScrollFlag = false;
	}

	Tremula.prototype.refreshData = function(data,dataAdapter){
		this.Grid.initBoxes(data,dataAdapter,false);
		this.cache.endOfScrollFlag = false;
	}

	Tremula.prototype.tailScroll = function(){
		var g = this.Grid;
		g.setLastTouchOrigin(g.gridDims[g.si]/2);
		g.easeTo(g.getScrollPos()-(g.getScrollViewDim()*.50),800)
	}

	Tremula.prototype.headScroll = function(){
		var g = this.Grid;
		g.setLastTouchOrigin(g.gridDims[g.si]/2);
		g.easeTo(g.getScrollPos()+(g.getScrollViewDim()*.50),800)
	}

	Tremula.prototype.setOnChangePub = function(cb){
		this.Grid.onChangePub = cb;
	};



	Tremula.prototype.init = function($e,options,parent){

		var that = this;
		this.parent = parent||null;
		if($e) this.$e = $e||null;


		var defaults = {
			onChangePub             :null,
			adapter 								:dataAdapters.TremulaItem,
			isLooping 							:false,
			ignoreUserEvents				:false,
			surfaceMap 							:projections.streamHorizontal,
			itemPreloading      		:false,
			itemEasing              :false,
			itemEasingParams    		:{
				touchCurve  						:easings.easeOutCubic,
				swipeCurve  						:easings.easeOutCubic,
				transitionCurve					:easings.easeOutCubic,
				easeTime        				:500,
				springLimit 						:20 //in px
			},
			scrollAxis 							:'x',
			itemConstraint 					:null,
			staticAxisCount 				:0
		}
		
		var gridOptions = $.extend({},defaults,options||{})
		
		this.Grid = new Grid($e,gridOptions,this)
		
		this.updateConfig = this.Grid.updateConfig;
		this.toggleScrollAxis = this.Grid.toggleScrollAxis;
		
		if(options&&options.data)
			this.Grid.initBoxes(options.data,options.adapter);
		
		
		$(window).on('resize',function(evt){
			that.resize(evt);
		});

		
		if(!gridOptions.ignoreUserEvents){ //setup event listening unless we want to ignoreUserEvents

			var fanEvents =new Hammer($e[0],{prevent_default: false});
			fanEvents.on('dragdown dragup dragleft dragright swipeleft swipeup swipedown swiperight touch release tap',function(evt){that.Grid.handleGesture(evt)});
			fanEvents.on('mousewheel wheel DOMMouseScroll', function(evt){that.Grid.handleGesture(evt);})


			var ltme = {time:null,evt:null};//LTME ==> last touchmove event
			var deltaX,deltaY;
			this.$e.bind('touchmove',function(evt){

				//IMPORTANT: DO NOT DO THIS --> evt.stopPropagation();// <-- we still actually want this to propegate (otherwise it wont make it to Hammer).

				if(that.Grid.sx){//if config'd horizontally
					if(ltme.time){ //test if our last event is part of the same gesture
					// if(ltme.time && (new Date())-ltme.time<250){ //test if our last event is part of the same gesture
						deltaX = evt.originalEvent.pageX-ltme.evt.pageX;
						deltaY = evt.originalEvent.pageY-ltme.evt.pageY;

						if(deltaX!=0){
							if(Math.abs(deltaY/deltaX) <= 1){//if this ratio is 1 or less then the user is scrolling the scroll axis: so block native events
								evt.preventDefault();
							}
						}

					}else{ //need to trap the touchmove event until we get a reliable measurement
						evt.preventDefault();
					}
				
				}else{//if config'd vertically

					if(ltme.time){ //test if our last event is part of the same gesture
						deltaX = evt.originalEvent.pageX-ltme.evt.pageX;
						deltaY = evt.originalEvent.pageY-ltme.evt.pageY;

						if(deltaY!=0){
							if(Math.abs(deltaX/deltaY) <= 1){//if this ratio is 1 or less then the user is scrolling the scroll axis: so block native events
								evt.preventDefault();
							}
						}

					}else{ //need to trap the touchmove event until we get a reliable measurement
						evt.preventDefault();
					}

				}

				// console.log(  ltme.time && (new Date())-ltme.time<250   );				
				ltme = {time:new Date,evt:evt.originalEvent};

			});

		}//if (!ignoreUserEvents)

	}//init()









	function imageLoaded(e){
		var $e = $(e);
		if($e.hasClass('loaded'))return;
		$e.addClass('loaded');
		setTimeout(function(){$e.parents('.gridBox').addClass('loaded')},1500);//this is a little ape-y but whatever. see Box.prototype.doOnScreen() method for some context.
	}

	if(!window.imageLoaded)
		window.imageLoaded = imageLoaded;

	window.Tremula = Tremula;
	return Tremula;

})

   
