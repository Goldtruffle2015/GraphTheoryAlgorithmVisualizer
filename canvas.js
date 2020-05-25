/*
File handles all canvas functionality
*/
// -- Global Variables -- //    *Access on any js file
let node_li = [];   // Stores nodes
let line_li = [];   // Stores lines
let edge_draw_active = false;   // Tracks when the user is drawing a line or not
let cumulative_nodes = 0;   // Tracks the number of nodes drawn, including the ones removed.
let adjacency_matrix = new Array(100);   // Represents node relationships

// Initialize the adjacency matrix //
for (let row=0;row<100;row++) {   // For simplicity the program will only handle 100 nodes
    adjacency_matrix[row] = new Array(100);    // Creates an empty row in adjacency matrix
    for (let col=0;col<100;col++) {
        adjacency_matrix[row][col] = Infinity;
    }
}

window.addEventListener("load", () => {
    // -- Local Variables -- // * Access only on canvas.js
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d"); 
    temp_line = null;  // Creates a temporary line object

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.75;  // Canvas is 3/4 of virtual height
    
    // -- Classes -- //
    class CustomNode {  // Builds nodes
        constructor(x, y, id) {
            this.x = x;
            this.y = y;
            this.id = id;   // Tracks the id of the node
        }

        draw() {    // Draws the node
            ctx.beginPath();
            ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
            ctx.fillStyle = "#397EC9";
            ctx.fill();
        }

    }

    class CustomLine {  // Builds lines
        constructor(x1, y1, startNodeId) {
            this.startx = x1;   // Stores the starting x-position
            this.starty = y1;   // Stores the starting y-position
            this.endx = null;   // Stores the ending x-position
            this.endy = null;   // Stores the ending y-position
            this.startNodeId = startNodeId; // Stores the id of the starting node
            this.endNodeId = null;  // Stores the id of the ending node
        }

        initialize() {
            ctx.beginPath();    // Initializes the line
            ctx.moveTo(this.startx, this.starty);   // Starts the line at the selected node
        }

        draw(x2, y2) {
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            ctx.stroke();
        }
    }

    // -- Functions -- //
    function distance(x1, x2, y1, y2) { // Calculates distance between mouse click and node center
        return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));    // Pythagoras Theorem
    }

    // -- Event Listeners -- //
    canvas.addEventListener("click", (e) => {
        // -- Add node -- //
        if (add_node_bool) {
            // -- Add Node -- //
            if (e.offsetX < 40 || e.offsetX > canvas.width - 40) return;  // Ensures node is not overflowing out of page
            if (e.offsetY < 40 || e.offsetY > canvas.height - 40) return; // Ensures node is not overflowing out of page
            for (c of node_li) {
                if (distance(c.x, e.offsetX, c.y, e.offsetY) < 80) return;    // Prevents nodes from overlapping
            }
            node_li.push(new CustomNode(e.offsetX, e.offsetY, cumulative_nodes)); // Adds node to node list
            node_li[node_li.length - 1].draw();    // Draws newly added node
            cumulative_nodes++;

        // -- Remove node -- //
        } else if (rem_node_bool) {
            // -- Remove Node -- //
            for (let i=0; i<node_li.length; i++) {// Finds the node user clicked on
                if (distance(node_li[i].x, e.offsetX, node_li[i].y, e.offsetY) <= 40) {// Checks if distance is valid
                    node_li.splice(i, 1);   // Remove node from list
                    break;
                }
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);   // Clears the canvas
            for (c of node_li) {    // Redraws remaining nodes
                c.draw();
            }
        
        // -- Add edge -- //
        } else if (add_edge_bool) {
            if (!edge_draw_active) {
                for (c of node_li) {    // Checks each node
                    if (distance(c.x, e.offsetX, c.y, e.offsetY) <= 40) { // Checks if user clicked on a node
                        //line_li.push(new CustomLine(c.getX, c.getY));
                        //line_li[line_li.length - 1].initialize();   // Initializes the line
                        temp_line = new CustomLine(c.x, c.y, c.id); // Creates a new line object
                        temp_line.initialize(); // Initializes the line
                        break;
                    }
                }    
            }
            if (edge_draw_active) {
                for (c of node_li) {
                    if (distance(c.x, e.offsetX, c.y, e.offsetY) <= 40) {
                        //line_li[line_li.length - 1].draw(c.getX, c.getY);   // Draws the line
                        temp_line.draw(c.x, c.y);   // Draws the line
                        temp_line.endNodeId = c.id; // Sets the end node id

                        if ((adjacency_matrix[temp_line.startNodeId][temp_line.endNodeId] == Infinity) || (adjacency_matrix[temp_line.endNodeId][temp_line.startNodeId] == Infinity)) {// Checks if line does not exist
                            temp_line.endx = c.x;   // Sets endx
                            temp_line.endy = c.y;   // Sets endy 
                            line_li.push(temp_line);    // Adds line to line list if line does not exist
                            d = distance(temp_line.startx, temp_line.starty, temp_line.endx, temp_line.endy);   // Calculate distance of line
                            adjacency_matrix[temp_line.startNodeId][temp_line.endNodeId] = d;   // Sets element in adjacency matrix to distance
                            adjacency_matrix[temp_line.endNodeId][temp_line.startNodeId] = d;   // Sets element in adjacency matrix to distance
                        }

                        for (c_2 of node_li) {    // Draws all the nodes again
                            c_2.draw();
                        }

                        break;
                    }
                }
            }

            edge_draw_active = edge_draw_active ? false : true; // Switches edge draw active state
            
        // -- Remove edge -- //
        } else if (rem_edge_bool) {

        }
    })
})