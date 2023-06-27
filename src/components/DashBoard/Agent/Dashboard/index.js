import classes from "./styles.module.css";

const AgentDashboard = () => {
  return (
    <div className={classes.dav__agent_dashboard_wrapper}>
      <div className={classes.dav_agent_details_wrapper}>Kimera Moses</div>
      <div className={classes.dav_agent_dashboard_content_wrapper}>
        Tours with Price here
      </div>
    </div>
  );
};

export default AgentDashboard;
