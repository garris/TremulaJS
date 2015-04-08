function attachDemoControls(tremula){

	var s = tremula.Grid;

	$(".streamHorizontal").click(function() {
		// s.jumpToScrollProgress(0);
		s.toggleScrollAxis('x');
		setTimeout(function(){
			var targetSize = tremula.$e.height()*.5;
			s.doTransition(tremula.layouts.basicGridLayout,{steppedScrolling:false,axes:0,itemConstraint:targetSize,itemMargins:[25,25],staticAxisOffset:0},800,tremula.easings.easeOutElastic,tremula.projections.streamHorizontal);
			resizeFn(tremula)
		}, 100)
	})

	$(".pinterest").click(function() {
		// s.jumpToScrollProgress(0);
		s.toggleScrollAxis('y');
		setTimeout(function(){
			$body.removeClass('doReflect');
			s.doTransition(tremula.layouts.basicGridLayout,{steppedScrolling:false,axes:3,itemConstraint:250,itemMargins:[25,25],staticAxisOffset:0},800,tremula.easings.easeOutElastic,tremula.projections.pinterest);
			resizeFn = autoColumnCount;
			resizeFn(tremula)
		}, 100)
	})
	
	$(".btnL2").click(function() {
		// s.jumpToScrollProgress(0);
		s.toggleScrollAxis('x');
		setTimeout(function(){
			$body.addClass('doReflect');
			var targetSize = tremula.$e.height()*.5;
			s.doTransition(tremula.layouts.basicGridLayout,{steppedScrolling:false,axes:0,itemConstraint:targetSize,staticAxisOffset:0},800,tremula.easings.easeOutElastic,tremula.projections.turntable);
			s.setItemEasing(false);


			resizeFn(tremula)
		}, 100)
	})
	
	$(".btnL3").click(function() {
		// s.jumpToScrollProgress(0);
		s.toggleScrollAxis('x');
		setTimeout(function(){
			s.doTransition(tremula.layouts.basicGridLayout,{steppedScrolling:false,axes:0,itemConstraint:300,itemMargins:[30,30],staticAxisOffset:0},800,tremula.easings.easeOutElastic,tremula.projections.enterTheDragon);
			s.setItemEasing(false);
			resizeFn(tremula)
		}, 100)
	})
	
	$(".btnL4").click(function() {
		s.toggleScrollAxis('x');
		setTimeout(function(){
			s.doTransition(tremula.layouts.basicGridLayout,{steppedScrolling:false,axes:0,itemConstraint:100,staticAxisOffset:0},800,tremula.easings.easeOutElastic,tremula.projections.sunrise);
			s.setItemEasing(false);
			resizeFn(tremula)
		}, 100)
	})
	
	$(".mountain").click(function() {
		s.toggleScrollAxis('x');
		setTimeout(function(){
			$body.addClass('doReflect');
			var targetSize = tremula.$e.height()*.4;
			s.doTransition(tremula.layouts.basicGridLayout,{steppedScrolling:false,axes:0,itemConstraint:targetSize,itemMargins:[10,10],staticAxisOffset:0},800,tremula.easings.easeOutElastic,tremula.projections.mountain);
			s.setItemEasing(false);
			diableAuto();
			refreshData=false;
			resizeFn(tremula)
		}, 100)
	})
	
	$(".btnL5").click(function() {
		s.toggleScrollAxis('x');
		setTimeout(function(){
			$body.removeClass('doReflect');
			s.doTransition(tremula.layouts.basicGridLayout,{steppedScrolling:false,axes:0,itemConstraint:200,itemMargins:[5,5],staticAxisOffset:0},800,tremula.easings.easeOutElastic,tremula.projections.bezierShape);
			s.setItemEasing(false);
			resizeFn(tremula)
		}, 100)
	})
	
	$(".xy").click(function() {
		function jiggleHandle(){
			var ax = (s.sa=='x')?'y':'x';
			s.toggleScrollAxis(ax);
			$body.removeClass('doReflect');
			s.updateConfig({steppedScrolling:false,axes:1,itemConstraint:200,itemMargins:[20,20],staticAxisOffset:20,surfaceMap:tremula.projections.xyPlain});
			s.setItemEasing(false);
			resizeFn(tremula)
		}
		//yes, I know...  would be great to know why this is necessary. #freeSoftware  :/
		jiggleHandle();
		jiggleHandle();
		jiggleHandle();

	})
	
	
	$(".btn1").click(function() {
		s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.doTransition(tremula.layouts.basicGridLayout,{steppedScrolling:false,axes:0,staticAxisOffset:0},800,tremula.easings.easeOutElastic);
			s.setItemEasing(false);
			diableAuto();
		}, 100)
	})

	$(".btn2").click(function() {
		s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.doTransition(tremula.layouts.basicGridLayout,{steppedScrolling:false,axes:1,staticAxisOffset:0},800,tremula.easings.easeOutElastic);
			s.setItemEasing(false);
			diableAuto();
		}, 100)
	})
	$(".btn3").click(function() {
		s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.doTransition(tremula.layouts.basicGridLayout,{steppedScrolling:false,axes:2,staticAxisOffset:0},800,tremula.easings.easeOutElastic);
			s.setItemEasing(false);
			diableAuto();
		}, 100)
	})



	$(".size1").click(function() {
		// s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.updateConfig({itemConstraint:100},true);
			diableAuto();
		}, 100)
	})

	$(".size2").click(function() {
		// s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.updateConfig({itemConstraint:200},true);
			diableAuto();
		}, 100)
	})

	$(".size3").click(function() {
		// s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.updateConfig({itemConstraint:300},true);
			diableAuto();
		}, 100)
	})



	$(".margin1").click(function() {
		// s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.updateConfig({itemMargins:[10,10]},true);
			resizeFn(tremula);
		}, 100)
	})

	$(".margin2").click(function() {
		// s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.updateConfig({itemMargins:[20,20]},true);
			resizeFn(tremula);
		}, 100)
	})

	$(".margin3").click(function() {
		// s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.updateConfig({itemMargins:[30,30]},true);
			resizeFn(tremula);
		}, 100)
	})




	$body = $("body");

	$body.on('click tremulaItemSelect',function() {
		$body.removeClass('showControls');
	})

	$('.tab').on('click',function(evt) {
		evt.stopPropagation();
		$body.toggleClass('showControls');
	})

	$(".more").on('click',function(evt) {
		evt.stopPropagation();
		$('.streamHorizontal').click();
		$body.addClass('showTweaks')
		$(".more").remove();
	})

	$(".controls").on('click',function(evt) {
		evt.stopPropagation();
		if($(evt.target).hasClass('buttons')||$(evt.target).hasClass('controls'))
			$body.removeClass('showControls');
	})

	$(".showCtrlData").on('click',function(evt) {
		toggleDebug();
	})
	

	$(".toggleReflect").click(function() {
		$body.toggleClass('doReflect');
	})
	

	$(".toggleItemEase").click(function() {
		s.setItemEasing(!s.itemEasing);
	})
	
	
	$(".toggleScrollAxis").click(function() {
		s.toggleScrollAxis();
	})
	
	
	$(".toggleIsLooping").click(function() {
		s.toggleIsLooping();
	})


	refreshData = false;//setting this to true will replace data with new results; false will append data.
	$(".toggleRefreshData").text('appending');

	$(".toggleRefreshData").click(function() {
		refreshData = !refreshData
		var label
		if(refreshData)
			label = 'replacing'
		else
			label = 'appending'
		$(".toggleRefreshData").text(label);
	})




	$(".tailScroll").click(function() {
		s.setLastTouchOrigin(s.gridDims[s.si]/2);
		s.easeTo(s.getScrollPos()-(s.getScrollViewDim()*.50),800)
	})
	
	
	$(".headScroll").click(function() {
		s.setLastTouchOrigin(s.gridDims[s.si]/2);
		s.easeTo(s.getScrollPos()+(s.getScrollViewDim()*.50),800)
	})


	$('.tremulaContainer').on('tremulaItemSelect',function(gestureEvt,domEvt){
		// console.log(gestureEvt,domEvt)
		var 
			$e = $(domEvt.target);
			t = $e.closest('.gridBox')[0];
		if(t){
			var 
				boxObj = $.data(t).model,
				data = boxObj.model.data;
		}
		
		console.log(boxObj||'no target object selected')

		if(!data)return;

		if(s.steppedScrolling){
			var o = s.getClosestScrollOriginObj();
			if(boxObj===o){
				alert('DO STUFF!');
			}else{
				s.easeToThisStepItem(boxObj);
			}
		}


	})




	function resizeSteppedScrolling(t){

		var 
			g = t.Grid,
			si = g.si,
			saDim = g.saDim,
			saGridDim = g.gridDims[si],
			firstImageScrollDim = g.getBoxFromIndex(0)&&g.getBoxFromIndex(0)[saDim]||0,
			newScrollOffset = saGridDim*.5-firstImageScrollDim*.5-g.itemMargins[si]*.5;
// console.log(newScrollOffset)
		g.updateConfig({scrollAxisOffset:newScrollOffset},true);
		t.resize();

	}



	function autoColumnCount(t){
		var
			targetSizeFactor = .9
			,g = t.Grid
			,saDim_ = g.saDim_
			,si_ = g.si_
			,currentCount = g.staticAxisCount
			,margin = g.itemMargins[si_]*2
			,eStaticAxisLessMargin = targetSizeFactor * (t.$e[saDim_]() - margin * (currentCount+1))
			,currentConstraint = g.itemConstraint
			,newCount = Math.max(0,Math.floor(eStaticAxisLessMargin/currentConstraint)-1);

		if(newCount!=currentCount){
			g.updateConfig({axes:newCount},true);
		}

	}

	function autoColumnSize(t){
		var
			targetSizeFactor = .9
			,g = t.Grid
			,saDim_ = g.saDim_
			,si_ = g.si_
			,currentCount = g.staticAxisCount
			,margin = g.itemMargins[si_]*2
			,eStaticAxisLessMargin = (t.$e[saDim_]()-margin) * (1/(currentCount+1))
			,currentConstraint = g.itemConstraint
			,newFactor = Math.max(.1,eStaticAxisLessMargin/currentConstraint)
			,newConstraint = targetSizeFactor*currentConstraint*newFactor-margin;

		if(newConstraint!=currentConstraint){
			g.updateConfig({itemConstraint:newConstraint},true);
		}

	}

	function functionName(fun) {
		  var ret = fun.toString();
		  ret = ret.substr('function '.length);
		  ret = ret.substr(0, ret.indexOf('('));
	  return ret;
	}

	function diableAuto(){
		tremula.Grid.scrollAxisOffset=0;//cleanup after any auto centering shenanigans.
		resizeFn = function(){};
	}

	resizeFn = function(){};
	
	$(".autoSize").click(function() {resizeFn = autoColumnSize; resizeFn(tremula); })
	$(".autoCount").click(function() {resizeFn = autoColumnCount; resizeFn(tremula); })
	$(".autoDisable").click(diableAuto)
	$(window).on('resize', $.debounce(250, function(){ resizeFn(tremula) }) );

	$(".loadArtDotCom").click(function(){loadArtDotCom(null,postLoadSeq)});
	$(".loadFlickr").click(function(){loadFlickr(null,postLoadSeq)})



	function loadArtDotCom(url_,cb){
		var dataUrl = 'http://ws-decor.art.com/api/decorProductSearch?engine=judy&pageNumber=1&numProducts=200&rsLimit=1000&moodId=undefined&paletteHex=dfdd78-695d87&statusMsg=0.632s%3A+200+of+1000+returned&refinements=&keyword=abstract&includePoster=true&includeArt=true&includeDecorProducts=false&totalRetrieved=0&getDataFromThisUrl=null&totalFound=1000&pageReturned=4';	

		// var dataUrl = 'decorProductSearch.json';
		$.getJSON(dataUrl,function(res){
			

			var rs = res.ImageDetails.filter(function(o,i){return o.ImageDimensions[2].PixelHeight > o.ImageDimensions[2].PixelWidth * .5});//filter out any with a really wide aspect ratio.
			if(refreshData){
				console.log('refresh',rs);
				tremula.refreshData(rs,tremula.dataAdapters.JudyItem);//art.com
				if(cb)cb();
			}else{
				console.log('append',rs);
				tremula.appendData(rs,tremula.dataAdapters.JudyItem);//art.com
				if(cb)cb();
			}
		}).fail(function(){console.log('getJSON problem.')});
	}
	
	function loadFlickr(url_,cb){
		var dataUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c149b994c54c114bd7836b61539eec2e&tags=street+art&format=json&page=1&extras=url_z';
		$.ajax({
			url:dataUrl
			,dataType: 'jsonp'
			,jsonp: 'jsoncallback' 
		})
		.done(function(res){
			console.log(res);
			var rs = res.photos.photo.filter(function(o,i){return o.height_z > o.width_z * .5});//filter out any with a really wide aspect ratio.

			if(refreshData)
				tremula.refreshData(rs,flickrSearch);//flicker
				if(cb)cb();
			else
				tremula.appendData(rs,flickrSearch);//flicker
				if(cb)cb();
		})
		.fail( function(d,config,err){ console.log('API FAIL. '+err) })
	}

	
	function loadTestData(dataUrl,cb){
		$.getJSON(dataUrl)
		.done(function(res){
			var rs = res;
			var adapter = TremulaItem;

			if(rs[0]&&rs[0].url_n || rs[0]&&rs[0].url_z){			
				// only necessary for flickr data vvvv
						adapter = flickrTest;
						rs = res.filter(function(o,i){
							o.height_z = o.height_n || o.height_z;
							o.width_z = o.width_n || o.height_z;
							o.url_z = o.url_n || o.url_z;
							return o.height_z > o.width_z * .5
						});//filter out any with a really wide aspect ratio.
				// end flickr adapter ^^^
			}


			console.log(rs);

			if(refreshData){				
				tremula.refreshData(rs,adapter);//flicker
				if(cb)cb();
			}
			else{
				tremula.appendData(rs,adapter);//flicker
				if(cb)cb();
			}

		})
		.fail( function(d,config,err){ console.log('API FAIL. '+err) })
	}






	// tremula.Grid.toggleScrollAxis('y');
	// tremula.Grid.updateConfig({steppedScrolling:true,axes:0,itemConstraint:200,itemMargins:[10,10],easeToCompensation:20,surfaceMap:thumbRollerDial});
	// tremula.Grid.updateConfig({steppedScrolling:false,axes:0,itemConstraint:100,itemMargins:[10,10],easeToCompensation:50,surfaceMap:twelveToSix});
	// tremula.Grid.updateConfig({steppedScrolling:false,axes:0,itemConstraint:100,itemMargins:[10,10],easeToCompensation:50,surfaceMap:sixToTwelve});
	// tremula.Grid.updateConfig({steppedScrolling:true,axes:0,itemConstraint:200,itemMargins:[20,20],easeToCompensation:50,surfaceMap:tremula.projections.pinterest});
	// window.resizeFn = resizeSteppedScrolling;
	// window.resizeFn(tremula)
	// toggleDebug();


	window.loadHorizontalStepped = function loadHorizontalStepped(){
		tremula.Grid.removeAll();
		tremula.Grid.updateConfig({steppedScrolling:true,axes:0,itemConstraint:200,itemMargins:[20,20],easeToCompensation:0,surfaceMap:horizontalStepped});
		window.resizeFn = resizeSteppedScrolling;
		window.resizeFn(tremula)
		loadArtDotCom(null,postLoadSeq)
	}


	window.loadHorizontalPop = function loadHorizontalPop(){
		tremula.Grid.removeAll();
		tremula.Grid.updateConfig({steppedScrolling:true,axes:0,itemConstraint:200,itemMargins:[20,20],easeToCompensation:0,surfaceMap:horizontalPop});
		window.resizeFn = resizeSteppedScrolling;
		window.resizeFn(tremula)
		loadArtDotCom(null,postLoadSeq)
	}


	window.loadMountainPop = function(){
		tremula.Grid.removeAll();
		tremula.Grid.updateConfig({steppedScrolling:true,axes:0,itemConstraint:150,itemMargins:[20,20],easeToCompensation:-15,surfaceMap:mountainPop});
		window.resizeFn = resizeSteppedScrolling;
		window.resizeFn(tremula)
		loadArtDotCom(null,postLoadSeq)
	}


	window.loadCarouselWithPop = function(){
		tremula.Grid.removeAll();
		tremula.Grid.updateConfig({steppedScrolling:true,axes:0,itemConstraint:200,itemMargins:[50,0],easeToCompensation:15,surfaceMap:carouselWithPop});
		window.resizeFn = resizeSteppedScrolling;
		window.resizeFn(tremula)
		loadArtDotCom(null,postLoadSeq)
	}



	window.loadTwelveToSix= function(){
		tremula.Grid.removeAll();
		tremula.Grid.toggleScrollAxis('y');
		tremula.Grid.updateConfig({steppedScrolling:false,axes:0,itemConstraint:100,itemMargins:[10,10],easeToCompensation:50,surfaceMap:twelveToSix});
		window.resizeFn = resizeSteppedScrolling;
		window.resizeFn(tremula)
		loadArtDotCom(null,postLoadSeq)
	}

	// loadTwelveToSix()
	// loadMountainPop()
	// loadCarouselWithPop()
	// loadHorizontalPop()
	loadArtDotCom(null,postLoadSeq)//uncomment to load basic demo dataset


	// loadTestData(
	// 	// 'test/ctrls_5.json',
	// 	'test/flickr_10_allRect.json',
	// 	// 'test/flickr_10.json',
	// 	// 'test/flickr_25.json',
	// 	postLoadSeq //<---- this is here for the stepped scrolling test
	// );

	function postLoadSeq(){
		console.log('postLoadSeq',!!tremula.steppedScrolling)
		if(tremula.Grid.steppedScrolling)
			setTimeout(function(){
				tremula.Grid.easeToClosestStepItem();
			},100);
	}

	
	return this;

}






	

