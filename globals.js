/* This file stores all the variables, functions, and classes that require a global scope */

// -- Variables -- //
let node_li = [];   // Stores nodes
let line_li = [];   // Stores lines
let edge_draw_active = false;   // Tracks when the user is drawing a line or not
let cumulative_nodes = 0;   // Tracks the number of nodes drawn, including the ones removed.
let adjacency_matrix = [];   // Represents node relationships
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d"); 

// Initialize the adjacency matrix //
for (let row=0;row<133;row++) {   // For simplicity the program will only handle 133 nodes including those that have been removed. 133 is the max number of nodes that can fit in canvas assuming none have been removed.
    adjacency_matrix[row] = [];    // Creates an empty row in adjacency matrix
    for (let col=0;col<133;col++) {
        adjacency_matrix[row][col] = Infinity;  // Infinity means there is no edge linking the two nodes
    }
}

// -- Functions -- //
function distance(x1, x2, y1, y2) { // Calculates distance between mouse click and node center
    return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));    // Pythagoras Theorem
}

function render() { // Draws the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // Clears the canvas

    for (l of line_li) {
        l.initialize(); // Initializes the line
        l.draw(); // Draws the line
    }

    for (c of node_li) {    // Redraws remaining nodes
        c.draw();
    }
}

// -- Classes -- //
class CustomNode {  // Builds nodes
    constructor(x, y, id) {
        this.x = x; // Stores the x-coordinate of node in pixels
        this.y = y; // Stores the y-coordinate of node in pixels
        this.id = id;   // Tracks the id of the node
    }

    draw() {    // Draws the node
        ctx.beginPath();    // Starts a new starting point
        ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);    // Draws a circle
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

    draw() {
        ctx.lineTo(this.endx, this.endy); // Draws line at end node
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.stroke();   // Renders the line

        if (dir_bool) { // If the line is a directed line
            this.drawPointer();
        }
    }

    drawPointer() {
        let pointerWidth = 40;
        // Find vector with same slope as edge //
        const edge_vec = [this.startx - this.endx, this.starty - this.endy];    // This vector is oriented reverse of actual direction

        // Scale vector to desired width. This is to offset the start position //
        const edge_vec_length = distance(edge_vec[0], 0, edge_vec[1], 0);
        const edge_vec_scaled = [edge_vec[0] * pointerWidth / edge_vec_length, edge_vec[1] * pointerWidth / edge_vec_length];

        // Find start position of pointer //
        const pointerx = this.endx + edge_vec_scaled[0];
        const pointery = this.endy + edge_vec_scaled[1];
        
        // Rotate vector by pi/6 radians //
        const x = edge_vec[0];
        const y = edge_vec[1];
        const sin_30 = Math.sin(Math.PI / 6);
        const cos_30 = Math.cos(Math.PI / 6 );
        const vec_1 = [x*cos_30 + y*sin_30, -x*sin_30 + y*cos_30];

        // Scale vector to desired length //
        const vec_1_length = distance(vec_1[0], 0, vec_1[1], 0);
        const vec_1_scaled = [vec_1[0] * pointerWidth / vec_1_length, vec_1[1] * pointerWidth / vec_1_length];

        // Find point 1 //
        const p1 = [pointerx + vec_1_scaled[0], pointery + vec_1_scaled[1]];

        // Find vector perpendicular to edge //
        const sin_90 = Math.sin(Math.PI / 2);
        const cos_90 = Math.cos(Math.PI / 2);
        const vec_perp = [-x*cos_90 - y*sin_90, x*sin_90 - y*cos_90];

        // Scale vector to desired length //
        const vec_perp_length = distance(vec_perp[0], 0, vec_perp[1], 0);
        const vec_perp_scaled = [vec_perp[0] * pointerWidth / vec_perp_length, vec_perp[1] * pointerWidth / vec_perp_length];

        // Find point 2 //
        const p2 = [p1[0] + vec_perp_scaled[0], p1[1] + vec_perp_scaled[1]];

        // Draw the pointer //
        ctx.beginPath();
        ctx.moveTo(pointerx, pointery);
        ctx.lineTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();
    }
}