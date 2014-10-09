
	
	function TremulaItem(data){
		this.data = data;
		this.imgUrl = data.imgUrl;//optional
		this.w = this.width = data.w;
		this.h = this.height = data.h;

		//options
		this.isLastContentBlock 			= data.isLastContentBlock||false;
		this.layoutType 					= data.layoutType||'tremulaInline';// ['tremulaInline' | 'tremulaBlockItem']
		this.noScaling 						= data.noScaling||false;
		this.isFavorite 					= data.isFavorite||false;
		this.auxClassList 					= data.auxClassList||'';
		this.template 						= this.data.template||('<img class="moneyShot" onload="imageLoaded(this)" src=""/>')
	}



	


	// for use with...
	// https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c149b994c54c114bd7836b61539eec2e&tags=sky%2C+night%2C+day&format=json&page=1
	function flickrSearch(data,env){

		this.data = data;


		//meta options
		this.isLastContentBlock 	= data.isLastContentBlock||false;
		this.layoutType 					= data.layoutType||'tremulaInline';// ['tremulaInline' | 'tremulaBlockItem']
		this.noScaling 						= data.noScaling||false;
		this.isFavorite 					= data.isFavorite||false;
		this.auxClassList 				= data.auxClassList||'';
		

		//this is the static axis constraint of a stream image -- in px.
		var imgStatixAxisPx = env.options.itemConstraint;
		

		//if this data item has an expected URL parameter then it is an image -- otherwise it is probably an arbitrary html layout
		if(data.url_z){
			this.src = data.url_z
			this.w = this.width = data.width_z;
			this.h = this.height = data.height_z;
			this.imgUrl = this.src;
			this.auxClassList = "flickrRS " + this.auxClassList;//stamp each resultSet item with judyResultSet so it is easier to select by casper.js during testing
		}else{
			this.w = this.width = (this.data.w||100);
			this.h = this.height = (this.data.h||100);
			this.imgUrl = '';
		}

		this.itemTitle = data.title||'';

		this.template = this.data.template||('<img draggable="false" class="moneyShot" onload="imageLoaded(this)" src=""/>')
	}
	


	// for use with...
	// https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c149b994c54c114bd7836b61539eec2e&tags=sky%2C+night%2C+day&format=json&page=1
	function flickrTest(data,env){

		this.data = data;


		//meta options
		this.isLastContentBlock 	= data.isLastContentBlock||false;
		this.layoutType 					= data.layoutType||'tremulaInline';// ['tremulaInline' | 'tremulaBlockItem']
		this.noScaling 						= data.noScaling||false;
		this.isFavorite 					= data.isFavorite||false;
		this.auxClassList 				= data.auxClassList||'';
		

		//this is the static axis constraint of a stream image -- in px.
		var imgStatixAxisPx = env.options.itemConstraint;
		

		//if this data item has an expected URL parameter then it is an image -- otherwise it is probably an arbitrary html layout
		if(data.url_z){
			this.src = data.url_z
			this.w = this.width = data.width_z;
			this.h = this.height = data.height_z;
			this.imgUrl = this.src;
			this.auxClassList = "flickrRS " + this.auxClassList;//stamp each resultSet item with judyResultSet so it is easier to select by casper.js during testing
		}else{
			this.w = this.width = (this.data.w||100);
			this.h = this.height = (this.data.h||100);
			this.imgUrl = '';
		}

		this.itemTitle = data.title||'';

		//this.template = this.data.template||('<img draggable="false" class="moneyShot" onload="imageLoaded(this)" src=""/>')
	}




