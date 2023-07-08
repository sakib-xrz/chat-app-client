import { TabPanel, TabView } from "primereact/tabview";
import Login from "../../components/login";
import Signup from "../../components/signup";

const Home = () => {
    return (
        <div className="card lg:p-10 mt-14 lg:mt-20">
            <TabView>
                <TabPanel header="Log In">
                    <Login />
                </TabPanel>
                <TabPanel header="Sign Up">
                    <Signup />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default Home;
