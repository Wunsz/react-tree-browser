import { expandTreePathForUpdate, pathAsString, traverseTree } from './treeUtils';

describe('traverseTree @ treeUtils.js', () => {
    const TEST_TREE = {
        name: 'Test',
        children: [
            {
                name: 'Some Dir One',
                children: [],
            },
            {
                name: 'Some other dir',
                children: [
                    {
                        name: 'Deep element',
                        children: [],
                    },
                    {
                        name: 'Deep element',
                        children: [],
                    },
                ],
            },
        ],
    };

    it('Returns current node if path is empty', () => {
        const tree = { name: 'Test' };

        const result = traverseTree(tree, []);

        expect(result).toBe(tree);
    });

    it('Returns correct node if path is valid', () => {
        const result = traverseTree(TEST_TREE, [ { index: 1 }, { index: 1 } ]);

        expect(result).toBe(TEST_TREE.children[1].children[1]);
    });

    it('Returns correct node with children if path is valid', () => {
        const result = traverseTree(TEST_TREE, [ { index: 1 } ]);

        expect(result).toBe(TEST_TREE.children[1]);
    });

    it('Throws error if path is invalid', () => {
        expect(
            () => traverseTree(TEST_TREE, [ { index: 1 }, { index: 2 } ]),
        ).toThrow(Error);
    });
});

describe('expandTreePathForUpdate @ treeUtils.js', () => {
    it('Expands path with update', () => {
        const path = [ { index: 6 }, { index: 2 } ];
        const children = [
            {
                name: 'Child 2',
                children: [],
            },
            {
                name: 'Child 2',
                children: [],
            },
        ];

        const updateObject = { children: { $set: children } };

        const result = expandTreePathForUpdate(path, updateObject);

        expect(result).toEqual(
            { children: { 6: { children: { 2: updateObject } } } },
        );
    });
});

describe('pathAsString @ treeUtils.js', () => {
    it('Expands empty (root) path to single slash', () => {
        const path = [];
        const stringPath = pathAsString(path);

        expect(stringPath).toBe('/');
    });

    it('Expands single path to its index name', () => {
        const path = [ { index: 6 } ];
        const stringPath = pathAsString(path);

        expect(stringPath).toBe('/6');
    });

    it('Expands path to its indexes name', () => {
        const path = [ { index: 6 }, { index: 2 } ];
        const stringPath = pathAsString(path);

        expect(stringPath).toBe('/6/2');
    });
});
