import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../Components/Button.jsx';
import Pagination from '../../../Components/Pagination/Pagination.jsx';
import ellipse from '../../../assets/_MoreIcon_.svg'
import AddCardModal from '../../Modal/AddCardModal.jsx';
import toast from 'react-hot-toast';
import { commonDelelteApi } from '../../../utils/common.js';
import { getAllcards, getSingleCard, getSingleCardCategory, postCard } from '../../../utils/Program.js';
import EditCardModal from '../../Modal/EditCardModal.jsx';
import Loaders from '../../../Components/Loaders/Loaders.jsx';
import DeleteModal from '../../../Components/DeleteModal/DeleteModal.jsx';

const SingleCategories = () => {
    const [index, setIndex] = useState([]);
    const navigate = useNavigate();
    const [isModal, setisModal] = useState(false);
    const [loading, setloading] = useState(false)
    const [allCardsdata, setallCardsdata] = useState([]);
    const [isEditModal, setisEditModal] = useState(false)
    const [cardId, setcardId] = useState()
    const [cardName, setcardName] = useState('');
    const [cardDescription, setcardDescription] = useState()
    const dropdownRef = useRef(null);
    const [singleCardData, setsingleCardData] = useState({})
    const [deleteId, setdeleId] = useState();
    const [deleleteModal, setdeleteModal] = useState(false)
    const { id } = useParams()
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    const fetchCards = async () => {
        setloading(true)
        const res = await getAllcards(id);
        if (res?.success) {
            setallCardsdata(res?.data?.data)
        }
        setloading(false)
    }

    console.log(allCardsdata)

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


    const fetchSingleQuoteCategory = async () => {
        setloading(true)
        const res = await getSingleCardCategory(id);
        if (res?.success) {
            setsingleCardData(res?.data)
        }
        setloading(false)
    }

    useEffect(() => {
        fetchCards()
        fetchSingleQuoteCategory()
    }, [id])
    const addCardFunc = async () => {
        if (cardName != "" && cardDescription != '') {
            setloading(true)
            const res = await postCard({
                name: cardName,
                card_category_id: id,
                description: cardDescription || ''
            });
            if (res?.success) {
                fetchCards()
                fetchSingleQuoteCategory()
                setisModal(false)
                setcardDescription("")
                setcardName("")
            }
            setloading(false)
        } else {
            toast.error("Plz enter the fields")
        }
    }
    const deleteFunc = async () => {
        setloading(true)
        const res = await commonDelelteApi('/admin/card-category/cards', deleteId);
        if (res?.success) {
            setloading(false)
            setdeleteModal(false)
            fetchCards();
            setIndex([])
        }
        setloading(false)
    }

    const handleDelete = (id) => {
        setdeleId(id)
        setdeleteModal(true)
    }
    return (
        <>
            {loading && <Loaders />}
            {isModal && <AddCardModal addCardFunc={addCardFunc} cardName={cardName} setcardName={setcardName} cardDescription={cardDescription} setcardDescription={setcardDescription} setisModal={setisModal} />}
            {deleleteModal && <DeleteModal details={'Do you really want to delete this card?'} setdeleteModal={setdeleteModal} title={'Delete card'} onClick={deleteFunc} />}
            {isEditModal && <EditCardModal setisEditModal={setisEditModal} fetchCards={fetchCards} cardId={cardId} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>{singleCardData?.name}</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/card/categories'))}>Cards Categories</span> / <span onClick={(() => navigate(`/dashboard/programs/card/categories/${id}`))}>{singleCardData?.name}</span></small>
                    </div>

                    <div className='coaches_button_wapper'>

                        <div onClick={(() => setisModal(!isModal))}>
                            <Button children={'Add card'} styles={{
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
                                <th>Card Name</th>
                                <th>Description</th>

                                <th style={{
                                    textAlign: 'center'
                                }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {allCardsdata?.length <= 0 && <td colSpan={12}>No cards found...</td>}
                            {allCardsdata?.length > 0 && allCardsdata?.map((e, i) => (
                                <tr>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>

                                            <div className='customer_details_wrapper'>
                                                <p>{e?.name}</p>
                                                <p style={{
                                                    fontSize: '10px'
                                                }}>{e?.card_category?.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{e?.description}</td>
                                    <td ref={dropdownRef} style={{
                                        position: 'relative'
                                    }}>
                                        <img onClick={((event) => {
                                            event.stopPropagation()
                                            indexFunction(i)
                                        })} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper' style={{
                                            width: 'fit-content',
                                            left: '0px',
                                            bottom: '-80px'
                                        }}>
                                            <p onClick={(() => {
                                                setcardId(e?.id);
                                                setisEditModal(true)
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

export default SingleCategories
