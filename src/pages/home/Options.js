import React from 'react';

const Options = ({ orderBy, handleOrderByChange }) => (
  <div className='options'>
    <div className='custom-select'>
      <select name='order-by' value={orderBy} onChange={handleOrderByChange}>
        <option value='desc'>Les plus récentes d&#39;abord</option>
        <option value='asc'>Les plus anciennes d&#39;abord</option>
      </select>
      <span className='custom-arrow material-icons-round'>expand_more</span>
    </div>
  </div>
);

export default Options;
