"use strict";

module.exports = {
    isBackboneExtendablesType: function(name, settings) {
        const extendables = settings.oro ? settings.oro.backboneExtendablesTypes : null;
        return extendables ? (new RegExp('(' + extendables.join('|') + ')$')).test(name) : false;
    }
};
