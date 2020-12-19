import React, { useEffect, useState } from 'react';
import propTypes from "prop-types";
import classNames from "classnames";

import './FileUploader.scss';

export const FileUploader = (props) => {
    const [fieldKey, setFieldKey] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    /**
     * ComponentDidMount
     */
    useEffect(() => {
        //set form field's key
        setFieldKey(props.fieldKey);
    }, []);

    /**
     * ComponentDidUpdate: watch on selected file properties
     * update the current file with the selected file that pass to the field
     */
    useEffect(() => {
        if (props.selectedFile && (props.selectedFile.constructor === File || props.selectedFile.constructor === Blob)) {
            setPreviewImage(URL.createObjectURL(props.selectedFile));
        }
    }, [props.selectedFile]);

    /**
     * On file selection
     * @param {*} event 
     */
    const onSelectFile = (event) => {
        if (event.target.files.length > 0) {
            const newFile = event.target.files[0];
            if (props.onSelectFile) {
                props.onSelectFile({
                    fieldKey: fieldKey,
                    selected: newFile
                });
            }
            //preview image
            setPreviewImage(URL.createObjectURL(newFile));
        }
    }

    return (
        <div className="file-uploader-wrapper" style={props.readOnly ? { backgroundColor: "#e9ecef" } : {}}>
            {
                previewImage ?
                    (<img className="preview-selected-image" src={previewImage} alt="your image" />)
                    :
                    (<p align="center" className="drag-drop-label">drag drop your image here or click in this area</p>)
            }
            <input
                type="file"
                name="images"
                disabled={props.readOnly}
                onChange={e => onSelectFile(e)}
                className={classNames("custom-file-name-textbox", props.readOnly ? "" : "cursor-pointer")}
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
            />
        </div >
    );
}

FileUploader.prototype = {
    onSelectFile: propTypes.func.isRequired,
    selectedFile: propTypes.object,
    fieldKey: propTypes.string.isRequired,
    readOnly: propTypes.bool
}