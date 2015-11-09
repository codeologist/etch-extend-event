
"use strict";

var assert = require('assert');
var DispatchEvent = require("../../../src/lib/Document/funcDispatchEvent");
var AddEventListener = require("../../../src/lib/Document/funcAddEventListener");

describe('DispatchEvent', function(){


    it('should dispatch and bubble event handler only', function(done) {


        var iterations = 1;
        var handler2 = function (e) {
        };
        var capture = false;
        var contextOfHandler = {context: true};

        var docEl = {
            eventQueue: [],
            eventHandlers: []
        };

        var targetElement = {
            parent: docEl,
            documentElement: docEl,
            eventHandlers: []
        };

        AddEventListener.call(targetElement, "onchange", handler2, capture, iterations, contextOfHandler);

        DispatchEvent.call(targetElement, {type: "onchange"} );
        assert.equal( docEl.eventQueue.length, 1 );

        done();
    });


    it('should set the current target on the event before dispatching', function(done) {
        var ct = 0;

        var handler1 = function (e) {
        };

        var handler2 = function (e) {
        };


        var docEl = {
            id:"DOCELEMENT",
            eventQueue: [],
            eventHandlers: []
        };

        var targetElement = {
            id:"DIVELEMENT",
            parent: docEl,
            documentElement: docEl,
            eventHandlers: []
        };
        AddEventListener.call( docEl, "ondasher", handler1, false, 1, null);
        AddEventListener.call( targetElement, "ondasher", handler2, false, 1, null);


        DispatchEvent.call( targetElement, {type: "ondasher"} );

        assert.equal( docEl.eventQueue.length, 2 );
        assert.equal( docEl.eventQueue[0].currentTarget.id , "DIVELEMENT" );

        assert.equal( docEl.eventQueue[1].currentTarget.id , "DOCELEMENT");
        done();


    });


    it('should dispatch an event in both capture and bubble phases', function(done){



        var type  = "onclick";
        var handler1 = function( e ){  };
        var handler2 = function( e ){   };
        var contextOfHandler = { context:true };

        var docEl = {
            eventQueue:[],
            eventHandlers: []
        };

        var targetElement = {
            parent : docEl,
            documentElement: docEl,
            eventHandlers: []
        };

        /*
        *       * * * WARNING * * *
        *       THE EVENT BEING TESTED HERE IS "ONCHANGE" and not "ONCLICK"
        *       so there is a trap for the unwary in the code below
        *
        */
        AddEventListener.call( docEl,         "onchange", handler1, true, 1, contextOfHandler );
        AddEventListener.call( targetElement, "onclick",  handler1, true, 1, contextOfHandler );
        AddEventListener.call( targetElement, "onchange", handler2, true, 1, contextOfHandler );
        AddEventListener.call( targetElement, "onclick",  handler2, true, 1, contextOfHandler );

        assert.equal( docEl.eventHandlers.length, 1 );
        assert.equal( targetElement.eventHandlers.length, 3 );

        // dispatch must loop thru all nodes and get all valid handlers, overide the event obj and bind to it
        // the context and type and dispatch them
        var event = { type:"onchange" };

        /*
        *   Before we dispatch the event make sure the document event queue empty.  Dispatch should instantiate the
        *   events on the event queue and they will be automatically processed.
        *
        * */
        assert.equal( docEl.eventQueue.length, 0 );
        var listOfElementsInvolvedInCurrentDispatch = DispatchEvent.call( targetElement, event );

        /*
        *   Events should now have been instantiated on the event queue
        *
        */
        assert.equal( docEl.eventQueue.length, 2 );

        /*
        *   Only 2 elements are involved in this event dispatch
        */
        assert.equal( listOfElementsInvolvedInCurrentDispatch.length, 2  );

        assert.deepEqual( listOfElementsInvolvedInCurrentDispatch[0], docEl, "top of the document is always listed first" );
        assert.deepEqual( listOfElementsInvolvedInCurrentDispatch[1], targetElement );



        var eventresult = docEl.eventQueue[0];
        assert( eventresult.context === contextOfHandler, "correct context should be applied to event handler" );
        assert.equal( eventresult.eventPhase, 1, "we should be in the capture phase" );
        assert.equal( eventresult.type, "onchange" );
        assert.deepEqual( eventresult.event, event );
        assert.equal( eventresult.iterations, null, "set to null becuase it is redundant in this context" );
        assert.equal( eventresult.handler, handler1 );
        assert.equal( eventresult.capture, true );

        var eventresult2 = docEl.eventQueue[1];
        assert( eventresult2.context === contextOfHandler, "correct context should be applied to event handler" );
        assert.equal(  eventresult2.eventPhase, 2, "we should be in the target phase" );

        assert.equal(  eventresult2.type, "onchange" );
        assert.deepEqual(  eventresult2.event, event );
        assert.equal( eventresult2.iterations, null, "set to null becuase it is redundant in this context" );
        assert.equal( eventresult2.handler, handler2 );
        assert.equal( eventresult2.capture, true );


        /*
        *   ONCHANGE events have
        */
        assert.equal( docEl.eventHandlers.length, 0, "event handlers queued"  );
        assert.equal( targetElement.eventHandlers.length, 2 );

        done();
    });
});
//
//stopprop,stopimmediateprop,preventdefault
//event obj passed to event
//set event to no bubble
//set first dispatch of bubble phase to phase=2
//populate event obj fully