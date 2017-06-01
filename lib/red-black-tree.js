// initially ported from http://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html


let RED = true;
let BLACK = false;

function isRed(node) {
    return node !== null && node.color === RED;
}

function isBlack(node) {
    return node === null || node.color === BLACK;
}

function size(node) {
    return node !== null ? node.size : 0;
}

function get(node, key) {
    while (node !== null) {
        if (key < node.key) {
            node = node.left;
        }
        else if (key > node.key) {
            node = node.right;
        }
        else {
            return node.value;
        }
    }

    return null;
}

function put(node, key, value) {
    if (node === null) {
        return new Node(key, value, RED, 1);
    }

    if (key < node.key) {
        node.left = put(node.left, key, value);
    }
    else if (key > node.key) {
        node.right = put(node.right, key, value);
    }
    else {
        node.value = value;
    }

    if (isRed(node.right) && isBlack(node.left)) {
        node = rotateLeft(node);
    }
    if (isRed(node.left) && isRed(node.left.left)) {
        node = rotateRight(node);
    }
    if (isRed(node.left) && isRed(node.right)) {
        flipColors(node);
    }

    node.size = size(node.left) + size(node.right) + 1;

    return node;
}

function removeMin(node) {
    if (node.left === null) {
        return null;
    }

    if (isBlack(node.left) && isBlack(node.left.left)) {
        node = moveRedLeft(node);
    }

    node.left = removeMin(node.left);

    return balance(node);
}

function removeMax(node) {
    if (isRed(node.left)) {
        node = rotateRight(node);
    }

    if (node.right === null) {
        return null;
    }

    if (isBlack(node.right) && isBlack(node.right.left)) {
        node = moveRedRight(node);
    }

    node.right = removeMax(node.right);

    return balance(node);
}

function remove(node, key) {
    if (key < node.key) {
        if (isBlack(node.left) && isBlack(node.left.left)) {
            node = moveRedLeft(node);
        }

        node.left = remove(node.left, key);
    }
    else {
        if (isRed(node.left)) {
            node = rotateRight(node);
        }
        if (key === node.key && node.right === null) {
            return null;
        }
        if (isBlack(node.right) && isBlack(node.right.left)) {
            node = moveRedRight(node);
        }
        if (key === node.key) {
            let x = min(node.right);

            node.key = x.key;
            node.value = x.value;
            node.right = removeMin(node.right);
        }
        else {
            node.right = remove(node.right, key);
        }
    }

    return balance(node);
}

function rotateRight(node) {
    let x = node.left;

    node.left = x.right;
    x.right = node;
    x.color = x.right.color;
    x.right.color = RED;
    x.size = node.size;
    node.size = size(node.left) + size(node.right) + 1;

    return x;
}

function rotateLeft(node) {
    let x = node.right;

    node.right = x.left;
    x.left = node;
    x.color = x.left.color;
    x.left.color = RED;
    x.size = node.size;
    node.size = size(node.left) + size(node.right) + 1;

    return x;
}

function flipColors(node) {
    node.color = !node.color;
    node.left.color = !node.left.color;
    node.right.color = !node.right.color;
}

function moveRedLeft(node) {
    flipColors(node);

    if (isRed(node.right.left)) {
        node.right = rotateRight(node.right);
        node = rotateLeft(node);
        flipColors(node);
    }

    return node;
}

function moveRedRight(node) {
    flipColors(node);

    if (isRed(node.left.left)) {
        node = rotateRight(node);
        flipColors(node);
    }

    return node;
}

function balance(node) {
    if (isRed(node.right)) {
        node = rotateLeft(node);
    }
    if (isRed(node.left) && isRed(node.left.left)) {
        node = rotateRight(node);
    }
    if (isRed(node.left) && isRed(node.right)) {
        flipColors(node);
    }

    node.size = size(node.left) + size(node.right) + 1;

    return node;
}

function height(node) {
    if (node === null) {
        return -1;
    }

    return 1 + Math.max(height(node.left), height(node.right));
}

