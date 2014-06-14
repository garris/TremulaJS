//SLINKY CONFIG
function large2Row(){ 
	return ({

		displayFlag:function(){return true},
		onChangePub			: this.doScrollEvents,
		data                : null,
		maxWidthClassMap		: {mini:50,small:143,medium:244,large:2000},//large will apply to anything over medium limit
		lastContentBlock 		: {template :'<div class="lastContentItem">' + ps_loading_html + '</div>',layoutType :'slinkyBlockItem',noScaling:true,w:300,h:390,isLastContentBlock:true},
		adapter             : this.slinky.dataAdapters.JudyItem,
		itemConstraint      :170,
		itemMargins         :[5,25],
		staticAxisOffset    :18,//px
		scrollAxisOffset    :10,//px
		scrollAxis          :'x',
		staticAxisCount     :1,//zero based
		//isLooping         :true,
		defaultLayout       :this.slinky.layouts.basicGridLayout,//<--- TODO:  this is not yet implemented.
		surfaceMap          :this.slinky.surfaceMaps.xyPlane,
		itemPreloading      :true,
		//itemEasing            :true,
		itemEasingParams    :{
			touchCurve          :this.slinky.easings.easeOutCubic,
			swipeCurve          :this.slinky.easings.easeOutCubic,
			transitionCurve     :this.slinky.easings.easeOutElastic,
			easeTime            :1900,
			springLimit         :20 //in px
		}
	})
}