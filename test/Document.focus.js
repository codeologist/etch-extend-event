
    "use strict";

    var assert = require('assert');
    var Document = require("../../../src/lib/Document");

    describe('Document.setFocus', function(){

        it('should set and blur elements', function(done){

            var d = new Document();
            var c = d.createElement("div");
            d.appendChild(c);

            d.focus();
            setTimeout( function(){
                assert.deepEqual( d.getFocusedElement(), d );
            }, 0);

            c.focus();
            setTimeout( function(){
                assert.deepEqual( d.getFocusedElement(), c );
            }, 0);


            c.blur();
            setTimeout( function(){
                assert.equal( d.getFocusedElement(), undefined );

            }, 0);

            done();
        });



    });