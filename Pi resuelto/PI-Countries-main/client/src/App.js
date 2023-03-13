//import "./App.css";
import "./App.css";
import { Landing } from "./components/Landing/Landing.jsx";
import { Home } from "./components/Home/Home.jsx";
import { ActivityCreate } from "./components/ActivityCrud/create/ActivityCreate.jsx";
import { ActivityList } from "./components/ActivityCrud/list/ActivityList.jsx";
import { Activity } from "./components/ActivityCrud/Detail/Activity.jsx";

import DetailCountry from "./components/Countries/Details/DetailCountry";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/ActivityCreate" component={ActivityCreate} />
        <Route exact path="/ActivityList" component={ActivityList} />
        <Route exact path="/Activity" component={Activity} />
        {/*      <Route exact path="/Form" component={Form} /> */}
        <Route exact path="/home/:id" component={DetailCountry} />
        <Route exact path="*" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
