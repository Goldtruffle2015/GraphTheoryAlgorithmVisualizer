/*
File handles all canvas functionality
*/

window.addEventListener("load", () => {
    // -- Local Variables -- // * Access only on canvas.js
    temp_line = null;  // Creates a temporary line object

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.75;  // Canvas is 3/4 of virtual height

    // -- Functions -- //
    function distance(x1, x2, y1, y2) { // Calculates distance between mouse click and node center
        return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));    // Pythagoras Theorem
    }

    function point2LineDist(px, py, x1, y1, x2, y2) {   // Calculates the shortest distance from a line segment to a point
        // Convert line and point to vectors
        const vector_p = [px - x1, py - y1];  // Vector from start point to mouse click point
        const vector_l = [x2 - x1, y2 - y1];  // Vector from start point to end point of line

        // Scale both vectors by length of line
        let unit_vector_p = []; 
        let unit_vector_l = [];
        const line_length = distance(x1, x2, y1, y2); // Calculates the magnitude of line
        for (let i=0;i<2;i++) {
            unit_vector_p[i] = vector_p[i] / line_length;
            unit_vector_l[i] = vector_l[i] / line_length;
        }

        // Calculate dot product
        dot_product = unit_vector_p[0]*unit_vector_l[0] + unit_vector_p[1]*unit_vector_l[1];

        // Calculate nearest location on line
        nearest_p = [x1 + vector_l[0] * dot_product, y1 + vector_l[1] * dot_product];

        // Calculate distance between point and nearest point
        return distance(px, nearest_p[0], py, nearest_p[1]);
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
            render();   // Redraw the entire canvas
            cumulative_nodes++; // Defined as nodes added + nodes removed

        // -- Remove node -- //
        } else if (rem_node_bool) {
            // -- Remove Node -- //
            node_id_of_removed_node = 0;    // Stores the node id of the node removed
            let click_detected = false; // Checks if user clicked on a node
            for (let i=0; i<node_li.length; i++) {// Finds the node user clicked on
                if (distance(node_li[i].x, e.offsetX, node_li[i].y, e.offsetY) <= 40) {// Checks if distance is valid
                    click_detected = true;  // User has successfully clicked on a node
                    node_id_of_removed_node = node_li[i].id;    // Stores the id of node being removed
                    node_li.splice(i, 1);   // Remove node from list
                    break;
                }
            }

            if (!click_detected) return;    // If user did not click on a node exit out of event

            let indices_to_remove = []; // Stores the indices in line list to remove
            for (let l=0;l<line_li.length;l++) {
                if (line_li[l].startNodeId == node_id_of_removed_node || line_li[l].endNodeId == node_id_of_removed_node) {
                    indices_to_remove.unshift(l);   // Adds index at beginning of array so that array is in decending order
                }
            }

            for (index of indices_to_remove) {
                line_li.splice(index, 1);   // Removes the line from the line list
            }

            render();   // Redraw the entire canvas
        
        // -- Add edge -- //
        } else if (add_edge_bool) {
            if (!edge_draw_active) {    // If player has not selected a starting node
                for (c of node_li) {    // Checks each node
                    if (distance(c.x, e.offsetX, c.y, e.offsetY) <= 40) { // Checks if user clicked on a node
                        temp_line = new CustomLine(c.x, c.y, c.id); // Creates a new line object
                        temp_line.initialize(); // Initializes the line
                        edge_draw_active = true;    // Sets draw state to true
                        break;
                    }
                }   
                return; // Breaks out of event. Player must click a second time to select an end nodes
            }
            if (edge_draw_active) { // If player has selected a starting node
                for (c of node_li) {
                    if (distance(c.x, e.offsetX, c.y, e.offsetY) <= 40) {   // Checks if user clicked on a node
                        temp_line.draw(c.x, c.y);   // Draws the line
                        temp_line.endNodeId = c.id; // Sets the end node id

                        if ((adjacency_matrix[temp_line.startNodeId][temp_line.endNodeId] == Infinity) || (adjacency_matrix[temp_line.endNodeId][temp_line.startNodeId] == Infinity)) {// Checks if line does not exist
                            temp_line.endx = c.x;   // Sets endx
                            temp_line.endy = c.y;   // Sets endy 
                            line_li.push(temp_line);    // Adds line to line list if line does not exist
                            d = distance(temp_line.startx, temp_line.endx, temp_line.starty, temp_line.endy);   // Calculate distance of line
                            adjacency_matrix[temp_line.startNodeId][temp_line.endNodeId] = d;   // Sets element in adjacency matrix to distance
                            adjacency_matrix[temp_line.endNodeId][temp_line.startNodeId] = d;   // Sets element in adjacency matrix to distance
                        }
                        render();   // Redraw the entire canvas
                        edge_draw_active = false;   // Drawing is complete. Revert back to non-active draw state
                        break;
                    }
                }
            }
            
        // -- Remove edge -- //
        } else if (rem_edge_bool) {
            for (let l=0;l<line_li.length;l++) {
                if (point2LineDist(e.offsetX, e.offsetY, line_li[l].startx, line_li[l].starty, line_li[l].endx, line_li[l].endy) <= 5) {    // Find the shortest distance between mouse click and line
                    adjacency_matrix[line_li[l].startNodeId][line_li[l].endNodeId] = Infinity;  // Updates adjacency matrix
                    adjacency_matrix[line_li[l].endNodeId][line_li[l].startNodeId] = Infinity;  // Updates adjacency matrix
                    line_li.splice(l, 1);   // Remove line from list
                    render();   // Redraw the entire canvas
                    return;
                }
            }
        }
    })
})

window.addEventListener("resize", () => {
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d"); 

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.75;  // Canvas is 3/4 of virtual height

    render();   // Redraw the canvas
})