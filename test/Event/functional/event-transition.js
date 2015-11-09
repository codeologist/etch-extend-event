
    "use strict";
    var assert = require('assert');
    var loader = require("../../../src/lib/Loader/index");

    var window = loader("test/Event/functional/doc.cmp");//need a load ready
    var document = window.document;



    describe('FUNCTIONAL: Event Tranisition', function() {

        it('should transition a capture from the document down to the target node', function (done) {

            window.ready( function(){

                var ct = 0;
                document.addEventListener( "oncapture", function( e ){
                    ct++;
                    assert.equal( e.eventPhase, 1 );
                }, true,1 );

                document.getElementById("one").addEventListener( "oncapture", function( e ){
                    ct++;
                    assert.equal( e.eventPhase, 1 );
                }, true ,1);

                document.getElementById("two").addEventListener( "oncapture", function( e ){
                    ct++;
                    assert.equal( e.eventPhase, 2 );
                }, true,1 );

                document.getElementById("last").addEventListener( "oncapture", function(){
                    ct++;
                    assert( false, "Event should not be dispatched to this element");
                }, true,1 );

                document.getElementById("two").dispatchEvent( document.createEvent( "capture") );

                setTimeout( function(){

                    assert( ct === 3, "only 3 events should fire");
                    done();
                }, 0 );

            });
        });


        it('should transition a bubble from the target node upto the document', function (done) {

            window.ready( function(){

                var ct = 0;
                document.addEventListener( "onbubble", function( e ){
                    ct++;
                    assert.equal( e.eventPhase, 3 );
                } ,false,1 );

                document.getElementById("one").addEventListener( "onbubble", function( e ){
                    ct++;
                    assert.equal( e.eventPhase, 3 );
                }, false,1 );

                document.getElementById("two").addEventListener( "onbubble", function( e ){
                    ct++;
                    assert.equal( e.eventPhase, 2 );
                }, false,1 );

                document.getElementById("last").addEventListener( "onbubble", function(){
                    ct++;
                    assert( false, "Event should not be dispatched to this element");
                }, false ,1 );

                document.getElementById("two").dispatchEvent( document.createEvent( "bubble") );

                setTimeout( function(){

                    assert( ct === 3, "only 3 events should fire");
                    done();
                }, 0 );

            });
        });
    });