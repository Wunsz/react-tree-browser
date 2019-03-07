import { traverseTree } from './treeUtils';

describe('traverseTree @ treeUtils.js', () => {
    const TEST_TREE = {
        name: 'Test',
        mimeType: 'directory',
        children: {
            id1: {
                name: 'Some Dir One',
                mimeType: 'directory',
            },
            id2: {
                name: 'Some other dir',
                mimeType: 'directory',
                children: {
                    id3: {
                        name: 'Deep element',
                        mimeType: 'directory',
                    },
                    id4: {
                        name: 'Deep element',
                        mimeType: 'directory',
                    },
                },
            },
        },
    };

    it('Returns current node if path is empty', () => {
        const tree = { name: 'Test' };

        const result = traverseTree(tree, [], 'directory');

        expect(result).toBe(tree);
    });

    it('Returns correct node if path is valid', () => {
        const result = traverseTree(TEST_TREE, [ { id: 'id2' }, { id: 'id4' } ], 'directory');

        expect(result).toBe(TEST_TREE.children.id2.children.id4);
    });

    it('Returns correct node with children if path is valid', () => {
        const result = traverseTree(TEST_TREE, [ { id: 'id2' } ], 'directory');

        expect(result).toBe(TEST_TREE.children.id2);
    });

    it('Throws error if path is invalid', () => {
        expect(
            () => traverseTree(TEST_TREE, [ { id: 'id2' }, { id: 'id8' } ], 'directory')
        ).toThrow(Error);
    });
});
