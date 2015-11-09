
    "use strict";

    var Event = require("./../Event/ObjectEvent");

    function CreateEvent( event ){
        return new Event( event );
    }

    module.exports = CreateEvent;