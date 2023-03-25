import { useState } from "react";
import { CAMPSITES } from "./DirectoryScreen";
import DirectoryScreen from "./DirectoryScreen";

const Main = () => {
  const [campsites, setCampsites] = useState(CAMPSITES);

  return <DirectoryScreen campsites={campsites} />;
};

export default Main;
