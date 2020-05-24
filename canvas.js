/*
File handles all canvas functionality
*/

window.addEventListener("load", () => {
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d"); 
    let node_li = [];   // Stores nodes

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

    // -- Functions -- //
    function distance(x1, x2, y1, y2) {
        return Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
    }

    canvas.addEventListener("click", (e) => {
        if (add_node_bool) {
            // -- Add Node -- //
            if (e.offsetX < 40 || e.offsetX > canvas.width - 40) return;  // Ensures node is not overflowing out of page
            if (e.offsetY < 40 || e.offsetY > canvas.height - 40) return; // Ensures node is not overflowing out of page
            node_li.push(new CustomNode(e.offsetX, e.offsetY));
            node_li[node_li.length - 1].draw();    
        } else if (rem_node_bool) {
            // -- Remove Node -- //
            for (let i=0; i<node_li.length; i++) {
                if (distance(node_li[i].getX, e.offsetX, node_li[i].getY, e.offsetY) <= 40) {
                    node_li.splice(i, 1);
                    break;
                }
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (c of node_li) {
                c.draw();
            }
        } else if (add_edge_bool) {

        } else if (rem_edge_bool) {

        }
    })
})