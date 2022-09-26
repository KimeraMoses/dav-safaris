// // import { Editor } from "react-draft-wysiwyg";
// // import { EditorState, convertFromRaw } from "draft-js";
// // import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// // import { useState } from "react";

// // const content = {
// //   entityMap: {},
// //   blocks: [
// //     {
// //       key: "637gr",
// //       text: "Initialized from content state.",
// //       type: "unstyled",
// //       depth: 0,
// //       inlineStyleRanges: [],
// //       entityRanges: [],
// //       data: {},
// //     },
// //   ],
// // };

// // export default function RichTextEditor() {
// //   const contentState = convertFromRaw(content);
// //   console.log(contentState);
// //   const [state, setState] = useState({
// //     contentState: contentState.createEmpty(),
// //   });

// //   const handleChange = (editorState) => {
// //     console.log("editor", editorState);
// //     setState({ ...state, contentState: editorState });
// //   };

// //   return (
// //     <Editor
// //       editorState={state?.contentState}
// //       onEditorStateChange={handleChange}
// //       toolbarClassName="toolbarClassName"
// //       wrapperClassName="wrapperClassName"
// //       editorClassName="editorClassName"
// //       wrapperStyle={{ width: 800, border: "1px solid black" }}
// //     />
// //   );
// // }

// import React, { Component } from 'react';
// import { convertFromRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';

// const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

// class EditorConvertToJSON extends Component {
//   constructor(props) {
//     super(props);
//     const contentState = convertFromRaw(content);
//     this.state = {
//       contentState,
//     }
//   }

//   onContentStateChange: function(contentState){
//     this.setState({
//       contentState,
//     });
//   };

//   render() {
//     const { contentState } = this.state;
//     return (
//       <Editor
//         wrapperClassName="demo-wrapper"
//         editorClassName="demo-editor"
//         onContentStateChange={this.onContentStateChange}
//       />
//     );
//   }
// }
