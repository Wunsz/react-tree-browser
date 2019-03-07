import React from 'react';
import PropTypes from 'prop-types';

const DirectoryNode = ({ onClick, name, mimeTypeImage }) => (
    <li className="rdb-node rdb-directory" onClick={onClick}>
        {mimeTypeImage ? <img src={mimeTypeImage} alt={name} /> : null}
        <span>{name}</span>
    </li>
);

DirectoryNode.propTypes = {
    onClick: PropTypes.func,
    name: PropTypes.string.isRequired,
    mimeTypeImage: PropTypes.any,
};

export default DirectoryNode;
