const array = [
    {
        key1: 'value1',
        key2: 'value2'
    },
    {
        key1: 'value3',
        key2: 'value4'
    },
    {
        keyA: 'valueA',
        keyB: 'valueB'
    }
];

var text = store(array);

function store(a) {
    if (typeof(a) !== 'object') {
        throw new Error('This is not an array!');
    }
    if (typeof(a) === 'object' && a.length) {
        return a.map(store).join('\n');
    }
    return Object.keys(a).map(key => key + '=' + a[key]).join(';');
}

var a = load(text);

function load(string) {
    if (typeof(string) !== 'string') {
        throw new Error('This is not string!');
    } else {
        const string_array = _splitBreakLineUtils(string);
        const string_array2 = _splitKeyValueUtils(string_array);
        return addArray(string_array2);
    }
}

function _splitBreakLineUtils(string) {
    return string.split('\n');
}

function _splitKeyValueUtils(array) {
    return array.map(str => str.split(/[\W]+/));
}

function addArray(arr) {
    let new_arr = [];

    arr.map(function (item0, index) {
        new_arr[index] = {};
        item0.map((item1, i) => {
            if (i % 2 === 0) {
                new_arr[index][item1] = item0[i+1]
            }
        })
    });

    return new_arr;
}

module.exports = { store, load };

// console.log(text, a)
