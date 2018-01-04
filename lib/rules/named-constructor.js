"use strict";

var helper = require("../oro-helper.js");
var astUtils = require('eslint-ast-utils');
var _ = require('lodash');

module.exports = {
    meta: {
        docs: {
            description: "Enforce to use named constructors",
            category: "Best Practices",
            recommended: true
        },
        fixable: null,
        schema: []
    },

    create: function(context) {
        var sourceCode = context.getSourceCode();
        var settings = context.settings;

        return {
            "MemberExpression": function(node) {
                if (
                    astUtils.getPropertyName(node) === "extend" &&
                    node.parent.type === "CallExpression" &&
                    helper.isBackboneExtendablesType(sourceCode.getText(node.object), settings) &&
                    node.parent.arguments.length &&
                    node.parent.arguments[0].type === "ObjectExpression"
                ) {
                    var constructorPropertyNode = _.find(node.parent.arguments[0].properties, function(propertyNode) {
                        return propertyNode.key.type === "Identifier" && propertyNode.key.name === "constructor"
                    });

                    if (
                        !constructorPropertyNode ||
                        constructorPropertyNode.value.type !== "FunctionExpression" ||
                        !constructorPropertyNode.value.id
                    ) {
                        context.report(node, "Named constructor is missing");

                    } else if (
                        node.parent.parent.type === "VariableDeclarator" &&
                        constructorPropertyNode.value.id.name !== node.parent.parent.id.name
                    ) {
                        context.report(
                            node,
                            "Constructor name `{{ constructor }}` mismatch the name of local variable `{{ var }}`",
                            {
                                constructor: constructorPropertyNode.value.id.name,
                                var: node.parent.parent.id.name
                            }
                        );
                    }
                }
            }
        };
    }
};
