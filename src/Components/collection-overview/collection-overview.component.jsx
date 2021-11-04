import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollections } from "../../redux/shop/shop.selector";

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collection-overview.styles.scss';

const CollectionsOverview = ({ collections }) => (
    <div username='collections-overview'>
        {
            collections.map(({ id, ...otherCollectionMaps }) => (
                <CollectionPreview key={id} {...otherCollectionMaps} />
            ))
        }
    </div>

);

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
})

export default connect(mapStateToProps)(CollectionsOverview);