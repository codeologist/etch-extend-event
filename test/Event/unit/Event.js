
    "use strict";

    var assert = require('assert');
    var Event = require("../../../src/lib/Event/ObjectEvent");

    describe('Event', function(){

        it('should set and get target', function(done){

            var event = new Event("click");

            var target = {};
            event.target = target;

            assert.deepEqual( event.target, target );
            done();
        });

        it('should set and get currentTarget', function(done){

            var event = new Event("click");

            var target = {};
            event.currentTarget = target;

            assert.deepEqual(event.currentTarget, target );



            var target2 = {};
            event.currentTarget = target2;

            assert.deepEqual(event.currentTarget, target2 );
            done();
        });

        it('should set stop immediate propagation flag', function(done){

            var event = new Event("click");

            assert.equal(event.isImmediatePropagationStopped, false );

            event.stopImmediatePropagation();

            assert.equal(event.isImmediatePropagationStopped, true );


            done();
        });


        it('should set stop propagation flag', function(done){

            var event = new Event("click");

            assert.equal(event.isPropagationStopped, false );

            event.stopPropagation();

            assert.equal(event.isPropagationStopped, true );

            done();
        });
    });