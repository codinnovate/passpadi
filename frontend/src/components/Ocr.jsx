import React, { useState } from 'react'
import { createWorker } from 'tesseract.js';



const Ocr = () => {
    const [selectedImage, setSelectedImage] = useState();
    const [text, setText] = useState()
    const [loading, setLoading] = useState(false);


    const handleImage = (e) => {
        setSelectedImage(URL.createObjectURL(e.target.files[0]))
    }

    const handleClick = () => {
    setLoading(true)
(async () => {
  const worker = await createWorker('eng');
  const ret = await worker.recognize(selectedImage);
    setText(ret.data.text)
    setLoading(false)
  await worker.terminate();
})();

    }
    console.log(selectedImage)

    return (
         <div className='flex flex-col md:flex-row w-full  gap-2 my-5'>
            <div className='flex flex-col gap-3 w-full'>
            <div className='flex flex-col mt-3 rounded'>
                    <label
                        className='text-xl mb-2 font-semibold'
                        htmlFor='upload'
                    >Upload Image</label>
                    <input
                        type='file'
                        id="upload"
                        className='file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-black
      hover:file:bg-grey'
                        accept='image/*'
                        onChange={handleImage} />
                </div>
                {selectedImage && (
                    <div className=''>
                        <img
                            src={selectedImage}
                            alt='Selected Image'
                            
                            className='aspect-video w-[150px]'
                            
                        />
                    </div>
                )}
                <button
                    disabled={true}
                    className='w-[9em] pl-2 flex justify-evenly text-white bg-black rounded-md p-2'
                    onClick={handleClick}
                >
                    Convert
                    {loading && (
                        <svg className="animate-spin h-5 w-5  rounded-full  border-white   border-t-4 " viewBox="0 0 24 24">
                        </svg>
                    )}
                  </button>

                
                
                {text && (
            <div className='mb-5 min-w-full'>
                        <textarea 
                    
                    className='input-box min-w-full h-[20em]'
                    defaultValue={text}
                />
            </div>
            )}
        
            </div>
            
                </div>
    )
}

export default Ocr
