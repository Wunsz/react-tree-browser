# react-tree-browser

> React component allowing to browse tree structure

[![NPM](https://img.shields.io/npm/v/react-tree-browser.svg)](https://www.npmjs.com/package/react-tree-browser) [![pipeline status](https://gitlab.com/codeinthecup/react-tree-browser/badges/master/pipeline.svg)](https://gitlab.com/codeinthecup/react-tree-browser/commits/master) [![coverage report](https://gitlab.com/codeinthecup/react-tree-browser/badges/master/coverage.svg)](https://gitlab.com/codeinthecup/react-tree-browser/commits/master) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) 

`react-tree-browser` is a library that allows the user to browse a tree structure (for example directory tree) and perform actions on selected nodes.

## Install

```bash
npm install --save react-tree-browser
```
or
```bash
yarn add react-tree-browser
```

## Usage

```jsx
import React, { Component } from 'react'

import { TreeBrowser } from 'react-tree-browser'

const tree = {
    id: 'root',
    children: [
        {
            id: 'browsableChild',
            children: [],
        },
        {
            id: 'unbrowsableChild',
        }
    ]
};

config = {
    childrenAttribute: 'children', // default
};

class Example extends Component {
  render () {
    return (
      <DirectoryBrowser tree={tree} config={config} />
    )
  }
}
```

Or as a HOC providing props:

```jsx
import React, { Component } from 'react'

import { withTreeBrowser } from 'react-tree-browser'

const tree = {
    id: 'root',
    children: [
        {
            id: 'browsableChild',
            children: [],
        },
        {
            id: 'unbrowsableChild',
        }
    ]
};

config = {
    childrenAttribute: 'children', // default
};

class Example extends Component {
  render () {
    return (
      <div></div>
    )
  }
}

export default withTreeBrowser(Example, tree, config);
```

## Reference
### Tree browser configuration (`config`)
Config option is expected to be a simple JS object with following props:

##### `resolver`
 - `function(node, path)`
 - Default: `null`
 - Function that resolves children of a given node. It expects the children to be an array of objects. Is provided by the tree browser with following attributes:
    - `node` - Current node, which children should be resolved
    - `path` - Path from tree root to given node. (See: [Properties - path](#properties-passed-to-the-wrapped-component), section `path`)

##### `forceChildrenReFetch`
 - `bool`
 - Default: `false`
 - Flag that orders the browser to fetch children of the current node even if they are already fetched. By default, children are cached in the tree structure.
 - **WARNING:** This will result in pruning of "children of children".
 
##### `childrenAttribute`
 - `string`
 - Default: `children`
 - Which attribute of the node should be treated as collection of nodes children. 

### Initial tree (`tree`)
Can be a full static tree or just the root node even without children fetched.

### Properties passed to the wrapped component
##### `path`
- `array`
-  An array of node elements (excluding root) that ends on current node. Has two properties:
    - `index` - Index of path node in it's parents array of children
    - `metaData` - Any meta-data passed while opening this node

##### `tree`
- `object`
- Whole tree from root to all fetched leaves. Do not edit this structure as the library depends on it's immutability!

##### `loading`
- `bool`
- Indicates that the resolver is working on resolving children of current node. Display a progress bar for the user?

##### `currentNode`
- `object`
- Currently open node of the tree.

##### `childrenAttribute`
- `string`
- Name of the attribute containing collection of children of the current node.

##### `onGoToParent`
- `function():void`
- Tells the tree browser to go to parent of the current node.

##### `onOpenNode`
- `function(index, metaData):void`
- Tells the tree browser to go to specified node. Expects two parameters:
    - `index` - index of the node in it's parent collection
    - `metaData` - Any metadata you need to pass (for example name of the node).

## `<TreeBrowser />` component
Its a **very** basic tree browser. Additionally it accepts following parameters:

##### `mimeTypes`
- `object`
- Default: `{}`
- A key-value object of mime-types and their respective icons.

##### `getDisplayName`
- `function(node):string`
- Default: `(node) => node.name`
- Resolves display name for given node. Takes following parameters:
    - `node` - Tree node

##### `getMimeType`
- `function(node):string`
- Default: `(node) => node.mimeType`
- Resolves mimeType key for given node. Takes following parameters:
    - `node` - Tree node

## License

MIT © [Bartosz 'Wunsz' Jabłoński | Code in the Cup](https://codeinthecup.pl/)
