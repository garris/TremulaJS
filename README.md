# TremulaJS

**Picture Streams + Momentum Engine + Bézier Paths + Cross-Browser + Cross-Device**  

TremulaJS (trem-yoo-la) is a client-side javascript UI component providing Bézier-based content-stream interactions with momentum & physics effects for mouse, scroll and and touch UIs. 

**Put another way, TremulaJS can be thought of as an extremely bad-ass image carousel.**  

**[Watch the TremulaJS video demo here](https://vimeo.com/99481197)**  

<a href="https://vimeo.com/99481197">![tremula vimeo image](docs/vimeo.png)</a>


The TremulaJS project began as an exercise to create an Apple-style momentum-scroller for Javascript. The project eventually grew into a tool able to synthesize live visual content feeds into compelling path-based interactions.

TremulaJS is compatible with all recent versions of iOS Safari, Chrome, OS X Safari, FF, IE. The component is currently in use on Art.com.

TremulaJS was developed by [Garris Shipon](http://garriss.wordpress.com/) at [Art.com Labs](http://art.com/).  
Open Sourced under The MIT License

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
- jQuery *(TremulaJS uses only a little bit of jQuery. Would be happy to remove it from the project in the future.)*

### Tested in the following browsers
iOS Safari, Chrome, OS X Safari, FF, IE (recent versions) 


### running mocha.js tests
open /TremulaJS/test.html in the web browser of your choice.



### Building with r.js
		step 1. cd to the root /TremulaJS/ directory
		step 2. $ node r.js -o build.js; node r.js -o cssIn=src/Tremula.css out=dist/Tremula.css optimizeCss=standard

