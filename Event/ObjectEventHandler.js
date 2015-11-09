
    "use strict";

    var ObjectSchema = require("../Schema");
    var ObjectDisposable = require("../Aspects/AspectDisposable");

    /**
     * The purpose of EventHandler is two fold.  one as a tracking object for a registered event,
     * and two as a source of current state during the processing stage
     * @constructor
     */
    function EventHandler(){

        ObjectDisposable.call( this );
        this.type = "noop";
        this.handler = function(){};
        this.capture=false;
        this.iterations = Infinity;
        this.context = null;
        this.event = null;// v8 optimisation
        this.eventPhase = 0;
        this.currentTarget = null;

    }

    EventHandler.prototype = Object.create( new ObjectSchema(), {

        clone: {
            value: function () {

                var rv = new EventHandler();

                Object.keys(this).forEach(function (key) {

                    rv[key] = this[key];

                }, this);

                return rv;
            }

        }

    } );



    module.exports = EventHandler;