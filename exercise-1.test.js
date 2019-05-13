const expect = require('expect');
const { store, load } = require('./exercise-1');

describe('store and load testing', () => {
    it('render text from array', () => {
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

    it('throw error if giving string', () => {
        const string = 'test case';

        expect(() => store(string) ).toThrow();
    })

    it('return array when giving text', () => {
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

    it('return throw error when giving not text', () => {
        const text = new Object();

        expect(() => load(text)).toThrow();
    })
})