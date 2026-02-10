import React, { useEffect, useState } from 'react'
import { editCardCategory, getSingleCardCategory } from '../../utils/Program';
import Loaders from '../../Components/Loaders/Loaders';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import toast from 'react-hot-toast';

const EditCardCategory = ({ cardId, seteditModal, fetchCards }) => {
    const [cardname, setcardname] = useState();
    const [singlecard, setsinglecard] = useState([])
    const [loading, setloading] = useState(false);
    const editCategories = async () => {
        if (cardname != '') {
            try {
                setloading(true);
                const res = await editCardCategory({
                    name: cardname
                }, cardId);
                if (res?.success) {
                    fetchCards();
                    seteditModal(false)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter the field...')
        }
    }

    const fetchSingleQuote = async () => {
        if (cardId) {
            try {
                setloading(true);
                const res = await getSingleCardCategory(cardId);
                setsinglecard(res?.data)
                console.log(res)
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        }
    }
    
    useEffect(() => {
        fetchSingleQuote()
    }, [])

    useEffect(() => {
        setcardname(singlecard?.name)
    }, [singlecard])
  return (
    <>
          {loading && <Loaders />}
          <div className='modal_wrapper' onClick={(() => seteditModal(false))}></div>
          <div className='modal_div'>
              <h4>Edit Quotes Category</h4>
              <i class="fa-solid fa-xmark" onClick={(() => seteditModal(false))}></i>
              <div style={{
                  margin: '25px 0'
              }}>
                  <Input value={cardname} onChange={((e) => setcardname(e.target.value))} label={'Quotes Category Name'} required={true} placeholder={'Enter category name'} />
              </div>
              <div onClick={editCategories}>
                  <Button children={'Edit'} styles={{
                      marginLeft: 'auto'
                  }} />
              </div>
          </div>
    </>
  )
}

export default EditCardCategory
