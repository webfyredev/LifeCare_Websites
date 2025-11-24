import { useContext } from "react";
import { AuthContext } from "../auth/authContext";

const Dashboard = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="dashboard">
      <h1>Welcome, {auth?.user ? `${auth.user.first_name} ${auth.user.last_name}` : 'Loading...'}</h1>

      <p><strong>Medical ID:</strong> {auth?.user?.medical_id}</p>
      <p><strong>Email:</strong> {auth?.user?.email}</p>

      <button onClick={auth.logout} className="cursor-pointer bg-blue-600 font-semibold text-white px-8 py-2 text-sm rounded-md mt-5">Logout</button>
    </div>
  );
};

export default Dashboard;