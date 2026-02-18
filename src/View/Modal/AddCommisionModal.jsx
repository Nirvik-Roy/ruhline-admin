import React, { useEffect, useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { getGlobalComission, postGlobalCommission } from '../../utils/Program';
import Loaders from '../../Components/Loaders/Loaders.jsx'
import toast from 'react-hot-toast';
const AddCommisionModal = ({ setcommission }) => {
    const [commissionValue, setcommissionValue] = useState('');
    const [loading, setloading] = useState(false);
    const [errors, seterrors] = useState()
    const [data, setdata] = useState()
    const fetchCommisionValue = async () => {
        setloading(true)
        const res = await getGlobalComission()
        setdata(res?.data)
        setloading(false)
    }
    useEffect(() => {
        fetchCommisionValue()
    }, [])

    useEffect(() => {
        setcommissionValue(data?.global_commission_rate || "")
    }, [data])

    const handleSubmit = async () => {
        if (!commissionValue) {
            toast.error("Please enter the field");
            return;
        }

        try {
            setloading(true);

            const res = await postGlobalCommission({
                global_commission_rate: Number(commissionValue),
            });
            if(res?.success){
                setcommission(false)
            }
            seterrors(res)
        } catch (error) {
            console.error(error);
        } finally {
            setloading(false);
        }
    };
    console.log(errors)
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => setcommission(false))}></div>
            <div className='modal_div'>
                <h4>Add Global Commission</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setcommission(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>
                    <Input value={commissionValue} onChange={((e) => setcommissionValue(e.target.value))} name={'global_commission_rate'} label={'Global Commission'} required={true} placeholder={'Add global commission'} />
                </div>

                {errors?.global_commission_rate && <small style={{
                    marginTop: '-13px',
                    color: 'red',
                    display: 'block',
                    fontSize: '12px'
                }}>*{errors?.global_commission_rate[0]}</small>}
                <div >
                    <Button onClick={handleSubmit} children={'Add'} styles={{
                        marginLeft: 'auto'
                    }} />
                </div>
            </div>
        </>
    )
}

export default AddCommisionModal
