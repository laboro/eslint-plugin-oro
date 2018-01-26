[![build status][travis-image]][travis-url]

# eslint-plugin-oro

Eslint rules for Oro

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-oro`:

```
$ npm install eslint-plugin-oro --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-oro` globally.

## Usage
To turn on `eslint-plugin-oro` plugin, just add recommended configuration of the plugin to `extends` section of your `.eslintrc` config
```json
{
    "extends": [
        "plugin:oro/recommended"
    ]
}

```

Or if you want to use the plugin with custom configuration, you need to do few things.

First, add `oro` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "oro"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "oro/named-constructor": 1
    }
}
```

And finally, you need to provide custom settings for the plugin
```json
{
    "settings": {
        "oro": {
            "backboneExtendablesTypes": ["View", "Model", "Collection"]
        }
    }
}
```
Where:
 - `backboneExtendablesTypes` is list of trailing parts of Backbone class names that implements Backbone's `extend` functionality (matches to names `Backbone.View`, `BaseView`, `UserModel`, `EntityCollection`, etc.) 

# List of supported rules

* [named-constructor](docs/rules/named-constructor.md)

[travis-image]: https://img.shields.io/travis/laboro/eslint-plugin-oro/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/laboro/eslint-plugin-oro
