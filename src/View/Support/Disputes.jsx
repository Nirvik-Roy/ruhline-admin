import React, { useState } from 'react'
import './Disputes.css'
import { useNavigate } from 'react-router-dom'
import Button from '../../Components/Button'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import ellipse from '../../assets/_MoreIcon_.svg'
import Pagination from '../../Components/Pagination/Pagination.jsx'
import DisputeViewModal from '../Modal/DisputeViewModal.jsx'
const Disputes = () => {
    const [index, setIndex] = useState([]);
    const [disputes, setdisputes] = useState(false)
    const navigate = useNavigate()
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    return (
        <>
            {disputes && <DisputeViewModal setdisputes={setdisputes} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <h2>Disputes</h2>
                    <div className='coaches_button_wapper'>
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
                                <th>Dispute ID</th>
                                <th>Raised by</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th style={{
                                    textAlign: 'center'
                                }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6].map((e, i) => (
                                <tr>
                                    <td>#ST456666</td>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>
                                            <div className='customer_details_wrapper'>
                                                <p>Bidisha Bhowmick</p>
                                                <p>#ST456666</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>27/10/2025</td>
                                    <td>10:07 AM</td>
                                    <td><p style={{
                                        fontSize: '11px',
                                        color: '#fff',
                                        width: 'fit-content',
                                        background: 'rgba(231, 62, 69, 1)',
                                        padding: '5px',

                                        borderRadius: '5px',
                                        fontWeight: '600'
                                    }}>Open</p></td>
                                    <td>
                                        <img onClick={(() => indexFunction(i))} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper' style={{
                                            bottom: '-30px'
                                        }}>
                                            <p onClick={(() => setdisputes(true))}>View</p>
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

export default Disputes
