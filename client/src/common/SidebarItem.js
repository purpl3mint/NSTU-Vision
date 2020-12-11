import React from 'react';
import { Link, } from 'react-router-dom';

export const SidebarItem = (props) => {
    const {link, name} = props;

    return (
        <Link to={link} className="collection-item">{name}</Link>
    );
}