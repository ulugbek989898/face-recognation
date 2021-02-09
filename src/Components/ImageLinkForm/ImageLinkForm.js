import React from "react";
import "./ImageLinkForm.css";



function ImageLinkForm({ onInputChange, onButtonSubmit }) {
  return (
    <div>
      <p className="f3">
        {"This magic Brain will detect faces in your pictures. Git it try. Put image Url."}
      </p>
      <div className="center">
        <div className=" form center pa4  br3 shadow-5 ">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 f4 link ph3 pv2 dib white"
            style={{ backgroundColor: "#00d6ff" }}
            onClick={onButtonSubmit}>
            Detect{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
