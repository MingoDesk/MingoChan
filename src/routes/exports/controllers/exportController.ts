import { parseJsonToCsv } from "../util/jsonToCsvParser";
import { getDB } from "../../../database/db";

const exportFile = async (req, res) => {
  const preferences = await getDB().settings.findOne({});
  if (!preferences.value || !preferences) {
    return res.status(400).send({
      success: false,
      errors: "No system prefernces was found!",
      msg: "Make a GET to the system settings endpoint",
    });
  }
  const data = await getDB().tickets.findOne({});

  if (!data.value || !data) {
    return res.status(400).send({
      success: false,
      errors: "No system prefernces was found!",
      msg: "Make a GET to the system settings endpoint",
    });
  }
  if (preferences.prefDataType == "CSV") {
    return parseJsonToCsv(res, "tickets.csv", {}, data);
  }

  const date = new Date();

  res.header("Content-Type", "text/json");
  res.attachment(date);
  return res.status(200).send(data);
};

export { exportFile };
