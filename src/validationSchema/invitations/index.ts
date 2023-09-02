import * as yup from 'yup';

export const invitationValidationSchema = yup.object().shape({
  invitee_email: yup.string().required(),
  status: yup.string().required(),
  account_id: yup.string().nullable().required(),
});
