import React, { useState, useEffect } from 'react'
import Input from '../../../Components/Input'
import { getAllPhoneCountry, getCities, getCountries, getStates } from '../../../utils/location';
import Loaders from '../../../Components/Loaders/Loaders';
const ContactInfo = ({ siteDetailsForm, handleChange }) => {
    const [phoneCodes, setphoneCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [countries, setcountries] = useState([]);
    const [statesData, setstatesData] = useState([]);
    const [citiesData, setcitiesData] = useState([])
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setIsLoading(true);
                // Run calls in parallel
                const [countriesRes, phoneRes,] =
                    await Promise.all([
                        getCountries(),
                        getAllPhoneCountry(),
                    ]);
                // Set state once all are resolved
                setcountries(countriesRes);
                setphoneCodes(phoneRes);

            } catch (err) {
                console.error("Error fetching profile data:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllData();
    }, []);

    const fetchStateData = async (id) => {
        try {
            setIsLoading(true);
            const res = await getStates(id);
            setstatesData(res)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchCityData = async (id) => {
        try {
            setIsLoading(true);
            const res = await getCities(id);
            console.log(res)
            setcitiesData(res)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if (siteDetailsForm?.country_id) {
            fetchStateData(siteDetailsForm?.country_id)
        }
    }, [siteDetailsForm?.country_id])

    useEffect(() => {
        if (siteDetailsForm?.state_id) {
            fetchCityData(siteDetailsForm?.state_id)
        }
    }, [siteDetailsForm?.state_id])



    return (
        <>
            {isLoading && <Loaders />}
            <div className='contact_info_grid_Wrapper'>
                <div>
                    <Input onChange={handleChange} value={siteDetailsForm.address_line_1} name={'address_line_1'} label={'Address Line 1'} required={true} placeholder={'Enter address line 1'} />
                </div>
                <div>
                    <Input onChange={handleChange} value={siteDetailsForm.address_line_2} name={'address_line_2'} label={'Address Line 2'} placeholder={'Enter address line 2'} />
                </div>

                <div>
                    <Input onChange={handleChange} name={'landmark'} value={siteDetailsForm.landmark} label={'Landmark'} placeholder={'Enter landmark'} />
                </div>


                <div className='input_form'>
                    <label>Country <span>*</span></label>
                    <select onChange={((e) => {
                        handleChange(e)
                    })} value={siteDetailsForm.country_id} name='country_id'>
                        <option>--select-country--</option>
                        {countries.length > 0 && countries?.map((e) => (
                            <option key={e?.id} value={e?.id}>{e?.name}</option>
                        ))}
                    </select>
                </div>

                <div className='input_form'>
                    <label>State <span>*</span></label>
                    <select onChange={handleChange} name='state_id' value={siteDetailsForm.state_id}>
                        <option>--select-state--</option>
                        {statesData.length > 0 && statesData?.map((e) => (
                            <option key={e?.id} value={e?.id}>{e?.name}</option>
                        ))}
                    </select>
                </div>

                <div className='input_form'>
                    <label>City <span>*</span></label>
                    <select onChange={handleChange} value={siteDetailsForm.city_id} name='city_id'>
                        <option>--select-city--</option>
                        {citiesData?.length > 0 && citiesData?.map((e) => (
                            <option key={e?.id} value={e?.id}>{e?.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <Input label={'Zipcode'} onChange={handleChange} name={'zipcode'} value={siteDetailsForm.zipcode} required={true} placeholder={'Enter zip code'} />
                </div>
                {/* 
                <div className='input_form confirm_input_form'>
                    <label>Phone no<span>*</span></label>
                    <div className='phone_input_Wrapper656'>
                        <select name='phone_country_code_id' style={{
                            border: 'none',
                            borderRight: '2px solid #000',
                            outline: 'none'
                        }}>
                            {phoneCodes?.map((e,) => (
                                <option value={e.id} key={e.id}>+ {e.phone_code}</option>
                            ))}
                        </select>
                        <input disabled={phoneCodes?.length <= 0} name='phone' placeholder='1234567890' />
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default ContactInfo
