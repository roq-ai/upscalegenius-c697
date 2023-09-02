import * as yup from 'yup';

export const imageValidationSchema = yup.object().shape({
  original_size: yup.number().integer().required(),
  upscaled_size: yup.number().integer().required(),
  upscale_factor: yup.number().integer().required(),
  account_id: yup.string().nullable().required(),
});
