import { app } from "@src/app.js";
import { port } from "@config/loadEnvironment.js";

const run = () => {
  console.log(`Server running on port ${port}`);
};

app.listen(port, run);
