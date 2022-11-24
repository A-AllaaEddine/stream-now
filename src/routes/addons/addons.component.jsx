import './addons.styles.scss';

import AddonDetails from '../../components/addon-details/addon-details.component';
import Spinner from '../../components/Spinner/spinner.component';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAddonsData, selectAddonsTypes, selectAddosnUrls, selectIsLoading } from '../../store/catalog/catalog.selectors';
import { addAddonToReducer, removeAddonToReducer } from '../../store/catalog/catalog.actions';
import { useDispatch } from 'react-redux';

const AddonsPage = () => {
    const [ types, setTypes ] = useState([]);
    const [ selectedType, setSelectedType ] = useState("All");
    const [ selectedCategory, setSelectedCategory ] = useState("Installed Addons");
    const [ typesToggled, setTypesToggled ] = useState(false);
    const [ catgoriesToggled, setCategoriesToggled ] = useState(false);
    const [ triggered, setTriggered] = useState(false);
    const [ existing, setExisting] = useState(false);
    const [ addonsList, setAddonsList ] = useState([]);
    const [ adonInput, setAddonInput ] = useState('');
    const [ addonUrl, setAddonUrl ] = useState('');
    const [ selectedAddon, setSelectedAddon ] = useState({});

    const AddonsData = useSelector(selectAddonsData);
    const AddonTypes = useSelector(selectAddonsTypes);
    const AddonsUrls = useSelector(selectAddosnUrls);
    const isLoading = useSelector(selectIsLoading);
    
    const dispatch = useDispatch();

    useEffect(() => {
        var types = []
        for (let type of AddonTypes) {
            types.push(...type)
        }
        const unique = Array.from(new Set(types));
        unique.unshift("All");
        // console.log(unique);
        setTypes(unique);
    }, [AddonTypes])


    useEffect(() => {
        if(selectedType === "All") {
            const addons = AddonsData.map(addon => {
                return {addonUrl: addon.addonUrl, data: addon.data};
            })
            setAddonsList(addons);
        }
        else {
            var addons = AddonsData.filter(addon => { return addon.data.types.includes(selectedType) && addon.data});
            setAddonsList(addons);
         }

    }, [selectedType, AddonsData])


    const toogleTypesDropdown = () => {
        setTypesToggled(!typesToggled);
    }

    const toogleCaterogiesDropdown = () => {
        setCategoriesToggled(!catgoriesToggled);
    }

    const selectAddon = (addon) => {
        setSelectedAddon(addon);
        setExisting(true);
        setTriggered(true);
    }

    const installAddon = (addonUrl) => {
        dispatch(addAddonToReducer(AddonsUrls, addonUrl));
        setTriggered(false);
        console.log("Addon Installed");
    }
    const uninstallAddon = (addonUrl) => {
        dispatch(removeAddonToReducer(AddonsUrls, addonUrl));
        setTriggered(false);
        console.log("Addon Uninstalled");
    }

    const handleChange = (e) => {

        const { value } = e.target;

        // if it had manifest.json it triggers addon install windows
        if(value.endsWith("/manifest.json")) {

            const existed = AddonsUrls.filter(url => { return url === value});
            console.log(existing);
            if(existed.length > 0) {
                setExisting(true);
            } else {
                setExisting(false);
                try {
                    fetch(value)
                    .then(res => {
                        if(res.status === 200) {
                            setAddonUrl(value);
                            return res.json();
                        }
                        else {
                            console.log("Error installing, this is not a supported addon")
                        }
                    }).then(res => {
                        setSelectedAddon({addonUrl: value, data:res});
                        setTriggered(true);
                    });
                } catch(error) {
                    console.log(error);
                }
            }

        }
        // if not it just search
        else {
            setAddonInput(value);
            const addons = AddonsData.filter(addon => { return addon.data.name.toLowerCase().includes(value)});
            setAddonsList(addons);
        }
    }
    

    return (
        <>
        {!isLoading ? (
            <div className='addons-container'>
            <AddonDetails installAddon={installAddon} uninstallAddon={uninstallAddon} existing={existing} triggered={triggered} setTriggered={setTriggered} selectedAddon={selectedAddon} />
            <div className='addons-genres-container'>
                <nav className='addons-categories-nav'>
                    <button className='addon-categories-button' onClick={toogleCaterogiesDropdown}>{`${selectedCategory ? `${selectedCategory}` : "Seelct Type"}`} ▼</button>
                    <div className={`${catgoriesToggled ? "toggled" : ""} addon-categories-list`}>
                         <li onClick={() => { toogleCaterogiesDropdown(); setSelectedCategory("Community Addons") }}  className="addon-category-item">Community Addons</li>
                         <li onClick={() => { toogleCaterogiesDropdown(); setSelectedCategory("Installed Addons") }}  className="addon-category-item">Installed Addons</li>
                    </div>
                </nav>
                <nav className='addons-types-nav'>
                    <button className='addon-types-button' onClick={toogleTypesDropdown}>{`${selectedType ? `${selectedType}` : "Seelct Type"}`} ▼</button>
                    <div className={`${typesToggled ? "toggled" : ""} addon-types-list`}>
                        {types &&
                            types.map((type, idx) => {
                                return <li key={idx} onClick={() => {toogleTypesDropdown(); setSelectedType(type);}} className="addon-type-item">{type}</li>
                            })
                        }
                        
                    </div>
                </nav>
                <input 
                    name='install'
                    type="text" 
                    value={adonInput}
                    placeholder='Search Addons' 
                    onChange={handleChange}
                />
            </div>
            <div className='addons-list-container'>
                {addonsList &&
                    addonsList.map((addon) => {
                        return (
                            <div key={addon.data.id} className='addon-container' onClick={() => selectAddon(addon)}>
                                <div className='addon-logo-container'>
                                    <img src={addon.data.logo || addon.data.icon} alt='addon logo'/>
                                </div>
                                <div className='addon-info'>
                                    <h3>{addon.data.name}</h3>
                                    <p>{addon.data.version}</p>
                                    <p className='addon-description'>{addon.data.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>) : (
            <div className='addons-spinner-container'>
                <Spinner />
            </div>
        )}
        </>
    )
}

export default AddonsPage;