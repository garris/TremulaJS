// TO BUILD:  cd to the /TremulaJS/ directory (the directory with this file) and run...
// $ node r.js -o build.js; node r.js -o cssIn=src/Tremula.css out=dist/Tremula.css optimizeCss=standard
	
	
({	
	//- paths are relative to this build.js file
	baseUrl: "src" //- this is the directory where the source .js goes
	//,dir: "dist" //- this is the directory that the new files will be. it will be created if it doesn't exist
	,out:'dist/Tremula.min.js'//this is the name of the new compiled js file
	// ,removeCombined: true //
	,name: "almond"
	,include: "Tremula"
	,insertRequire:['Tremula']
	,wrap: true
	// ,optimize:'none'
	// ,generateSourceMaps: true
	// ,preserveLicenseComments: true

})