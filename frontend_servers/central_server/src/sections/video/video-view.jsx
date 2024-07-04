import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { IoIosSend } from 'react-icons/io';
import { curr_context } from './VideoSrc';
import DU from './uploader';
import Card from '@mui/material/Card'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from 'marked';
import Button from '@mui/material/Button'
import html2pdf from 'html2pdf.js';
import dotenv from 'dotenv'
function VV() {
  const [state, setState] = useState(0);
  const [load, setLoad] = useState(false);
  const now_context = useContext(curr_context);
  const [trans, setTrans] = useState('');
  const [full, set_full] = useState('hi ');
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loady, setloady] = useState(false);
  const [boka , bokadoka] = useState(false) ; 
  const [pp , spp] = useState(false) ; 
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function gen(prompt) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  }

  useEffect(() => {
    if (now_context?.vsrc) {
      setLoad(true);
      async function run() {
        console.log(now_context.vsrc);
        try {
          const ack_node = axios.get("https://beta-2-1.onrender.com/acknowledgment");
          const ack_flask = await axios.post("https://beta-nod.onrender.com/acknowledgment");

          if (ack_flask.data.status === "running") {
            console.log('Flask server is running');
            const ack_node_res = await axios.get("https://beta-2-1.onrender.com/acknowledgment");
            if (ack_node_res.data.status === "running") {
              console.log('Node server is running');
              setState(1);
              setTimeout(() => setState(2), 1000);

              if (now_context.vsrc) {
                const response = await fetch(now_context.vsrc);
                const blob = await response.blob();
                const formData = new FormData();
                formData.append('video', blob, 'video.mp4');
                console.log(blob);
                const uploadResponse = await axios.post('https://beta-2-1.onrender.com/upload', formData);

                console.log('Video uploaded successfully:', uploadResponse.data);
                setTimeout(() => setState(3), 2000);
                setTimeout(() => setState(4), 3000);
                setTimeout(() => setState(5), 1000);

                set_full(uploadResponse.data.transcript);
                const ans = await gen(uploadResponse.data.transcript);
                setChat((prevChat) => [...prevChat, { cont: ans, ai: true }]);
                console.log(ans);
                setTrans(ans);
                spp(true)
                setTimeout(() => setState(6), 1000);
                setTimeout(() => setState(7), 1000);
              }
            }
          }
        } catch (error) {
          console.error('Error during the process:', error);
          setState(6);
          setTimeout(() => setState(7), 1000);
        }
      }
      run();
    }
  }, [now_context?.vsrc]);

  useEffect(() => {
    console.log(loady);
  }, [loady]);

  const chat_handler = async () => {
    if (userInput.trim() === '') return;

    const newChat = [...chat, { cont: userInput, ai: false }];
    setChat(newChat);
    setUserInput('');

    const prompt = `${full}\nUser: ${userInput}\nAI:`;
    setloady(true);
    const aiResponse = await gen(prompt);
    setloady(false);
    setChat((prevChat) => [...prevChat, { cont: aiResponse, ai: true }]);
  };









  const askTest = async () => {
    bokadoka(true)
    const prompt = `${full}\nUser: based on the full content 
                  provide 10 long answer questions 
                  with answer of all quaestions  at the end
                  i.e make 2 sections questions section  and answers section 
                  answers should be seperate from the questions  
                  also provide 5 questions at the last 
                  that judges a persons socio-emotional index based on the above data `;
                  const aiResponse = await gen(prompt);
                  bokadoka(false)
                  return aiResponse
              
  };






  const genQ = async () => {
    bokadoka(true) ;
    console.log("button clicked ");
    const test = await askTest();
    const markedContent = marked(test);
  
    const html_format = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                #title {
                    margin-top : 40px ;
                    font-size: 25px;
                    font-weight: bold;
                    text-align: center;
                }
                img {
                    height: 35px;
                    position: absolute;
                    left: 20px;
                }
                #cont {
                    display: flex;
                    justify-content: center;
                }
                  #all{
                   margin : 20px ; 
                  }
            </style>
        </head>
        <body>
            <div id="cont">
                <img src="https://www.gramurja.org/assets/images/logo/Gram%20Urja%20logo.png" alt="Gram Urja Logo">
                <div id="title">GRAM URJA FOUNDATION</div>
            </div>
            <hr>
            <div id="all">${markedContent}</div>
        </body>
        </html>
    `;
  
    // Create a temporary container for the HTML content
    const container = document.createElement('div');
    container.innerHTML = html_format;
  
    // Convert the HTML content to a PDF and download it
    await html2pdf()
        .from(container)
        .save();
   
    bokadoka(false)
    
  };
  
  
  



























  return (
    <>
      <Card className='m-[auto]'>
        <div className="m-3 overflow-auto " >
          <div className='flex flex-wrap w-[80vw] h-[82vh] mt-[1vh]'>
            <h1 className='w-[57vw] mb-[2vh] text-[5vh] text-bold'> 
              AI video decoder
            </h1>
            { pp ?
                   (
                   <div className='flex '>
                    {
 
                    !boka ? 
                     
                    <Button
                      onClick={genQ}
                      className='shadow-lg'
                      sx={{
                        background : "linear-gradient(45deg , aqua , violet , pink)" ,
                        color : "white" , 
                        fontWeight : "bold" , 
                        height : "7vh"
                        }}> 
                        Generate Test  
                      </Button>
                      :
                      <><div className='loader3 mr-2 h-[2vh]'/> <div className='loader3 mr-2 h-[2vh]'/> <div className='loader3 mr-2 h-[2vh]'/></>
                        
                       }
                      </div>
                    )
                      :<>
                      </>
                  }
  
            <div className='flex justify-between w-[78vw] mb-[2vh]'>
              <div className='w-[50vw]'>
              <span className=" text-center flex justify-center text-bold text-xl">File Uploader</span>
                <DU />
              </div>
              <div>
                <span className="w-[32vw] text-center flex justify-center text-bold text-xl">A.I Chat</span> 
                <Card className='flex justify-center items-center h-[70vh] w-[32vw] rounded-xl backdrop-blur-xl bg-white/40 rounded-lg shadow-lg border-2'>
                  {chat[0] ? (
                    <div>
                      <div className='w-[29vw] h-[60vh] overflow-y-scroll text-left' style={{ scrollbarColor: 'white', WebkitBackdropFilter: 'blur(10px)', backdropFilter: 'blur(10px)' }}>
                        {chat.map((el, index) => (
                          <div key={index}>
                            {el.ai ? (
                              <div style={{background: "linear-gradient(45deg, pink, violet, pink)"}} className='w-[20vw] pl-2 m-2 rounded-md' dangerouslySetInnerHTML={{ __html: marked(el.cont)}}>
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
                                      <div className='loader'> </div>
                                    </>
                                  ) : <></>
                                }
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className='flex'>
                        <input 
                          id="ok" 
                          className='w-[24vw] mt-3 h-[4vh] bg-white/50 rounded-md border-2'
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                        />
                        <div>
                          <button 
                            onClick={chat_handler} 
                            style={{background: "linear-gradient(45deg, pink, violet, pink)"}} 
                            className='flex text-[4vh] justify-center items-center w-[2vw] mt-3 ml-[1vw] h-[4vh] rounded-lg'
                          >
                            <IoIosSend/>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {load && <div className='loader mr-2'/>}
                    </>
                  )}
                </Card>       
              </div>
            </div>
            <div className='h-[6vh] w-[90vw]'/>
          </div>
        </div>
      </Card>
    </>
  );
}

export default VV;
