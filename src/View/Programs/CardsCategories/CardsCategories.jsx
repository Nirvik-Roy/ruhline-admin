import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../../Components/Button.jsx';
import Pagination from '../../../Components/Pagination/Pagination.jsx';
import ellipse from '../../../assets/_MoreIcon_.svg'
import AddCategoryModal from '../../Modal/AddCategoryModal.jsx';
import { getAllCardCategory, postCardCategory } from '../../../utils/Program.js';
import toast from 'react-hot-toast';
import Loaders from '../../../Components/Loaders/Loaders.jsx';
import EditCardCategory from '../../Modal/EditCardCategory.jsx';
import { commonDelelteApi } from '../../../utils/common.js';
import DeleteModal from '../../../Components/DeleteModal/DeleteModal.jsx';

const CardsCategories = () => {
    const [index, setIndex] = useState([]);
    const navigate = useNavigate();
    const [isModal, setisModal] = useState(false);
    const dropdownRef = useRef(null);
    const [cardGame, setcardGame] = useState()
    const [loading, setloading] = useState(false);
    const [cardCategoryData, setCardCategorydata] = useState([])
    const [cardId, setCardId] = useState();
    const [editModal, seteditModal] = useState(false);
    const [deleteId, setdeleId] = useState();
    const [deleleteModal, setdeleteModal] = useState(false)
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }

    const fetchCards = async () => {
        try {
            setloading(true)
            const res = await getAllCardCategory()
            console.log(res);
            setCardCategorydata(res?.data?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchCards()
    }, [])


    const postCategories = async () => {
        if (cardGame != '') {
            try {
                setloading(true);
                const res = await postCardCategory({
                    name: cardGame
                });
                if (res?.success) {
                    fetchCards()
                    setisModal(false)
                    setcardGame('')
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter the filed...')
        }
    }

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


        const deleteFunc = async () => {
            setloading(true)
            const res = await commonDelelteApi('/admin/card-category', deleteId);
            if (res?.success) {
                setloading(false)
                setdeleteModal(false)
                fetchCards();
                setIndex([])
            }
        }
    
        const handleDelete = (id) => {
            setdeleId(id)
            setdeleteModal(true)
        }

    return (
        <>
            {loading && <Loaders />}
            {isModal && <AddCategoryModal setcardGame={setcardGame} cardGame={cardGame} postCategories={postCategories} setisModal={setisModal} />}
            {editModal && <EditCardCategory cardId={cardId} fetchCards={fetchCards} seteditModal={seteditModal} />}
            {deleleteModal && <DeleteModal details={'Do you really want to delete this category?'} title={'Delete Card Category'} setdeleteModal={setdeleteModal} onClick={deleteFunc} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Cards Categories</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/card/categories'))}>Cards Categories</span></small>
                    </div>

                    <div className='coaches_button_wapper'>

                        <div onClick={(() => setisModal(!isModal))}>
                            <Button children={'Add New Category'} styles={{
                                fontSize: '13px',
                                padding: '15px 15px',
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
                                <th>Cards Category Name</th>
                                <th>No. of cards present</th>

                                <th style={{
                                    textAlign: 'center'
                                }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {cardCategoryData.length <= 0 && <td colSpan={12}>No card categories available...</td>}
                            {cardCategoryData.length > 0 && cardCategoryData?.map((e, i) => (
                                <tr>
                                    <td>
                                        {e?.name}
                                    </td>
                                    <td>{e?.cards_count}</td>
                                    <td ref={dropdownRef} style={{
                                        position: 'relative'
                                    }}>
                                        <img onClick={((event) => {
                                            event.stopPropagation()
                                            indexFunction(i)
                                        })} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper' style={{
                                            width: '60%',
                                            left: '0'
                                        }}>
                                            <p onClick={(() => navigate(`/dashboard/programs/card/categories/${e?.id}`))}>View</p>
                                            <p onClick={(() => {
                                                setCardId(e?.id)
                                                seteditModal(true)
                                            })}>Edit</p>
                                            <p onClick={(() => handleDelete(e?.id))}>Delete</p>
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

export default CardsCategories
