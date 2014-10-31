= BioJS-VIS-Sequence

A fork of biojs-vis-sequence with build artifacts committed so we can consume it
with bower.

Also, sanity.

== Development

This project is managed with gulp - A `dev` task is provided to make work easier
(it watches the files for changes, and rebundles the main artefact, and provides
a development webserver) - to use this run:

```:bash
gulp dev
```

== Releases

To produce all the build artefacts, run the main build task:

```:bash

gulp

```

This produces the files in the `build` directory. These *should* be committed
and pushed, so that they will be available via bower.

You should not commit or push build artefacts with lint errors or test failures.

== Examples

An example is available on [JSBin](http://jsbin.com/jixehituxopa/1/edit), but
also see the `dummy.html` development example in this repository, and in
particular the `demo.js` script.
