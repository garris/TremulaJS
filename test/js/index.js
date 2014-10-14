

	function App(){
			var that = this;
			this.hi = function hi(x){console.log('test => ',that,x);}
	}
	var myTestApp = new App;
	//myTestApp.hi('myTestApp');



$(document).ready(function(){




	setTimeout(function(){
		window.tremula = createTremula();
		applyBoxClick();
		//loadFlickr()
		// myTestApp.hi('ready timeout');
		// window.tremula.setOnChangePub(myTestApp.hi);
	},1000);


});








function createTremula(){

	// .tremulaContainer must exist and have actual dimentionality 
	// requires display:block with an explicitly defined H & W
	$tremulaContainer = $('.tremulaContainer');

	//this creates a hook to a new Tremula instance
	var tremula = new Tremula();

	//Create a config object -- this is how most default behaivior is set.
	//see updateConfig(prop_val_object,refreshStreamFlag) method to change properties of a running instance
	var config = {

		//Size of the static axis in pixels
		 //If your scroll axis is set to 'x' then this will be the normalized height of your content blocks.
		 //If your scroll axis is set to 'y' then this will be the normalized width of your content blocks.
		itemConstraint      :200,//px

		//Margin in px added to each side of each content item
		itemMargins         :[10,10],//x (left & right), y (top & bottom) in px

		//Display offset of static axis (static axis is the non-scrolling dimention)
		staticAxisOffset    :50,//px

		//Display offset of scroll axis (this is the amount of scrollable area added before the first content block)
		scrollAxisOffset    :20,//px

		//Sets the scroll axis 'x'|'y'.
		//NOTE: projections generally only work with one scroll axis
		//when changeing this value, make sure to use a compatible projection
		scrollAxis          :'x',//'x'|'y'

		//surfaceMap is the projection/3d-effect which will be used to display grid content
		//following is a list of built-in projections with their corresponding scroll direction
		//NOTE: Using a projection with an incompatible Grid or Grid-Direction will result in-not-so awesome results
		//----------------------
		// (x or y) xyPlain
		// (x) streamHorizontal
		// (y) pinterest
		// (x) mountain
		// (x) turntable
		// (x) enterTheDragon
		//----------------------
		surfaceMap          :tremula.projections.xyPlain,

		//how many rows (or colums) to display.  note: this is zero based -- so a value of 0 means there will be one row/column
		staticAxisCount     :1,//zero based 

		//the grid that will be used to project content
		//NOTE: Generally, this will stay the same and various surface map projections
		//will be used to create various 3d positioning effects
		defaultLayout       :tremula.layouts.basicGridLayout,

		//it does not look like this actually got implemented so, don't worry about it ;)
		itemPreloading      :true,

		//enables the item-level momentum envelope
		itemEasing          :false,

		//enables looping with the current seet of results
		isLooping         	:false,

		//set this to true to use TremulaJS as a responsive layout machine.
		//when true: ignores user events i.e. touch/pointer/mousewheel events.
		ignoreUserEvents		:false,

		//if item-level easing is enabled, it will use the following parameters
		//NOTE: this is experimental. This effect can make people queasy.
		itemEasingParams    :{
			touchCurve          :tremula.easings.easeOutCubic,
			swipeCurve          :tremula.easings.easeOutCubic,
			transitionCurve     :tremula.easings.easeOutElastic,
			easeTime            :500,
			springLimit         :40 //in px
		},

		//method called after each frame is painted. Passes internal parameter object.
		//see fn definition below
		onChangePub					: doScrollEvents,
		// onChangePub					: myTestApp.hi,

		//content/stream data can optionally be passed in on init()
		data                : null,

		// lastContentBlock enables a persistant content block to exist at the end of the stream at all times.
		// Common use case is to target $('.lastContentItem') with a conditional loading spinner when API is churning.
		lastContentBlock 		: {
			template :'<div class="lastContentItem"><span>This is the end of the road.</span></div>',
			layoutType :'tremulaBlockItem',
			noScaling:true,
			w:500,
			h:300,
			isLastContentBlock:true,
			adapter:tremula.dataAdapters.TremulaItem
		},

		//dafault data adapter method which is called on each data item -- this is used if none is supplied during an import operation
		//enables easy adaptation of arbitrary API data formats -- see flickr example
		adapter             :null

	};

	//initalize the tremula instance with 3 parameters: 
	//a DOM container, a config object, and a parent context
	tremula.init($tremulaContainer,config,this);

	//return the tremula hook 
	return tremula;
}

