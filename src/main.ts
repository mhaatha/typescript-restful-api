import { logger } from "./applications/logging";
import { web } from "./applications/web";

web.listen(3000, () => {
  logger.info("Listening on port 3000");
});