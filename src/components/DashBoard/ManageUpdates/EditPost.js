import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
//===MUI IMPORTS===
import { Button, Paper, TextField } from "@material-ui/core";
import Spinner from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";
import BackIcon from "@material-ui/icons/Reply";

//===BOOTSTRAP IMPORTS===
import { Col, Container, Row, Form } from "react-bootstrap";

//===REDUX IMPORTS===
import {
  fetchPostFail,
  fetchPostPending,
  fetchPostSuccess,
} from "../../../store/Slices/postSlice";
import { baseUrl } from "../../../store";

//===COMPONENT IMPORTS===
import styles from "../../NewItems/NewTour.module.css";
import { useEffect } from "react";
import ImageUpload from "../../NewItems/ImageUpload";
import PostBlock from "../../NewItems/PostBlock";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import EditPostModal from "./EditPostModel";
import Loader from "../../../containers/Loader/Loader";
import { editPostDetails } from "../../../store/Actions/PostActions";
import NewKeyWord from "../ManageTours/Keywords/NewKeyWord";

const EditPost = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [open, setOpen] = useState(false);
  const [postBlocks, setPostBlocks] = useState([]);
  const [keys, setKeys] = useState([]);
  const [EditedPostId, setEditedPostId] = useState("");
  const [type, setType] = useState("Edit");
  const [post, setPost] = useState({});
  const navigate = useNavigate();
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

  useEffect(() => {
    setValues({
      ...values,
      name: post && post.name,
      description: post && post.post_content,
      cover_image: post && post.postImage,
      selectedImage: post && post.postImage,
    });

    // eslint-disable-next-line
  }, [post]);

  useEffect(() => {}, [values]);

  const fetchPostDetails = (postId) => async (dispatch) => {
    setIsFetching(true);
    dispatch(fetchPostPending());
    try {
      const response = await fetch(`${baseUrl}/api/v1/posts/${postId}`);
      const fetchedPost = await response.json();
      dispatch(fetchPostSuccess(fetchedPost.post));
      setPost(fetchedPost?.post);
      setPostBlocks(fetchedPost?.post.post_blocks);
      setIsFetching(false);
    } catch (error) {
      dispatch(fetchPostFail(error.message));
      setIsFetching(false);
    }
  };

  //====GET THE SELECTED DOCUMENT CATEGORY====//
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const selectedPostId = query.get("post");

  useEffect(() => {
    dispatch(fetchPostDetails(selectedPostId));

    // eslint-disable-next-line
  }, [selectedPostId]);

  //====TOUR COVER IMAGE HANDLER====//
  const tourImageHandler = async (e) => {
    const file = e.target.files[0];
    const Image = await convertbase64Logo(file);
    setValues({ ...values, cover_image: Image, selectedImage: file });
  };

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
        editPostDetails(
          values.name,
          values.description,
          JSON.stringify(postBlocks),
          values.selectedImage,
          JSON.stringify(keys),
          selectedPostId
        )
      );
      setIsLoading(false);
      toast.success("Changes saved Successfully");
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
      navigate("/dashboard/manage-safari-updates");
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
      <div className={styles.back_btn}>
        <Link
          to="/dashboard/manage-safari-updates"
          className={styles.back_btn_wrapper}
        >
          <BackIcon />
          Back
        </Link>
      </div>
      <section className={styles.gpa__registration_section}>
        <h1 className={styles.gpa__membership_section_title}>Update Post</h1>
        {isFetching ? (
          <Loader />
        ) : (
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
                    <TextField
                      className={styles.gpa__form_input_field}
                      label="Post Description"
                      placeholder="Write each paragraph on a new line"
                      multiline
                      value={values.description}
                      name="description"
                      onChange={onChangeHandler}
                      rows={4}
                      fullWidth
                      variant="filled"
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
                  isEdit={true}
                  onDeleteClick={onDeleteClick}
                />
                <NewKeyWord
                  setKeys={setKeys}
                  keys={keys}
                  key_words={post && post.key_words}
                />

                <Row>
                  <Col xs={{ span: 8, offset: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={styles.gpa__register_submit_button}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
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
        )}
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

export default EditPost;
