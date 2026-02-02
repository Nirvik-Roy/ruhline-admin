import React, { useEffect, useState } from 'react'
import '../../Coaches/SingleCoache/SingleCoache.css'
import Button from '../../../Components/Button'
import photo from '../../../assets/Avatar.png'
import UpcomingProgramSlider from '../../Coaches/SingleCoache/UpcomingProgramSlider.jsx'
import ProgramAssignedSlider from '../../Coaches/SingleCoache/ProgramAssignedSlider.jsx'
import CompletedProgramSlider from './CompletedProgramSlider.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
import { deleteCustomer, getSingleCustomer } from '../../../utils/cutomer'
import EditCustomerModal from '../../Modal/EditCustomerModal.jsx'
import { useSelector } from 'react-redux'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal.jsx'
const SingleCustomer = () => {
    const navigate = useNavigate();
    const { isEdited } = useSelector(state => state.editCustomer)
    const [singleData, setsingleData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [editCustomer, seteditCustomer] = useState(false);
    const [customerId, setCustomerId] = useState();
    const [deleteModal,setdeleteModal] = useState(false)


    const singleDataFetch = async () => {
        if (id) {
            setLoading(true)
            try {
                const res = await getSingleCustomer(id);
                setsingleData(res)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
    }

    const deleteFunc = async()=>{
        setLoading(true)
        try{
         const res = await deleteCustomer(id);
         if(res.success){
            navigate('/dashboard/customers',{replace:true})
         }
        }catch(err){
          console.log(err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        singleDataFetch()
    }, [isEdited])

    const handleDelete = () =>{
        setdeleteModal(true)
    }
    
    return (
        <>
            {editCustomer && <EditCustomerModal customerId={customerId} seteditCustomer={seteditCustomer} />}
            {deleteModal && <DeleteModal onClick={deleteFunc} setdeleteModal={setdeleteModal} title={'Delete Customer'} details={'Are you sure you want to delete this customer?...'} />}
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='single_coache_head_Wrapper'>
                    <div className='single_coach_head'>
                        <h1>{singleData?.user?.name} </h1>
                        <small style={{
                            cursor: 'pointer'
                        }}> <span onClick={(() => navigate('/dashboard/customers'))}>Customers</span> / <span onClick={(() => navigate('/dashboard/customers/single-customer/1'))}>{singleData?.user?.name}</span></small>
                    </div>
                    <div className='single_button_Wrapper'>
                        <button onClick={(() => handleDelete())}>Delete</button>
                        <div onClick={(() =>{ setCustomerId(singleData?.id)
                        seteditCustomer(true)
                        })}>
                            <Button children={'Edit'} />
                        </div>
                    </div>
                </div>

                <div className='single_coaches_photos_wrapper'>
                    <div className='single_coache_img'>
                        <img src={singleData?.profile?.profile_image ? singleData?.profile?.profile_image : photo} />
                    </div>
                    <div className='single_coache_details'>
                        <div className='single_coach_details_head_Wrapper'>
                            <h3>{singleData?.user?.name}</h3>
                            {/* <h5>Total Earned: SAR 2,245</h5> */}
                        </div>

                        <ul className='single_coach_list'>
                            {/* <li>Coach type: <span>Yoga trainer</span></li> */}
                            {singleData?.user?.email && <li>Email: <span>{singleData?.user?.email}</span></li>}
                            {(singleData?.profile?.phone_country_code?.phone_code && singleData?.profile?.phone) && <li>Phone: <span>+{singleData?.profile?.phone_country_code?.phone_code} {singleData?.profile?.phone}</span></li>}
                            {(singleData?.profile?.address_line_1 && singleData?.profile?.address_line_2) && <li>Address: <span>{singleData?.profile?.address_line_1}</span>{singleData?.profile?.address_line_2}</li>}
                            {
                                singleData?.profile?.landmark && <li>Landmark: <span>{singleData?.profile?.landmark}</span></li>
                            }
                            {
                                singleData?.profile?.postal_code && <li>postal_code: <span>{singleData?.profile?.postal_code}</span></li>
                            }
                        </ul>
                    </div>
                </div>
                <UpcomingProgramSlider />
                <CompletedProgramSlider />
            </div>
        </>
    )
}

export default SingleCustomer
