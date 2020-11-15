import React, { useState } from "react";
import { GstToggle } from "../../redux/common/actions";
import { useDispatch } from "react-redux";
import "./GST.scss";

const GST = () => {
  const [toggle, setToggle] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <ul>
        <li>
          <input id="s2" type="checkbox" class="switch" />
          <label for="s2"> GST</label>
        </li>
      </ul>
    </>
  );
};

export default GST;
