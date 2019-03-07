import React, {Component} from 'react';

import PhotoImage from './assets/material-photo.svg';
import DirectoryImage from './assets/material-folder.svg';

import DirectoryBrowser from 'react-directory-browser';

export default class App extends Component {
    render() {
        const tree = {
            id1: {
                name: 'Directory One',
                mimeType: 'directory',
                children: {
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
            },
            id6: {
                name: 'Directory Four',
                mimeType: 'directory',
            },
            id7: {
                name: 'Directory Five',
                mimeType: 'directory',
            },
        };

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
                <DirectoryBrowser tree={tree} config={config} />
            </div>
        );
    }
}
