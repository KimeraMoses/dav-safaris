import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.styles.scss";

export function SMTPEditor({
  editorState,
  onChange,
  wrapperClassName,
  editorClassName,
  placeholder,
  onBlur,
}) {
  return (
    <Editor
      editorState={editorState}
      wrapperClassName={wrapperClassName}
      editorClassName={editorClassName}
      onEditorStateChange={onChange}
      placeholder={placeholder}
      onBlur={onBlur}
      toolbar={{
        options: [
          "inline",
          "list",
          "history",
          "image",
          "textAlign",
          "link",
          "emoji",
          "blockType",
        ],
        blockType: {
          inDropdown: false,
          options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote"],
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
        },
        inline: {
          options: ["bold", "italic", "underline"],
        },
        image: {
          urlEnabled: true,
          alt: { present: true, mandatory: false },
          defaultSize: {
            height: "auto",
            width: "auto",
          },
        },
        textAlign: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ["left", "center", "right", "justify"],
        },
        link: {
          inDropdown: false,
          showOpenOptionOnHover: true,
          defaultTargetOption: "_blank",
          options: ["link"],
        },
        emoji: {
          className: undefined,
          component: undefined,
          popupClassName: undefined,
        },
        list: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ["unordered", "ordered"],
        },
      }}
    />
  );
}

export const ConfigurationEditor = ({
  editorState,
  onEditorStateChange,
  onBlur,
  placeholder,
}) => {
  return (
    <div className="custom-configuration-editor">
      <div className="custom-configuration-editor__container">
        <SMTPEditor
          editorState={editorState}
          wrapperClassName="custom-configuration-editor__container-wrapper"
          editorClassName="custom-configuration-editor__container-editor"
          onChange={onEditorStateChange}
          placeholder={placeholder ? placeholder : "Start typing here..."}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};
