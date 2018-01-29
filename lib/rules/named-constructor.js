"use strict";

var helper = require("../oro-helper.js");
var _ = require('lodash');

module.exports = {
    meta: {
        docs: {
            description: "Enforce to use named constructors",
            category: "Best Practices",
            recommended: true,
            url: "https://github.com/laboro/eslint-plugin-oro/blob/master/docs/rules/named-constructor.md"
        },
        fixable: null,
        schema: []
    },

    create: function(context) {
        var sourceCode = context.getSourceCode();
        var settings = context.settings;

        return {
            "CallExpression": function(node) {
                if (
                    node.callee.type === "MemberExpression" &&
                    node.callee.property.type === "Identifier" &&
                    node.callee.property.name === "extend" &&
                    node.arguments.length &&
                    node.arguments[0].type === "ObjectExpression" &&
                    helper.isBackboneExtendablesType(sourceCode.getText(node.callee.object), settings)
                ) {
                    var constructorPropertyNode = _.find(node.arguments[0].properties, function(propertyNode) {
                        return propertyNode.key.type === "Identifier" && propertyNode.key.name === "constructor"
                    });

                    if (
                        !constructorPropertyNode ||
                        constructorPropertyNode.value.type !== "FunctionExpression" ||
                        !constructorPropertyNode.value.id
                    ) {
                        context.report(node, "Named constructor is missing");

                    } else if (
                        node.parent.type === "VariableDeclarator" &&
                        constructorPropertyNode.value.id.name !== node.parent.id.name
                    ) {
                        context.report(
                            node,
                            "Constructor name `{{ constructor }}` mismatch the name of local variable `{{ var }}`",
                            {
                                constructor: constructorPropertyNode.value.id.name,
                                var: node.parent.id.name
                            }
                        );
                    }
                }
            }
        };
    }
};
