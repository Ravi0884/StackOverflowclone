import React from 'react'
import "./style.css"
import PublicIcon from '@mui/icons-material/Public';
import StarsIcon from '@mui/icons-material/Stars';
import Groups2Icon from '@mui/icons-material/Groups2';
// import { Link } from 'react-router-dom';
function SideBar() {
  return (
    <>
    <div className="container">
        <div className="home">
            <a href="/">Home</a>
        </div>
        <div className="public">
            <p>PUBLIC</p>
            <div className="publicContent">
                <a href="/" class='icon' ><span className='icon1'><PublicIcon /></span>  Questions</a>
                <a href="/">Tags</a>
                <a href="/">Users</a>
                <a href="/">Companies</a>
            </div>
        </div>
        <div className="collectives">
            <p>COLLECTIVES</p>
            <div className="publicContent">
                <a href="/" class='icon' ><span className='icon2'><StarsIcon /></span>  Explore Collectives</a>
            </div>
            
        </div>
        <div className="teams">
            <p>TEAMS</p>
            <div className="publicContent">
                <a href="/" class='icon' ><span className='icon2'><Groups2Icon /></span>  Create free teams</a>
            </div>
        </div>
    </div>
    </>
  )
}

export default SideBar