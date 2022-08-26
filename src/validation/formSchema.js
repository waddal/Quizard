import * as yup from 'yup';

export default yup.object().shape({
  difficulty: yup.string().oneOf(['easy', 'medium', 'hard'], 'choose a difficulty'),
  category: yup
    .string()
    .oneOf(['Any', 'Bash', 'Code', 'SQL', 'DevOps', 'CMS', 'Linux', 'Docker'], 'select a category'),
  mode: yup.string().oneOf(['5', '10', '20'], 'which game mode would you like to play?'),
});
