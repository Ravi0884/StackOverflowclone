import './ViewQuestions.css'
import React, { useEffect, useState } from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RestoreIcon from '@mui/icons-material/Restore';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import SideBar from '../Sidebar/SideBar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';


function ViewQuestions() {
    const navigate = useNavigate()
    let search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("q");
    let ansNo = 0
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [tags, setTags] = useState([])
    const [data, setData] = useState();
    const [loading,setloading] = useState(false);
    const [fieldError, setFieldError] = useState(false);



  useEffect(() => {
    axios.get(`/api/question/${id}`)
      .then(response => {
        setQuestion(response.data);
        setTags( JSON.parse(response.data.tags[0]));
        }
        )
      .catch(error => console.error(error));
  }, [id]);

//   Updating views on question 
useEffect(() => {
    axios.put(`/api/question/questionViews/${id}`)
      .then(response => {
        console.log("views updated to", response.data.views);
      })
      .catch(error => console.error("not view", error));
  }, [id]);
  
 
   
 
  useEffect(() => {
    axios.get(`/api/answer/${id}`)
      .then(response => {
        // console.log(response.data)
        setAnswer(response.data);
        }
        )
      .catch(error => console.error(error));
  }, [id]);

  const user = useSelector(selectUser);

  const handleSubmit = async(event) => {
    axios.put(`/api/question/answerViews/${id}`)
    .then(response => {
      console.log("answers updated to", response.data.answers);
    })
    .catch(error => console.error("not view", error));
    event.preventDefault();
    if(data !== ""){
     
        setFieldError(false);
        setloading(true);
        const parsedData ={
            question_id:id ,
            answer: data,
            user: user
    }
    await axios.post("/api/answer",parsedData).then((res)=>{
        setloading(false);
        alert("Added successfully")
        navigate('/')
    }).catch(function (error) {
        setloading(false);
        console.log(error);
    })
}else{
    setFieldError(true);
}
}

  return (
    <>
    <SideBar />
        <div className="view-questions">
            <div className="view-question-header">
                <div className="view-question-title">
                    <h2>{question && question.title}</h2>
                    <Link to='/AskQuestion' className="view-question-ask-button">Ask Question</Link>
                </div>
                <p>{new Date(question && question.createdAt).toLocaleDateString()}</p>
                <div className="qestion-vie-details">
                    
                    <small>Asked <span>{Math.round((new Date().getTime()-new Date(question && question.createdAt).getTime())/86400000)} days ago</span></small>
                    
                </div>
            </div>
            <div className="view-question-body">
                <div className="view-question-body-left">
                    <div className='arrow'><ArrowDropUpIcon /></div>
                    <div className='arrow'>1</div>
                    <div className='arrow'><ArrowDropDownIcon  /></div>
                    <div ><BookmarkBorderIcon/></div>
                    <div ><RestoreIcon/></div>
                </div>
                <div className="view-question-body-right">
                    <p>{question && parse(question.body)}</p>
                    <div className="question-tags">
            {Array.isArray(tags)?tags.map((tag)=> <a className='question-tag' href='/'>{tag}</a>) : <a href='/'>{tags}</a> }
            </div>

                </div>
                <div className="view-question-avatar-details">
                    <div className="auth-avatar">
                        <Avatar src={question && question.user.photo}/> <span>{question && question.user.displayName}</span>
                    </div>
                </div>
            </div>
            <h3>no of total answer {answer && answer.length}</h3>
            {answer && answer.map((answer)=>{
                return(
                                <div className="ans-body">
                                            <div className="view-question-body">
                                <div className="view-question-body-left">
                                    <div className='arrow'><ArrowDropUpIcon /></div>
                                    <div className='arrow'>{ansNo = ansNo +1}</div>
                                    <div className='arrow'><ArrowDropDownIcon  /></div>
                                    <div ><BookmarkBorderIcon/></div>
                                    <div ><RestoreIcon/></div>
                                </div>
                                <div className="view-question-body-right">
                                    <p>{answer && parse(answer.answer)} </p>
                                </div>
                                <div className="view-question-avatar-details">
                                    <div className="auth-avatar">
                                        <Avatar src={answer && answer.user.photo} /> <span>{answer && answer.user.displayName}</span>
                                        <p>{new Date(answer && answer.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                )
            })}

            <h3 >Post your answer</h3>
            <ReactQuill value={data} onChange={(e)=>setData(e)} className='react-quill' theme='snow' width='200px'/>
            {/* <button className='lst-btn view-question-ask-button'>Post your answer</button> */}
            <button type='submit' disabled={loading} onClick={handleSubmit} className='question-title-button'>{loading?"Submitting":"Submit"}</button>
            {fieldError && <p style={{ color: 'red' }}>Please fill in the Title and  Body field.</p>}
        </div>
    </>
  )
}

export default ViewQuestions