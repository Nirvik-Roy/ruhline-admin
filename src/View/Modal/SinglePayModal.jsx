import React, { useEffect, useState } from 'react'
import upload from '../../assets/Vector (8).svg'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import { updatePayoutStatus } from '../../utils/payouts'
import Loaders from '../../Components/Loaders/Loaders'
const SinglePayModal = ({ paymentFunction, checkOutId, getSinglePayoutFunc, update = false, singlePayout }) => {
    const [file, setFile] = useState(null);
    const [transactionNumber, settransacationNumber] = useState('');
    const [loading, setloading] = useState(false)

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0]; // ✅ actual file object
        setFile(selectedFile);

        e.target.value = null; // reset input (optional)
    };
    useEffect(()=>{
        if(update){
            setFile(singlePayout?.payment_receipt_url)
            settransacationNumber(singlePayout?.transaction_number || '')
        }
    }, [singlePayout])

    const payNowFunc = async () => {
        setloading(true)
        const formData = new FormData()
        formData.append('transaction_number', transactionNumber || '')
        formData.append('status', 'paid')
        formData.append('payment_receipt', file)
        const res = await updatePayoutStatus(checkOutId, formData)
        if (res?.success) {
            paymentFunction(0)
            getSinglePayoutFunc()
        }
        setloading(false)
    }


    const editPayment = async () => {
        setloading(true)
        const formData = new FormData()
        formData.append('transaction_number', transactionNumber || '')
        formData.append('status', 'paid')
        if(file instanceof File){
            formData.append('payment_receipt', file)
        }
        const res = await updatePayoutStatus(checkOutId, formData)
        if (res?.success) {
            paymentFunction(0)
            getSinglePayoutFunc()
        }
        setloading(false)
    }

    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => paymentFunction(0))}></div>
            <div className='modal_div'>
                <h4>#{checkOutId}</h4>
                <i class="fa-solid fa-xmark" onClick={(() => paymentFunction(0))}></i>
                <div className='single_pay_wrapper'>
                    <Input value={transactionNumber} onChange={((e) => settransacationNumber(e?.target?.value))} label={'Add Transaction Number'} style={{
                        marginTop: '30px'
                    }} />

                    <p className='or_text' style={{
                        textAlign: 'center'
                    }}>OR</p>
                    <div className='input_form' >
                        <label style={{
                            fontSize: '15px',
                            fontWeight: '500'
                        }}>Upload receipt</label>

                        <div className='files_upload_wrapper'>
                            {!file && <>
                                <img src={upload} />
                                <p>Drag your files or <span>Browse</span></p>
                                <h5>Png, Jpg, Jpeg,pdf,webp supported | file size: 250 KB</h5>
                            </>}

                            {file instanceof File && <img src={URL.createObjectURL(file)} style={{
                                width: '100%',
                                height: '95%',
                                objectFit: 'contain'
                            }} />}


                            {typeof file == String && <img src={file} style={{
                                width: '100%',
                                height: '95%',
                                objectFit: 'contain'
                            }} />}
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp,.pdf"
                                onChange={handleFileUpload}
                            />
                        </div>
                    </div>

                    {!update && <Button onClick={payNowFunc} children={'Mark as Paid'} styles={{
                        marginLeft: 'auto'
                    }} />}

                    {update && <Button onClick={editPayment} children={'Update'} styles={{
                        marginLeft: 'auto'
                    }} />}
                </div>
            </div>
        </>
    )
}

export default SinglePayModal
