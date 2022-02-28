import * as yup from "yup";

export default yup.object().shape({
  difficulty: yup
    .string()
    .oneOf(["easy", "medium", "hard"], "choose a difficulty"),
  category: yup
    .string()
    .oneOf(["code", "programming", "devops"], "select a category"),
  mode: yup
    .string()
    .oneOf(["5", "10", "suddendeath"], "which game mode would you like to play?"),
});