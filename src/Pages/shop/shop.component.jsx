import React from "react";
import { Route } from 'react-router-dom';

import CollectionsOverview from "../../Components/collection-overview/collection-overview.component";

const ShopPage = ({ match }) => 
{
    console.log(match);
    return (
    <div className='shop-page'>
        <Route exact={`${match.path}`} component={CollectionsOverview} />
    </div>
)};

export default ShopPage;