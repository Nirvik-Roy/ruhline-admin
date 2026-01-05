import React, { Activity, lazy, Suspense, useState } from 'react'
import Pagination from '../../../Components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import ellipse from '../../../assets/_MoreIcon_.svg'
import ContactInqueriesModal from '../../Modal/ContactInqueriesModal.jsx'
const CmsContact = () => {
    const [index, setIndex] = useState([]);
    const [isModal, setisModal] = useState(false)
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

            {isModal && <ContactInqueriesModal setisModal={setisModal} />}

            <div className='dashboard_container'>
                <div className='coaches_head_wrapper single_coach_head'>
                    <div>
                        <h1>Contact Inquiries</h1>
                        <small> CMS / Contact Inquiries</small>
                    </div>
                </div>
                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Message</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6].map((e, i) => (
                                <tr>
                                    <td>
                                        Bidisha Bhowmick
                                    </td>
                                    <td>bidishabhowmick@gmail.com</td>
                                    <td>+1 1234567890</td>
                                    <td>Lorem ipsum dolor sit amet, consectet.....</td>
                                    <td>
                                        <img onClick={(() => indexFunction(i))} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper' style={{
                                            bottom: '-75px'
                                        }}>
                                            <p onClick={(() => {
                                                setisModal(!isModal)
                                            })}>View</p>
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

export default CmsContact
