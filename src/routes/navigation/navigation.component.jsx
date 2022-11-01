import './navigation.styles.scss';

import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as Extention } from '../../assets/Extension.svg';
import { ReactComponent as Search } from '../../assets/Search.svg';
import Feed from '../../assets/Feed.png';
import Discover from '../../assets/Discover.png';
import Library from '../../assets/Library.png';
import StremioLogo from '../../assets/StremioLogo2.png';
import Settings from '../../assets/setting.png';
import { fetchCatalogsAndResourcesStart } from '../../store/catalog/catalog.actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';



const Navigation = () => {
    const dispatch = useDispatch();
    const url = 'https://3bf59d9737bf-mycimaaddonbylazydzv.baby-beamup.club/manifest.json';
    
    useEffect(() => {
        dispatch(fetchCatalogsAndResourcesStart(url));
    }, []);


    return (
        <>
            <div className='navigation-container'>
                <div className='stremio-image-container'>
                    <img src={StremioLogo} alt='' className='stremio-image' />
                </div>
                {/* <div className='search-container'>
                    <div className='search-input-container'>
                        <input type="text" placeholder='Search'/>
                        <div className='search-button'>
                            <Search className='search-icon'  />
                        </div>
                    </div>
                </div> */}
                <div className='routes-container'>
                    <div className='search-button'>
                        <Search className='search-icon'  />
                    </div>
                    <Link to='/' className='route'>
                        <img src={Feed} alt='' className='feed-icon' />
                    </Link>
                    <Link to='/discover' className='route'>
                        <img src={Discover} alt='' className='discover-icon'/>
                    </Link>
                    <Link to='/my-library' className='route'>
                        <img src={Library} alt='' className='library-icon' />
                    </Link >
                    <Link to='/addons' className='route'>
                        <Extention className='extention-icon'  />
                    </Link>
                </div>
                <div className='menu-container'>
                <img src={Settings} alt='' className='setting-icon' />
                </div>
            </div>
            <Outlet /> 
        </>
    )
}

export default Navigation;