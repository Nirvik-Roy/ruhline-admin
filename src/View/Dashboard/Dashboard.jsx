import React, { useState } from 'react'
import './Dashboard.css'
import DashboardCard from './DashboardCard'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import ellipse from '../../assets/_MoreIcon_.svg'
const Dashboard = () => {
    const [dropdown, setdropdown] = useState(false)
    return (
        <>
            <div className='dashboard_container'>
                <h2>Dashboard</h2>
                <div className='dashboard_cards_wrapper'>
                    <DashboardCard />
                </div>
                <div className='total_order_wrapper'>
                    <div className='total_order_head_wrapper'>
                        <h1>Total orders</h1>
                        <div className='total_orders_select_wrapper'>
                            <div onClick={(() => setdropdown(!dropdown))} style={{
                                position: 'relative',
                                cursor:'pointer'
                            }}>
                                <p>
                                    Last 7 days
                                </p>
                                <i  class="fa-solid fa-angle-down"></i>

                                {dropdown && <div onClick={((e)=>e.stopPropagation())} className='dropdown_wrapper'>
                                    <p>Last month</p>
                                    <p>Last 7 days</p>
                                </div>}
                            </div>
                            <div>
                                <p>View All</p>
                            </div>
                        </div>
                    </div>
                    <div className='table_container'>
                        <table className='total_table_order_wrapper'>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Purchase Date</th>
                                    <th>Programs</th>
                                    <th>Customer</th>
                                    <th>Amout</th>
                                    <th>Payment Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5, 6].map((e, i) => (
                                    <tr>
                                        <td>#Order56666</td>
                                        <td>27/10/2025</td>
                                        <td>Program 1</td>
                                        <td>
                                            <div className='customer_wrapper'>
                                                <div className='customer_img_div'>
                                                    <img src={img} />
                                                </div>
                                                <div className='customer_details_wrapper'>
                                                    <p>Bidisha Bhowmick</p>
                                                    <p>#ST456666</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>SAR 300</td>
                                        <td>
                                            <button>Pending</button>
                                        </td>
                                        <td>
                                            <img src={ellipse} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard
