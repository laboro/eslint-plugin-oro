"use strict";

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/named-constructor");

var ruleTester = new RuleTester({
    settings: {
        oro: {
            backboneExtendablesTypes: ["View", "Model", "Collection", "Component", "Class"]
        }
    }
});

ruleTester.run("named-constructor", rule, {
    valid: [
        "FooClass.extend = Backbone.Model.extend;",
        "var obj = _.extend({ foo: 1 }, {  bar:2 });",
        "var FooModel = BaseModel.extend({ constructor: function FooModel() { } });",
        "var BarView = BaseView.extend({ constructor: function BarView() { } });",
        "var BazCollection = BaseCollection.extend({ constructor: function BazCollection() { } });",
        "var QuzComponent = BaseComponent.extend({ constructor: function QuzComponent() { } });",
        "var FredClass = QuuxClass.extend({ constructor: function FredClass() { } });",
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

