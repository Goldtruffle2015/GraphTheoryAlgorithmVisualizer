/*
File handles all nav functionality
*/
// -- Global Variables -- //
algo_options_bool_arr = []; // Stores which algorithm option is selected
speed_options_bool_arr = [];    // Stores which speed option is selected
let sleep_time = 0;  // Number of ms for algorithm to wait before next iteration

let add_node_bool = true;  // Checks active state of button
let rem_node_bool = false;  // Checks active state of button
let set_start_bool = false;   // Checks active state of button
let set_end_bool = false;  // Checks active state of button
let add_edge_bool = false;  // Checks active state of button
let rem_edge_bool = false;  // Checks active state of button
let dir_bool = false;   // Checks active state of button
let undir_bool = true; // Checks active state of button
let weighted_bool = false;  // Checks active state of button
let unweighted_bool = true; // Checks active state of button

var worker; // Defines the web worker

const add_node_button = document.getElementById("add-node-but");
add_node_button.classList.add("button-active-background-color");
const rem_node_button = document.getElementById("rem-node-but");
rem_node_button.disabled = true;    // Button is disabled at start

const set_start_button = document.getElementById("set-start-node");
const set_end_button = document.getElementById("set-end-node");
set_end_button.disabled = true; // Button is disabled at start

const add_edge_button = document.getElementById("add-edge-but");
add_edge_button.disabled = true;    // Button is disabled at start
const rem_edge_button = document.getElementById("rem-edge-but");
rem_edge_button.disabled = true;    // Button is disabled at start

const dir_button = document.getElementById("dir-but");
const undir_button = document.getElementById("undir-but");

undir_button.classList.add("button-active-background-color");   // undir_bool is set to true as default
const weighted_button = document.getElementById("weighted-but");
const unweighted_button = document.getElementById("unweighted-but");
unweighted_button.classList.add("button-active-background-color");

const start_button = document.getElementById("start-but");

