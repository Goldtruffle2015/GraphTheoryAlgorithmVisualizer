/*
File handles all nav functionality
*/
// -- Global Variables -- //
let add_node_bool = true;  // Checks active state of button
let rem_node_bool = false;  // Checks active state of button
let add_edge_bool = false;  // Checks active state of button
let rem_edge_bool = false;  // Checks active state of button
let dir_bool = false;   // Checks active state of button
let undir_bool = true; // Checks active state of button
let weighted_bool = false;  // Checks active state of button
let unweighted_bool = true; // Checks active state of button

window.addEventListener("load", () => {
    // -- Attributes -- //
    const algo_button = document.getElementById("algo-but");
    const algo_ul = document.getElementById("algo-ul");
    algo_ul.classList.add("toggleDisplayNone");
    const add_node_button = document.getElementById("add-node-but");
    add_node_button.classList.add("button-active-background-color");
    const rem_node_button = document.getElementById("rem-node-but");
    const add_edge_button = document.getElementById("add-edge-but");
    const rem_edge_button = document.getElementById("rem-edge-but");
    const dir_button = document.getElementById("dir-but");
    const undir_button = document.getElementById("undir-but");
    undir_button.classList.add("button-active-background-color");   // undir_bool is set to true as default
    const weighted_button = document.getElementById("weighted-but");
    const unweighted_button = document.getElementById("unweighted-but");
    unweighted_button.classList.add("button-active-background-color");
    const clear_button = document.getElementById("clear-but");
    const speed_button = document.getElementById("speed-but");
    const speed_ul = document.getElementById("speed-ul");
    speed_ul.classList.add("toggleDisplayNone");

    // -- Code Starts Here -- //
    // -- Algorithm Dropdown -- //
    algo_button.addEventListener("click", () => {
        algo_button.classList.toggle("button-active-background-color");
        algo_ul.classList.toggle("toggleDisplayFlex");
    })

    // -- Add Node Button -- //
    add_node_button.addEventListener("click", () => {
        if (node_li.length > 100) return;   // For simplicity this program will only handle up to 100 nodes including
        // Toggle active state of button 
        add_node_button.classList.toggle("button-active-background-color");
        add_node_bool = add_node_bool ? false : true;   // Switches the active state

        // Remove active background from remaining buttons
        rem_node_button.classList.remove("button-active-background-color");
        add_edge_button.classList.remove("button-active-background-color");
        rem_edge_button.classList.remove("button-active-background-color");

        // Set remaining bools to false
        rem_node_bool = false;
        add_edge_bool = false;
        rem_edge_bool = false;
    })

    // -- Remove Node Button -- //
    rem_node_button.addEventListener("click", () => {
        if (node_li.length == 0) return;    // Must be at least 1 node to use command
        // Toggle active state of button 
        rem_node_button.classList.toggle("button-active-background-color");
        rem_node_bool = rem_node_bool ? false : true;

        // Remove active background from remaining buttons
        add_node_button.classList.remove("button-active-background-color");
        add_edge_button.classList.remove("button-active-background-color");
        rem_edge_button.classList.remove("button-active-background-color"); 

        // Set remaining bools to false
        add_node_bool = false;
        add_edge_bool = false;
        rem_edge_bool = false;
    })

    // -- Add Edge Button -- //
    add_edge_button.addEventListener("click", () => {
        if (node_li.length < 2) return; // There must be at least 2 nodes to place one edge
        // Toggle active state of button 
        add_edge_button.classList.toggle("button-active-background-color");
        add_edge_bool = add_edge_bool ? false : true;

        // Remove active background from remaining buttons
        add_node_button.classList.remove("button-active-background-color");
        rem_node_button.classList.remove("button-active-background-color");
        rem_edge_button.classList.remove("button-active-background-color");

        // Set remaining bools to false
        add_node_bool = false;
        rem_node_bool = false;
        rem_edge_bool = false;
    })

    // -- Remove Edge Button -- //
    rem_edge_button.addEventListener("click", () => {
        if (line_li.length == 0) return;    // Must be at least 1 line to use command
        // Toggle active state of button 
        rem_edge_button.classList.toggle("button-active-background-color");
        rem_edge_bool = rem_edge_bool ? false : true;

        // Remove active background from remaining buttons
        add_node_button.classList.remove("button-active-background-color");
        rem_node_button.classList.remove("button-active-background-color");
        add_edge_button.classList.remove("button-active-background-color");

        // Set remaining bools to false
        add_node_bool = false;
        rem_node_bool = false;
        add_edge_bool = false;
    })

    // -- Directed Button -- //
    dir_button.addEventListener("click", () => {
        if (dir_bool) return;   // Prevents user from disabling when already on
        dir_button.classList.toggle("button-active-background-color");
        undir_button.classList.remove("button-active-background-color");

        dir_bool = dir_bool ? false : true; // Switches the dir_bool boolean
        undir_bool = dir_bool ? false : true;   // Sets undir_bool boolean opposite of dir_bool boolean

        render();
    });

    // -- Undirected Button -- //
    undir_button.addEventListener("click", () => {
        if (undir_bool) return; // Prevents user from disabling when already on
        undir_button.classList.toggle("button-active-background-color");
        dir_button.classList.remove("button-active-background-color");

        undir_bool = undir_bool ? false : true; // Switches the undir_bool boolean
        dir_bool = undir_bool ? false : true;   // Sets dir_bool boolean opposite of undir_bool boolean

        render();
    })

    // -- Weighted Button -- //
    weighted_button.addEventListener("click", () => {
        if (weighted_bool) return;    // Prevents user from disabling when already on
        weighted_button.classList.toggle("button-active-background-color");
        unweighted_button.classList.remove("button-active-background-color");

        weighted_bool = weighted_bool ? false : true;
        unweighted_bool = weighted_bool ? false : true;

        for (x of line_li) {
            x.drawweight = true;    // Enables displaying the weight of the node
        }

        render();
    })

    // -- Unweighted Button -- //
    unweighted_button.addEventListener("click", () => {
        if (unweighted_bool) return;    // Prevents user from disabling when already on
        unweighted_button.classList.toggle("button-active-background-color");
        weighted_button.classList.remove("button-active-background-color");

        unweighted_bool = unweighted_bool ? false : true;
        weighted_bool = unweighted_bool ? false : true;

        for (x of line_li) {
            x.drawweight = false;   // Disables displaying the weight of the node
        }
        
        render();
    })

    // -- Clear Button -- //
    clear_button.addEventListener("click", () => {
        node_li = [];   // Clears the nodes
        line_li = [];   // Clears the edges
        cumulative_nodes = 0;   // Resets cumulative nodes
        for (let row=0;row<133;row++) { // Resets the adjacency matrix
            adjacency_matrix[row] = [];    // Creates an empty row in adjacency matrix
            for (let col=0;col<133;col++) {
                adjacency_matrix[row][col] = Infinity;  // Infinity means there is no edge linking the two nodes
            }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);   // Clears the canvas
    })

    // -- Speed Button -- //
    speed_button.addEventListener("click", () => {
        speed_button.classList.toggle("button-active-background-color");
        speed_ul.classList.toggle("toggleDisplayFlex");
    })
})