
    "use strict";

    var assert = require('assert');
    var CreateEvent = require("../../../src/lib/Document/funcCreateEvent");

    describe('CreateEvent', function(){


        it('should create an event object', function(done){

            var Event = CreateEvent("click");

            assert.equal( Event.bubbles, false );
            assert.equal( Event.cancelable, false );
            assert.equal( Event.currentTarget, null );
            assert.equal( Event.defaultPrevented, false );
            assert.equal( Event.detail,null);
            assert.equal( Event.eventPhase, 0 );
            assert.equal( Event.explicitOriginalTarget, null );
            assert.equal( Event.isTrusted, false );
            assert.equal( Event.originalTarget, null );
            assert.equal( Event.target, null );
            assert.equal( typeof Event.timeStamp, "number" );
            assert.equal( Event.type, "onclick");


            //event.isDefaultPrevented()


            //this.isPropagationStopped = false;
            //this.stopPropagation = function(){
            //    this.isPropagationStopped = true;
            //};
            //
            //this.stopImmediatePropagation = function(){
            //    this.isImmediatePropagationStopped = true;
            //};
            //this.target = target;
            //this.isImmediatePropagationStopped = false;



            done();
        });

    });