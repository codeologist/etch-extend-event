
    "use strict";


    var prev = null;//this will be a memory leak

    function ProcessEventQueue(){

        var ev, processHandler = true, eh = this.eventQueue.shift();

        if ( eh && typeof eh.handler === "function"){

            ev = eh.event;
            ev.eventPhase = eh.eventPhase;
            ev.currentTarget = eh.currentTarget;
            ev.target = eh.target;

            if ( ev.isImmediatePropagationStopped ) {
                processHandler = false;
            }

            if ( ev.isPropagationStopped ){
                processHandler =  ev.currentTarget === prev ;
            }

            if ( processHandler ) {
                if ( typeof eh.context === "object" && !Array.isArray( eh.context ) ){
                    eh.handler.call( eh.context, ev);
                } else {
                    eh.handler( ev);
                }
            }

            prev = ev.currentTarget;
            eh.disposed = true;

        }


        return eh;
    }

    module.exports = ProcessEventQueue;