//This method is called on each paint frame thus enabling low level behaivior control
//it receives a single parameter object of internal instance states
//NOTE: below is a simple example of infinate scrolling where new item
//requests are made when the user scrolls past the existing 70% mark.
//
//Another option here is multiple tremula instancechaining i.e. follow the scroll events of another tremula instance.
//use case of this may be one tremula displaying close up data view while another may be an overview.
function doScrollEvents(o){
	showControlData(o);

	if(o.scrollProgress>.7){
		if(!tremula.cache.endOfScrollFlag){
			tremula.cache.endOfScrollFlag = true;
			pageCtr++;
		 // loadFlickr();
			console.log('END OF SCROLL!')
		}
	}
};


//Basic example of API integration
//=================================
//DATA FUNCTIONS OF NOTE: 
//tremula.refreshData(returned_set_array,dataAdapter)//replaces current data set with returned_set_array
//tremula.appendData(returned_set_array,dataAdapter)//appends current data set with returned_set_array
//tremula.insertData(returned_set_array,dataAdapter)//prepends current data set with returned_set_array
//=================================
/* SIZE SUFFIX FOR FLICKR IMAGE URLS ===> must be set in method below also
s	small square 75x75
q	large square 150x150
t	thumbnail, 100 on longest side
m	small, 240 on longest side
n	small, 320 on longest side
-	medium, 500 on longest side
z	medium 640, 640 on longest side
c	medium 800, 800 on longest side†
b	large, 1024 on longest side*
o	original image, either a jpg, gif or png, depending on source format
*/
var pageCtr = 1,lastDataCall=[];
function loadFlickr(limit){
	if(!limit)limit = 100;
	var dataUrl = 'https://api.flickr.com/services/rest/?per_page='+limit.toString()+'&method=flickr.photos.search&api_key=c149b994c54c114bd7836b61539eec2e&tags=street+art&format=json&page='+pageCtr+'&extras=url_n';
	$.ajax({
		url:dataUrl
		,dataType: 'jsonp'
		,jsonp: 'jsoncallback' 
	})
	.done(function(res){
		lastDataCall = JSON.parse(JSON.stringify(res.photos.photo));
		var rs = res.photos.photo.filter(function(o,i){return o.height_n > o.width_n * .5 });//filter out any with a really wide aspect ratio.
		var rs_ = res.photos.photo.filter(function(o,i){return !(o.height_n > o.width_n * .5) });//filter out any with a really wide aspect ratio.
		console.log('API success',rs.length,rs_.length);
		tremula.refreshData(rs,flickrDataAdapter);//flicker
		tremula.cache.endOfScrollFlag = false;
	})
	.fail( function(d,config,err){ console.log('API FAIL. '+err) })
}


// DATA ADAPTER EXAMPLE
//=====================
// flickrDataAdapter() is for use with the flickr API
// https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c149b994c54c114bd7836b61539eec2e&tags=sky%2C+night%2C+day&format=json&page=1

/* SIZE SUFFIX FOR FLICKR IMAGE URLS ===> must be set in above method also
s	small square 75x75
q	large square 150x150
t	thumbnail, 100 on longest side
m	small, 240 on longest side
n	small, 320 on longest side
-	medium, 500 on longest side
z	medium 640, 640 on longest side
c	medium 800, 800 on longest side†
b	large, 1024 on longest side*
o	original image, either a jpg, gif or png, depending on source format
*/

function flickrDataAdapter(data,env){
	this.data = data;
	this.w = this.width = data.width_n;
	this.h = this.height = data.height_n;
	this.imgUrl = data.url_n;
	this.auxClassList = "flickrRS";//stamp each mapped item with map ID 
	this.template = this.data.template||('<img draggable="false" onload="imageLoaded(this)" class="moneyShot" src=""/>');
	// console.log(this)
}

// updateConfig() enables updating of configuration parameters after an instance is running.
// adding an optional true parameter will force a tremula grid redraw with the new parameter in effect
// ----------------------------
// EXAMPLE: tremula.Grid.updateConfig({itemConstraint:100},true);
// ----------------------------

// Use toggleScrollAxis() to set the scrollAxis, 
// see: surfaceMap projection compatibility list above to ensure the projection is compatible with the scrollAxis value
// ----------------------------
// EXAMPLE: tremula.Grid.toggleScrollAxis('y'); 
// ----------------------------

function applyBoxClick(){
	$('.tremulaContainer').on('tremulaItemSelect',function(gestureEvt,domEvt){
		var 
			$e = $(domEvt.target);
			t = $e.closest('.gridBox')[0];
		if(t){
			var data = $.data(t).model.model.data;
		}
		if(data)alert(JSON.stringify(data));
	})
}



