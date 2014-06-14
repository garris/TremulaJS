define([],function(){

                var Animator = function(options) {
                    if(!options)options={};
                    
                    var parent = options.parent;
                    
                    this.resetAnimation = function() {
                        this.easingCurve = options.easingCurve
                        this.easeToDuration = options.easeTime||500;//ms
                        this.isEasing = false;
                        this.activeDuration = 0;
                        this.easingProgress = this.activeDuration;
                        this.easeFactor = 0;
                        this.easingStartTime = 0;
                        this.easeToStart = 0;
                        this.easeToDiff = 0;
                        options.parent.isEasing = false;
                    }//resetAnimation
                    
                    
                    this.animateFrTo = function(from,to,ms,eFn) {
                    
                        ms = (ms==undefined)?this.easeToDuration:ms;
                        //ms = (parent.getLayoutIsXing())?parent.getLayoutXingMs():ms;
                        if(eFn)
                            this.easingCurve = eFn;
                        
                        var mTime = ms;// * f;
                        var d = from-to;

                        this.easeToDiff = -1*(d);//distance between start & end
                            
                        this.isEasing = true;
                        this.activeDuration=mTime;
                        this.easingStartTime = new Date();
                        this.easingProgress=0;
                        options.parent.isEasing = true;
                    }//animateFrTo
                    
                    
                    this.getNextFrameDiff = function(){
                        //if we are not done easing then we are still easing
                        var isProgressing = this.easingProgress < this.activeDuration;
                                                
                        if(isProgressing){
                            //increment easing progress by the amount of time that has passed
                            this.easingProgress = new Date() - this.easingStartTime;                    
                            this.easeFactor = this.easingCurve(null,this.easingProgress,0,1,this.activeDuration);//if g_easingProgress == g_activeDuration then there will be no easing effect (i.e. x will be set to x * 1)
                        }else{
                            this.resetAnimation();//reset easing
                        }
                        
                        var m = this.easeToDiff*(1-this.easeFactor);                        
                        
                        return m;
                        
                    }//nextFrame
                    
                    this.resetAnimation();
                    
                    return {
                        isEasing : function(){return this.isEasing},
                        resetAnimation: this.resetAnimation,
                        animateFrTo: this.animateFrTo,
                        getNextFrameDiff: this.getNextFrameDiff
                    }
                    
                    
                }//Animator	



	return Animator

});









