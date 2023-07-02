import React, { useEffect, useState } from "react";
import classes from "../Membership.module.css";
import { Paper, TextField, Button } from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DAV_APIS } from "../../../Adapter";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.length < 3) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (email.length > 0) {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        toast.error("Please enter valid email address.");
        return;
      }
    }
    setLoading(true);
    try {
      const res = await DAV_APIS.auth.forgotPassword(email);
      if (res?.response?.status === 404) {
        toast.error("Email not found");
      }
      if (res.status === 200) {
        toast.success("Password reset link sent to your email address");
        navigate("/login");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong, please try again");
      setLoading(false);
    }
  };

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
                <form onSubmit={handleSubmit}>
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    label="Email"
                    variant="filled"
                    required
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
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send Link"}
                      </Button>
                    </Col>
                  </Row>
                </form>
                <div className={classes.gpa__register_form_footer}>
                  Remembered password?
                  <span style={{ marginLeft: 5 }}>
                    <Link to="/login">Login</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </section>
    </Container>
  );
};

export default ResetPassword;
