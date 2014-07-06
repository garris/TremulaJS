tremulaConfig = {

			
			//method called after each frame is painted. Passes internal parameter object.
			onChangePub         : this.doScrollEvents,
			
			//content/stream data can optionally be passed here
			data                : null,
			
			//the last content block -- allows a persistant content block to appear at the end of the stream
			//common use case is to target $('.lastContentItem') with a conditional loading spinner or result summary.
			lastContentBlock    : {
				template 	:'<div class="lastContentItem"></div>',
				layoutType  :'tremulaBlockItem',
				noScaling	:true,
				w:300,//px
				h:390,//px
				isLastContentBlock:true
			},
			
			//dafault data adapter method which is called for each data item -- this is used if none is supplied during an import operation
			//enables easy adaptation of arbitrary API data formats -- see flickr example
			adapter             : this.dataAdapters.JudyItem,
			
			//size of the static axis in pixels
			itemConstraint      : 300,//px
			
			//size of margins added to each side of each content item
			itemMargins         : [30,30],//x,y in px
			
			//offset of static axis
			staticAxisOffset    : 0,//px
			
			//offset of scroll axis
			scrollAxisOffset    : 20,//px
			
			//sets the scroll axis.  accepts 'x'|'y'
			scrollAxis          : 'x',
			
			//how many rows (or colums) to display
			staticAxisCount     : 0,//zero based
			
			//enables looping with the current seet of results
			isLooping			: false,
			
			//the grid that will be used to project content
			defaultLayout       : this.layouts.basicGridLayout,
			
			//this is the projection/effect which will be used to display grid content
			surfaceMap          : this.projections.streamHorizontal,
			
			//enables item level momentum envelope
			itemEasing          : false,
			
			//if item-level easing is enabled, it will use the following parameters -- experimental
			itemEasingParams    : {
				touchCurve          :this.easings.easeOutCubic,
				swipeCurve          :this.easings.easeOutCubic,
				transitionCurve     :this.easings.easeOutElastic,
				easeTime            :1000,//in ms
				springLimit         :80 //in px -- maximum distance an object will independently move when directly dragged
			}            
			
			//this config determines DOM class when new content is processed. useful for classifying content css behaivior -- experimental
			//maxWidthClassMap    : {mini:50,small:143,medium:244,large:2000},
			
			//itemPreloading      : true, //experimental

		})
	}

}



function tremulaInit($tremulaContainer){
	
	//this creates a hook to a new Tremula instance
	var tremula = new Tremula();
	
	//this will return a config object which will run in the context of your newly created tremula instance
	var config = tremulaConfigs.default.call(tremula);
	
	//this gives you extremely low level behaivior control of your tremula instance
	//doScrollEvents() is a method which fires on every tremula paint (approx 16ms)
	//it receives a single parameter object of internal instance states 
	//see below for a sample usage
	tremula.doScrollEvents = doScrollEvents;
	
	//initalize your tremula instance with 3 parameters: a container object, a config object, and a parent context
	tremula.init($tremulaContainer,config,this);
	
	//optionally return your tremula hook 
	return tremula;
}


//a common behaivior is to append new results from an API when the user has scrolled near the end of the current results set
//multiple tremula instances can be chained i.e. follow the scroll of another (regardless of size of results)
var doScrollEvents = function(internalState){
	if(internalState.scrollProgress>.7){//scrollProgress is a value bet 0..1 -- it is the current scroll progress of the tremula
		var t = internalState.parent;
		if(!t.cache.endOfScrollFlag){
			t.cache.endOfScrollFlag = true;
			doEndOfScroll(t)
			console.log('END OF SCROLL!')
		}
	}
}//doScrollEvents()


var doEndOfScroll(t){
	//do something like append more results
	loadFlickr(t);
	//then reset the endOfScroll flag 
	t.cache.endOfScrollFlag = false; //you may want to do this only after a successful server response
}



function loadFlickr(t){
		var dataUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c149b994c54c114bd7836b61539eec2e&tags=street+art&format=json&page=1&extras=url_z';
		$.ajax({
			url:dataUrl
			,dataType: 'jsonp'
			,jsonp: 'jsoncallback' 
		})
		.done(function(res){t.refreshData(res.photos.photo,t.dataAdapters.flickrSearch);})
		.fail( function(d,config,err){ console.log('API FAIL. '+err) })
	}


//this assumes you have a BLOCK-LEVEL DOM container with a class of 'tremulaContainer'
var tremula = tremulaInit($('.tremulaContainer'));

// instance method


// updateConfig enabled updating of configuration parameters. 
// adding an optional true parameter will force a tremula grid redraw with the new parameter in effect
tremula.Grid.updateConfig({itemConstraint:100},true);

//updates the Grid scroll axis.  -- note, not all projections will work with this setting
tremula.Grid.toggleScrollAxis('y');  

