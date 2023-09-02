import * as yup from 'yup';

export const teamMemberValidationSchema = yup.object().shape({
  joined_at: yup.date().required(),
  role: yup.string().required(),
  status: yup.string().required(),
  user_id: yup.string().nullable().required(),
  account_id: yup.string().nullable().required(),
});
