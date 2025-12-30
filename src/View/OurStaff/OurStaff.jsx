
import React, { useState } from 'react'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import ellipse from '../../assets/_MoreIcon_.svg'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../Components/Pagination/Pagination'
import Button from '../../Components/Button'
import './OurStaff.css'
import AddStaffModal from '../Modal/AddStaffModal'
import EditStaffModal from '../Modal/EditStaffModal'
import ViewStaffModal from '../Modal/ViewStaffModal'
const OurStaff = ({}) => {
    const [index, setIndex] = useState([]);
    const navigate = useNavigate()
    const [staff, setStaff] = useState({
        addStaff: false,
        editStaff: false,
        viewStaff: false,
    });
    const staffFunction = (i) => {
        setStaff({
            addStaff: i === 1 ? true : false,
            editStaff: i === 2 ? true : false,
            viewStaff: i === 3 ? true : false
        })
    }
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    return (
        <>
            {staff.addStaff && <AddStaffModal staffFunction={staffFunction} />}
            {staff.editStaff && <EditStaffModal staffFunction={staffFunction} />}
            {staff.viewStaff && <ViewStaffModal staffFunction={staffFunction}/>}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <h2>Our Staff</h2>
                    <div className='coaches_button_wapper'>
                        <div onClick={(()=>navigate('/dashboard/roles'))}>
                            <Button children={'Roles'} styles={{
                                color: 'var(--primary-color)',
                                border: '1px solid var(--primary-color)',
                                padding: '15px 15px',
                                background: 'transparent',
                                fontSize: '13px'
                            }} />
                        </div>
                        <div onClick={(() => staffFunction(1))}>
                            <Button children={'Add staff'} styles={{
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
                                <th>Staff Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6].map((e, i) => (
                                <tr>
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
                                    <td>bidishabhowmick@gmail.com</td>
                                    <td>+1 1234567890</td>
                                    <td>Role 1</td>
                                    <td>
                                        <img onClick={(() => indexFunction(i))} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper'>
                                            <p onClick={(()=>staffFunction(3))}>View</p>
                                            <p onClick={(()=>staffFunction(2))}>Edit</p>
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

export default OurStaff
