"use strict";

var RuleTester = require("eslint").RuleTester;
var rule = require("../../../lib/rules/named-constructor");

var ruleTester = new RuleTester();
ruleTester.run("named-constructor", rule, {
    valid: [
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
