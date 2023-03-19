import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './allquestions.css'


function AllQuestions(props) {
    let tags  = JSON.parse(props.tags[0]);


  return (
    <>
    <div className="allQuestions">
        <div className="questions-left-content">
            <small>{props.votes}  votes</small>
            <small id="ans">{props.answers}  answers</small>
            <small>{props.views}  views</small>
        </div>
        <div className="questions-middleContent">
            <Link to={`/ViewQuestion?q=${props._id}`} class='quest'  >{props.title}</Link>
            <div className="question-tags">
            {Array.isArray(tags)?tags.map((tag)=> <a className='question-tag' href='/'>{tag}</a>) : <a href='/'>{tags}</a> }
            </div>
            
         </div>
        <div className="questions-right-content">
            <p><Avatar src={props.user && props.user.photo}/></p>
            <small>{props.user && props.user.displayName ? props.user.displayName : "User"}</small>
            <small>{props.createdAt && new Date(props.createdAt).toLocaleDateString()}</small>
        </div>
    </div>
    </>
  )
}

export default AllQuestions

AllQuestions.defaultProps = {
    votes:0,
    answers:0,
    views:0,
    title:"How to remove alpha in beta? fgpokdfgnhfd hdf j yj  gtj rt, jrytjytjtyy j ghbdfgj tyj fdhfdrhrgjq erh ewghr ewugrh ergh equrhg qwrgh qewrgh qierghqrg hqwri we;irgu ir tgqwirh ;ieare;ir hw; reirguihfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfgfg fgfgfgfgfgfgfgf gfgfgfgfgfgfgfgfgfgfgf gfgfgfgfgfgfg gf   "
}