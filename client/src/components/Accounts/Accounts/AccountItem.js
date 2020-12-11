import React from 'react';

export const AccountItem = (props) => {
    const {name, type, deleteHandler} = props;
    const buttonName = {name, type};
    return (
        <tr>
            <td>{name}</td>
            <td>{type}</td>
            <button className="btn" onClick={deleteHandler} name={name}>Удалить</button>
        </tr>
    );
}