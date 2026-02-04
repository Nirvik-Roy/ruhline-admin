import React, { useState, useEffect } from 'react'
import Input from '../../../Components/Input'
import { getAllPhoneCountry, getCountries } from '../../../utils/location';
import Loaders from '../../../Components/Loaders/Loaders';
const ContactInfo = () => {
    const [phoneCodes, setphoneCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [countries, setcountries] = useState([])
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
    console.log(countries)
    return (
        <>
        {isLoading && <Loaders/>}
            <div className='contact_info_grid_Wrapper'>
                <Input label={'Address Line 1'} required={true} defaultValue={'20 Cooper Square'} />
                <Input label={'Address Line 2'} defaultValue={'Marquardt Route'} />
                <Input label={'Landmark'} defaultValue={'Lake Oscar'} />
                <div className='input_form'>
                    <label>City <span>*</span></label>
                    <select>
                        <option>--select-country--</option>
                        {countries.length > 0 && countries?.map((e)=>(
                            <option key={e?.id} value={e?.id}>{e?.name}</option>
                        ))}
                    </select>
                </div>

                <div className='input_form'>
                    <label>State <span>*</span></label>
                    <select>
                        <option>--select-state--</option>
                    </select>
                </div>

                <div className='input_form'>
                    <label>City <span>*</span></label>
                    <select>
                        <option>--select-city--</option>
                    </select>
                </div>
                <Input label={'Zipcode'} required={true} defaultValue={'62704'} />

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
                </div>
            </div>
        </>
    )
}

export default ContactInfo
