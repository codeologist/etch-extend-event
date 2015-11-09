
    "use strict";



    function fastcullByType( type, eh ){
        return eh.type === type;
    }

    function fastcullByHandler( handler, eh ){
        return eh.handler === handler;
    }

    function fastcullByTypeAndHandler( type, handler, eh ){
        return eh.type === type && eh.handler === handler;
    }

    function RemoveEventListener( type, handler ){
        var culled;

        if ( !type ){
            culled =  Array.prototype.slice.call( this.eventHandlers, 0 );
        } else {
            if ( typeof type === "string" && typeof handler === "function") {
                culled =  this.eventHandlers.filter( fastcullByTypeAndHandler.bind( this, type, handler ) );
            } else {
                if ( typeof type === "string"){
                    culled =  this.eventHandlers.filter( fastcullByType.bind( this, type ) );
                }

                if ( typeof handler === "function"){
                    culled =  this.eventHandlers.filter( fastcullByHandler.bind( this, handler ) );
                }
            }
        }

        culled.forEach( function(ev){
            ev.disposed = true;

        });

        if ( culled.length === this.eventHandlers.length ){
            this.eventHandlers.length = 0;
        }

        culled.length = 0;
        culled = null;
    }

    module.exports = RemoveEventListener;