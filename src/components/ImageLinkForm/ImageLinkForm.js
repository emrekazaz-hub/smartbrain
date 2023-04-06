import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = () => {
  return (
    <div>
      <p className="'f3">
        {"This Magic Brain Will Detect Faces In Your Pictures"}
      </p>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input className="f4 pa2 w-70 center"></input>
          <button className="buttoncolor w-30 grow f4 link ph3 pv2 dib white">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
