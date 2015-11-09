
    "use strict";

    var assert = require('assert');
    var EventHandler = require("../../../src/lib/Event/ObjectEventHandler");

    describe('EventHandler', function(){

        it("should represent an EventHandler Obejct", function( done ){

            var eho = new EventHandler();

            assert.equal( eho.type, "noop" );
            assert.equal( typeof eho.handler, "function");
            assert.equal( eho.capture, false );
            assert.equal( eho.iterations,Infinity );
            assert.equal( eho.context, null  );

            done();
        });

        it("should clone an event handler object", function( done ){

            var eho = new EventHandler();

            eho.eventType = "click";
            eho.handler = function(){return "xyz"};
            eho.capture =true;
            eho.iterations=9;
            eho.context="should be object";

            var theclone = eho.clone();

            assert.equal( theclone.eventType, "click" );
            assert.equal( theclone.handler(), "xyz");
            assert.equal( theclone.capture, true );
            assert.equal( theclone.iterations,9 );
            assert.equal( theclone.context, "should be object"  );
            done();
        });

        it("should dispose and event handler object", function( done ){

            var eho = new EventHandler();
                eho.disposed = true;
            assert( eho.disposed );

            done();
        });

    });