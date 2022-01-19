import { TextField } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import classes from "./CustomTextField.module.css";


const CustomTextField = (props) => {
    const {
      country,
      searchTerm,
      show,
      countryNameHandler,
      keyWordHandler,
      searchResults,
      courseUnitCode,
    } = props;
  
    return (
      <div className={classes.gpa__custom_text_field_wrapper}>
          <>
            <TextField
              label="Your Country of Residence"
              type="search"
              size="small"
              variant="filled"
              fullWidth
              value={show? country.name: searchTerm}
              className="mb-2"
              onChange={keyWordHandler}
            />
  
            {searchTerm.length > 1 && (
              <>
                <div
                  className={`${classes.gpa__custom_text_field_result_dropdown}`}
                >
                  {searchResults.length > 0 ? (
                    <ul
                      className={`${classes.gpa__custom_text_field_results}`}
                    >
                      {searchTerm &&
                        searchResults.map((result) => {
                          return (
                            <li
                              onClick={() => countryNameHandler(result)}
                              key={result.id}
                            >
                              <span className={classes.gpa__course_unit_code}>
                                <img src={result.flags.png} alt={result.alpha2Code} width="20px" height="20px"/>
                              </span>{" "}
                              {result.name.replace(/-/g, " ")}
                            </li>
                          );
                        })}
                    </ul>
                  ) : (
                    <div
                      className={`${classes.gpa__no_search_found_wrapper}`}
                    >
                      No country with name <strong>{searchTerm}</strong>{" "}
                      found!
                    </div>
                  )}
                </div>
              </>
            )}
          </>
      </div>
    );
  };

  export default CustomTextField;
  