import React from 'react';
import { Switch } from 'react-router-dom';
import RouterHandler from './components/RouterHandler';

import Home from './Pages/Home';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import AdPage from './Pages/AdPage';
import AddAd from './Pages/AddAd';
import Ads from './Pages/Ads';
import MyAccount from './Pages/MyAccount';

export default () => {
    return (
        <Switch>
            <RouterHandler exact path="/">
                <Home />
            </RouterHandler>    
            <RouterHandler exact path="/about">
                 <About />
            </RouterHandler>
            <RouterHandler exact path="/signin">
                 <SignIn />
            </RouterHandler> 
            <RouterHandler exact path="/signup">
                 <SignUp />
            </RouterHandler> 
            <RouterHandler exact path="/ad/:id">
                 <AdPage />
            </RouterHandler> 
            <RouterHandler exact path="/ads">
                 <Ads />
            </RouterHandler> 
            <RouterHandler private exact path="/post-an-ad">
                 <AddAd />
            </RouterHandler> 
            <RouterHandler private exact path="/my-account">
                 <MyAccount />
            </RouterHandler> 
            <RouterHandler path="*">
                 <NotFound />
            </RouterHandler>
        </Switch>
    )
}