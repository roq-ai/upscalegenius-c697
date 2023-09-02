import * as yup from 'yup';

export const integrationValidationSchema = yup.object().shape({
  platform_name: yup.string().required(),
  api_key: yup.string().required(),
  account_id: yup.string().nullable().required(),
});
