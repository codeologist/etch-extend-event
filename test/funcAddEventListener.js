
    "use strict";

    var assert = require('assert');
    var AddEventListener = require("../../../src/lib/Document/funcAddEventListener");

    describe('AddEventListener', function(){

        it('should not add events without a type and handler', function(done) {

            var targetElement = {
                eventHandlers: []
            };

            AddEventListener.call( targetElement, "click"  );
            assert.equal( targetElement.eventHandlers.length, 0 );


            AddEventListener.call( targetElement, "click", function(){}  );
            assert.equal( targetElement.eventHandlers.length, 1 );

            done();
        });
        it('should add an 3 different event handlers to the event queue', function(done){

            var iterations = 1;
            var eventType  = "click";
            var handler = function(){};
            var capture = false;
            var contextOfHandler = {};

            var targetElement = {
                eventHandlers: []
            };

            AddEventListener.call( targetElement, eventType, handler, capture, iterations, contextOfHandler );
            AddEventListener.call( targetElement, "change", handler, capture, iterations, contextOfHandler );
            AddEventListener.call( targetElement, eventType, handler, capture, iterations, contextOfHandler );

            assert.equal( targetElement.eventHandlers.length, 3 );

            done();
        });

    });