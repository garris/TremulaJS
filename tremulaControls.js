function attachDemoControls(tremula){

	var s = tremula.Grid;

	$(".centerLinear").click(function() {
		s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.doTransition(tremula.layouts.basicGridLayout,{axes:0,itemConstraint:200},800,tremula.easings.easeOutElastic,tremula.projections.centerLinear);
			resizeFn(tremula)
		}, 100)
	})

	$(".btnL1").click(function() {
		s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.doTransition(tremula.layouts.basicGridLayout,{axes:0,itemConstraint:200},800,tremula.easings.easeOutElastic,tremula.projections.xyPlane);
			resizeFn(tremula)
		}, 100)
	})
	
	$(".btnL2").click(function() {
		s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.doTransition(tremula.layouts.basicGridLayout,{axes:0,itemConstraint:350},800,tremula.easings.easeOutElastic,tremula.projections.turntable);
			s.setItemEasing(false);
			resizeFn(tremula)
		}, 100)
	})
	
	$(".btnL3").click(function() {
		s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.doTransition(tremula.layouts.basicGridLayout,{axes:0,itemConstraint:350},800,tremula.easings.easeOutElastic,tremula.projections.enterTheDragon);
			s.setItemEasing(false);
			resizeFn(tremula)
		}, 100)
	})
	
	$(".btnL4").click(function() {
		s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.doTransition(tremula.layouts.basicGridLayout,{axes:0,itemConstraint:100},800,tremula.easings.easeOutElastic,tremula.projections.sunrise);
			s.setItemEasing(false);
			resizeFn(tremula)
		}, 100)
	})
	$(".mountain").click(function() {
		s.jumpToScrollProgress(0);
		setTimeout(function(){
			$body.addClass('doReflect');
			s.doTransition(tremula.layouts.basicGridLayout,{axes:0,itemConstraint:200,itemMargins:[10,10]},800,tremula.easings.easeOutElastic,tremula.projections.mountain);
			s.setItemEasing(false);
			resizeFn(tremula)
		}, 100)
	})
	
	$(".btnL5").click(function() {
		s.jumpToScrollProgress(0);
		setTimeout(function(){
			$body.removeClass('doReflect');
			s.doTransition(tremula.layouts.basicGridLayout,{axes:0,itemConstraint:200,itemMargins:[5,5]},800,tremula.easings.easeOutElastic,tremula.projections.headExpansion);
			s.setItemEasing(false);
			resizeFn(tremula)
		}, 100)
	})
	
	
	$(".btn1").click(function() {
		s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.doTransition(tremula.layouts.basicGridLayout,{axes:0},800,tremula.easings.easeOutElastic);
			s.setItemEasing(false);
			diableAuto();
		}, 100)
	})

	$(".btn2").click(function() {
		s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.doTransition(tremula.layouts.basicGridLayout,{axes:1},800,tremula.easings.easeOutElastic);
			s.setItemEasing(false);
			diableAuto();
		}, 100)
	})
	$(".btn3").click(function() {
		s.jumpToScrollProgress(0);
		setTimeout(function(){
			s.doTransition(tremula.layouts.basicGridLayout,{axes:2},800,tremula.easings.easeOutElastic);
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

	$body.on('click',function() {
		$body.removeClass('showControls');
	})

	$(".controls").on('click','.tab',function(evt) {
		evt.stopPropagation();
		$body.toggleClass('showControls');
	})

	$(".controls").on('click',function(evt) {
		evt.stopPropagation();
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
			var data = $.data(t).model.model.data;
		}
		console.log(data||{})
	})






	function autoColumnCount(t){
		var
			targetSizeFactor = .9
			,g = t.Grid
			,saDim_ = g.saDim_
			,si_ = g.si_
			,currentCount = g.staticAxisCount
			,margin = g.itemMargins[si_]*2
			,eStaticAxisLessMargin = targetSizeFactor * (t.$e[saDim_]() - margin * (currentCount+2))
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

	function diableAuto(){resizeFn = function(){};}

	window.resizeFn = function(){};
	
	$(".autoSize").click(function() {resizeFn = autoColumnSize; resizeFn(tremula); })
	$(".autoCount").click(function() {resizeFn = autoColumnCount; resizeFn(tremula); })
	$(".autoDisable").click(diableAuto)
	$(window).on('resize', $.debounce(250, function(){ resizeFn(tremula) }) );

	$(".loadArtDotCom").click(loadArtDotCom)
	$(".loadFlickr").click(loadFlickr)



	function loadArtDotCom(){
		// var dataUrl = 'http://ws-decor.art.com/api/decorProductSearch?engine=judy&pageNumber=1&numProducts=100&rsLimit=1000&moodId=undefined&paletteHex=dfdd78-695d87&statusMsg=0.632s%3A+200+of+1000+returned&refinements=&keyword=abstract&includePoster=true&includeArt=true&includeDecorProducts=false&totalRetrieved=0&getDataFromThisUrl=null&totalFound=1000&pageReturned=4';	

		var dataUrl = 'decorProductSearch.json';
		$.getJSON(dataUrl,function(res){
			if(refreshData)
				tremula.refreshData(res.ImageDetails,tremula.dataAdapters.JudyItem);//art.com
			else
				tremula.appendData(res.ImageDetails,tremula.dataAdapters.JudyItem);//art.com

		}).fail(function(){console.log('getJSON problem.')});
	}
	
	function loadFlickr(){
		var dataUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c149b994c54c114bd7836b61539eec2e&tags=sky%2C+night&format=json&page=1&extras=url_z';
		$.ajax({
			url:dataUrl
			,dataType: 'jsonp'
			,jsonp: 'jsoncallback' 
		})
		.done(function(res){
			console.log(res);
			if(refreshData)
				tremula.refreshData(res.photos.photo,tremula.dataAdapters.flickrSearch);//flicker
			else
				tremula.appendData(res.photos.photo,tremula.dataAdapters.flickrSearch);//flicker
		})
		.fail( function(d,config,err){ console.log('API FAIL. '+err) })
	}


	loadArtDotCom()//uncomment to load something automaticly on launch

}






	

