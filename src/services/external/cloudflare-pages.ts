import { CreateRecord, Record } from "../../utils/record";

/**
 * Records for vlad.gg
 */
export const CreatePolarisChargeRecord = (base = "charge") =>
  [
    {
      name: base,
      type: "CNAME",
      description: "charge.polaris.gdn",
      target: "charging.pages.dev.",
      proxy: true,
    },
  ].map((val) => CreateRecord(val as Record));
