tremulaConfigs = {
	
	large1Row: function(){ 
		return ({

			displayFlag:function(){return true},
			onChangePub			: this.doScrollEvents,
			data                : null,
			maxWidthClassMap		: {mini:50,small:143,medium:244,large:2000},//large will apply to anything over medium limit
			lastContentBlock 		: {template :'<div class="lastContentItem"></div>',layoutType :'tremulaBlockItem',noScaling:true,w:300,h:390,isLastContentBlock:true},
			adapter             : this.dataAdapters.JudyItem,
			itemConstraint      :200,
			itemMargins         :[30,30],
			staticAxisOffset    :18,//px
			scrollAxisOffset    :20,//px
			scrollAxis          :'x',
			staticAxisCount     :0,//zero based
			//isLooping         :true,
			defaultLayout       :this.layouts.basicGridLayout,//<--- TODO:  this is not yet implemented.
			surfaceMap          :this.projections.headExpansion,
			itemPreloading      :true,
			itemEasing           :false,
			itemEasingParams    :{
				touchCurve          :this.easings.easeOutCubic,
				swipeCurve          :this.easings.easeOutCubic,
				transitionCurve     :this.easings.easeOutElastic,
				easeTime            :1000,
				springLimit         :80 //in px
			}
		})
	},//large2Row


	sm3Row: function(){ 
		return ({

			displayFlag:function(){return true},
			onChangePub			: this.doScrollEvents,
			data                : null,
			maxWidthClassMap		: {mini:50,small:143,medium:244,large:2000},//large will apply to anything over medium limit
			lastContentBlock 		: {template :'<div class="lastContentItem"></div>',layoutType :'tremulaBlockItem',noScaling:true,w:300,h:390,isLastContentBlock:true},
			adapter             : this.dataAdapters.JudyItem,
			itemConstraint      :80,
			itemMargins         :[30,30],
			staticAxisOffset    :20,//px
			scrollAxisOffset    :20,//px
			scrollAxis          :'x',
			staticAxisCount     :0,//zero based
			//isLooping         :true,
			defaultLayout       :this.layouts.basicGridLayout,//<--- TODO:  this is not yet implemented.
			surfaceMap          :this.projections.xyPlane,
			itemPreloading      :true,
			itemEasing          :true,
			itemEasingParams    :{
				touchCurve          :this.easings.easeOutCubic,
				swipeCurve          :this.easings.easeOutCubic,
				transitionCurve     :this.easings.easeOutElastic,
				easeTime            :1000,
				springLimit         :80 //in px
			}
		})
	}//large2Row

}