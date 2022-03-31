import React, { useEffect } from "react";
import Calculator from "./features/calculator/Calculator";
import Toggle from "./features/toggle/Toggle";
import { selectToggle } from "./features/toggle/toggleSlice";
import { useSelector } from "react-redux";
import { variablesLightMode, variablesDarkMode } from "./data/variables";
import { setRootVariables } from "./common/utils";
import { useNavigate } from "react-router-dom";

const App = () => {
  const toggleState = useSelector(selectToggle);
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem("user")]);
  useEffect(() => {
    if (!toggleState) {
      setRootVariables(variablesDarkMode);
    } else {
      setRootVariables(variablesLightMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleState]);

  const logout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="App">
      <button onClick={() => logout()} className="logout-btn">
        Logout
      </button>
      <div className="calculator-container">
        <Toggle />
        <Calculator />
      </div>
    </div>
  );
};

export default App;
