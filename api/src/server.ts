import { serverHttp, port } from "./app";

serverHttp.listen(port, () => console.log(`Server listening on port: ${port}`));