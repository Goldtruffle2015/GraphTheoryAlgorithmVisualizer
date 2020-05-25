/*
File handles all canvas functionality
*/

window.addEventListener("load", () => {
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d"); 
    let node_li = [];   // Stores nodes
    let line_li = [];   // Stores lines
    let edge_draw_active = false;   // Tracks when the user is drawing a line or not

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.75;  // Canvas is 3/4 of virtual height
    
    // -- Classes -- //
    class CustomNode {  // Builds nodes
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        get getX() {
            return this.x;
        }

        get getY() {
            return this.y;
        }

        draw() {    // Draws the node
            ctx.beginPath();
            ctx.arc(this.x, this.y, 40, 0, 2 * Math.PI);
            ctx.fillStyle = "#397EC9";
            ctx.fill();
        }

    }

    class CustomLine {  // Builds lines
        constructor(x1, y1) {
            this.startx = x1;
            this.starty = y1;
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
        if (add_node_bool) {
            // -- Add Node -- //
            if (e.offsetX < 40 || e.offsetX > canvas.width - 40) return;  // Ensures node is not overflowing out of page
            if (e.offsetY < 40 || e.offsetY > canvas.height - 40) return; // Ensures node is not overflowing out of page
            node_li.push(new CustomNode(e.offsetX, e.offsetY)); // Adds node to node list
            node_li[node_li.length - 1].draw();    // Draws newly added node
        } else if (rem_node_bool) {
            // -- Remove Node -- //
            for (let i=0; i<node_li.length; i++) {// Finds the node user clicked on
                if (distance(node_li[i].getX, e.offsetX, node_li[i].getY, e.offsetY) <= 40) {// Checks if distance is valid
                    node_li.splice(i, 1);   // Remove node from list
                    break;
                }
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);   // Clears the canvas
            for (c of node_li) {    // Redraws remaining nodes
                c.draw();
            }
        } else if (add_edge_bool) {
            if (!edge_draw_active) {
                for (c of node_li) {    // Checks each node
                    if (distance(c.getX, e.offsetX, c.getY, e.offsetY) <= 40) { // Checks if user clicked on a node
                        line_li.push(new CustomLine(c.getX, c.getY));
                        line_li[line_li.length - 1].initialize();
                        break;
                    }
                }    
            }
            if (edge_draw_active) {
                for (c of node_li) {
                    if (distance(c.getX, e.offsetX, c.getY, e.offsetY) <= 40) {
                        line_li[line_li.length - 1].draw(c.getX, c.getY);
                        break;
                    }
                }
            }

            edge_draw_active = edge_draw_active ? false : true;
            
        } else if (rem_edge_bool) {

        }
    })

    canvas.addEventListener("mouseup")
})