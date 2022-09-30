import { EditorState, convertFromHTML, ContentState } from "draft-js";

// Convert HTML to Draft JS
export const convertHTMLToDraftState = (html) => {
  if (html) {
    const blocks = convertFromHTML(html);
    const state = ContentState.createFromBlockArray(
      blocks?.contentBlocks,
      blocks?.entityMap
    );
    return EditorState.createWithContent(state);
  } else {
    return EditorState.createEmpty();
  }
};
