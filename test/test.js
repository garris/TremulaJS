


var expect = chai.expect;

mocha.setup({
	ui:'bdd'
	,timeout: 5000 //ms
});

describe("TremulaJS", function() {

	describe("instantiated tremula obj", function() {

		it("it has a Grid obj", function() {
			expect(tremula.Grid).to.be.an('object');
		});

		it("it has no boxes", function() {
			expect(tremula.Grid.boxes).to.be.an('array');
			expect(tremula.Grid.boxes).to.have.length(0);
		});

	});//instantiated tremula obj


	// test60();
	// test10();
	test120();


});//TremulaJS




setTimeout(mocha.run,1200);



function test10(){

	describe("loading 6 items + lastContent", function() {


		var contentDims_ = [1281,1539];//ADD "height check to test vals"

		it("it now has 7 boxes", function(done) {
			loadTestData(6,function(err){
				var o = tremula.Grid;
				expect(o.boxes).to.have.length(7);
				done(err);
			});//loadTestData()
		});//it now has 7 boxes


		it("it calculates good content layout parameters", function() {
			var o = tremula.Grid;

			//expected content dimentions
			expect(Math.floor(o.contentDims[o.si])).to.equal(contentDims_[o.si]);
			
			//expected tail-related value
			// expect(o.contentDims[o.si]-o.gridDims[o.si]+o.scrollAxisOffset).to.equal(o.absTrailingEdgeScrollPos);
			
			//firstItemPostition should default to null
			expect(o.firstItemPos).to.be.equal(-o.scrollMargin[o.si]);

			//scrollPostition should default to within a few pixels of 1.
			// expect(o.absScrollPos).to.be.within(-1,3);
		
		});

		it("it tracks content/env interaction parameters", function() {
			var o = tremula.Grid;
			resizeTo(o.contentDims[o.si]+1,o.sx);
			expect(o.hasShortGridDimsSi).to.be.true;
			resizeTo(o.contentDims[o.si]-1,o.sx);
			expect(o.hasShortGridDimsSi).to.be.false;

			resizeTo('',o.sx);//defaults to auto
		});//


		it("it hot-updates config context successfully", function() {
			var o = tremula.Grid;
			o.toggleScrollAxis('y');
			expect(o.sx).to.be.false;
			// o.updateConfig({itemConstraint:300});
			// expect(o.SOMETHING).to.equal.SOMETHING;

		});




	});

}

function test120(){

	describe("loading 60 items + lastContent", function() {

		var contentDims_ = [8531,6263];//ADD "height check to test vals"

		it("it now has 61 boxes", function(done) {
			loadTestData(60,function(err){
				var o = tremula.Grid;
				expect(o.boxes).to.have.length(61);
				expect(o.sx).to.equal.true;
				done(err);
			});//loadTestData()
		});//it now has 61 boxes

		it("it calculates good content layout parameters", function() {
			var o = tremula.Grid;

			//expected content dimentions
			expect(Math.floor(o.contentDims[o.si])).to.equal(contentDims_[o.si]);
			
			//expected tail-related value
			// expect(o.contentDims[o.si]-o.gridDims[o.si]+o.scrollAxisOffset).to.equal(o.absTrailingEdgeScrollPos);
			
			//firstItemPostition should default to null
			expect(o.firstItemPos).to.be.equal(-o.scrollMargin[o.si]);

			//scrollPostition should default to within a few pixels of 1.
			// expect(o.absScrollPos).to.be.within(-1,3);
		
		});



	});//loading 60 items + lastContent


	describe("loading 60 MORE items + lastContent", function() {

		var contentDims_ = [16543,6263];//ADD "height check to test vals"

		it("it now has 121 boxes", function(done) {
			loadTestData(60,function(err){
				var o = tremula.Grid;
				expect(o.boxes).to.have.length(121);
				expect(o.sx).to.equal.true;
				done(err);
			},true);//loadTestData() <===== append data flag == true here
		});//it now has 61 boxes


		it("it calculates good content layout parameters", function() {
			var o = tremula.Grid;

			//expected content dimentions
			expect(Math.floor(o.contentDims[o.si])).to.equal(contentDims_[o.si]);
			
			//expected tail-related value
			// expect(o.contentDims[o.si]-o.gridDims[o.si]+o.scrollAxisOffset).to.equal(o.absTrailingEdgeScrollPos);
			
			//firstItemPostition should default to null
			expect(o.firstItemPos).to.be.equal(-o.scrollMargin[o.si]);

			//scrollPostition should default to within a few pixels of 1.
			// expect(o.absScrollPos).to.be.within(-1,3);
		
		});

	});

}//test 120




function test60(){

	describe("loading 60 items + lastContent", function() {

		var contentDims_ = [8531,6263];//ADD "height check to test vals"

		it("it now has 61 boxes", function(done) {
			loadTestData(60,function(err){
				var o = tremula.Grid;
				expect(o.boxes).to.have.length(61);
				expect(o.sx).to.equal.true;
				done(err);
			});//loadTestData()
		});//it now has 61 boxes


		it("it calculates good content layout parameters", function() {
			var o = tremula.Grid;

			//expected content dimentions
			expect(Math.floor(o.contentDims[o.si])).to.equal(contentDims_[o.si]);
			
			//expected tail-related value
			// expect(o.contentDims[o.si]-o.gridDims[o.si]+o.scrollAxisOffset).to.equal(o.absTrailingEdgeScrollPos);
			
			//firstItemPostition should default to null
			expect(o.firstItemPos).to.be.equal(-o.scrollMargin[o.si]);

			//scrollPostition should default to within a few pixels of 1.
			// expect(o.absScrollPos).to.be.within(-1,3);
		
		});


		it("it hot-updates config context successfully", function() {
			var o = tremula.Grid;
			o.toggleScrollAxis('y');
			expect(o.sx).to.be.false;
			// o.updateConfig({itemConstraint:300});
			// expect(o.SOMETHING).to.equal.SOMETHING;

		});


		// it("it calculates the content layout parameters after context switch", function() {
		// 	var o = tremula.Grid;

		// 	//expected content dimentions
		// 	expect(Math.floor(o.contentDims[o.si])).to.equal(contentDims_[o.si]);
			
		// 	//expected tail-related value
		// 	expect(o.contentDims[o.si]-o.gridDims[o.si]+o.scrollAxisOffset).to.equal(o.absTrailingEdgeScrollPos);
		
		// });




		it("it hot-updates successfully again", function() {
			var o = tremula.Grid;
			o.toggleScrollAxis('x');
			expect(o.si).to.equal(0);
			// o.updateConfig({itemConstraint:300});
			// expect(o.SOMETHING).to.equal.SOMETHING;

		});
		// it("it tracks content/env interaction parameters", function() {
		// 	var o = tremula.Grid;

		// });

	});//loading 60 items + lastContent

}

//========HELPERS=========

function resizeTo (d,sx) {
	if(sx)
		$('.tremulaContainer').width(d);
	else
		$('.tremulaContainer').height(d);

	tremula.resize();
}

