const expect = require('expect');
const { store, load } = require('./exercise-1');

describe('Implement a store function and a load function', () => {
    it('should render text when array given', () => {
        const array = [
            {
                key1: "value1",
                key2: "value2"
            }, {
                keyA: "valueA"
            }
        ];
        const expected = "key1=value1;key2=value2\nkeyA=valueA";

        const text = store(array);

        expect(text).toEqual(expected);
    })

    it('throw error when not array given', () => {
        const string = 'test case';

        expect(() => store(string) ).toThrow();
    })

    it('return array when text given right array type', () => {
        const expected = [
            {
                key1: "value1",
                key2: "value2"
            }, {
                keyA: "valueA"
            }
        ];
        const text = "key1=value1;key2=value2\nkeyA=valueA";

        const array = load(text);

        expect(array).toEqual(expected);
    })

    it('return throw error when not a string-based format given', () => {
        const text = new Object();

        expect(() => load(text)).toThrow();
    })
})