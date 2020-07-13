import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import ActivityIndicator from '../components/ActivityIndicator';
import AppForm from '../components/AppForm';
import AppFormField from '../components/AppFormField';
import ErrorMessage from '../components/ErrorMessage';
import SubmitButton from '../components/SubmitButton';
import authApi from '../api/auth';
import usersApi from '../api/users';
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(2).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password")
})

const RegisterScreen = (props) => {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);

  const auth = useAuth();
  const [error, setError] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSubmit = async (userInfo) => {
     let result = await registerApi.request(userInfo);
     if (!result.ok) {
       if (result.data) setError(result.data.error);
       else {
         setError("An unexpected error occurred during user registration");
         console.log(result);
       }
       setShowErrorMessage(true);
       return;
     }

     result = await loginApi.request(
       userInfo.email,
       userInfo.password
     );
     if (result.ok) {
      setShowErrorMessage(false);
      auth.logIn(result.data)
     } else {
      setError("An unexpected error occurred during login of registered user");
      setShowErrorMessage(true);
     }
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <AppForm
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={showErrorMessage} />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            keyboardType="default"
            name="name"
            placeholder="Name"
            textContentType="name"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
        </AppForm>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20
  }
});

export default RegisterScreen;
