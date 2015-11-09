
    "use strict";

    var assert = require('assert');
    var ProcessEventQueue = require("../../../src/lib/Document/funcProcessEventQueue");

    describe('ProcessEventQueue', function(){

        var called = false;
        var called2 = false;
        var context = {};
        var event = {};
        var currentTarget = {};
        var target = {};

        var EVENT = {
            eventPhase:0,
            handler: function( e ){ called=e; called2 = this; },
            event: event,
            context:context,
            currentTarget:currentTarget,
            target:target
        };

        it( "should process an event", function(done) {

            var doc = {
                eventQueue:[ EVENT ]
            };

            assert.equal( doc.eventQueue.length,1 );

            var eho = ProcessEventQueue.call( doc );

            assert.equal( doc.eventQueue.length, 0 );
            assert( eho.disposed );

            done();
        });

        it( "should pass the event object to the handler as the first param", function(done) {

            var doc = {
                eventQueue:[ EVENT ]
            };

            ProcessEventQueue.call( doc );

            assert.equal( called, event );
            done();
        });

        it( "should pass the event context object to the handler as a context object", function(done) {

            var  doc = {
                eventQueue:[ EVENT ]
            };

            ProcessEventQueue.call( doc );

            assert.deepEqual( called2, context );
            done();
        });

        it( "should pass the event phase to the event object", function(done) {

            var doc = {
                eventQueue:[ EVENT ]
            };

            EVENT.eventPhase = 3;
            ProcessEventQueue.call( doc );

            assert.equal( called.eventPhase, 3 );
            done();
        });

        it( "should pass the current target to the event object", function(done) {

            var doc = {
                eventQueue:[ EVENT ]
            };

            EVENT.eventPhase = 3;
            ProcessEventQueue.call( doc );

            assert.deepEqual( called.currentTarget, currentTarget );
            done();
        });

        it( "should pass the target to the event object", function(done) {

            var doc = {
                eventQueue:[ EVENT ]
            };

            EVENT.eventPhase = 3;
            ProcessEventQueue.call( doc );

            assert.deepEqual( called.target, target );
            done();
        });
    });