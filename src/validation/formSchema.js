import * as yup from "yup";
import categories from "../data/categories";

export default yup.object().shape({
  difficulty: yup
    .string()
    .oneOf(["easy", "medium", "hard"], "choose a difficulty"),
  category: yup
    .string()
    .oneOf(
      [
        "Any",
        "Linux",
        "Bash",
        "Uncategorized",
        "Docker",
        "SQL",
        "CMS",
        "Code",
        "DevOps",
      ],
      "select a category"
    ),
  mode: yup
    .string()
    .oneOf(["5", "10", "20"], "which game mode would you like to play?"),
});
