import React, { Component } from "react";

import ReactImageVideoLightbox from 'react-image-video-lightbox';


function ImgViewer(props) {
  console.log(props);

  return (

    // width:"100%",height:"100%",src:a.url,frameBorder:"0",
    // width:"560",height:"315"
    <ReactImageVideoLightbox classname="ReactImageVideoLightbox"
      width={'100%'}
      height={'100%'}
      style={{ width: '100%', height: '100%', zIndex: "1 !important" }}
      showResourceCount={true}
      {...props}
    />
  );
}

export default ImgViewer;
