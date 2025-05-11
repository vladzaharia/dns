import { Record } from "../../utils/record";

/**
 * Records for vlad.gg
 */
export const NetlifyVladGGRecords: Record[] = [
  {
    name: "@",
    type: "A",
    description: "vlad.gg",
    target: "75.2.60.5",
    proxy: true,
  },
  {
    name: "www",
    description: "www.vlad.gg",
    target: "vladgg.netlify.app.",
  },
];
