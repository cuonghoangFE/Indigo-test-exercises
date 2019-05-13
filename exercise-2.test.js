const expect = require('expect');
const Graph = require('./exercise-2');

describe('find maximized assumption in acyclic graph', () => {
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

    it('should return 0 with no weight provide', () => {
        const graph = new Graph();

        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');

        graph.addEgde('A', 'B');
        graph.addEgde('B', 'C');
        graph.addEgde('A', 'C');
        
        expect(graph.findMaximized()).toEqual(0);
    })

    it('should call function with origin vertex A', () => {
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

    it('should return visited dfs point when trigger _dfsUtil', () => {
        const graph = new Graph();
        const visited = {};

        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');

        graph.addEgde('A', 'B');
        graph.addEgde('B', 'C');
        graph.addEgde('A', 'C');

        graph._dfsUtil('A', visited);
        
        expect(visited).toEqual({"A": true, "B": true, "C": true});
    })

    it('should return no cycle when trigger detectCycle', () => {
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

    it('should return cycle when trigger detectCycle', () => {
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