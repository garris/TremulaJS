tremulaConfigs = {
	
	default: function(){ 
		return ({
			onChangePub					: this.doScrollEvents,
			data                : null,
			maxWidthClassMap		: {mini:50,small:143,medium:244,large:2000},//large will apply to anything over medium limit
			lastContentBlock 		: {template :'<div class="lastContentItem"></div>',layoutType :'tremulaBlockItem',noScaling:true,w:300,h:390,isLastContentBlock:true},
			adapter             : null,//this.dataAdapters.JudyItem,//a default adapter incase none is specified during import
			itemConstraint      :300,
			itemMargins         :[30,30],
			staticAxisOffset    :11,//px
			scrollAxisOffset    :20,//px
			scrollAxis          :'x',
			staticAxisCount     :0,//zero based
			isLooping         	:false,
			defaultLayout       :this.layouts.basicGridLayout,//<--- TODO:  this is not yet implemented.
			surfaceMap          :this.projections.streamHorizontal,
			itemPreloading      :true,
			itemEasing          :false,
			itemEasingParams    :{
				touchCurve          :this.easings.easeOutCubic,
				swipeCurve          :this.easings.easeOutCubic,
				transitionCurve     :this.easings.easeOutElastic,
				easeTime            :500,
				springLimit         :40 //in px
			}
		});
	} //end default

}//end tremulaConfigs