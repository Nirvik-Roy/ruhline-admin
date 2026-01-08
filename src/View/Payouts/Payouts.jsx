import React, { useState } from 'react'
import './Payouts.css'
import Pagination from '../../Components/Pagination/Pagination'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import eye from '../../assets/elements.svg'
import PayoutViewModal from '../Modal/PayoutsViewModal'
const Payouts = () => {
    const [index, setIndex] = useState(0);
    const [modalisOpen, setmodalIsOpen] = useState(false)
    const [dropdown, setdropdown] = useState({
        dropdown1: false,
        dropdown2: false
    })
    const dropdownfunc = (i) => {
        setIndex(i)
        if (index === i) {
            dropdownfunc(0)
        } else {

            setdropdown({
                dropdown1: i === 1 ? true : false,
                dropdown2: i === 2 ? true : false
            })
        }
    }
    return (
        <>
            {modalisOpen && <PayoutViewModal setmodalIsOpen={setmodalIsOpen} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Payouts</h2>
                    </div>
                    <div className='coaches_button_wapper'>
                        <div className='total_orders_select_wrapper'>
                            <div onClick={(() => { dropdownfunc(1) })} style={{
                                position: 'relative',
                                cursor: 'pointer'
                            }}>
                                <p>
                                    Payout frequency
                                </p>
                                <i class="fa-solid fa-angle-down"></i>

                                {dropdown.dropdown1 && <div onClick={((e) => e.stopPropagation())} className='dropdown_wrapper'>
                                    <p>Last month</p>
                                    <p>Last 7 days</p>
                                </div>}
                            </div>
                        </div>

                        <div className='total_orders_select_wrapper'>
                            <div onClick={(() => dropdownfunc(2))} style={{
                                position: 'relative',
                                cursor: 'pointer'
                            }}>
                                <p>
                                    Commission %
                                </p>
                                <i class="fa-solid fa-angle-down"></i>

                                {dropdown.dropdown2 && <div onClick={((e) => e.stopPropagation())} className='dropdown_wrapper' style={{
                                    height: '150px',
                                    overflowY: 'auto',
                                    bottom: '-160px'
                                }}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5].map((e, i) => {
                                        return (
                                            <p>{e}</p>
                                        )
                                    })}
                                </div>}
                            </div>
                        </div>

                    </div>
                </div>
                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Coach</th>
                                <th>Pending Payouts</th>
                                <th>Paid Amounts</th>
                                <th>Payment Status </th>
                                <th style={{
                                    textAlign: 'center'
                                }}>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6].map((e, i) => (
                                <tr>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>
                                            <div className='customer_img_div'>
                                                <img src={img} />
                                            </div>
                                            <div className='customer_details_wrapper'>
                                                <p>Bidisha Bhowmick</p>
                                                <p>#ST456666</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>SAR 100</td>
                                    <td>SAR 300</td>
                                    <td>
                                        <p style={{
                                            background: 'rgba(224, 173, 34, 1)',
                                            padding: '4px',
                                            borderRadius: '5px',
                                            color: '#fff',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            width: 'fit-content',
                                            position:'relative',
                                            zIndex:'-1'
                                        }}>Partially Paid</p>
                                    </td>
                                    <td>
                                        <img style={{
                                             position:'relative',
                                            zIndex:'0'
                                        }} onClick={(() => setmodalIsOpen(true))} src={eye} />
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

export default Payouts
