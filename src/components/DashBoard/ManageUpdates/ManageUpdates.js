import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "../ManageTours/ManageTours.module.css";
import styles from "./ManageUpdates.module.css";
import { useDispatch, useSelector } from "react-redux";
import NewPost from "../../NewItems/NewPost";
import { fetchAllPosts } from "../../../store/Actions/PostActions";
import TourFilters from "../ManageTours/TourFilters";
import UpdateCard from "../../SafariUpdates/UpdateCard";
import Loader from "../../../containers/Loader/Loader";
import DeleteModal from "../ManageTours/Itinary/DeleteModal";

export const NoPosts = ({ type }) => {
  return (
    <div className={styles.no_posts_wrapper}>
      No{" "}
      {type === "langauge"
        ? "posts with different languages found!"
        : "posts found"}
    </div>
  );
};

const ManageUpdates = () => {
  const isLoading = useSelector((state) => state.post.isLoading);
  const language = useSelector((state) => state.post.language);
  const PostList = useSelector((state) => state.post.posts);
  const languagePosts = useSelector((state) => state.post.languagePosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts(language ? "language" : ""));
    window.scrollTo(0, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  let FilteredPosts = language ? languagePosts : PostList;

  const SearchHandler = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (searchTerm !== "") {
      const Results = FilteredPosts.filter((Result) => {
        return Object.values(Result)
          .join(" ")
          .replaceAll("-", " ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(Results);
    }
  };

  const onDeleteClick = (postId) => {
    setOpen(true);
    setSelectedPostId(postId);
  };

  const isSeaching = searchTerm.length < 1 ? false : true;
  useEffect(() => {
    setSearchResults([]);
  }, [isSeaching]);

  const RenderedList = (
    searchResults.length > 0 ? searchResults : FilteredPosts
  )?.map((post) => {
    return (
      <Col
        key={post.id}
        lg={3}
        sm={12}
        className={styles.dav__updates_card_wrapper}
      >
        <UpdateCard
          Post={post}
          isAdmin={true}
          onDeleteClick={onDeleteClick}
          language={language}
        />
      </Col>
    );
  });

  return (
    <Container className={classes.dav__manage_tours_wrapper}>
      <TourFilters
        addNew={addNew}
        setAddNew={setAddNew}
        type="posts"
        searchTerm={searchTerm}
        SearchHandler={SearchHandler}
        language={language}
      />
      {addNew ? (
        <div className={classes.dav__new_tour_form_wrapper}>
          <NewPost setAddNew={setAddNew} language={language} />
        </div>
      ) : (
        <Row>
          {isLoading ? (
            <Loader />
          ) : FilteredPosts?.length ? (
            RenderedList
          ) : (
            <NoPosts type={language ? "language" : "post"} />
          )}
        </Row>
      )}
      <DeleteModal
        language={language}
        source="post"
        open={open}
        setOpen={setOpen}
        Id={selectedPostId}
        setSearchTerm={setSearchTerm}
      />
    </Container>
  );
};

export default ManageUpdates;
