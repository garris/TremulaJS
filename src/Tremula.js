requirejs.config({
    baseUrl: 'src'
    // ,paths: {
    //     app: '../app'
    // }
});



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
		this.Grid 		= {};
		this.dataAdapters 	= dataAdapters;
		this.layouts 		= layouts;
		this.easings 		= easings;
		this.projections 		= projections;
		this.cache = {};//for instance parameters
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


	Tremula.prototype.init = function($e,options,parent){

		var that = this;
		this.parent = parent||null;
		if($e) this.$e = $e||null;


		var defaults = {
			onChangePub             :null,
			adapter 								:dataAdapters.TremulaItem,
			isLooping 							:false,
			surfaceMap 							:projections.xyPlane,
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
		
		this.Grid = new Grid($e,gridOptions,parent)
		
		if(options&&options.data)
			this.Grid.initBoxes(options.data,options.adapter);
		
		
		$(window).on('resize',function(evt){
			that.resize(evt);
		});
		
		var fanEvents =new Hammer($e[0],{prevent_default: true});
		fanEvents.on('dragdown dragup dragleft dragright swipeleft swipeup swipedown swiperight touch release tap',function(evt){that.Grid.handleGesture(evt)});
		
		$e.on('mousewheel wheel DOMMouseScroll', function(evt){
			//test for a scroll signifigantly perpendicular to the SA -- if that is true then pass it up the DOM to scroll the layer 
			//note: prolly need to do this to the drag == potentially doing the whole thing in that.Grid.handleGesture()
			//if(true){
				that.Grid.handleGesture(evt)
				evt.preventDefault();
				evt.stopPropagation();
			//}
		})
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

   