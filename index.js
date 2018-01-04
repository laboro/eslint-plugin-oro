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
            ]
        },
        rules: {
            "oro/named-constructor": "warn"
        }
    }
};
