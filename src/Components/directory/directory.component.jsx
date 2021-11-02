import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import { connect } from 'react-redux';
import './directory.styles.scss'

const Directory = ({sections}) => (
    <div className='directory-menu'>
        {
            sections.map(({ id, ...otherSectionProps }) =>
                <MenuItem key={id} {...otherSectionProps} />)
        }
    </div>
);


export default Directory;