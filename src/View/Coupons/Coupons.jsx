import React, { useEffect, useState, useRef } from 'react'
import ellipse from '../../assets/_MoreIcon_.svg'
import Pagination from '../../Components/Pagination/Pagination'
import Button from '../../Components/Button'
import AddCouponModal from '../Modal/AddCouponModal'
import EditCouponModal from '../Modal/EditCouponModal.jsx'
import { deleteCoupons, getAllCoupons } from '../../utils/coupons.js'
import Loaders from '../../Components/Loaders/Loaders.jsx'
import DeleteModal from '../../Components/DeleteModal/DeleteModal.jsx'
const Coupons = () => {
    const [index, setIndex] = useState([]);
    const [coupon, setCoupon] = useState(false);
    const [couponId, setCouponId] = useState()
    const [editCoupon, seteditCoupon] = useState(false);
    const dropdownRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [deletedId, setdeletedId] = useState()
    const [allCoupondata, setallCouponData] = useState([]);
    const [deleteModal, setdeleteModal] = useState(false)
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }

    const fetchCoupons = async () => {
        try {
            setLoading(true);
            const res = await getAllCoupons();
            setallCouponData(res?.data?.data);

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchCoupons()
    }, [])
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIndex([]);
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleDelete = (id) => {
        setdeleteModal(true)
        setdeletedId(id)
    }

    const deleteFunc = async () => {
        try {
            setLoading(true)
            const res = await deleteCoupons(deletedId);
            if (res.success) {
                setdeleteModal(false)
                fetchCoupons()
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            {loading && <Loaders />}
            {deleteModal && <DeleteModal title={'Delete coupons'} details={"Do you really want to delete this coupon?"} onClick={deleteFunc} setdeleteModal={setdeleteModal} />}
            {coupon && <AddCouponModal setCoupon={setCoupon} />}
            {editCoupon && <EditCouponModal fetchCoupons={fetchCoupons} couponId={couponId} seteditCoupon={seteditCoupon} />}
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
                                <th>Coupon Code</th>
                                <th>Coupon Type</th>
                                <th>Amount</th>
                                <th>Usage Limit (per user)</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Applied To</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allCoupondata.length < 0 && <td colSpan={12} style={{
                                textAlign: 'center'
                            }}>No coupons available</td>}
                            {allCoupondata.length > 0 && allCoupondata?.map((e, i) => (
                                <tr>
                                    <td>
                                        {e?.name}
                                    </td>
                                    <td>
                                        {e?.code}
                                    </td>
                                    <td>{e?.type}</td>
                                    <td>{e?.amount}</td>
                                    <td style={{
                                        textAlign: 'center'
                                    }}>{e?.usage_limit_per_user}</td>
                                    <td>{new Date(`${e.starts_at}`)
                                        .toLocaleDateString("en-GB")}</td>
                                    <td>{new Date(`${e.ends_at}`)
                                        .toLocaleDateString("en-GB")}</td>
                                    <td>{e?.applies_to_all ? 'Few categories' : 'All Services'}</td>
                                    <td ref={dropdownRef}>
                                        <img onClick={((e) => {
                                            e.stopPropagation()
                                            indexFunction(i)
                                        })} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper' style={{
                                            bottom: '-80px'
                                        }}>

                                            <p onClick={(() => {
                                                seteditCoupon(true)
                                                setCouponId(e?.id)
                                            })}>Edit</p>
                                            <p onClick={(() => {
                                                handleDelete(e?.id)
                                            })}>Delete</p>
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