var showControlData = function(o){

	if(!this.$debug)this.$debug = $('.debug');
// console.log(o.absScrollPos)
		this.$debug.html(
		'<ul>'
		// + '<li>jsHeapSizeLimit: ' 							+ performance.memory.jsHeapSizeLimit 											+ '<span>total available memory</span></li>'
		// + '<li>totalJSHeapSize: ' 							+ performance.memory.totalJSHeapSize 											+ '<span>total used memory</span></li>'
		// + '<li>usedJSHeapSize: ' 							+ performance.memory.usedJSHeapSize 											+ '<span>current  used memory</span></li>'
		+ '<li>scrollAxis: '        					+ o.sa + ' [sx]--> ' + o.sx 				+ '<span>Direction of scroll</span></li>'
		+ '<li>this.frameRate: ' 							+ o.frameRate 											+ '<span>frameRate</span></li>'
		+ '<li>this.physicsLoopRAF: ' 				+ o.physicsLoopRAF 									+ '<span>RAF FRAME ID</span></li>'
		+ '<li>isTouching: '        					+ o.isTouching 											+ '<span></span></li>'
		// + '<li>isMovingOnSA: '        				+ o.isMovingOnSA 										+ '<span></span></li>'
		+ '<li>absScrollPos: '        				+ o.absScrollPos 										+ '<span>The scroll position of the content head in relation to the visible leading border.</span></li>'
		+ '<li>scrollPos: '         					+ o.scrollPos 											+ '<span></span></li>'
		+ '<li>scrollProgress: '      				+ o.scrollProgress 									+ '<span></span></li>'
		+ '<li>marginScrollWarp: '      			+ o.marginScrollWarp 								+ '<span></span></li>'
		+ '<li>isInHeadMargin: '      				+ o.isInHeadMargin 									+ '<span></span></li>'
		+ '<li>isInTailMargin: '      				+ o.isInTailMargin 									+ '<span></span></li>'
		+ '<li>scrollAxisOffset: '						+ o.scrollAxisOffset 								+ '<span>The margin added before and after the content -- this creates a blank offset area on either side of the content -- IOW: this offsets the content position.</span></li>'
		+ '<li>scrollMargin: '        				+ o.scrollMargin 										+ '<span>The scrollable area added before and after the content. NOTE: this does not offset the content.</span></li>'
		+ '<li>firstItemPos: '        				+ o.firstItemPos 										+ '<span>The head edge position of the first item.</span></li>'
		// + '<li>scrollMargin: '        			+ o.scrollMargin 										+ '<span></span></li>'
		+ '<li>bounceMargin: '       					+ o.bounceMargin 										+ '<span></span></li>'
		+ '<li>trailingEdgeScrollPos: '       + o.trailingEdgeScrollPos 					+ '<span></span></li>'
		+ '<li>absTrailingEdgeScrollPos: '    + o.absTrailingEdgeScrollPos 				+ '<span>The value of absScrollPos when content is scrolled completely to the tail position (exclude rubber band effect).</span></li>'
		+ '<li>currentGridContentDims: '     	+ o.currentGridContentDims					+ '<span>?</span></li>'
		+ '<li>boxAxisLengths: '      				+ o.boxAxisLengths 									+ '<span>A mysterious number which starts as the contentDims but gets transformed in ways that are no longer clear.</span></li>'
		+ '<li>contentDims: '      						+ o.contentDims 										+ '<span>Content bounding box dims.</span></li>'
		//+ <li> 'boxAxisLessScrollMargin: '   + o.boxAxisLessScrollMargin[0] 		+ '<span></span></li>'
		+ '<li>gridDims: '          					+ o.gridDims 												+ '<span></span></li>'
		+ '<li>hasShortGridDimsSi: '          + o.hasShortGridDimsSi 							+ '<span></span></li>'
		+ '<li>hasMediumGridDimsSi: '         + o.hasMediumGridDimsSi 						+ '<span></span></li>'
		+'</ul>'
	)
}






function loadTestData(limit,cb,useAppendFlag){
	if(!limit)limit = 100;
	var dataUrl = 'test/flickr_'+limit.toString()+'.json';
	$.ajax({
		url:dataUrl
		,dataType: 'json'
	})
	.done(function(res){
		console.log(res)
		lastDataCall = JSON.parse(JSON.stringify(res));
		var rs = res.filter(function(o,i){return o.height_n > o.width_n * .5 });//filter out any with a really wide aspect ratio.
		var rs_ = res.filter(function(o,i){return !(o.height_n > o.width_n * .5) });//filter out any with a really wide aspect ratio.
		console.log('API success',rs.length,rs_.length);
		if(useAppendFlag)
			tremula.appendData(rs,flickrDataAdapter);//flicker
		else
			tremula.refreshData(rs,flickrDataAdapter);//flicker

		tremula.cache.endOfScrollFlag = false;
		cb(null,res)
	})
	.fail( function(d,config,err){ 
		console.log('API FAIL. '+err);
		cb(err,null);
	})
}




