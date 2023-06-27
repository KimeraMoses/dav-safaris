import VerifiedIcon from "@material-ui/icons/VerifiedUser";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import classes from "./styles.module.css";
import { Button } from "../../UI/Button/Button";
import { useState } from "react";
import { DAV_APIS } from "../../../Adapter";
import { useEffect } from "react";
import { formattedDate } from "../../SafariUpdates/SingleUpdate/Update";
import Loader from "../../../containers/Loader/Loader";
import { Alert } from "@material-ui/lab";

const ManageAgents = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAllAgents = async () => {
    setIsLoading(true);
    const res = await DAV_APIS.get.getAllAgents();
    if (res.status === 200) {
      setAgents(res.data.agents);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllAgents();
  }, []);

  const handleActivateDeactivate = async (id) => {
    setSelectedAgent(id);
    setIsLoading(true);
    const agent = agents.find((agent) => agent.id === id);
    const res = await DAV_APIS.activateDeactivateAgent(
      id,
      agent.isActive ? "deactivate" : "activate"
    );
    console.log("res", res);
    if (res.status === 200) {
      getAllAgents();
    }
    setIsLoading(false);
  };

  const getButtonLabel = (isActive, id) => {
    if (isLoading && selectedAgent === id) {
      if (isActive) return "Deactivating...";
      return "Activating...";
    }
    if (isActive) {
      return "Deactivate";
    }
    return "Activate";
  };

  return (
    <div className={classes.dav_manage_agents_wrapper}>
      {isLoading && agents.length < 1 && <Loader />}
      {agents.length > 0 ? (
        agents?.map((agent) => {
          const {
            username,
            email,
            phoneNumber,
            companyName,
            companyWebsite,
            country,
            isActive,
            createdAt,
            id,
          } = agent;
          return (
            <div className={classes.dav_manage_agent_card} key={id}>
              <div className={classes.dav_manage_agent_card_inner}>
                <div className={classes.dav_manage_agent_card_header}>
                  <h4>{username}</h4>
                  {isActive && <VerifiedIcon />}
                </div>
                <div className={classes.dav_manage_agent_card_body}>
                  <div className={classes.dav_manage_agent_card_body_content}>
                    <span>Email</span>: {email}
                  </div>
                  <div className={classes.dav_manage_agent_card_body_content}>
                    <span>Tel. Number</span>: {phoneNumber}
                  </div>
                  <div className={classes.dav_manage_agent_card_body_content}>
                    <span>Co. Name</span>: {companyName}
                  </div>
                  <div className={classes.dav_manage_agent_card_body_content}>
                    <span>Website</span>:{" "}
                    <a href={companyWebsite} target="_blank" rel="noreferrer">
                      <OpenInNewIcon fontSize="small" />
                    </a>
                  </div>
                  <div className={classes.dav_manage_agent_card_body_content}>
                    <span>Country</span>: {country}
                  </div>
                  <div className={classes.dav_manage_agent_card_body_content}>
                    <span>Joined On</span>: {formattedDate(createdAt)}
                  </div>
                </div>
                <div className={classes.dav_manage_agent_card_footer}>
                  <Button
                    onClick={() => handleActivateDeactivate(id)}
                    buttonStyle={isActive ? "Btn--gray" : "Btn--outline"}
                    buttonSize="Btn--fullWidth"
                    disabled={isLoading}
                  >
                    {getButtonLabel(isActive, id)}
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className={classes.dav_manage_agents_no_agents}>
          <Alert severity="info">No Agents Registered Yet!</Alert>
          <p>
            All agents will appear here and you will be able to activate and
            deactivate them
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageAgents;
