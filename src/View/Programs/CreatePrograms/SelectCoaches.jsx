
import { useState } from 'react';
import Select from 'react-select/base';
const SelectCoaches = ({ allcoach, setSelectedPrograms, selectedPrograms, }) => {
    const [inputValue, setInputValue] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const options = allcoach?.map(item => ({
        value: item?.id,
        label: item?.user?.name
    })) || [];

    const handleSelect = (selected) => {
        setSelectedPrograms(selected || [])
    };

    return (
        <>

            <div className='select_coaches_wrapper'>
                <h4>Select Coaches</h4>
                <Select
                    className='multi_coach_select'
                    options={options}
                    value={selectedPrograms}
                    onChange={handleSelect}
                    isMulti
                    onInputChange={(newValue) => setInputValue(newValue)}
                    menuIsOpen={isMenuOpen}
                    onMenuOpen={() => setIsMenuOpen(true)}
                    onMenuClose={() => setIsMenuOpen(false)}
                    placeholder="Select coaches"
                />
            </div>
        </>
    )
}

export default SelectCoaches
