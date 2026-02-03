import React, { useEffect, useState } from 'react'
import { getSingleProgram } from '../../utils/Program';
import Loaders from '../../Components/Loaders/Loaders';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Editprogram } from '../../Store/Slices/ProgramCategorySlice/EditProgramCategorySlice';
const EditProgramCategoriesModal = ({ setEditModal, editIndex, fetchPrograms, allPrograms, editModal }) => {
    const [singleProgram, setsingleProgram] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editErrors, setEditErrors] = useState()
    const { errors } = useSelector(state => state.editProgram)
    const dispatch = useDispatch()
    const [formData, setformData] = useState({
        name: '',
        parent_id: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        })
    }

    const fetchSingleProgram = async () => {
        try {
            setLoading(true)
            const res = await getSingleProgram(editIndex);
            setsingleProgram(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchSingleProgram()
        fetchPrograms()
    }, [])

    useEffect(() => {
        setEditErrors(errors);
    }, [errors])

    useEffect(() => {
        setformData({
            name: singleProgram?.name || '',
            parent_id: singleProgram?.parent_id || ''
        })
    }, [singleProgram])

    const handleSubmit = async (editId) => {
        try {
            setLoading(true)
            const formDataNew = new FormData();
            formDataNew.append('name', formData.name);
            formDataNew.append('parent_id', formData.parent_id)
            const result = await dispatch(Editprogram({
                id: editId,
                formData: formDataNew,
            }))
            if (Editprogram.fulfilled.match(result)) {
                setEditModal(false)
            }
        } catch (err) { console.log(err) }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => setEditModal(false))}></div>
            <div className='modal_div'>
                <h4>Edit Program Category</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setEditModal(false))}></i>
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

                        <small style={{
                            color: 'red'
                        }}>{editErrors?.parent_id && editErrors?.parent_id[0]}</small>
                    </div>

                    <Input value={formData.name} name={'name'} onChange={handleChange} type={'text'} label={'Category Name'} placeholder={"Enter category name"} />
                    <small style={{
                        color: 'red'
                    }}>{editErrors?.name && editErrors?.name[0]}</small>
                </div>
                <div onClick={(() => { handleSubmit(editIndex) })}>
                    <Button children={'Add'} styles={{
                        marginLeft: 'auto'
                    }} />
                </div>
            </div>
        </>
    )
}

export default EditProgramCategoriesModal
