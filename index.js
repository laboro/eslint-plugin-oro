"use strict";

module.exports = {
    rules: {
        "named-constructor": require("./lib/rules/named-constructor")
    },
    configs: {
        recommended: {
            env: {
                browser: true
            },
            plugins: [
                "oro"
            ],
            settings: {
                oro: {
                    backboneExtendablesTypes: ["View", "Model", "Collection", "Component", "Class"]
                }
            },
            rules: {
                "oro/named-constructor": "warn"
            }
        }
    }
};
