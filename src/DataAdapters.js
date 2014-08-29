define([
//	'jquery'
// 	,'text!../../../../res/icon_header_saved.svg'
// 	,'text!../../../../res/icon_header_cart.svg'
],function(
//	$
// 	,heart_svg
// 	,cart_svg
){
	
	function TremulaItem(data){
		this.data = data;
		this.imgUrl = data.imgUrl;//optional
		this.w = this.width = data.w;
		this.h = this.height = data.h;

		//meta options
		this.isLastContentBlock = data.isLastContentBlock||false;
		this.layoutType = this.data.layoutType||'tremulaInline';// ['tremulaInline' | 'tremulaBlockItem']
		this.noScaling = this.data.noScaling||false;
		this.auxClassList = data.auxClassList||'';
		this.template = this.data.template||'';

	}


//min props required for custom template content: template.

	function JudyItem(data,env){
		this.data = data;

		this.isLastContentBlock = data.isLastContentBlock;
		this.layoutType = this.data.layoutType||'tremulaInline';// ['tremulaInline' | 'tremulaBlockItem']
		this.noScaling = this.data.noScaling||false;

		this.isFavorite = data.isFavorite;

		this.auxClassList = data.auxClassList||'';

		var imgStatixAxisPx = env.options.itemConstraint;//this is the static axis constraint of a stream image -- in px.
		
		if(data.UrlInfo){
			var srcStr		= 'http://imgc.artprintimages.com/images/P-{{w}}-{{h}}-85/' + data.UrlInfo.ImageUrl.split('/MED/')[1];
			
			if(env.sx)
				this.src			= srcStr.replace(/{{w}}/,'1000').replace(/{{h}}/,imgStatixAxisPx);
			else
				this.src			= srcStr.replace(/{{h}}/,'1000').replace(/{{w}}/,imgStatixAxisPx);


			this.w = this.width = data.ImageDimensions[2].PixelWidth;
			this.h = this.height = data.ImageDimensions[2].PixelHeight;

			this.imgUrl = this.src;
			this.data.JudyLastNativeAspectImgURL = this.imgUrl;
			this.auxClassList = "judyRS " + this.auxClassList;//stamp each resultSet item with judyResultSet so it is easier to select by casper.js during testing
			
		}else{
			this.w = this.width = (this.data.w||100);
			this.h = this.height = (this.data.h||100);
			this.imgUrl = '';
		}

		this.artistName = '';
		this.artistUrl = '';
		this.itemTitle = '';
		this.itemPrice = '';

		var first_='',last_='';
		if(data.Artist) first_ = data.Artist.FirstName||'';
		if(data.Artist) last_	=	data.Artist.LastName||'';

		if(data.Artist) 		this.artistName = (first_ + " " + last_).replace(/  /g,' ').trim()||'';
		if(data.Artist) 		this.artistUrl = (data.Artist.ArtistUrl||'').replace(/gallery/g,'discover')||'';
		if(data.Title) 			this.itemTitle = data.Title||'';
		if(data.ItemPrice) 	this.itemPrice = data.ItemPrice.Price;
		this.artistNameTitle = this.artistName+((this.artistName&&this.itemTitle)?', ':'')+this.itemTitle;

		this.template = this.data.template||('<img draggable="false" class="moneyShot" onload="imageLoaded(this)" src=""/> <div class="boxLabel">{{artistNameTitle}}</div>')
			.replace(/{{artistNameTitle}}/g,this.artistNameTitle)
			//.replace(/{{artistName}}/g,this.artistName)
			//.replace(/{{artistUrl}}/g,this.artistUrl)
			.replace(/{{itemTitle}}/g,this.itemTitle)
			//.replace(/{{itemPrice}}/g,this.itemPrice);

		//-----------calculate stream sizeClass-----------
		var 
			staticAxisDim       = env.options.itemConstraint,                                  //cache the constraint value (for the static axis)
			constraintRatio     = staticAxisDim / this[env.saDim_], //how much we will enlarge/reduce the scroll axis to scale 1:1 with our staticAxis constraint
			scrollAxisDim       = this[env.saDim]*constraintRatio,  //calculate the scroll axis value
			scaledDimentionsArr	 = [scrollAxisDim,staticAxisDim];//save as relative matrix for setDimentions(w,h)


		var hash = env.options.maxWidthClassMap;
		if(hash)
		for(key in hash){
			if(scaledDimentionsArr[0]<hash[key]){
				this.auxClassList = this.auxClassList + " " + key;
				break;
			}
		}
		//console.log(this)
	}

//min props required for custom template content: template.
	


	//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c149b994c54c114bd7836b61539eec2e&tags=sky%2C+night%2C+day&format=json&page=2
	function flickrSearch(data,env){
		this.data = data;


		//meta options
		this.isLastContentBlock = data.isLastContentBlock||false;
		this.layoutType = this.data.layoutType||'tremulaInline';// ['tremulaInline' | 'tremulaBlockItem']
		this.noScaling = this.data.noScaling||false;
		this.isFavorite = data.isFavorite||false;
		this.auxClassList = data.auxClassList||'';
		

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

		// this.artistName = '';
		// this.artistUrl = '';
		this.itemTitle = data.title||'';
		// this.itemPrice = '';

		this.template = this.data.template||('<img draggable="false" class="moneyShot" onload="imageLoaded(this)" src=""/> <div class="boxLabel">{{itemTitle}}</div>')
			.replace(/{{itemTitle}}/g,'')//this.itemTitle
			//.replace(/{{artistNameTitle}}/g,this.artistNameTitle)
			//.replace(/{{artistName}}/g,this.artistName)
			//.replace(/{{artistUrl}}/g,this.artistUrl)
			//.replace(/{{itemPrice}}/g,this.itemPrice);

		//-----------calculate stream sizeClass-----------
		// var 
		// 	staticAxisDim       = env.options.itemConstraint,				//cache the constraint value (for the static axis)
		// 	constraintRatio     = staticAxisDim / this[env.saDim_], //how much we will enlarge/reduce the scroll axis to scale 1:1 with our staticAxis constraint
		// 	scrollAxisDim       = this[env.saDim]*constraintRatio,  //calculate the scroll axis value
		// 	scaledDimentionsArr	 = [scrollAxisDim,staticAxisDim];		//save as relative matrix for setDimentions(w,h)


		// var hash = env.options.maxWidthClassMap;
		// if(hash)
		// for(key in hash){
		// 	if(scaledDimentionsArr[0]<hash[key]){
		// 		this.auxClassList = this.auxClassList + " " + key;
		// 		break;
		// 	}
		// }
	}



	function JudyItem_SQ(data){
		this.imgUrl_SM = data.UrlInfo.ImageUrl;
		this.imgUrl_LG = data.UrlInfo.XLargeUrl;
		this.imgUrl_ZOOM = data.UrlInfo.ZoomUrlWithoutWatermark;
		this.imgUrl_SQ = data.UrlInfo.CroppedSquareImageUrl;
		
		this.data = data;
		this.w = this.width = 100;//data.ImageDimensions[2].PixelWidth;
		this.h = this.height = 100;//data.ImageDimensions[2].PixelHeight;
		this.imgUrl = this.imgUrl_SQ;
		this.data.JudyLastNativeAspectImgURL = null;
	}





	return{
		TremulaItem:TremulaItem
		,flickrSearch:flickrSearch
		,JudyItem:JudyItem
		,JudyItem_SQ:JudyItem_SQ
	}



});









