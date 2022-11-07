import './navigation.styles.scss';

import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as Extention } from '../../assets/Extension.svg';
import { ReactComponent as Account } from '../../assets/Account.svg';
import { ReactComponent as Search } from '../../assets/Search.svg';
import Feed from '../../assets/Feed.png';
import Discover from '../../assets/Discover.png';
import Library from '../../assets/Library.png';
import StremioLogo from '../../assets/StremioLogo2.png';
import Settings from '../../assets/setting.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Navigation = () => {
    const [ searchInput, setSearchInput ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(searchInput.length > 0) {
            setSearchInput('');
            navigate(`/search=${searchInput.replace(/\s/g, '-').toLowerCase()}`)
        }
    }

    const handleChange = (e) => {
        const { value } = e.target;

        setSearchInput(value)
    }
    
    return (
        <>
            <div className='navigation-container'>
                {/* <div className='stremio-image-container'>
                    <img src={StremioLogo} alt='' className='stremio-image' />
                </div> */}
                <div className='routes-container'>
                    <Link to='/' className='route'>
                        <img src={Feed} alt='' className='feed-icon' />
                    </Link>
                    <Link to='/discover' className='route'>
                        <img src={Discover} alt='' className='discover-icon'/>
                    </Link>
                    <Link to='/my-library' className='route'>
                        <img src={Library} alt='' className='library-icon' />
                    </Link >
                </div>
                <div className='search-container'>
                    <form className='search-input-container' onSubmit={handleSubmit}>
                        <input 
                        name='search'
                        type="text" 
                        value={searchInput}
                        placeholder='Search' 
                        onChange={handleChange}/>
                        <button className='search-button'>
                            <Search  type="submit" className='search-icon'  />
                        </button>
                    </form>
                </div>
                {/* <div className='search-button'>
                    <Search className='search-icon'  />
                </div> */}
                <div className='menu-container'>
                    <Link to='/addons' className='route'>
                        <Extention className='extention-icon'  />
                    </Link>
                    <Account  className='setting-icon'/>
                    {/* <img src={Settings} alt='' className='setting-icon' /> */}
                </div>
            </div>
            <Outlet /> 
        </>
    )
}

export default Navigation;