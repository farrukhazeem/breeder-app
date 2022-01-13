import React from "react";
import ImageViewer from 'react-simple-image-viewer';


function ImgViewer(props) {
  console.log(props);

  return (
    <ImageViewer
      //   src={props.image}
      // //   currentIndex={currentImage}
      //   onClose={props.closeImageViewer}
      {...props}
    />
  );
}

export default ImgViewer;
