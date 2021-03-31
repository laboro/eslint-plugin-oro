"use strict";

const helper = require("../oro-helper.js");

module.exports = {
    meta: {
        docs: {
            description: "Enforce the use of named constructors",
            category: "Best Practices",
            recommended: true,
            url: "https://github.com/laboro/eslint-plugin-oro/blob/master/docs/rules/named-constructor.md"
        },
        fixable: null,
        schema: []
    },

    create: function(context) {
        const sourceCode = context.getSourceCode();
        const settings = context.settings;

        return {
            "CallExpression": node => {
                if (
                    node.callee.type === "MemberExpression" &&
                    node.callee.property.type === "Identifier" &&
                    node.callee.property.name === "extend" &&
                    node.arguments.length &&
                    node.arguments[0].type === "ObjectExpression" &&
                    helper.isBackboneExtendablesType(sourceCode.getText(node.callee.object), settings)
                ) {
                    const constructorPropertyNode = node.arguments[0].properties.find(propertyNode => {
                        return propertyNode.key &&
                            propertyNode.key.type === "Identifier" &&
                            propertyNode.key.name === "constructor"
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

                    } else if (
                        node.parent.type === "AssignmentExpression" &&
                        node.parent.left.type === "Identifier" &&
                        constructorPropertyNode.value.id.name !== node.parent.left.name
                    ) {
                        context.report(
                            node,
                            "Constructor name `{{ constructor }}` mismatch the name of local variable `{{ var }}`",
                            {
                                constructor: constructorPropertyNode.value.id.name,
                                var: node.parent.left.name
                            }
                        );
                    }
                }
            }
        };
    }
};
