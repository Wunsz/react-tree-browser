import React, { Component } from 'react';

import PhotoImage from './assets/material-photo.svg';
import DirectoryImage from './assets/material-folder.svg';

import DirectoryBrowser from 'react-directory-browser';

const NODES = {
    root: {
        id1: {
            name: 'Directory One',
            mimeType: 'directory',
        },
        id6: {
            name: 'Directory Four',
            mimeType: 'directory',
        },
        id7: {
            name: 'Directory Five',
            mimeType: 'directory',
        },
    },
    id1: {
        id2: {
            name: 'Directory Two',
            mimeType: 'directory',
        },
        id3: {
            name: 'Directory Three',
            mimeType: 'directory',
        },
        id4: {
            name: 'Some image',
            mimeType: 'image',
        },
        id5: {
            name: 'Some other image',
            mimeType: 'image',
        },
    },
    id6: {},
    id7: {},
};

function delay(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}

async function fetchDirectory(node) {
    await delay(1000);

    return NODES[node.__RDB_NODE_ID__] || {};
}

export default class Example2 extends Component {
    render() {
        const config = {
            mimeTypes: {
                directory: DirectoryImage,
                image: PhotoImage,
            },
            directoryMimeType: 'directory',
            childrenAttribute: 'children',
        };

        return (
            <div>
                <h2> Example 2 - Dynamically loaded tree </h2>
                <DirectoryBrowser tree={{}} config={config} resolver={fetchDirectory} />
            </div>
        );
    }
}
