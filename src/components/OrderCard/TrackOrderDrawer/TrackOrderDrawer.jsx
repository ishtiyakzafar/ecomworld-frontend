import React, { useState } from 'react';
import './TrackOrderDrawer.scss';
import closeIcon from '../../../assets/icons/close.svg';
import { FaAngleRight } from "react-icons/fa6";
import check from '../../../assets/icons/Vector 1771.svg';
import { getOrderTrackData } from '../../../Helper';


const TrackOrderDrawer = ({ item }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <div className='trackOrderBtn'>
        <p onClick={() => setShowDrawer(true)}>Track <FaAngleRight /></p>
      </div>

      {showDrawer &&
        <div className='trackOrderDrawer'>
          <div className='content'>
            <div className='drawerHeader'>
              <h6>Track Order</h6>
              <div onClick={() => setShowDrawer(false)} className='close'>
                <img src={closeIcon} alt="closeIcon" />
              </div>
            </div>

            <div className='trackOrderDetail'>
              {
                getOrderTrackData(item).map((item, index) => (
                  <div
                    key={item.id}
                    className={`data ${item.value && 'active'} ${item.value && 'check'} ${item.status === 'REFUND' && 'orderRefund'} ${item.status === 'RETURN' && 'orderReturn'} ${item.status === 'CANCELLED' && 'orderCancel'} ${index === 0 && 'first'}`}
                  >
                    <span>{item.value && <img src={check} alt="check" />}</span>
                    <div className='info'>
                      <p>{item.title}</p>
                      <small>{item.value && item.date}</small>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
    </>
  )
};

export default TrackOrderDrawer;