
    "use strict";

    var assert = require('assert');
    var Document = require("../../../src/lib/Document");


    describe('Document.processEventQueue', function(){

        it('should exist', function(done){
            var document = new Document();
            assert( document.processEventQueue );

            done();
        });
    });

    describe('Document EVENTS', function(){

        var document = new Document();
        var div = document.createElement( "div" );
        var div2 = document.createElement( "div" );
        document.appendChild( div );
        div.appendChild( div2 );
        div.achangedproperty = 0;
        it('should be dispatched to the document event queue', function(done){

            div.addEventListener( "oncustom", function(){});
            div2.addEventListener( "oncustom", function(){});
            assert.equal( div.eventHandlers.length, 1 );
            assert.equal( div2.eventHandlers.length, 1 );
            var e = document.createEvent("custom");

            div2.dispatchEvent( e );

            assert.equal( div.eventHandlers.length, 1 );
            assert.equal( div2.eventHandlers.length, 1 );
            assert.equal( div.documentElement.eventQueue.length, 2 );

            // target and current target should be assigned correctly
            assert.deepEqual( div.documentElement.eventQueue[0].target, div2 );
            assert.deepEqual( div.documentElement.eventQueue[0].currentTarget, div2 );

            assert.deepEqual( div.documentElement.eventQueue[1].target, div2 );
            assert.deepEqual( div.documentElement.eventQueue[1].currentTarget, div );
            document.eventQueue.length= 0;
            done();
        });

        it('should be able to be removed', function(done){
            div.removeEventListener();
            assert.equal( div.eventHandlers.length,0 );
            done();
        });


        it('should dispatch a event called onPropertyChange when non blacklisted element members are changed', function(done) {

            document.addEventListener( "onpropertychange", function(e){

            //    document.allowOnPropertyChangeEvents = false;

                // target and current target should be assigned correctly
                assert.deepEqual( e.target, div );
                assert.deepEqual( e.currentTarget, document );
                assert.deepEqual( e.data, 99 );

                done();

            }, false, 1);

           // document.allowOnPropertyChangeEvents = true;
            div.achangedproperty = 99;

            setTimeout( function(){
                //
                //  on propertychange events dispatch asyncronously, so we must wait until
                //  after they are dispatched before processing the event queue
                //
                document.processEventQueue();
            }, 0);

        });


        it('should stop immediate propagation', function(done){

            var document = new Document();

            var ct = 0;
            document.addEventListener( "onclick", function(e){
                ct++;
            }, false, 1);

            document.addEventListener( "onclick", function(e){

                e.stopImmediatePropagation();

                assert( e.isImmediatePropagationStopped );
                assert( ct === 1);
            }, false, 1);

            document.addEventListener( "onclick", function(e){
                assert(false);
            }, false, 1);


            document.dispatchEvent( document.createEvent( "click") );

            document.processEventQueue();
            document.processEventQueue();
            document.processEventQueue();

            setTimeout( function(){
                assert.equal( document.eventQueue.length, 0 );
                done();
            }, 0);
        });


        it('should stop propagation', function(done){

            var document = new Document();
            var div = document.createElement( "div" );
            document.appendChild( div );

            var ct = 0;

            document.addEventListener( "onclick", function(e){
                ct++;
               assert(false)
            }, false, 1);

            div.addEventListener( "onclick", function(e){
                e.stopPropagation();
                assert( e.isPropagationStopped );
                assert( ct === 0, "this should be the first listener to fire");
                ct++;
            },false, 1);

            div.addEventListener( "onclick", function(e){
                assert( e.isPropagationStopped );
                assert( ct === 1, "this should be the first listener to fire");
                ct++;
            }, false, 1);


            div.dispatchEvent( document.createEvent( "click") );




            document.processEventQueue();
            document.processEventQueue();
            document.processEventQueue();
            //
            setTimeout( function(){
                assert.equal( ct, 2 );
                assert.equal( document.eventQueue.length, 0 );
                done();
            }, 0);
        });
    });