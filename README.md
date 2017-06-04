Pretty much a direct port of the [RedBlackTree implemenation](http://algs4.cs.princeton.edu/33balanced/RedBlackBST.java.html) in "Algorithms, 4th Edition", by Sedgewick and Wayne. The biggests differences are that static methods become private functions and the use of `delete` was changed to `remove`.

## Example

```
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
```

## API

### properties

- size : `Number`
- height : `Number`
- min : `<key>`
- max : `<key>`

### methods

- isEmpty() : `Boolean`
- get(key) : `<value>`
- contains(key) : `Boolean`
- put(key, value) : `void`
- removeMin() : `void`
- removeMax() : `void`
- remove(key) : `void`
- floor(key) : `<key>`
- ceiling(key) : `<key>`
- select(count) : `<key>`
- rank(key) : `Number`
- keys(low, high) : [`<keys>`]
	- if low and high are not defined, they default to min and max, respectively
