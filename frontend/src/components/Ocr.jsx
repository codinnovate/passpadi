import React, { useState } from 'react'



const Ocr = () => {
    const [selectedImage, setSelectedImage] = useState();
    
    const handleImage = (e) => {
        setSelectedImage(e.target.files[0])
        
    }
    console.log(selectedImage)

    return (
         <div className='flex w-full h-[20em]'>
                    <div className='flex'>
                        {/* for image */}
                        <div className=''>
                            <label htmlFor='upload'>Upload Image</label>
                            <input type='file' id="upload" accept='image/*' onChange={handleImage} />
                </div>

                {selectedImage && (
                    <div className=''>
                        <img src={selectedImage} alt='Selected Image'/>
                    </div>
                )}
                
        
                             </div>
                </div>
    )
}

export default Ocr
