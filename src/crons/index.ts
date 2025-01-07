import { removeOldPasswords } from "./remove-old-password.cron";
import { removeOldTokensCron } from "./remove-old-tokens.cron";
import { testCron } from "./test.cron";

export const cronRunner = async () => {
  testCron.start();
  removeOldTokensCron.start();
  removeOldPasswords.start();
};
