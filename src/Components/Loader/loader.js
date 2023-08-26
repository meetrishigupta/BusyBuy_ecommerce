/** ------------------ IMPORTING SPINNER MODULES ------------------ **/
import { GridLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{
        margin: "auto",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <GridLoader color="red" />
      
    </div>
  );
};

/** ------------------ EXPORTING MODULES ------------------ **/
export default Loader;
