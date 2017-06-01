#!/usr/bin/env node

let RedBlackTree = require('kld-red-black-tree'),
	tree = new RedBlackTree();

for (var i = 0; i < 10; i++) {
	let key = Math.floor(Math.random() * 100),
		value = key;

	tree.put(key, value);
}

console.log("keys = %s", tree.keys().join(","));
console.log("size = %d", tree.size);
console.log("min = %d", tree.min);
console.log("max = %d", tree.max);

tree.remove(tree.min);
tree.remove(tree.max);
console.log();
console.log("keys = %s", tree.keys().join(","));
