
    "use strict";

    var assert = require('assert');

    var AddEventListener = require("../../../src/lib/Document/funcAddEventListener");
    var RemoveEventListener = require("../../../src/lib/Document/funcRemoveEventListener");

    describe('RemoveventListener', function(){


        it('should remove an event handler by type', function(done){


            var iterations = 1;
            var eventType  = "onclick";
            var handler = function(){};
            var capture = false;
            var contextOfHandler = {};


            var targetElement = {
                eventHandlers: []
            };

            AddEventListener.call( targetElement, eventType, handler, capture, iterations, contextOfHandler );
            AddEventListener.call( targetElement, "onchange", handler, capture, iterations, contextOfHandler );
            AddEventListener.call( targetElement, eventType, handler, capture, iterations, contextOfHandler );

            RemoveEventListener.call( targetElement, "onchange" );

            assert.equal( targetElement.eventHandlers.length, 3, "removed events are just disposed of and left in place" );
            assert.equal( targetElement.eventHandlers[0].type, "onclick" );
            assert.equal( targetElement.eventHandlers[1].disposed, true  );
            assert.equal( targetElement.eventHandlers[2].type, "onclick" );



            done();
        });


        it('should remove an event handler by handler', function(done){


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

            RemoveEventListener.call( targetElement, null, handler );

            assert.equal( targetElement.eventHandlers.length, 0, "removing all events purges them" );

            done();
        });

        it('should remove an event handler by type and handler', function(done){


            var iterations = 1;
            var eventType  = "onclick";
            var handler = function(){};
            var capture = false;
            var contextOfHandler = {};


            var targetElement = {
                eventHandlers: []
            };

            AddEventListener.call( targetElement, eventType, handler, capture, iterations, contextOfHandler );
            AddEventListener.call( targetElement, "change", handler, capture, iterations, contextOfHandler );
            AddEventListener.call( targetElement, eventType, handler, capture, iterations, contextOfHandler );

            RemoveEventListener.call( targetElement, "change", handler );

            assert.equal( targetElement.eventHandlers.length, 3, "removed events are just disposed of and left in place" );
            assert.equal( targetElement.eventHandlers[0].type, "onclick" );
            assert.equal( targetElement.eventHandlers[1].disposed, true  );
            assert.equal( targetElement.eventHandlers[2].type, "onclick" );


            RemoveEventListener.call( targetElement  );

            assert.equal( targetElement.eventHandlers.length, 0, "calling remove without params purges all events" );


            done();
        });
    });