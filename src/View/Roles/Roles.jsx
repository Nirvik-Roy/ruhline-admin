import React, { useState } from 'react'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import ellipse from '../../assets/_MoreIcon_.svg'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../Components/Pagination/Pagination'
import Button from '../../Components/Button'
import AddRoleModal from '../Modal/AddRoleModal'
import ViewRoleModal from '../Modal/ViewRoleModal'
const Roles = () => {
    const [index, setIndex] = useState([]);
    const navigate = useNavigate()
    const [role, setRole] = useState({
        addRole: false,
        editRole: false,
        viewRole: false,
    });
    const roleFunction = (i) => {
        setRole({
            addRole: i === 1 ? true : false,
            editRole: i === 2 ? true : false,
            viewRole: i === 3 ? true : false
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
      {  role.viewRole &&   <ViewRoleModal roleFunction={roleFunction}/>}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Roles</h2>
                        <small>Our Staff / Roles</small>
                    </div>

                    <div className='coaches_button_wapper'>

                        <div onClick={(() => roleFunction(1))}>
                            <Button children={'Add Role'} styles={{
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
                                <th>Role</th>
                                <th>Permissions</th>
                                <th style={{
                                    textAlign:'center'
                                }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6,1, 2, 3].map((e, i) => (
                                <tr>
                                    <td>Role 1</td>
                                    <td>Coupons | Customer | Coaches</td>
                                    <td>
                                        <img onClick={(() => indexFunction(i))} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper' style={{
                                            width:'120px',
                                            left:'20px'
                                        }}>
                                            <p onClick={(() => roleFunction(3))}>View</p>
                                            <p onClick={(() => roleFunction(2))}>Edit</p>
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

export default Roles
