import React from "react";

const FaceRecognition = ({ imageUrl, box }) => {
    return(
        <div className="center">
            <div className="absolute mt-2">
                <img id={'inputImage'} src={imageUrl} alt="" width={'500px'} height={'auto'}/>
                <div 
                className="boundingBox"
                style={{
                    top: box.top_row + 'px',
                    left: box.left_col + 'px',
                    bottom: box.bottom_row + 'px',
                    right: box.right_col + 'px'
                }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition