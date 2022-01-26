import React, { Fragment, useEffect, useState } from "react";

//===MUI IMPORTS===
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  List,
  Box,
  TextField,
  Fab,
  Grid,
  Chip,
  Paper,
  Badge,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import NewUnivIcon from "@material-ui/icons/AccountBalance";
import DoneIcon from "@material-ui/icons/Done";

//===REDUX IMPORTS===
import { useDispatch, useSelector } from "react-redux";
// import { fetchAllCourses } from "../../../../../store/Actions/CourseActions";

//===COMPONENT IMPORTS===
// import Spinner from "../../../../Spinner/Spinner";
// import UniversityDropdown from "../../../../UI/Dropdown/UniversityDropdown";
import classes from "./DashboardItems.module.css";
import { itinaries } from "../../Tours/SingleTour/SingleTour";

const CourseList = (props) => {
  const isLoading = false;
  const Tours = useSelector(state=>state.tours.toursList);
  const { onAddClick, onEditClick, isEdit } = props;
  const dispatch = useDispatch();
  const UserList = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  let FilteredTours = Tours;

  const [selected, setSelected] = useState("makerere-university");
  const [selectedCode, setSelectedCode] = useState("muk");

  const SearchHandler = (e) => {
    const { name, value } = e.target;
    setSearchTerm(value);

    if (searchTerm !== "") {
      const Results = FilteredTours.filter((Result) => {
        return Object.values(Result)
          .join(" ")
          .replaceAll("-", " ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(Results);
    }
  };

  useEffect(() => {
    setSearchTerm("");
    setSearchResults([]);
  }, [selected]);

  useEffect(() => {
    setSearchResults([]);
  }, [searchTerm.length < 1]);

  const RefreshHandler = () => {
    // dispatch(fetchAllCourses());
  };

  let CoursesRenderedList;

  if (Tours && Tours.length > 0) {
    CoursesRenderedList = (
      searchResults.length > 0 ? searchResults : FilteredTours
    ).map((tour) => {
      return (
        <ListItem key={tour.id} button onClick={() => onEditClick(tour.id)}>
          <ListItemAvatar>
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={"Uganda"}
              color="error"
            >
              <Avatar
                className={classes.gpa__dashboard_course_manager_course_id}
                variant="square"
              >
                {tour.title.charAt(0)}
              </Avatar>
            </Badge>
          </ListItemAvatar>
          <ListItemText
            primary={tour.title}
            // secondary={
            //   course.university && course.university.name.replace(/-/g, ' ')
            // }
          />
          <ListItemSecondaryAction>
            <Tooltip title="Edit" placement="left">
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEditClick(tour.id)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  }

  return (
    <Fragment>
      <List dense className={classes.gpa__dashboard_menu_list_item}>
        <ListItem>
          <Grid container justify="space-between" alignItems="center">
            <Fab
              color="primary"
              size="small"
              aria-label="add"
              onClick={() => onAddClick()}
              disabled={isEdit}
            >
              <Tooltip title="Add" placement="right">
                <AddIcon />
              </Tooltip>
            </Fab>

            {FilteredTours && FilteredTours.length ? (
              <Chip
                icon={<NewUnivIcon fontSize="small" />}
                label={`${FilteredTours.length} course${
                  FilteredTours.length > 1 ? "s" : ""
                } found in ${selectedCode}`}
                clickable
                color="default"
                onDelete={(e) => e.target.value}
                deleteIcon={<DoneIcon />}
                variant="outlined"
              />
            ) : null}
            <Fab
              style={{ boxShadow: "none" }}
              size="small"
              disabled={isLoading}
              onClick={RefreshHandler}
            >
              <RefreshIcon
                className={`${isLoading ? classes.gpa__refreshing_icon : ""}`}
              />
            </Fab>
          </Grid>
        </ListItem>
        <ListItem>
          <Box mb={1} mr={1} width={"100%"}>
            {/* <UniversityDropdown
              selected={selected}
              setSelected={setSelected}
              setSelectedCode={setSelectedCode}
              fetchItems={fetchAllCourses}
            /> */}
            Dropdown
          </Box>
        </ListItem>

        <ListItem>
          <Box mb={1} mr={1} width={"100%"}>
            <TextField
              label="Search course..."
              type="search"
              name="search"
              autoComplete="off"
              value={searchTerm}
              className={classes.gpa__dashboard_search_field}
              fullWidth
              onChange={SearchHandler}
            />
          </Box>
        </ListItem>

        <Box className={classes.gpa__dashboard_menu_item_list_wrapper}>
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              {FilteredTours.length < 1 ? (
                <Paper style={{ padding: 20 }}>
                  No courses found in {selected}{" "}
                </Paper>
              ) : (
                ""
              )}
              {searchTerm.length > 0 && searchResults.length < 1 ? (
                <Paper style={{ padding: 20 }}>
                  No course with <strong>{searchTerm}</strong> found!
                </Paper>
              ) : (
                CoursesRenderedList
              )}
            </>
          )}
        </Box>
      </List>
    </Fragment>
  );
};

export default CourseList;
