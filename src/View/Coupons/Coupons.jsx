import React, { useState } from 'react'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import ellipse from '../../assets/_MoreIcon_.svg'
import Pagination from '../../Components/Pagination/Pagination'
import Button from '../../Components/Button'
import AddCouponModal from '../Modal/AddCouponModal'
import EditCouponModal from '../Modal/EditCouponModal.jsx'
const Coupons = () => {
    const [index, setIndex] = useState([]);
    const [coupon, setCoupon] = useState(false)
    const [editCoupon, seteditCoupon] = useState(false)
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    return (
        <>
            {coupon && <AddCouponModal setCoupon={setCoupon} />}
            {editCoupon && <EditCouponModal seteditCoupon={seteditCoupon} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <h2>Coupons</h2>
                    <div className='coaches_button_wapper'>
                        <div onClick={(() => setCoupon(true))}>
                            <Button children={'Add coupon'} styles={{
                                fontSize: '13px',
                                height: '46px'
                            }} />
                        </div>
                        <div className='coaches_search_wrapper'>
                            <input placeholder='Search' />
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>

                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Coupon Name</th>
                                <th>Coupon Type</th>
                                <th>Value</th>
                                <th>Usage Limit (per user)</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Applied To</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6].map((e, i) => (
                                <tr>
                                    <td>
                                        Festive10
                                    </td>
                                    <td>Percentage</td>
                                    <td>10%</td>
                                    <td style={{
                                        textAlign: 'center'
                                    }}>1</td>
                                    <td>27/10/2025</td>
                                    <td>27/10/2025</td>
                                    <td>All Services </td>
                                    <td>
                                        <img onClick={(() => indexFunction(i))} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper' style={{
                                            bottom: '-80px'
                                        }}>

                                            <p onClick={(() => { seteditCoupon(true) })}>Edit</p>
                                            <p>Delete</p>
                                        </div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination />
            </div>
        </>
    )
}

export default Coupons
