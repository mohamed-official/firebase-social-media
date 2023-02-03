import { useParams } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

const MyProfile = () => {
  const { userId } = useParams();
  const [{ user }, dispatch] = useStateValue();
  return <div>{user?.displayName}</div>;
};

export default MyProfile;
