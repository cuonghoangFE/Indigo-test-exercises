function Graph() {
    this.adjList = {};
    this.weightPoint = {};
}

Graph.prototype.addVertex = function(vertex) {
    this.adjList[vertex] = [];
}

Graph.prototype.addEgde = function(vertex1, vertex2) {
    this.adjList[vertex1].push(vertex2);
}

Graph.prototype.addWeight = function(vertex, weight) {
    this.weightPoint[vertex] = weight;
}

Graph.prototype.dfs = function() {
    const nodes = Object.keys(this.adjList);
    const visited = {};
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        this._dfsUtil(node, visited);
    }
}

Graph.prototype._dfsUtil = function(vertex, visited) {
    if(!visited[vertex]) {
        visited[vertex] = true;

        const neighbors = this.adjList[vertex];

        for (let i = 0; i < neighbors.length; i += 1) {
            const neighbor = neighbors[i];
            this._dfsUtil(neighbor, visited);
        }
    }
}

Graph.prototype.detectCycle = function() {
    const graphNodes = Object.keys(this.adjList);
    const visited = {};
    const recStack = {};

    for (let i = 0; i < graphNodes.length; i += 1) {
        const node = graphNodes[i];

        if (this._detectCycleUtil(node, visited, recStack)) {
            return 'there is a cycle';
        }
    }

    return 'no cycle';
}

Graph.prototype._detectCycleUtil = function(vertex, visited, recStack) {
    if (!visited[vertex]) {
        visited[vertex] = true;
        recStack[vertex] = true;

        const nodeNeighbors = this.adjList[vertex];

        for (let i = 0; i < nodeNeighbors.length; i += 1) {
            const currentNode = nodeNeighbors[i];
            
            console.log('parent', vertex, 'child', currentNode);

            if (!visited[currentNode] && this._detectCycleUtil(currentNode, visited, recStack)) {
                return true;
            } else if (recStack[currentNode]) {
                return true;
            }
        }
    }

    recStack[vertex] = false;
    return false;
}

Graph.prototype.findMaximized = function() {
    let maximized = 0;
    let sum = 0;
    const nodes = Object.keys(this.adjList);
    
    for (let i = 0; i < nodes.length; i += 1) {
        const currentNode = nodes[i];

        sum += this.weightPoint[currentNode];

        const nodeNeighbors = this.adjList[currentNode];

        for (let j = 0; j < nodeNeighbors.length; j += 1) {
            const neighbor = nodeNeighbors[j];

            sum += this.weightPoint[neighbor];
        }

        if (sum > maximized) return sum;
        return maximized;
    }
}

module.exports = Graph;
