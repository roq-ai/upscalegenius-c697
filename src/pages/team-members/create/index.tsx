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

import { createTeamMember } from 'apiSdk/team-members';
import { teamMemberValidationSchema } from 'validationSchema/team-members';
import { UserInterface } from 'interfaces/user';
import { AccountInterface } from 'interfaces/account';
import { getUsers } from 'apiSdk/users';
import { getAccounts } from 'apiSdk/accounts';
import { TeamMemberInterface } from 'interfaces/team-member';

function TeamMemberCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TeamMemberInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTeamMember(values);
      resetForm();
      router.push('/team-members');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TeamMemberInterface>({
    initialValues: {
      joined_at: new Date(new Date().toDateString()),
      role: '',
      status: '',
      user_id: (router.query.user_id as string) ?? null,
      account_id: (router.query.account_id as string) ?? null,
    },
    validationSchema: teamMemberValidationSchema,
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
              label: 'Team Members',
              link: '/team-members',
            },
            {
              label: 'Create Team Member',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Team Member
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="joined_at" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Joined At
            </FormLabel>
            <DatePicker
              selected={formik.values?.joined_at ? new Date(formik.values?.joined_at) : null}
              onChange={(value: Date) => formik.setFieldValue('joined_at', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.role}
            label={'Role'}
            props={{
              name: 'role',
              placeholder: 'Role',
              value: formik.values?.role,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
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
              onClick={() => router.push('/team-members')}
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
    entity: 'team_member',
    operation: AccessOperationEnum.CREATE,
  }),
)(TeamMemberCreatePage);
