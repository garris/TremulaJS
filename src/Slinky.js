requirejs.config({
    baseUrl: 'src'
    // ,paths: {
    //     app: '../app'
    // }
});



define([
	'Layouts'
	,'SurfaceMaps'
	,'Easings'
	,'DataAdapters'
	,'Spring'
],function(
	layouts
	,surfaceMaps
	,easings
	,dataAdapters
	,Spring
){


	var Slinky = function(){

		this.spring 		= {};
		this.dataAdapters 	= dataAdapters;
		this.layouts 		= layouts;
		this.surfaceMaps	= surfaceMaps;
		this.easings 		= easings;
	}


	Slinky.prototype.resize = function(evt){
		if(this.$e[0].offsetWidth==0) return;//if the slinky container does not have any width then there is no need to do any resizing
		this.spring.setScrollAxis();
		this.spring.setLayout();
		this.spring.oneShotPaint();
	}	


	Slinky.prototype.init = function($e,options,parent){

		var that = this;
		this.parent = parent;
		this.$e = $e;

console.log(options);

		var defaults = {
			onChangePub             :null,
			adapter 				:dataAdapters.SlinkyItem,
			isLooping 				:false,
			surfaceMap 				:surfaceMaps.xyPlane,
			itemPreloading      	:false,
			itemEasing              :false,
			itemEasingParams    	:{
				touchCurve  			:easings.easeOutCubic,
				swipeCurve  			:easings.easeOutCubic,
				transitionCurve			:easings.easeOutCubic,
				easeTime        		:500,
				springLimit 			:20 //in px
			},
			scrollAxis 				:'x',
			itemConstraint 			:null,
			staticAxisCount 		:0
		}
		
		var springOptions = $.extend({},defaults,options||{})
		
		this.spring = new Spring($e,springOptions,parent)
		
		if(options&&options.data)
			this.spring.initBoxes(options.data,options.adapter);
		
		
		$(window).on('resize',function(evt){
			that.resize(evt);
		});
		
		var fanEvents =new Hammer($e[0],{prevent_default: true});
		fanEvents.on('dragdown dragup dragleft dragright swipeleft swipeup swipedown swiperight touch release tap',function(evt){that.spring.handleGesture(evt)});
		
		$e.on('mousewheel wheel DOMMouseScroll', function(evt){
			//test for a scroll signifigantly perpendicular to the SA -- if that is true then pass it up the DOM to scroll the layer 
			//note: prolly need to do this to the drag == potentially doing the whole thing in that.spring.handleGesture()
			//if(true){
				that.spring.handleGesture(evt)
				evt.preventDefault();
				evt.stopPropagation();
			//}
		})




	}
		


	function imageLoaded(e){
		var $e = $(e);
		if($e.hasClass('loaded'))return;
		$e.addClass('loaded');
		setTimeout(function(){$e.parents('.gridBox').addClass('loaded')},1500);//this is a little ape-y but works.  TODO: see Coil.prototype.doOnScreen() method for why this actually makes partial sense.
	}

	if(!window.imageLoaded)
		window.imageLoaded = imageLoaded;

	window.Slinky = Slinky;
	return Slinky;

})

   