function min(node) {
    if (node.left === null) {
        return node;
    }
    else {
        return min(node.left);
    }
}

function max(node) {
    if (node.right === null) {
        return node;
    }
    else {
        return max(node.right);
    }
}

function floor(node, key) {
    if (node === null) {
        return null;
    }

    if (key === node.key) {
        return node;
    }
    else if (key < node.key) {
        return floor(node.left, key);
    }

    let t = floor(node.right, key);

    if (t !== null) {
        return t;
    }
    else {
        return node;
    }
}

function ceiling(node, key) {
    if (node === null) {
        return null;
    }

    if (key === node.key) {
        return node;
    }
    else if (key > node.key) {
        return ceiling(node.right, key);
    }

    let t = ceiling(node.left, key);

    if (t !== null) {
        return t;
    }
    else {
        return node;
    }
}

function select(node, count) {
    let t = size(node.left);

    if (t > count) {
        return select(node.left, count);
    }
    else if (t < count) {
        return select(node.right, count - t - 1);
    }
    else {
        return node;
    }
}

function rank(key, node) {
    if (node === null) {
        return 0;
    }

    if (key < node.key) {
        return rank(key, node.left);
    }
    else if (key > node.key) {
        return 1 + size(node.left) + rank(key, node.right);
    }
    else {
        return size(node.left);
    }
}

function keys(node, keyArray, low, high) {
    if (node === null) {
        return;
    }

    if (low < node.key) {
        keys(node.left, keyArray, low, high);
    }
    if (low <= node.key && high >= node.key) {
        keyArray.push(node.key);
    }
    if (high >= node.key) {
        keys(node.right, keyArray, low, high);
    }
}

class Node {
    constructor(key, value, color, size) {
        this.key = key;
        this.value = value;
        this.color = color;
        this.size = size;
        this.left = null;
        this.right = null;
    }
}

class RedBlackTree {
    constructor() {
        this.root = null;
    }

    get size() {
        return size(this.root);
    }

    isEmpty() {
        return this.root === null;
    }

    get(key) {
        return get(this.root, key);
    }

    contains(key) {
        return this.get(key) !== null;
    }

    put(key, value) {
        this.root = put(this.root, key, value);
        this.root.color = BLACK;
    }

    removeMin() {
        if (isBlack(this.root.left) && isBlack(this.root.right)) {
            this.root.color = RED;
        }

        this.root = removeMin(this.root);

        if (!this.isEmpty()) {
            this.root.color = BLACK;
        }
    }

    removeMax() {
        if (isBlack(this.root.left) && isBlack(this.root.right)) {
            this.root.color = RED;
        }

        this.root = removeMax(this.root);

        if (!this.isEmpty()) {
            this.root.color = BLACK;
        }
    }

    remove(key) {
        if (this.contains(key)) {
            if (isBlack(this.root.left) && isBlack(this.root.right)) {
                this.root.color = RED;
            }

            this.root = remove(this.root, key);
            if (!this.isEmpty()) {
                this.root.color = BLACK;
            }
        }
    }

    get height() {
        return height(this.root);
    }

    get min() {
        return min(this.root).key;
    }

    get max() {
        return max(this.root).key;
    }

    floor(key) {
        let x = floor(this.root, key);

        if (x === null) {
            return null;
        }
        else {
            return x.key;
        }
    }

    ceiling(key) {
        let x = ceiling(this.root, key);

        if (x === null) {
            return null;
        }
        else {
            return x.key;
        }
    }

    select(count) {
        if (count < 0 || this.size <= count) {
            return null;
        }

        let node = select(this.root, count);

        return node.key;
    }

    rank(key) {
        return rank(key, this.root);
    }

    keys(low, high) {
        if (this.isEmpty()) {
            return [];
        }

        low = low !== undefined ? low : this.min;
        high = high !== undefined ? high : this.max;

        let result = [];

        keys(this.root, result, low, high);

        return result;
    }
}

module.exports = RedBlackTree;
