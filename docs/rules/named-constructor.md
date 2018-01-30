# Enforce the use of named constructors (named-constructor)

Backbone's `extend` method creates a stub constructor method called `child` unless there is a specific constructor defined.
As a result all class instances created with the stub constructor are shown as `child`.

For example, run the following command in Google Chrome console:
```js
    queryObjects(Backbone.View)
``` 


![child instances](../images/child-instances.png)

As you can see it is hard to answer which view is which, or if there are views that should be removed from memory already, etc.

## Rule Details

The rule is aimed to enforce the use of named constructors in order to give proper names to the instances.

Examples of **incorrect** code for this rule:

```js
    var BarClass = FooClass.extend({
        initialize: function() {
            // ...
        }
    });
```

Examples of **correct** code for this rule:

```js
    var BarClass = FooClass.extend({
        constructor: function BarClass() {
            BarClass.__super__.apply(this, arguments);
        },
        
        initialize: function () {
            // ...
        }
    });
```
