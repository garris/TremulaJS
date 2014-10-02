# TremulaJS

**Picture Streams + Momentum Engine + Bézier Paths + Cross-Browser + Cross-Device**  

TremulaJS is a client-side javascript UI component providing Bézier-based content-stream interactions with momentum & physics effects for mouse, scroll and and touch UIs. 

**Put another way, TremulaJS can be thought of as an extremely bad-ass image carousel.**  

**[Watch the TremulaJS video demo here](https://vimeo.com/99481197)**  

<a href="https://vimeo.com/99481197">![tremula vimeo image](docs/vimeo.png)</a>

While there are some monumental physics-based JS animation frameworks out there -- most notably, [famo.us](http://famo.us), [gsap](http://greensock.com/gsap) and [velocity.js](http://velocityjs.org/) -- TremulaJS was built with a very specific end in mind: to enable the kind of long-running, low-friction user interactions one might enjoy when navigating large sets of visual data.

See TremulaJS in the wild: <a href="http://www.art.com/discover/keyword--gogh/posters.htm?searchstring=GOGH" title="TremulaJS on art.com" target="_blank">currently in production on Art.com</a>.

TremulaJS is compatible with all recent versions of iOS Safari, Chrome, OS X Safari, FF, IE. The component is currently in use on Art.com.

TremulaJS was developed by [Garris Shipon](http://garriss.wordpress.com/) at [Art.com Labs](http://art.com/).  

Licensed under GPLv3.

**follow [@garris](https://twitter.com/garris)**  

## More info...

- See [the demo video](https://vimeo.com/99481197) (2.5 min), illustrating some of the visual possibilities.  

- Play with the [live component demo](http://garris.github.com/TremulaJS)  

- Experiment with the configuration file on [CodePen](http://codepen.io/garris/pen/bevqG?editors=001)  

- Get up-and-running with the [fully-documented boilerplate file](https://gist.github.com/garris/2214de2100a4a67a2899), includes a summary of all configuration settings.  

- Download, Fork, Contribute on [GitHub](https://github.com/garris/TremulaJS.git)

- Learn how to create your own Grid Projections -- technical articles coming soon... stay tuned!


### Dependencies

- HammerJS *(A most awesome touch event component)*
- JsBezier *(Thank you Simon Porritt !)*
- jQuery *(Is jQuery the most important, most useful JS library ever? Yes, in 2009. Wouldn't it be nice to tweak a few lines and drop the jQuery requirement — yup. Will someone step forward and help me do it? Well, will you? punk...)*

### Tested in the following browsers
iOS Safari, Chrome, OS X Safari, FF, IE (recent versions) 


### Running mocha.js tests
open /TremulaJS/test.html in the web browser of your choice.



### Building with r.js
		step 1. cd to the root /TremulaJS/ directory
		step 2. $ node r.js -o build.js; node r.js -o cssIn=src/Tremula.css out=dist/Tremula.css optimizeCss=standard
