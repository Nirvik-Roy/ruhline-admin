import React, { useState, useEffect } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import { getAllPrograms } from '../../utils/Program';
import Loaders from '../../Components/Loaders/Loaders';
import Select from 'react-select/base';
import { editCoupons, getSingleCoupons } from '../../utils/coupons';
const EditCouponModal = ({ seteditCoupon, couponId, fetchCoupons }) => {
    const [loading, setLoading] = useState(false);
    const [allPrograms, setallPrograms] = useState([]);
    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isActive, setisActive] = useState(false);
    const [applies, setapplies] = useState(false);
    const [couponErrors, setcouponErrors] = useState()
    const [inputValue, setInputValue] = useState("");
    const [singleCoupon, setSingleCoupon] = useState()
    const [formData, setformData] = useState({
        code: '',
        name: '',
        type: '',
        amount: '',
        usage_limit_per_user: '',
        applies_to_all: 'false',
        is_active: 'false',
        starts_at: '',
        ends_at: '',
        program_category_ids: []
    })

    const fetchSingleCoupon = async () => {
        try {
            setLoading(true)
            const res = await getSingleCoupons(couponId);
            setSingleCoupon(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (couponId) {
            fetchSingleCoupon()
        }
    }, [couponId])

    useEffect(() => {
        setformData({
            code: singleCoupon?.code || '',
            name: singleCoupon?.name || '',
            type: singleCoupon?.type || '',
            amount: singleCoupon?.amount || '',
            usage_limit_per_user: singleCoupon?.usage_limit_per_user || '',
            applies_to_all: `${singleCoupon?.applies_to_all || 'false'} `,
            is_active: `${singleCoupon?.is_active || 'false'} `,
            starts_at: singleCoupon?.starts_at
                ? new Date(singleCoupon.starts_at).toISOString().split("T")[0]
                : "",
            ends_at: singleCoupon?.ends_at
                ? new Date(singleCoupon.ends_at).toISOString().split("T")[0]
                : "",
            program_category_ids: singleCoupon?.program_categories?.map((e) => e.id) || []
        })

        setisActive(singleCoupon?.is_active)
        setapplies(singleCoupon?.applies_to_all)
    }, [singleCoupon])


    useEffect(() => {
        if (singleCoupon?.program_categories) {
            const mapped = singleCoupon.program_categories.map(e => ({
                value: e.id,
                label: e.name
            }));
            setSelectedPrograms(mapped);
        }
    }, [singleCoupon]);
    const handleSelect = (selected) => {
        setSelectedPrograms(selected || []);
        // Update formData with IDs
        setformData(prev => ({
            ...prev,
            program_category_ids: selected.map(item => item.value)
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: name === "code" ? value.toUpperCase() : value
        })
    }
    const fetchPrograms = async () => {
        setLoading(true)
        try {
            const res = await getAllPrograms();
            setallPrograms(res.data?.data);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchPrograms()
    }, []);

    const options = allPrograms?.map(item => ({
        value: item?.id,
        label: item?.name
    })) || [];

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const dummyData = { ...formData };
            dummyData.is_active = isActive ? 'true' : 'false',
                dummyData.applies_to_all = applies ? 'true' : 'false';
            if (dummyData.applies_to_all == 'true') {
                delete dummyData.program_category_ids
            }
            const res = await editCoupons(dummyData, couponId);
            setcouponErrors(res)
            if(res.success){
                fetchCoupons();
                seteditCoupon(false)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (!seteditCoupon) {
            setcouponErrors([])
        }
    }, [seteditCoupon])
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => seteditCoupon(false))}></div>
            <div className='modal_div'>
                <h4>Add Coupon</h4>
                <i class="fa-solid fa-xmark" onClick={(() => seteditCoupon(false))}></i>
                <form className='modal_form'>
                    <div className='codeName_input'>
                        <Input name={'code'} onChange={handleChange} value={formData.code} label={'Coupon Code'} required={true} placeholder={'Enter coupon code'} />

                        {couponErrors?.code && <small style={{
                            marginLeft: '15px',
                            color: 'red'
                        }}>{couponErrors?.code && couponErrors?.code[0]}</small>}
                    </div>
                    <div className='modal_input_grid_wrapper'>
                        <div>
                            <Input name={'name'} onChange={handleChange} value={formData.name} label={'Coupon Name'} required={true} placeholder={'Enter coupon name'} />
                            {couponErrors?.name && <small style={{
                                marginLeft: '15px',
                                color: 'red'
                            }}>{couponErrors?.name && couponErrors?.name[0]}</small>}
                        </div>
                        <div className='input_form'>
                            <label>Coupon Type <span>*</span></label>
                            <select onChange={handleChange} name='type' value={formData.type}>
                                <option>--select-coupon-type</option>
                                <option value={'fixed'}>Fixed</option>
                                <option value={'percentage'}>Percentage</option>
                            </select>
                            {couponErrors?.type && <small style={{
                                marginLeft: '15px',
                                color: 'red'
                            }}>{couponErrors?.type && couponErrors?.type[0]}</small>}
                        </div>
                        <div>
                            <Input name={'amount'} value={formData.amount} onChange={handleChange} label={'Amount (in SAR)'} required={true} placeholder={'Enter amount'} />
                            {couponErrors?.amount && <small style={{
                                marginLeft: '15px',
                                color: 'red'
                            }}>{couponErrors?.amount && couponErrors?.amount[0]}</small>}
                        </div>
                        <div>
                            <Input name={'usage_limit_per_user'} onChange={handleChange} value={formData.usage_limit_per_user} label={'Usage Limit (per user)'} required={true} placeholder={'Enter usage limit'} />
                            {couponErrors?.usage_limit_per_user && <small style={{
                                marginLeft: '15px',
                                color: 'red'
                            }}>{couponErrors?.usage_limit_per_user && couponErrors?.usage_limit_per_user[0]}</small>}
                        </div>
                        <div>
                            <Input value={formData.starts_at} onChange={handleChange} name={'starts_at'} label={'Start Date'} type={'date'} required={true} placeholder={'27/10/2025'} />
                            {couponErrors?.starts_at && <small style={{
                                marginLeft: '15px',
                                color: 'red'
                            }}>{couponErrors?.starts_at && couponErrors?.starts_at[0]}</small>}
                        </div>
                        <div>
                            <Input value={formData.ends_at} onChange={handleChange} name={'ends_at'} label={'End Date'} type={'date'} required={true} placeholder={'27/10/2025'} />
                            {couponErrors?.ends_at && <small style={{
                                marginLeft: '15px',
                                color: 'red'
                            }}>{couponErrors?.ends_at && couponErrors?.ends_at[0]}</small>}
                        </div>

                        <div className='applies_checkbox_wrapper' style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: '10px',
                            gridColumn: '1/-1',
                            marginLeft: '10px'
                        }}>
                            <input onClick={(() => {
                                setisActive(!isActive)
                            })} style={{
                                width: '17px',
                                height: '17px',
                                accentColor: '#ce7356'
                            }} checked={isActive} type='checkbox' />
                            <p style={{
                                fontSize: '1rem',
                                color: 'var(--text-color)'
                            }}>Is Active</p>
                        </div>

                        <div className='applies_checkbox_wrapper' style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: '10px',
                            marginLeft: '10px'
                        }}>
                            <input onClick={(() => {
                                setapplies(!applies)
                            })} style={{
                                width: '17px',
                                height: '17px',
                                accentColor: '#ce7356'
                            }} type='checkbox' checked={applies} />
                            <p style={{
                                fontSize: '1rem',
                                color: 'var(--text-color)'
                            }}>Applies to all</p>


                        </div>

                        {!applies && <div className='input_form multiple_program_categories_input_form'>
                            <label>Select Program Categories</label>
                            <Select
                                styles={{
                                    height: '45px'
                                }}
                                options={options}
                                value={selectedPrograms}
                                onChange={handleSelect}
                                isMulti
                                onInputChange={(newValue) => setInputValue(newValue)}
                                menuIsOpen={isMenuOpen}
                                onMenuOpen={() => setIsMenuOpen(true)}
                                onMenuClose={() => setIsMenuOpen(false)}
                                placeholder="Select programs categories"
                            />
                            {
                                couponErrors?.program_category_ids && <small style={{
                                    marginLeft: '15px',
                                    color: 'red',
                                    gridColumn: '1/-1'
                                }}>{couponErrors?.program_category_ids && couponErrors?.program_category_ids[0]}</small>}
                        </div>}
                    </div>
                    <div className='change_cancel_wrapper' onClick={(() => handleSubmit())}>
                        <Button children={'Add'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditCouponModal
