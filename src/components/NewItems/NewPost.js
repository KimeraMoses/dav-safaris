import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { EditorState, convertToRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
//===MUI IMPORTS===
import { Button, Paper, TextField } from "@material-ui/core";
import Spinner from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";

//===BOOTSTRAP IMPORTS===
import { Col, Container, Row, Form } from "react-bootstrap";

//===REDUX IMPORTS===

//===COMPONENT IMPORTS===
import styles from "./NewTour.module.css";
import EditPostModal from "../DashBoard/ManageUpdates/EditPostModel";
import { creatNewPost } from "../../store/Actions/PostActions";
import PostBlock from "./PostBlock";
import ImageUpload from "./ImageUpload";
import NewKeyWord from "../DashBoard/ManageTours/Keywords/NewKeyWord";
import { ConfigurationEditor } from "../CustomEditor/SMTPEditor.component";

const NewPost = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [open, setOpen] = useState(false);
  const [postBlocks, setPostBlocks] = useState([]);
  const [keys, setKeys] = useState([]);
  const [EditedPostId, setEditedPostId] = useState("");
  const [type, setType] = useState("Edit");
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    description: "",
    cover_image: "",
    selectedImage: "",
    blockTitle: "",
    blockDesc: "",
  });
  const { setAddNew } = props;
  //====TOUR COVER IMAGE HANDLER====//
  const tourImageHandler = async (e) => {
    const file = e.target.files[0];
    const Image = await convertbase64Logo(file);
    setValues({ ...values, cover_image: Image, selectedImage: file });
  };
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const convertbase64Logo = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setMessage("");
    setError("");
  };

  const PostBlockHandler = () => {
    const postblock = {
      title: values.blockTitle,
      description: values.blockDesc,
    };

    postBlocks.push(postblock);

    setValues({
      ...values,
      blockTitle: "",
      blockDesc: "",
    });
  };

  const RegisterFormSubmitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (values.blockTitle.length > 0) {
      PostBlockHandler();
    }
    if (values.name.length < 1) {
      return setError("Post title is required");
    }

    if (values.selectedImage.length < 1) {
      return setError("Post cover image required");
    }
    if (values.description.length < 1) {
      return setError("Post Description required");
    }
    try {
      await dispatch(
        creatNewPost(
          values.name,
          values.description,
          JSON.stringify(postBlocks),
          values.selectedImage,
          JSON.stringify(keys)
        )
      );
      setIsLoading(false);
      toast.success("Changes saved Successfully");
      setAddNew(false);
      setMessage(`${values.name} Created Successfully`);
      setValues({
        name: "",
        description: "",
        cover_image: "",
        selectedImage: "",
        blockTitle: "",
        blockDesc: "",
      });
      setPostBlocks([]);
      setKeys([]);
    } catch (error) {
      setIsLoading(false);
      setError("Post Registration Failed");
    }
  };

  const onEditClick = (id) => {
    setType("Edit");
    const Activity = postBlocks[id];

    setSelectedPost(Activity);
    setEditedPostId(id);
    setOpen(true);
  };
  const onDeleteClick = (id) => {
    setType("Delete");
    setOpen(true);
    setEditedPostId(id);
  };

  return (
    <Container fluid>
      <section className={styles.gpa__registration_section}>
        <h1 className={styles.gpa__membership_section_title}>
          Create New Safari Update
        </h1>
        <Paper
          className={`${styles.gpa__register_wrapper} ${styles.gpa__register_wrapper_register_new}`}
        >
          <div className={styles.gpa__register_wrapper_inner}>
            {error && (
              <div className="d-flex justify-content-center mb-3">
                <Alert severity="error">{error}</Alert>
              </div>
            )}
            {message && (
              <div className="d-flex justify-content-center mb-3">
                <Alert severity="success">{message}</Alert>
              </div>
            )}

            <Form onSubmit={RegisterFormSubmitHandler}>
              <TextField
                fullWidth
                label="Post Title"
                variant="filled"
                value={values.name}
                name="name"
                size="small"
                onChange={onChangeHandler}
                className={styles.gpa__form_input_field}
              />
              <div className="row">
                <div className="col-xs-12 col-sm-9">
                  <ConfigurationEditor
                    placeholder="Type tour description here..."
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
                        convertToRaw(state.getCurrentContent()).blocks
                          .length === 1 &&
                        convertToRaw(state.getCurrentContent()).blocks[0]
                          .text === ""
                      ) {
                        setValues({ ...values, description: "" });
                      } else {
                        setValues({
                          ...values,
                          description: currentContentAsHTML,
                        });
                      }
                    }}
                  />
                </div>

                <div
                  className={`col-xs-12 col-sm-3 ${styles.gpa__register_form_right_wrapper}`}
                >
                  <ImageUpload
                    isPost={true}
                    tourImage={values.cover_image}
                    // Image={Tour.imageCover}
                    uploaded={true}
                    tourImageHandler={tourImageHandler}
                  />
                </div>
              </div>

              <PostBlock
                values={values}
                setValues={setValues}
                BlockHandler={PostBlockHandler}
                Blocks={postBlocks}
                onEditClick={onEditClick}
                isEdit={false}
                onDeleteClick={onDeleteClick}
              />
              <NewKeyWord setKeys={setKeys} keys={keys} key_words={[]} />

              <Row>
                <Col xs={{ span: 8, offset: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={styles.gpa__register_submit_button}
                  >
                    {isLoading ? "Creating Updates..." : "Post Update"}
                    {isLoading ? (
                      <Spinner
                        thickness={2}
                        size={20}
                        style={{ marginLeft: 5 }}
                      />
                    ) : null}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Paper>
        <EditPostModal
          type={type}
          open={open}
          setOpen={setOpen}
          data={selectedPost}
          EditedPostId={EditedPostId}
          postBlocks={postBlocks}
          setPostBlocks={setPostBlocks}
        />
      </section>
    </Container>
  );
};

export default NewPost;
