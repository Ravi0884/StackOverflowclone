import React, { useEffect, useState } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList';
import './main.css'
import AllQuestions from '../AllQuestions/AllQuestions';
import { Link } from 'react-router-dom';
import SideBar from '../Sidebar/SideBar';
import axios from 'axios';

function Main(props) {
    const [questions,setQuestions] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        async function fetchData(){
            await axios.get('/api/question').then((res)=> {
                setLoading(false);
                setQuestions(res.data);
                // console.log(res.data);
                
            });
            
        }
        fetchData()
    } , []);

  return (
    <>
    <SideBar />
    <div className="main">
        <div className="top">
            <h2>{props.questions}</h2>
            <Link to='/AskQuestion'>Ask question</Link>
        </div>
        <div className="bottom">
            <p className="total-qus">{questions.length} questions</p>
            <div className="btn">
                <a href='/' className='button'>Newest</a>
                <a href='/' className='button'>Active</a>
                <a href='/' className='button'>More</a>
                <a href='/' className="filter button"><FilterListIcon /> Filter</a>
            </div>
        </div>
        
        {/* <AllQuestions /> */}
        {loading?"Loading....": questions && questions.map((question) =><AllQuestions key={question._id} tags={question.tags} title={question.title} user={question.user} createdAt={question.createdAt} _id={question._id} views={question.views} answers={question.answers}/>)}
        </div>
    </>
  )
}

export default Main
Main.defaultProps = {
    questions:"Top Questions",
}