import React, { useEffect, useState } from "react";
import { convertToRaw } from "draft-js";
import { convertToHTML } from "draft-convert";

//===MUI IMPORTS===
import { Box, Button, Modal, TextField } from "@material-ui/core";

//===COMPONENTS IMPORTS===
import classes from "../ManageTours/Itinary/ModalComponent.module.css";
import styles from "../../NewItems/NewTour.module.css";
import { convertHTMLToDraftState } from "../../../utils/Utils";
import { ConfigurationEditor } from "../../CustomEditor/SMTPEditor.component";

const EditPostModal = (props) => {
  const { open, setOpen, type, data, EditedPostId, postBlocks, setPostBlocks } =
    props;
  const [editorState, setEditorState] = useState(() =>
    convertHTMLToDraftState(data.description)
  );
  const [values, setValues] = useState({
    blockTitle: "",
    blockDesc: "",
  });

  useEffect(() => {
    setValues({
      blockTitle: data.title,
      blockDesc: data.description,
    });

    setEditorState(convertHTMLToDraftState(data.description));
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    setValues({
      blockTitle: "",
      blockDesc: "",
    });
  };
  const style = {
    bgcolor: "background.paper",
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const postBlockHandler = () => {
    let editedPost = [...postBlocks];
    let newPost = {
      title: values.blockTitle,
      description: values.blockDesc,
    };
    editedPost[EditedPostId] = newPost;
    setPostBlocks([...editedPost]);
    setValues({
      ...values,
      blockTitle: "",
      blockDesc: "",
    });
    setOpen(false);
  };

  const deleteHandler = () => {
    let copy_block = [...postBlocks];
    copy_block.splice(EditedPostId, 1);
    setPostBlocks(copy_block);
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        {type === "Delete" ? (
          <Box sx={style} className={classes.delete_itinary_model}>
            <h1>Delete Block</h1>
            <div className={classes.delete_itinary_model_content}>
              Are you sure you wish to delete this block? This action will be
              permanent and can not be undone.
            </div>
            <div className={classes.delete_itinary_model_actions}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={deleteHandler}
              >
                Delete
              </Button>
            </div>
          </Box>
        ) : (
          <Box sx={style} className={classes.gpa__modal_wrapper}>
            <h1>Edit Block</h1>

            <>
              <TextField
                fullWidth
                label="Block Title"
                name="blockTitle"
                value={values.blockTitle}
                onChange={onChangeHandler}
                size="small"
                variant="filled"
                className={styles.gpa__form_input_field}
              />
              <ConfigurationEditor
                placeholder="Type itinary description here..."
                editorState={editorState}
                onEditorStateChange={(state) => {
                  setEditorState(state);
                  const currentContentAsHTML = convertToHTML({
                    entityToHTML: (entity, originalText) => {
                      if (entity.type === "IMAGE") {
                        return `<img src="${entity.data.src}" />`;
                      }
                      if (entity.type === "LINK") {
                        return ` <a href="${entity.data.url}">${originalText}</a> `;
                      }
                      return originalText;
                    },
                  })(state.getCurrentContent());
                  if (
                    convertToRaw(state.getCurrentContent()).blocks.length ===
                      1 &&
                    convertToRaw(state.getCurrentContent()).blocks[0].text ===
                      ""
                  ) {
                    setValues({ ...values, blockDesc: "" });
                  } else {
                    setValues({
                      ...values,
                      blockDesc: currentContentAsHTML,
                    });
                  }
                }}
              />
              <div className={classes.delete_itinary_model_actions}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={postBlockHandler}
                >
                  Save
                </Button>
              </div>
            </>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default EditPostModal;
