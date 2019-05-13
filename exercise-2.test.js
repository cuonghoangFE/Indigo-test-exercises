const expect = require('expect');
const Graph = require('./exercise-2');

describe('Find a path such that the sum of the weights of all vertices on the path is maximized', () => {
    it('should return 5 when A1->B2->C2', () => {
        const graph = new Graph();

        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');

        graph.addEgde('A', 'B');
        graph.addEgde('B', 'C');
        graph.addEgde('A', 'C');

        graph.addWeight('A', 1);
        graph.addWeight('B', 2);
        graph.addWeight('C', 2);

        expect(graph.findMaximized()).toEqual(5);
    })

    it('should return 5 when A0->B0->C0', () => {
        const graph = new Graph();

        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');

        graph.addEgde('A', 'B');
        graph.addEgde('B', 'C');
        graph.addEgde('A', 'C');
        
        expect(graph.findMaximized()).toEqual(0);
    })

    it('should call function _dfsUtil with origin vertex A when implement depth-first search', () => {
        const graph = new Graph();
        graph._dfsUtil = jest.fn();

        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');

        graph.addEgde('A', 'B');
        graph.addEgde('B', 'C');
        graph.addEgde('A', 'C');

        graph.dfs();
        
        expect(graph._dfsUtil).toBeCalledWith('A', {});
    })

    describe('should return visited point when trigger _dfsUtil with origin vertex A', () => {
        const graph = new Graph();
        const visited = {};

        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');

        graph.addEgde('A', 'B');
        graph.addEgde('B', 'C');
        graph.addEgde('A', 'C');

        graph._dfsUtil('A', visited);

        it('should have key A in object return', () => {
            expect(visited["A"]).toBeTruthy();
        });

        it('should have key B in object return', () => {
            expect(visited["B"]).toBeTruthy();
        });

        it('should have key C in object return', () => {
            expect(visited["C"]).toBeTruthy();
        });

        it('should return expected object below', () => {
            const expected = {
                A: true,
                B: true,
                C: true
            }

            expect(visited).toEqual(expected);
        });
    })

    it('should return no cycle when trigger detectCycle (function detect avoid infinite loop caused by cycles)', () => {
        const graph = new Graph();

        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');

        graph.addEgde('A', 'B');
        graph.addEgde('B', 'C');
        graph.addEgde('A', 'C');

        const handler = graph.detectCycle();
        
        expect(handler).toBe('no cycle');
    })

    it('should return cycle when trigger detectCycle (function detect avoid infinite loop caused by cycles)', () => {
        const graph = new Graph();

        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');

        graph.addEgde('A', 'B');
        graph.addEgde('B', 'C');
        graph.addEgde('A', 'C');
        graph.addEgde('C', 'A');

        const handler = graph.detectCycle();
        
        expect(handler).toBe('there is a cycle');
    })
})