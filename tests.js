//const decoder = require('html-entities-decoder'); //if the module has been installed

const decoder = require('./index'); //if run from the source directory

//USAGE: decoder.feed(stringToBeDecoded, escapeCharacter, charactersToBeEscaped) // (string, string, array)

const encodedHtml1 = '&qout;Hello, World!&quot;';
console.log('encoded:', encodedHtml1);
console.log('decoded:', decoder.feed(encodedHtml1));

const encodedHtml2 = 'Foo &copy; bar &#x1D306; baz &#x2603; qux &quot;';
console.log('encoded:', encodedHtml2);
console.log('decoded:', decoder.feed(encodedHtml2));

const encodedJson1 = '{"Html": "I should escape this quotation mark &quot; in order to be a valid JSON"}';
console.log('encoded:', encodedJson1);
console.log('decoded:', decoder.feed(encodedJson1, '\\', ['\"']));

const encodedJson2 = '{"Html": "and also this backslash &#92;"}';
console.log('encoded:', encodedJson2);
console.log('decoded:', decoder.feed(encodedJson2, '\\', ['\"']));

//NOTE:: character escaping is only applied to encoded html entities to retain the JSON's validity, that is calling feed on an invalid json does not make it valid
const invalidJson1 = '{"Html": "i am an example of "invalid" json "}';
console.log('encoded:', invalidJson1);
console.log('decoded:', decoder.feed(invalidJson1, '\\', ['\"']));
