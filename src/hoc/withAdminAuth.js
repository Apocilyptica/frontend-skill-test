import useAdminAuth from "../Hooks/useAdminAuth";

const WithAdminAuth = (props) => useAdminAuth(props) && props.children;

export default WithAdminAuth;
