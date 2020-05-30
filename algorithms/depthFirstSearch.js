self.onmessage = (e) => {
    const node_li = e.data[1];
    const adjacency_matrix = e.data[2];

    let visited = [];    // Stack tracks which nodes have been visited
    let neighbors = [];  // Stores the id's of the neighbors

    function depthFirstSearch(nodeId) {
        // -- Functions -- //
        function sleep(milliseconds) {
            const date = Date.now();
            let currentDate = null;
            do {
            currentDate = Date.now();
            } while (currentDate - date < milliseconds);
        }

        function updateNode(color) {
            for (let n=0;n<node_li.length;n++) {
                if (node_li[n].id == nodeId) {
                    self.postMessage([n, color]);
                    break;
                }
            }
            sleep(1000);
        }

        // -- Function Starts Here -- //
        if (visited.includes(nodeId)) return;   // Backtrack if node was already visited
        visited.push(nodeId);
        updateNode("#FFA849");  // Sets node color indicating exploring

        neighbors.push([]); // Pushes an empty array
        for (let index=0;index<adjacency_matrix[nodeId].length;index++) {
            if (adjacency_matrix[nodeId][index] != Infinity) {
                neighbors[neighbors.length - 1].push(index);
            }
        }

        for (i of neighbors[neighbors.length - 1]) {
            depthFirstSearch(i);
        }
        neighbors.pop();
        updateNode("#858891");  // Sets node color indicating dead end
    }

    depthFirstSearch(e.data[0]); // Invokes the function
};