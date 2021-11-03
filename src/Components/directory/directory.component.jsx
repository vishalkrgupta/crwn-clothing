import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import {SelectDirectorySections} from '../../redux/directory/directory.selector';

import './directory.styles.scss'

const Directory = ({sections}) => (
    <div className='directory-menu'>
        {
            sections.map(({ id, ...otherSectionProps }) =>
                <MenuItem key={id} {...otherSectionProps} />)
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
sections:SelectDirectorySections
});

export default connect(mapStateToProps)(Directory);