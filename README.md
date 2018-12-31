# html-entity-decoder

replaces every html entity in a string with the corresponding unicode character

## Usage

First, install the package using npm:

    npm install html-entity-decoder --save

Then, require the package and use it like so:

    const decoder = require('html-entity-decoder');

    console.log(decoder.feed('&qout;Hello, World!&quot;')); // "Hello, World!"
    console.log(decoder.feed('Foo &copy; bar &#x1D306; baz &#x2603; qux')); // Foo © bar 𝌆 baz ☃ qux

For more info, refer to [tests.js](https://github.com/blackish-murderer/html-entity-decoder/blob/master/tests.js "tests.js") in the source repository

## License

MIT License
