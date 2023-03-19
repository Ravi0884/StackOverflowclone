import React from 'react'
import './question.css'
import { useState } from "react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';

function Question() {
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [title, setTitle] = useState('');
    const [data, setData] = useState("");
    const [loading,setloading] = useState(false);
    const [fieldError, setFieldError] = useState(false);

 

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const handleInputKeyDown = event => {
        if (event.key === 'Enter') {
            const newTag = inputValue.trim();

            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                setInputValue('');
            }
            // console.log(tags)
        } else if (event.key === 'Backspace' && !inputValue) {
            setTags(tags.slice(0, -1));
        }
    };
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        if(title !=="" && data!==""){
            setFieldError(false);
            setloading(true);
            const parsedData ={
            user:user,
            title:title,
            body:data,
            tags: JSON.stringify(tags),
        }
        await axios.post("/api/question",parsedData).then((res)=>{
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
            <div className="question">
                <h2 className="question-headline">Ask a public question</h2>
                <div className="summery">
                    <h3>Writing a good question</h3>
                    <p>You’re ready to ask a programming-related question and this form will help guide you through the process.
                        Looking to ask a non-programming question? See the topics here to find a relevant site.</p>
                    <h4>steps</h4>
                    <ul>
                        <li>Summarize your problem in a one-line title.</li>
                        <li>Describe your problem in more detail.</li>
                        <li>Describe what you tried and what you expected to happen.</li>
                        <li>Add “tags” which help surface your question to members of the community</li>
                        <li>Review your question and post it to the site.</li>
                    </ul>
                </div>
                <div className="question-body">
                    <h3>Title</h3>
                    <p>Be specific and imagine you’re asking a question to another person.</p>
                    
                    <input value={title} onChange={(e)=> setTitle(e.target.value)}  className='question-input-title' placeholder='e.g. Is there an R function for finding the index of an element in a vector?' ></input>
                    <h3>What are the details of your problem?</h3>
                    <p>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
                    <ReactQuill value={data} onChange={(e)=>setData(e)} className='react-quill' theme='snow' />
                    <h3>Tags</h3>
                    <p>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</p>
                    <div>
                        <ul>
                            {tags.map(tag => (
                                <li key={tag}>{tag}</li>
                            ))}
                        </ul>
                        <input
                            className='tag-input'
                            type="text"
                            placeholder="Press enter to add new tag and press backspace to remove existing tags"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                        />
                    </div>
                    <button type='submit' disabled={loading} onClick={handleSubmit} className='question-title-button'>{loading?"Submitting":"Submit"}</button>
                    {fieldError && <p style={{ color: 'red' }}>Please fill in the Title and  Body field.</p>}
                </div>
            </div>
        </>
    )
}

export default Question