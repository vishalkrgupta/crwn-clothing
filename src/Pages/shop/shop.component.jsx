import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionPreview from '../../Components/collection-preview/collection-preview.component';
import { selectCollections} from "../../redux/shop/shop.selector";

const ShopPage = ({ collections }) => (
    <div className='shop-page'>
        {
            collections.map(({ id, ...otherCollectinoMaps }) => (
                <CollectionPreview key={id} {...otherCollectinoMaps} />
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections:selectCollections
})

export default connect(mapStateToProps)(ShopPage);