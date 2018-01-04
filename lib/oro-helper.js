"use strict";

function normalizeSettings(originalSettings) {
    "use strict";
    originalSettings = originalSettings || {};

    var settings = {};
    settings.backboneExtendablesTypes =
        originalSettings.backboneExtendablesTypes || ['View', 'Model', 'Collection', 'Component', 'Class'];

    return settings;
}

module.exports = {
    isBackboneExtendablesType: function(name, settings) {
        settings = normalizeSettings(settings.oro);
        return (new RegExp('(' + settings.backboneExtendablesTypes.join('|') + ')$')).test(name)
    }
};
