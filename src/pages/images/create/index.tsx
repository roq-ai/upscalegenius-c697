import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createImage } from 'apiSdk/images';
import { imageValidationSchema } from 'validationSchema/images';
import { AccountInterface } from 'interfaces/account';
import { getAccounts } from 'apiSdk/accounts';
import { ImageInterface } from 'interfaces/image';

function ImageCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ImageInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createImage(values);
      resetForm();
      router.push('/images');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ImageInterface>({
    initialValues: {
      original_size: 0,
      upscaled_size: 0,
      upscale_factor: 0,
      account_id: (router.query.account_id as string) ?? null,
    },
    validationSchema: imageValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Images',
              link: '/images',
            },
            {
              label: 'Create Image',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Image
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Original Size"
            formControlProps={{
              id: 'original_size',
              isInvalid: !!formik.errors?.original_size,
            }}
            name="original_size"
            error={formik.errors?.original_size}
            value={formik.values?.original_size}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('original_size', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Upscaled Size"
            formControlProps={{
              id: 'upscaled_size',
              isInvalid: !!formik.errors?.upscaled_size,
            }}
            name="upscaled_size"
            error={formik.errors?.upscaled_size}
            value={formik.values?.upscaled_size}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('upscaled_size', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Upscale Factor"
            formControlProps={{
              id: 'upscale_factor',
              isInvalid: !!formik.errors?.upscale_factor,
            }}
            name="upscale_factor"
            error={formik.errors?.upscale_factor}
            value={formik.values?.upscale_factor}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('upscale_factor', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<AccountInterface>
            formik={formik}
            name={'account_id'}
            label={'Select Account'}
            placeholder={'Select Account'}
            fetcher={getAccounts}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/images')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'image',
    operation: AccessOperationEnum.CREATE,
  }),
)(ImageCreatePage);
