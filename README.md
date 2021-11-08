# `ember-svg-jar` Icon Finder

Get information about the icons used in your Ember app

## Running the Thing

```
yarn node ./index.js $PATH_TO_EMBER_APP
```

This will print out all of the identifiers passed to the `svg-jar` helper in your app.

Static strings will be wrapped in quotes; un-quoted values are Handlebars expressions evaluated at run-time.
