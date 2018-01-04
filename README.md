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

Add `oro` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

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

# List of supported rules

* [named-constructor](docs/rules/named-constructor.md)

[travis-image]: https://img.shields.io/travis/laboro/eslint-plugin-oro/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/laboro/eslint-plugin-oro