window.addEventListener("load", () => {
    // -- Attributes -- //
    const algo_button = document.getElementById("algo-but");
    const algo_ul = document.getElementById("algo-ul");
    algo_ul.classList.add("toggleDisplayNone");

    const algo_options_buttons_arr = document.getElementById("algo-ul").getElementsByTagName("button"); // Gets a collection of the buttons under the algorithms dropdown
    algo_options_buttons_arr[0].classList.add("button-active-background-color");    // Sets the depth first search option to true
    algo_options_bool_arr[0] = true;    // Sets Depth First Search bool to be true
    for (let i=1;i<algo_options_buttons_arr.length;i++) {   // Sets all other algorithm options to false
        algo_options_bool_arr[i] = false;
    }

    const reset_button = document.getElementById("reset-but");
    const clear_button = document.getElementById("clear-but");

    const speed_button = document.getElementById("speed-but");
    const speed_ul = document.getElementById("speed-ul");
    speed_ul.classList.add("toggleDisplayNone");

    const speed_options_buttons_arr = document.getElementById("speed-ul").getElementsByTagName("button");   // Gets a collection of the buttons under the speed dropdown
    speed_options_buttons_arr[0].classList.add("button-active-background-color");   // Sets the slow option to true
    speed_options_bool_arr[0] = true;   // Sets the slow boolean to be true
    sleep_time = 1000;  // Sets the sleep time of the algorithm
    for (let i=1;i<speed_options_buttons_arr.length;i++) {
        speed_options_bool_arr[i] = false;
    }

    // -- Code Starts Here -- //
    // -- Algorithm Dropdown -- //
    algo_button.addEventListener("click", () => {
        algo_button.classList.toggle("button-active-background-color");
        algo_ul.classList.toggle("toggleDisplayFlex");
    })

    // -- Dropdown options -- //
    // Common Event Commands //
    for (let i=0;i<algo_options_buttons_arr.length;i++) {
        algo_options_buttons_arr[i].addEventListener("click", () => {
            if (algo_options_bool_arr[i]) return;    // Returns if the option is already active
            for (let j=0;j<algo_options_buttons_arr.length;j++) {
                algo_options_bool_arr[j] = false;   // Sets all buttons to false
                algo_options_buttons_arr[j].classList.remove("button-active-background-color"); // Sets all button background to deactive state
            }
            algo_options_bool_arr[i] = true;    // Sets button user clicked on to true
            algo_options_buttons_arr[i].classList.toggle("button-active-background-color"); // Sets button background to active
        })
    }

    // Depth First Search //
    algo_options_buttons_arr[0].addEventListener("click", () => {
        // enable/disble options //
        set_start_button.disabled = false;
        set_end_button.disabled = true;
        dir_button.disabled = false;
        undir_button.disabled = false;
        weighted_button.disabled = false;
        unweighted_button.disabled = false;

        // Other //
        weight_input.min = -99;
    })

    // Breadth First Search //
    algo_options_buttons_arr[1].addEventListener("click", () => {
        // enable/disable options //
        set_start_button.disabled = false;
        set_end_button.disabled = false;
        dir_button.disabled = false;
        undir_button.disabled = false;
        weighted_button.disabled = true;
        unweighted_button.disabled = false;

        // Other //
        weight_input.min = -99;
    })

    // Dijkstra's Shortest Path //
    algo_options_buttons_arr[2].addEventListener("click", () => {
        // enable/disable options //
        set_start_button.disabled = false;
        set_end_button.disabled = true;
        dir_button.disabled = false;
        undir_button.disabled = true;
        weighted_button.disabled = false;
        unweighted_button.disabled = true;

        // Other //
        weight_input.min = 0;
    })

    // Bellman-Ford //
    algo_options_buttons_arr[3].addEventListener("click", () => {
        // enable/disable options //
        set_start_button.disabled = false;
        set_end_button.disabled = true;
        dir_button.disabled = false;
        undir_button.disabled = true;
        weighted_button.disabled = false;
        unweighted_button.disabled = true;

        // Other //
        weight_input.min = -99;
    })

    // Floyd-Warshall //
    algo_options_buttons_arr[4].addEventListener("click", () => {
        // enable/disable options //
        set_start_button.disabled = true;
        set_end_button.disabled = true;
        dir_button.disabled = false;
        undir_button.disabled = true;
        weighted_button.disabled = false;
        unweighted_button.disabled = true;

        // Other //
        weight_input.min = -99;
    })

    // Bridge and Articulation Points //
    algo_options_buttons_arr[5].addEventListener("click", () => {
        // enable/disable options //
        set_start_button.disabled = true;
        set_end_button.disabled = true;
        dir_button.disabled = false;
        undir_button.disabled = false;
        weighted_button.disabled = false;
        unweighted_button.disabled = false;

        // Other //
        weight_input.min = -99;
    })

    // Tarjans //
    algo_options_buttons_arr[6].addEventListener("click", () => {
        // enable/disable options //
        set_start_button.disabled = true;
        set_end_button.disabled = true;
        dir_button.disabled = false;
        undir_button.disabled = true;
        weighted_button.disabled = false;
        unweighted_button.disabled = false;

        // Other //
        weight_input.min = -99;
    })

    // TSP (Dynamic Programming)
    algo_options_buttons_arr[7].addEventListener("click", () => {
        // enable/disable options //
        set_start_button.disabled = false;
        set_end_button.disabled = false;
        dir_button.disabled = false;
        undir_button.disabled = true;
        weighted_button.disabled = false;
        unweighted_button.disabled = true;

        // Other //
        weight_input.min = -99;
    })

    // Eulerian Path //
    algo_options_buttons_arr[8].addEventListener("click", () => {
        // enable/disable options //
        set_start_button.disabled = true;
        set_end_button.disabled = true;
        dir_button.disabled = false;
        undir_button.disabled = false;
        weighted_button.disabled = false;
        unweighted_button.disabled = false;

        // Other //
        weight_input.min = -99;
    })

    // Prim's //
    algo_options_buttons_arr[9].addEventListener("click", () => {
        // enable/disable options //
        set_start_button.disabled = true;
        set_end_button.disabled = true;
        dir_button.disabled = true;
        undir_button.disabled = false;
        weighted_button.disabled = false;
        unweighted_button.disabled = true;

        // Other //
        weight_input.min = -99;
    })

    // Ford-Fulkerson //
    algo_options_buttons_arr[10].addEventListener("click", () => {
        // enable/disable options //
        set_start_button.disabled = false;
        set_end_button.disabled = false;
        dir_button.disabled = false;
        undir_button.disabled = true;
        weighted_button.disabled = false;
        unweighted_button.disabled = true;

        // Other //
        weight_input.min = -99;
    })

    // Edmonds-Karp //
    algo_options_buttons_arr[11].addEventListener("click", () => {
        // enable/disable options //
        set_start_button.disabled = false;
        set_end_button.disabled = false;
        dir_button.disabled = false;
        undir_button.disabled = true;
        weighted_button.disabled = false;
        unweighted_button.disabled = true;

        // Other //
        weight_input.min = -99;
    })

    // Dinic's //
    algo_options_buttons_arr[12].addEventListener("click", () => {
        // enable/disable options //
        set_start_button.disabled = false;
        set_end_button.disabled = false;
        dir_button.disabled = false;
        undir_button.disabled = true;
        weighted_button.disabled = false;
        unweighted_button.disabled = true;

        // Other //
        weight_input.min = -99;
    })

    // -- Add Node Button -- //
    add_node_button.addEventListener("click", () => {
        // Toggle active state of button 
        add_node_button.classList.toggle("button-active-background-color");
        add_node_bool = add_node_bool ? false : true;   // Switches the active state

        // Remove active background from remaining buttons
        rem_node_button.classList.remove("button-active-background-color");
        add_edge_button.classList.remove("button-active-background-color");
        rem_edge_button.classList.remove("button-active-background-color");
        set_start_button.classList.remove("button-active-background-color");
        set_end_button.classList.remove("button-active-background-color");

        // Set remaining bools to false
        rem_node_bool = false;
        add_edge_bool = false;
        rem_edge_bool = false;
        set_start_bool = false;
        set_end_bool = false;
    })

    // -- Remove Node Button -- //
    rem_node_button.addEventListener("click", () => {
        // Toggle active state of button 
        rem_node_button.classList.toggle("button-active-background-color");
        rem_node_bool = rem_node_bool ? false : true;

        // Remove active background from remaining buttons
        add_node_button.classList.remove("button-active-background-color");
        add_edge_button.classList.remove("button-active-background-color");
        rem_edge_button.classList.remove("button-active-background-color"); 
        set_start_button.classList.remove("button-active-background-color");
        set_end_button.classList.remove("button-active-background-color");

        // Set remaining bools to false
        add_node_bool = false;
        add_edge_bool = false;
        rem_edge_bool = false;
        set_start_bool = false;
        set_end_bool = false;
    })

    // -- Set Start Button -- //
    set_start_button.addEventListener("click", () => {
        set_start_button.classList.toggle("button-active-background-color");
        set_start_bool = set_start_bool ? false : true;

        add_node_button.classList.remove("button-active-background-color");
        rem_node_button.classList.remove("button-active-background-color");
        add_edge_button.classList.remove("button-active-background-color");
        rem_edge_button.classList.remove("button-active-background-color"); 

        add_node_bool = false;
        rem_node_bool = false;
        add_edge_bool = false;
        rem_edge_bool = false;

        set_end_button.classList.remove("button-active-background-color");
        set_end_bool = false;
    })

    // -- Set End Button -- //
    set_end_button.addEventListener("click", () => {
        set_end_button.classList.toggle("button-active-background-color");
        set_end_bool = set_end_bool ? false : true;
        
        add_node_button.classList.remove("button-active-background-color");
        rem_node_button.classList.remove("button-active-background-color");
        add_edge_button.classList.remove("button-active-background-color");
        rem_edge_button.classList.remove("button-active-background-color");

        add_node_bool = false;
        rem_node_bool = false;
        add_edge_bool = false;
        rem_edge_bool = false;

        set_start_button.classList.remove("button-active-background-color");
        set_start_bool = false;
    })

    // -- Add Edge Button -- //
    add_edge_button.addEventListener("click", () => {
        // Toggle active state of button 
        add_edge_button.classList.toggle("button-active-background-color");
        add_edge_bool = add_edge_bool ? false : true;

        // Remove active background from remaining buttons
        add_node_button.classList.remove("button-active-background-color");
        rem_node_button.classList.remove("button-active-background-color");
        rem_edge_button.classList.remove("button-active-background-color");
        set_start_button.classList.remove("button-active-background-color");
        set_end_button.classList.remove("button-active-background-color");

        // Set remaining bools to false
        add_node_bool = false;
        rem_node_bool = false;
        rem_edge_bool = false;
        set_start_bool = false;
        set_end_bool = false;
    })

    // -- Remove Edge Button -- //
    rem_edge_button.addEventListener("click", () => {
        // Toggle active state of button 
        rem_edge_button.classList.toggle("button-active-background-color");
        rem_edge_bool = rem_edge_bool ? false : true;

        // Remove active background from remaining buttons
        add_node_button.classList.remove("button-active-background-color");
        rem_node_button.classList.remove("button-active-background-color");
        add_edge_button.classList.remove("button-active-background-color");
        set_start_button.classList.remove("button-active-background-color");
        set_end_button.classList.remove("button-active-background-color");

        // Set remaining bools to false
        add_node_bool = false;
        rem_node_bool = false;
        add_edge_bool = false;
        set_start_bool = false;
        set_end_bool = false;
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

    // -- Reset Button -- //
    reset_button.addEventListener("click", () => {
        for (node of node_li) {
            node.color = "#397EC9";   // Resets the node color
        }
        for (edge of line_li) {
            edge.color = "white";   // Resets the line color
        }
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
        // Common Code //
    for (let i=0;i<speed_options_buttons_arr.length;i++) {
        speed_options_buttons_arr[i].addEventListener("click", () => {
            if (speed_options_bool_arr[i]) return;  // Returns if the option is already active
            for (let j=0;j<speed_options_buttons_arr.length;j++) {
                speed_options_bool_arr[j] = false;
                speed_options_buttons_arr[j].classList.remove("button-active-background-color");
            }
            speed_options_bool_arr[i] = true;
            speed_options_buttons_arr[i].classList.toggle("button-active-background-color");
        })
    }
        // Code specific to button //
            // Slow //
    speed_options_buttons_arr[0].addEventListener("click", () => {
        sleep_time = 800;
    })

            // Medium //
    speed_options_buttons_arr[1].addEventListener("click", () => {
        sleep_time = 500;
    })

            // Fast //
    speed_options_buttons_arr[2].addEventListener("click", () => {
        sleep_time = 200;
    })

    // -- Start Button -- //
    start_button.addEventListener("click", () => {
        const dict = [
            "../algorithms/depthFirstSearch.js",
            "../algorithms/breadthFirstSearch.js"
        ];
        // Handle algorithms 
        const number_of_algorithms = 2; // Temporary variable
        for (let algo_option = 0;algo_option < number_of_algorithms;algo_option++) {
            if (algo_options_bool_arr[algo_option]) {
                worker = new Worker(dict[algo_option]);
                worker.onmessage = (event) => {    // Listens for messsage from web worker
                    if (event.data == "terminate") {
                        worker.terminate(); // Ends the web worker
                        worker = undefined;
                        return;
                    }
                    if (event.data[0] != null) {
                        node_li[event.data[0]].color = event.data[1];   // Update the node    
                    }
                    
                    if (event.data[2] != null) {
                        line_li[event.data[2]].color = event.data[3];   // Update the line    
                    }
                    
                }
                worker.onerror = (event) => {
                    console.log(`ERROR: Line ${event.lineno} in ${event.filename}: ${event.message}`);
                }
                worker.postMessage([startId, endId, node_li, line_li, adjacency_matrix, sleep_time]);  // Sends information to web worker
            }
        }
    })
})