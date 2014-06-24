// to build.  cd to this directory and run...
// $ node r.js -o build.js
	
	
({	
	//- paths are relative to this build.js file
	baseUrl: "src", //- this is the directory where the source .js goes
	dir: "dist", //- this is the directory that the new files will be. it will be created if it doesn't exist
	removeCombined: true, //
    name: "TremulaJS", //this is the name of the new compiled js file
})