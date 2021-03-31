"use strict";

const RuleTester = require("eslint").RuleTester;
const rule = require("../../../lib/rules/named-constructor");

let ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019
    },
    settings: {
        oro: {
            backboneExtendablesTypes: ["View", "Model", "Collection", "Component", "Class"]
        }
    }
});

ruleTester.run("named-constructor", rule, {
    valid: [
        "FooClass.extend = Backbone.Model.extend;",
        "let obj = _.extend({ foo: 1 }, {  bar:2 });",
        "var FooModel = BaseModel.extend({ constructor: function FooModel() { } });",
        "const BarView = BaseView.extend({ constructor: function BarView() { } });",
        "let BazCollection = BaseCollection.extend({ constructor: function BazCollection() { } });",
        "var QuzComponent = BaseComponent.extend({ constructor: function QuzComponent() { } });",
        "const FredClass = QuuxClass.extend({ constructor: function FredClass() { } });",
        "QeeClass = QuuxClass.extend({ constructor: function QeeClass() { } });",
        "BaseModel.extend({ constructor: function FooModel() { } });"
    ],

    invalid: [
        {
            code: "Backbone.View.extend({ initialize: function() { } });",
            errors: [{message: "Named constructor is missing"}]
        },
        {
            code: "BaseModel.extend({ initialize: function() { } });",
            errors: [{message: "Named constructor is missing"}]
        },
        {
            code: "BaseComponent.extend({ constructor: function() { } });",
            errors: [{message: "Named constructor is missing"}]
        },
        {
            code: "var FredClass = QuuxClass.extend({ constructor: function BazClass() { } });",
            errors: [{message: "Constructor name `BazClass` mismatch the name of local variable `FredClass`"}]
        },
        {
            code: "QeeClass = QuuxClass.extend({ constructor: function BazClass() { } });",
            errors: [{message: "Constructor name `BazClass` mismatch the name of local variable `QeeClass`"}]
        }
    ]
});

ruleTester = new RuleTester({
    settings: {
        oro: {}
    }
});

ruleTester.run("named-constructor (no backboneExtendablesTypes in settings/oro)", rule, {
    valid: [
        "Backbone.View.extend({ initialize: function() { } });"
    ],
    invalid: []
});

ruleTester = new RuleTester();

ruleTester.run("named-constructor (no settings/oro)", rule, {
    valid: [
        "Backbone.View.extend({ initialize: function() { } });"
    ],
    invalid: []
});

