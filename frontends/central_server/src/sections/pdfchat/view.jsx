import React, { useState, useEffect, useContext } from 'react';
import DU from './uploader';
import Card from '@mui/material/Card';
import { curr_context } from './PdfSrc';
import { FlashlightOffRounded } from '@mui/icons-material';
import {marked} from 'marked'
import { IoIosSend } from 'react-icons/io';

export default function View() {
   const [chat, setChat] = useState([]);
    const now_context = useContext(curr_context);
    const [pdfFile, setPdfFile] = useState(null);
    const [question, setQuestion] = useState('');
    const [loady, setloady] = useState(false);
    const [load, setLoad] = useState(false);
    const [userInput, setUserInput] = useState('');
    // Function to upload PDF
    const uploadPDF = async () => {
        try {
            setLoad(true) ; 
            const response = await fetch(now_context.vsrc);
            if (!response.ok) {
                throw new Error('Failed to fetch PDF');
            }
            const blob = await response.blob();
            const formData =  new FormData();
            setPdfFile(blob);
            formData.append('pdf', blob, 'data.pdf');
            console.log(blob)
         
            console.log(pdfFile)
            const uploadResponse = await fetch('https://beta-free.onrender.com/ask', {
                method: 'POST',
                body: formData,
            });
            if (!uploadResponse.ok) {
                throw new Error('Failed to upload PDF');
            }
            const data = await uploadResponse.text();
            console.log(data); 
            setChat([{cont : "i have gone through the pdf how can i help you "  , ai : true}])
            setLoad(false)// Response from the server
        } catch (error) {
            console.error('Error uploading PDF:', error);
        }
    };

    // Upload PDF file on component mount
    useEffect(() => {
        if (now_context?.vsrc) {
            
            uploadPDF();
        }
        // Cleanup function to delete PDF on component unmount

    }, [now_context?.vsrc]);

    // Function to delete the uploaded PDF


    // Function to handle file input change
    const chat_handler = async () => {
      if (userInput.trim() === '') return;
      setloady(true);
      const newChat = [...chat, { cont: userInput, ai: false }];
      setChat(newChat);
      const aiResponse = await askQuestion() ;
      setUserInput('');
   
      
      setloady(false);
      setChat((prevChat) => [...prevChat, { cont: aiResponse, ai: true }]);
    };

    // Function to handle question input change
    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    // Function to ask the question
    const askQuestion = async () => {
        try {
            const response = await fetch('https://beta-free.onrender.com/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: userInput }),
            });
            if (!response.ok) {
                throw new Error('Failed to ask question');
            }
            const data = await response.json();
            return data.result // Result from the query
        } catch (error) {
            console.error('Error asking question:', error);
        }
    };

    return (
        <>
            <Card className="flex justify-center mb-2 p-2 text-bold text-[3vh] w-[80vw] m-[auto] justify-around">
                AI PDF reader ✨
            </Card>
            <Card className="flex w-[80vw] h-[80vh] m-[auto] justify-around ">
                <div className="w-[45vw] h-[60vh] flex pt-4">
                    <DU />
                </div>

                <Card className='flex mt-4 justify-center items-center h-[70vh] w-[29vw] rounded-xl backdrop-blur-xl bg-white/40 rounded-lg shadow-lg border-2'>
                  {chat[0] ? (
                    <div>
                      <div className='w-[29vw] h-[60vh] overflow-y-scroll text-left' style={{ scrollbarColor: 'white', WebkitBackdropFilter: 'blur(10px)', backdropFilter: 'blur(10px)' }}>
                        {chat.map((el, index) => (
                          <div key={index}>
                            {el.ai ? (
                              <div style={{background: "linear-gradient(45deg , aqua  , #7FFFD4 , aqua)"}} className='w-[20vw] pl-2 m-2 rounded-md' dangerouslySetInnerHTML={{ __html: marked(el.cont)}}>
                              </div>
                            ) : (
                              <div className='w-[22vw] flex-col items-end'>
                                <div className='flex w-[29vw]'>
                                  <div className='w-[9vw]'></div>
                                  <div className='w-[20vw] pl-2 m-2 rounded-md bg-black/10'>
                                    {el.cont}
                                  </div>
                                </div>
                                {
                                  (loady && index==chat.length-1) ? (
                                    <>
                                      <div className='loader2'> </div>
                                    </>
                                  ) : <></>
                                }
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className='flex justify-around'>
                        <input 
                          id="ok" 
                          className='w-[22vw] mt-3 h-[4vh] bg-white/50 rounded-md border-2'
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                        />
                        <div>
                          <button 
                            onClick={chat_handler} 
                            style={{background: "linear-gradient(45deg , aqua  , #7FFFD4 , aqua)"}} 
                            className='flex text-[4vh] justify-center items-center w-[2vw] mt-3 ml-[1vw] h-[4vh] rounded-lg'
                          >
                            <IoIosSend/>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {load && <div className='loader2 mr-2'/>}
                    </>
                  )}
                </Card>   

            </Card>
               
        </>
    );
}
