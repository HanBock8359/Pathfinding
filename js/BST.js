function Node(value) {
    this.left = null;
    this.right = null;
    this.value = value;
}

function BST() {
    this.root = null;
    return;
}

BST.prototype.push = function (value) {
    if (!this.root) {
        this.root = new Node(value);
        return;
    }

    var currentRoot = this.root;
    var newNode = new Node(value);

    while (currentRoot) {
        if (value < currentRoot.value) {
            if (!currentRoot.left) {
                currentRoot.left = newNode;
                break;
            }
            else {
                currentRoot = currentRoot.left;
            }
        }
        else {
            if (!currentRoot.right) {
                currentRoot.right = newNode;
                break;
            }
            else {
                currentRoot = currentRoot.right;
            }

        }
    }

}

var a = new BST();
a.push(27);
a.push(14);
a.push(35);
a.push(10);
a.push(19);
a.push(31);
a.push(42);

console.log(a.root.value);
traverse(a.root);


// Breadth-first traversal:
function traverse(node, cb) {
    var current = [node];
    while (current.length > 0) {
        var next = [];
        for (var node of current) {
            cb(node);
            if (node.left) next.push(node.left);
            if (node.right) next.push(node.right);
        }
        current = next;
    }
}

// Example:
traverse(root, function (node) {
    console.log(node.value);
});