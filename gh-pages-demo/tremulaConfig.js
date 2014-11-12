tremulaConfigs = {
	
	default: function(){ 
		return ({
			onChangePub					: this.doScrollEvents,
			data                : null,
			maxWidthClassMap		: {mini:50,small:143,medium:244,large:2000},//large will apply to anything over medium limit
			lastContentBlock 		: {
				template :'<div class="lastContentItem">This item will remain at the end of the stream.  Use it for a loading message continer if you like.</div>',
				layoutType :'tremulaBlockItem',
				noScaling:true,
				w:300,
				h:390,
				isLastContentBlock:true,
				adapter:this.dataAdapters.TremulaItem
			},
			adapter             : null,//this.dataAdapters.JudyItem,//a default adapter incase none is specified during import
			itemConstraint      :300,
			itemMargins         :[30,30],
			staticAxisOffset    :0,//px
			scrollAxisOffset    :20,//px
			scrollAxis          :'x',
			staticAxisCount     :0,//zero based
			isLooping         	:false,
			ignoreUserEvents		:false,//when true, Tremula will not initalize touch or pointer handling. In this mode TremulaJS works more like a responsive layout machine.
			defaultLayout       :this.layouts.basicGridLayout,//<--- TODO:  this is not yet implemented.
			surfaceMap          :this.projections.streamHorizontal,//for your own projections try-->  surfaceMap:userProjection then edit tremulaProjections.js
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