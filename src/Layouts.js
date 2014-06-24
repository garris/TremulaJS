define([],function(){

	
	function basicGridLayout(b,options){
		var layoutId = 'basicGridLayout';
		var grid = this;

		options=(!options)?{}:options;
		var axisCount = options.axes||options.staticAxisCount;

		//make sure we have at least one row (zero based)
		if(!axisCount)axisCount=0;
		
		//tack an array onto the parent model to cache multiple row lenghts & last object on each axis
		if(!grid.layout_cache) grid.layout_cache = {
			lastLayoutOptions   : options,
			lastLayoutId            : layoutId,
			axesLengthArr       : new Array(axisCount),
			lastAxesObjArr      :  new Array(axisCount)
		}

		//cache our app values
		var 
			i = b.index,
			c = grid.itemConstraint,
			//staticDim = b.dims[that.si_],
			m = [grid.itemMargins[0]*2,grid.itemMargins[1]*2],
			axesLengthArr = grid.layout_cache.axesLengthArr,
			lastAxesObjArr = grid.layout_cache.lastAxesObjArr,
			layoutType = b.layoutType;
		
		var targetAxis = (layoutType=='tremulaBlockItem')?getLongestAxis():getShortestAxis();//requires that.axesLength
		
		//tell our box what axis its on
		b.staticAxis = targetAxis;
		// b.staticAxis = (b.layoutType=='tremulaBlockItem')?0:targetAxis;

		//SNAKE PATTERN: subsequent items follow previous items
		//NOTE: THE FIRST ITEM'S TAIL POSITION VALUE IS SET TO A POSITIVE OFFSET. 
		//       SUBSEQUENT ITEMS ARE POSITIONED AT A NEGATIVE OFFSET.
		//set head and tail positional values
		if(!lastAxesObjArr[targetAxis]){//this is the first item in the list (it has no previous object reference)
			//set the head point of the first object to ZERO scroll origin
			b.headPointPos[grid.si] = 0;
		
		}else{
			//this item is somewhere in the list
			b.prevObj = lastAxesObjArr[targetAxis];//the previous object is this object's preceeding sibling on the same axis. 
			b.prevObj.nextObj = b; //this object is the previous object's next object.  Like that definition? thought you would.

			//cache the tail point value of the preceeding object for use in setting the scrollAxis point of this object.
			//if this is a block item then use the last item of the longest axis
			var ltpp = b.prevObj.tailPointPos;
			// var ltpp = (b.layoutType=='tremulaBlockItem')? UPDATETHIS :b.prevObj.tailPointPos;

			//start point of scrollAxis edge
			b.headPointPos[grid.si] = ltpp[grid.si];//set the head point of the first object to the end point of the previous object

		}//end IF
		
		//cache the tail staticAxis ofset point for this object.
		var offset = (layoutType=='tremulaBlockItem') ? 0 : c*targetAxis + m[grid.si_]*targetAxis;
		//start point of staticAxis edge
		b.headPointPos[grid.si_] = offset;


		b.tailPointPos = [ //the tail point values are equal to the start value plus the object dims plus margin
			b.headPointPos[0]+b.w+m[0],
			b.headPointPos[1]+b.h+m[1]
		];
		
		b.outerDims =[
			b.tailPointPos[0]-b.headPointPos[0],
			b.tailPointPos[1]-b.headPointPos[1]
		]
		
		//this item will be the previous item for the next item on the same axis.
		lastAxesObjArr[targetAxis] = b;
		
		axesLengthArr[targetAxis] = (axesLengthArr[targetAxis]||0) + b.dims[grid.si];
		
		
		function getShortestAxis(){
			var shorty = 0;
			if (axisCount > 0){
				for(var i = 1; i <= axisCount; i++){
					if(!axesLengthArr[shorty]) return shorty;
					if(!axesLengthArr[i]) return i;
					shorty = (axesLengthArr[i] < axesLengthArr[shorty])? i : shorty;
				}
			}
			return shorty;
		}//getShortestAxis
		
		function getLongestAxis(){
			var longestAxis = 0;
			if (axisCount > 0){
				for(var i = 1; i <= axisCount; i++){
					longestAxis = (axesLengthArr[i] > axesLengthArr[longestAxis])? i : longestAxis;
				}
			}
			return longestAxis;
		}//getLongestAxis
		
	}//basicGridLayout

	
	
	
	
	
	
	function stackLayout(b,options){
		var grid = this;
		
		options=(!options)?{}:options;
		var axisCount = options.axisCount;
		
		//cache our index
		var
			i = b.index;//,
			//m = [grid.itemMargins[0]*2,grid.itemMargins[1]*2];
		
		//SNAKE PATTERN: subsequent items follow previous items
		//NOTE: THE FIRST ITEM'S TAIL POSITION VALUE IS SET TO A POSITIVE OFFSET == SUBSEQUENT ITEMS ARE POSITIONED AT A NEGATIVE OFFSET.
		//set head and tail positional values
		if(i==0){//this is the first item in the list (it has no previous object reference)
			//set the head point of the first object to ZERO scroll origin
			b.headPointPos = [0,0];
		
		}else{
		
			b.prevObj = grid.boxes[i-1];//the previous object is this object's preceeding sibling. Enough said.
			b.prevObj.nextObj = b; //this object is the previous object's next object.  Like grid definition? thought you would.

			//cache the tail point value of the preceeding object for use in setting the scrollAxis point of this object.
			var l = b.prevObj.tailPointPos;
			//start point of scrollAxis edge
			b.headPointPos[grid.si] = l[grid.si];//set the head point of the first object to the end point of the previous object

			//cache the tail point value of the preceeding object for use in setting the staticAxis point of this object.
			var offset = l[grid.si];//0;
			//start point of staticAxis edge
			b.headPointPos[grid.si_] = offset;//set the head point of the first object to the end point of the previous object
			
		}//end IF

		b.tailPointPos = [ //the tail point values are equal to the start value plus the object dims plus margin
			20+b.headPointPos[0],//+b.w+that.itemMargins[0]*2,
			b.headPointPos[1]//+b.h+that.itemMargins[1]*2
		];
	}//stackLayout()



	return{
		basicGridLayout:basicGridLayout,
		stackLayout:stackLayout
	}

});









