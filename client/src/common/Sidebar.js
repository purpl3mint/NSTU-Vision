import React, { useContext } from 'react';
import { Link, } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { SidebarItem } from './SidebarItem';

export const Sidebar = () => {
    const auth = useContext(AuthContext);

    let items = [
        {
            link: "/",
            name: "Профиль",
        },
        {
            link: "/camera",
            name: "Камеры",
        },
        {
            link: "/video/search",
            name: "Внешние видео",
        },
        {
            link: "/playlist/all",
            name: "Плейлисты",
        },
        {
            link: "/accounts",
            name: "Аккаунты",
        }
    ]

    let sidebarItems = items.map(i => <SidebarItem link={i.link} name={i.name}/>);
    switch(auth.userType){
        case 'admin':
            sidebarItems = items.map(i => <SidebarItem link={i.link} name={i.name}/>);
            break;
        default:
            sidebarItems = items.map(i => {
                if (i.name != 'Аккаунты') {
                    return <SidebarItem link={i.link} name={i.name}/>;
                }
            });

    }

    return (
        <div className="collection col s3 m3 l3 xl3">
        {sidebarItems}
        </div>
    )

}