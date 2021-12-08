import React, { useEffect } from "react";
import classes from "../Membership.module.css";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";
import DavLogo from "../../AppBar/DavLogo";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container fluid>
      <section className={classes.gpa__registration_section}>
        <Paper className={classes.dav__membership_form_wrapper}>
          <div className={classes.dav__membership_form_wrapper_inner}>
            <div className={classes.dav__membership_row}>
              <div
                className={`col-xs-12 col-sm-6 ${classes.dav__membership_form_side}`}
              >
                <div className={classes.dav__registration_hero}>
                  {/* <DavLogo /> */}

                  <h1>Forgot Password</h1>
                  <p>
                    Enter your e-mail address and we will send you a link to
                    reset your password
                  </p>
                </div>
              </div>
              <div
                className={`col-xs-12 col-sm-6 ${classes.dav__membership_form}`}
              >
                <form>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="filled"
                    name="email"
                    size="small"
                    className={classes.gpa__form_input_field}
                  />

                  <Row>
                    <Col
                      sm={{ span: 8, offset: 2 }}
                      xs={{ span: 10, offset: 1 }}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        type="submit"
                        className={classes.dav__membership_submit_button}
                      >
                        Send Link
                      </Button>
                    </Col>
                  </Row>
                </form>
                {/* <div className={classes.gpa__register_form_footer}>
                  Don't have account yet?
                  <span style={{ marginLeft: 5 }}>
                    <Link to="/register">Register</Link>
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </Paper>
      </section>
    </Container>
  );
};

export default ResetPassword;
