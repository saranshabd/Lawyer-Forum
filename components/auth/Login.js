import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

// import auth actions
import { loginEmailPasswordUser } from '../../actions/authActions';

// import styles
import { appColor } from '../../styles';

// import components
import Header from '../header/LoginHeader';

class Login extends Component {
  // component's state
  state = {
    spinner: false,
    // input field values
    email: undefined,
    password: undefined,
    // input field errors
    emailError: undefined,
    passwordError: undefined
  };

  // method to handle on press action on login button
  handleOnPressLogin = () => {
    this.setState({ spinner: true });

    const { email, password } = this.state;
    let { emailError, passwordError } = this.state;

    // resetting error fields
    emailError = undefined;
    passwordError = undefined;

    // flag to check if there are any errors
    let errors = false;

    if (!email || email == '') {
      this.setState({ emailError: 'empty field' });
      errors = true;
    }
    if (!password || password == '') {
      this.setState({ passwordError: 'empty field' });
      errors = true;
    }

    // some errors exists
    if (errors) return this.setState({ spinner: false });

    // send info to server to login user
    this.props
      .loginEmailPasswordUser(email, password)
      .then(() => {
        // send user to home screen after logging in
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        this.setState({ spinner: false });
        // display server errors
        Alert.alert(null, error);
      });
  };

  render() {
    return (
      <Container>
        <Header toSignUp={() => this.props.navigation.navigate('SignUp')} />
        <View style={{ height: 100 }} />
        <Content>
          <Input
            containerStyle={{ paddingBottom: 5 }}
            inputStyle={{ paddingLeft: 10 }}
            placeholder='email'
            autoCapitalize='none'
            onChangeText={email => this.setState({ email })}
            errorMessage={this.state.emailError}
            leftIcon={<Icon name='envelope' size={20} />}
          />
          <Input
            containerStyle={{ paddingVertical: 5 }}
            inputStyle={{ paddingLeft: 10 }}
            placeholder='password'
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            errorMessage={this.state.passwordError}
            leftIcon={<Icon name='unlock-alt' size={20} />}
          />
          <View style={{ alignSelf: 'center' }}>
            <Button
              containerStyle={{ paddingVertical: 5, width: 200 }}
              title='Login'
              buttonStyle={{ backgroundColor: appColor }}
              onPress={() => this.handleOnPressLogin()}
            />
          </View>
          <Spinner
            textView='Loading...'
            visible={this.state.spinner}
            size='large'
            textStyle={{ color: appColor }}
            color={appColor}
          />
        </Content>
        {/* View for social network login buttons */}
        <Content style={{ alignSelf: 'center', paddingTop: 20 }}>
          <Text style={{ alignSelf: 'center' }}>OR</Text>
          <Text style={{ paddingVertical: 5 }}>
            Sign In using your favorite Social Network
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              paddingVertical: 5
            }}
          >
            <Icon
              name='google'
              size={25}
              style={{ alignItems: 'flex-start', paddingHorizontal: 15 }}
            />
            <Icon
              name='facebook'
              size={25}
              style={{ alignItems: 'center', paddingHorizontal: 15 }}
            />
            <Icon
              name='twitter'
              size={25}
              style={{ alignItems: 'flex-start', paddingHorizontal: 15 }}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(
  null,
  { loginEmailPasswordUser }
)(Login);
