
    "use strict";

    var EventHandler = require("./../Event/ObjectEventHandler");

    function AddEventListener(  eventType, handler, capture, iterations, context ){

        var eventHandler;

        if ( typeof eventType === "string" && typeof handler === "function"){
            eventHandler =  new EventHandler();
            eventHandler.type = eventType;
            eventHandler.handler = handler;
            eventHandler.capture = capture || false;
            eventHandler.context = context || null;
            eventHandler.iterations = iterations || Infinity;

            this.eventHandlers.push( eventHandler );
        }
    }

    module.exports = AddEventListener;