import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import dashboardIcon from '../../assets/Capa_1 (2).svg'
import flatIcon from '../../assets/g2331.svg'
import user from '../../assets/Capa_1 (3).svg'
import report from '../../assets/Report.svg'
import billings from '../../assets/svg3441.svg'
import cms from '../../assets/CMS.svg'
import coupon from '../../assets/svg2271.svg'
const Sidebar = () => {
    return (
        <>
            <div className='sidebar_Wrapper'>
                <NavLink to={'/dashboard'} end>
                    <img src={dashboardIcon} />
                    <p>Dashboard</p>
                </NavLink>

                <NavLink to={'/dashboard/coaches'}>
                    <img src={flatIcon} />
                    <p>Coaches</p>
                </NavLink>


                <NavLink to={'/dashboard/customers'}>
                    <img src={user} />
                    <p>Customers</p>
                </NavLink>


                <NavLink to={'/dashboard/programs'}>
                    <img src={report} />
                    <p>Programs</p>
                </NavLink>



                <NavLink to={'/dashboard/billings'}>
                    <img src={billings} />
                    <p>Billings</p>
                </NavLink>


                <NavLink to={'/dashboard/payouts'}>
                    <img src={report} />
                    <p>Payouts</p>
                </NavLink>



                <NavLink to={'/dashboard/staff'}>
                    <img src={billings} />
                    <p>Our Staff</p>
                </NavLink>


                <NavLink to={'/dashboard/cms'}>
                    <img src={cms} />
                    <p>CMS</p>
                </NavLink>

                <NavLink to={'/dashboard/coupons'}>
                    <img src={coupon} />
                    <p>Coupons</p>
                </NavLink>

                <NavLink to={'/dashboard/support/disputes'}>
                    <img src={billings} />
                    <p>Support</p>
                </NavLink>


                <NavLink to={'/cc'}>
                    <img src={report} />
                    <p>Marketing</p>
                </NavLink>


                <NavLink to={'/cc'}>
                    <img src={report} />
                    <p>Reports</p>
                </NavLink>
            </div>
        </>
    )
}

export default Sidebar
