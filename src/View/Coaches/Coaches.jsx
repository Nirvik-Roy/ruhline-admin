import React, { useState } from 'react'
import './Coaches.css'
import Button from '../../Components/Button'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import ellipse from '../../assets/_MoreIcon_.svg'
import Pagination from '../../Components/Pagination/Pagination'
import AddCoachModal from '../Modal/AddCoachModal'
import EditCoachModal from '../Modal/EditCoachModal'
import { useNavigate } from 'react-router-dom'
const Coaches = () => {
    const [index, setIndex] = useState([]);
    const navigate = useNavigate()
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    const [coachModal,setCoachModal]=useState(false);
    const [ediCoachModal,seteditCoachModal]=useState(false)
    return (
        <>
      {coachModal &&  <AddCoachModal setCoachModal={setCoachModal}/>}
      {ediCoachModal && <EditCoachModal seteditCoachModal={seteditCoachModal}/>}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <h2>Coaches</h2>
                    <div className='coaches_button_wapper'>
                        <Button children={'Working hours and shifts'} styles={{
                            color: 'var(--primary-color)',
                            border: '1px solid var(--primary-color)',
                            padding: '12px 15px',
                            background: 'transparent',
                            fontSize: '13px'
                        }} />
                        <div onClick={(()=>setCoachModal(!coachModal))}>
         <Button children={'Add a coach'} styles={{
                            fontSize: '13px'
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
                                <th>Coach Name</th>
                                <th>Coach Type</th>
                                <th>Email</th>
                                <th>Phone</th>
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
                                            <div className='customer_img_div'>
                                                <img src={img} />
                                            </div>
                                            <div className='customer_details_wrapper'>
                                                <p>Bidisha Bhowmick</p>
                                                <p>#ST456666</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Mentor</td>
                                    <td>bidishabhowmick@gmail.com</td>
                                    <td>+1 1234567890</td>
                                    <td>
                                        <img onClick={(() => indexFunction(i))} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper'>
                                            <p onClick={(()=>{
                                                navigate(`/dashboard/single-coache/${i+1}`)
                                            })}>View</p>
                                            <p onClick={(()=>{seteditCoachModal(true)})}>Edit</p>
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

export default Coaches
