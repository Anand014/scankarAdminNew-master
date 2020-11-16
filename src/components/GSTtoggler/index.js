import React, { useState } from "react";
import { GstToggle } from "../../redux/common/actions";
import { useDispatch } from "react-redux";
import Switch from '@material-ui/core/Switch';



const GST = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
     <Switch
        checked={state.checkedB}
        onChange={handleChange}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </>
  );
};

export default GST;
