
    "use strict";

    var ObjectSchema = require("../Schema");

    //var prefix = "on";

    function Event( type, init ){

        var currentTargetSymbol = Symbol();
        var targetSymbol = Symbol();

        // Hidden data stores for object storing params
        this[currentTargetSymbol]=new WeakMap();
        this[targetSymbol]=new WeakMap();


        this.detail=null;
        this.bubbles=false;	                        //Returns whether or not a specific event is a bubbling event	2
        this.cancelable=false;	                    //Returns whether or not an event can have its default action prevented	2


        this.defaultPrevented=false;         	//Returns whether or not the preventDefault() method was called for the event	3
        this.eventPhase=0;	                        //Returns which phase of the event flow is currently being evaluated	2
        this.isTrusted=false;	                    //Returns whether or not an event is trusted	3

        this.timeStamp=new Date().getTime();	    //Returns the time (in milliseconds relative to the epoch) at which the event was created	2
        this.type=this.Schema.Preferences.Event.PREFIX + type.toLowerCase();	    //Returns the name of the event	2
        this.view=null;	    //Returns a reference to the Window object where the event occured	2
        this.explicitOriginalTarget= null;
        this.originalTarget= null ;
        this.isImmediatePropagationStopped = false;
        this.isPropagationStopped = false;
        this.preventDefault=function(){};	        //Cancels the event if it is cancelable; meaning that the default action that belongs to the event will not occur	2
        this.stopImmediatePropagation=function(){
            //Prevents other listeners of the same event from being called
            this.isImmediatePropagationStopped = true;
        };

        this.stopPropagation=function(){
            //Prevents further propagation of an event during event flow
            this.isPropagationStopped = true;
        };

        //Returns the element for the current handler in the bubble or capture
        Object.defineProperty( this, "currentTarget", {
            enumerable: true,
            set: function( val ){
                this[currentTargetSymbol].set( this, val );
            },
            get: function(){
                return this[currentTargetSymbol].get( this );
            }
        });

        //Returns the element that triggered the event
        Object.defineProperty( this, "target", {
            enumerable: true,
            set: function( val ){
                this[targetSymbol].set( this, val );
            },
            get: function(){
                return this[targetSymbol].get( this );
            }
        });
    }

    Event.prototype = Object.create( new ObjectSchema() );

    //function raiseMouseEvent(){
    //    altKey:false,	    //Returns whether the "ALT" key was pressed when the mouse event was triggered	2
    //        button:0,	        //Returns which mouse button was pressed when the mouse event was triggered	2
    //        buttons	:0,         //Returns which mouse buttons were pressed when the mouse event was triggered	3
    //        clientX:0,	        //Returns the horizontal coordinate of the mouse pointer, relative to the current window, when the mouse event was triggered	2
    //        clientY:0,	        //Returns the vertical coordinate of the mouse pointer, relative to the current window, when the mouse event was triggered	2
    //        ctrlKey:0,	        //Returns whether the "CTRL" key was pressed when the mouse event was triggered	2
    //        detail:0,	        //Returns a number that indicates how many times the mouse was clicked	2
    //        metaKey:0,	        //Returns whether the "META" key was pressed when an event was triggered	2
    //        relatedTarget:{},	//Returns the element related to the element that triggered the mouse event	2
    //    screenX	:0,         //Returns the horizontal coordinate of the mouse pointer, relative to the screen, when an event was triggered	2
    //        screenY:0,	        //Returns the vertical coordinate of the mouse pointer, relative to the screen, when an event was triggered	2
    //        shiftKey:false,	    //Returns whether the "SHIFT" key was pressed when an event was triggered	2
    //        which:0	            //Returns which mouse button was pressed when the mouse event was triggered	2
    //
    //}
    
    module.exports = Event;