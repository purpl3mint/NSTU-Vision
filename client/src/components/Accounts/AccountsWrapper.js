import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Accounts} from './Accounts/Accounts';
import {AccountCreate} from './AccountCreate/AccountCreate';

export const AccountsWrapper = () => {
    return (
        <Switch>
            <Route path="/accounts" exact>
                <Accounts />
            </Route>
            <Route path="/accounts/new" exact>
                <AccountCreate />
            </Route>
        </Switch>
    );
}