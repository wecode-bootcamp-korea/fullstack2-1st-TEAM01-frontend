import React, { Component } from 'react';
import SortOptionBox from './SortOptionBox';
import './SortBtn.scss';

class SortBtn extends Component {
  render() {
    const { closeAllModal, closeSortModal, isSortModalOn, toggleSortModal } =
      this.props;
    return (
      <>
        <div
          onClick={toggleSortModal}
          className={`SortBtn classForSortClose ${
            isSortModalOn ? 'sortBtnOn' : 'sortBtnNotOn'
          }`}
        >
          <p className='sortBtntext classForSortClose'>Sort</p>
        </div>
        <SortOptionBox
          closeAllModal={closeAllModal}
          closeSortModal={closeSortModal}
          isSortModalOn={isSortModalOn}
        />
      </>
    );
  }
}

export default SortBtn;
