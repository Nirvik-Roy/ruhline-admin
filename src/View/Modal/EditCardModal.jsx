import React, { useEffect, useState } from 'react'
import { editCard, editQuote, getSingleCard } from '../../utils/Program';
import Loaders from '../../Components/Loaders/Loaders';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import toast from 'react-hot-toast';
import Textarea from '../../Components/Textarea';

const EditCardModal = ({ setisEditModal, fetchCards, cardId }) => {
    const [loading, setloading] = useState(false);
    const [cardName, setcardName] = useState();
    const [singleCard, setsingleCard] = useState();
    const [cardDescription,setcardDescription] = useState()
    const fetchsingleCard = async () => {
        try {
            setloading(true);
            const res = await getSingleCard(cardId)
            setsingleCard(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchsingleCard()
    }, [])

    useEffect(() => {
        setcardName(singleCard?.name)
        setcardDescription(singleCard?.description)
    }, [singleCard])
    const editCardFunc = async () => {
        if (cardName != '' && cardDescription!="") {
            try {
                setloading(true);
                const res = await editCard({
                    name: cardName,
                    card_category_id: singleCard?.card_category?.id,
                    description:cardDescription
                }, cardId);
                if (res?.success) {
                    setisEditModal(false);
                    fetchCards()
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter the fields')
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => setisEditModal(false))}></div>
            <div className='modal_div'>
                <h4>Edit Quote</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisEditModal(false))}></i>
                <div style={{
                    margin: '25px 0'
                }}>
                    <Input value={cardName} onChange={((e) => setcardName(e.target.value))} label={'Card'} required={true} placeholder={'Enter card name'} />
                    <div style={{
                        marginTop:'10px'
                    }}>

                    <Textarea value={cardDescription} onChange={((e) => setcardDescription(e.target.value))} label={'Description'} required={true} placeholder={'Enter card description '} />
                    </div>
                </div>
                <div onClick={editCardFunc}>
                    <Button children={'Edit'} styles={{
                        marginLeft: 'auto'
                    }} />
                </div>
            </div>
        </>
    )
}

export default EditCardModal
