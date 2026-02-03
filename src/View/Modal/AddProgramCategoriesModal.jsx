import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import { getAllPrograms, postPrograms } from '../../utils/Program';
import Loaders from '../../Components/Loaders/Loaders.jsx'
import toast from 'react-hot-toast';
const AddProgramCategoriesModal = ({ setisModal, fetchPrograms }) => {
    const [allPrograms, setallPrograms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setformData] = useState({
        name: '',
        parent_id: ''
    })

    const getPrograms = async () => {
        setLoading(true)
        try {
            const res = await getAllPrograms();
            if(res.success){
                setallPrograms(res.data?.data);
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        })
    }
    useEffect(() => {
        getPrograms()
    }, []);

    const handleSubmit = async () => {
        const { name, parent_id } = formData;
        if (name != '' ) {
            try {
                setLoading(true)
                const formDatanew = new FormData();
                formDatanew.append('name', name);
                { parent_id != '' && formDatanew.append('parent_id', parent_id) }
                const res = await postPrograms(formDatanew);
                if(res.success){
                    fetchPrograms();
                    setisModal(false)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        } else {
            toast.error('Plz enter all fields...')
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
                <h4>Add Program Category</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>

                    <div className='input_form'>
                        <label>Select Parent Category</label>
                        <select onChange={handleChange} name='parent_id' value={formData.parent_id}>
                            <option>--select-parent-category--</option>
                            {allPrograms?.map((e, i) => (
                                e?.parent_id == null && <option value={e.id} key={i}>{e?.name}</option>
                            ))}
                        </select>
                    </div>
                    <Input value={formData.name} name={'name'} onChange={handleChange} type={'text'} label={'Category Name'} placeholder={"Enter category name"} />
                </div>
                <div onClick={(() => handleSubmit())}>
                    <Button children={'Add'} styles={{
                        marginLeft: 'auto'
                    }} />
                </div>
            </div>
        </>
    )
}

export default AddProgramCategoriesModal
