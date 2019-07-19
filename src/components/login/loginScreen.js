import React from "react";
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Animated
} from "react-native";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

const {
  styles,
  strongColor,
  mainColor,
  placeholderTextColor,
  errorColor,
  imageHeight,
  imageHeightSmall
} = require("./styles");
const greenLogo = require("../../assets/images/st-computacion.png");
const greenMail = require("../../assets/images/mail.png");
const greenLock = require("../../assets/images/lock.png");

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.imageHeight = new Animated.Value(imageHeight);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }

  // Manejo de la aparición del teclado
  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  isEmailValid = email => {
    const pattern = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  };

  // Manejo de botones
  async onPressLoginButton() {
    const { email, password } = this.state;
    if (!email.length || !password.length) {
      // || !isEmailValid(email)) {
      this.setState({ error: true, email: "", password: "" });
    } else {
      this.setState({ error: false, loading: true });
      const { screenProps, navigation, signinUser } = this.props;
      signinUser(email, password, screenProps.pushToken)
        .then(({ data }) => {
          console.log(data.signIn);
          if (data.signIn) {
            screenProps.changeLoginState(true, data.signIn);
            navigation.navigate("Orders");
          } else {
            console.log("error clave");
            this.setState({ error: true, loading: false });
          }
        })
        .catch(e => {
          console.log(e);
          this.setState({ connectionError: true, loading: false });
        });
    }
  }

  keyboardWillShow = event => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: imageHeightSmall
    }).start();
  };

  keyboardWillHide = event => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: imageHeight
    }).start();
  };

  render() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: mainColor }}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Image style={styles.logo} source={greenLogo} resizeMode="center" />

          <View style={styles.inputSection}>
            <Image style={styles.searchIcon} source={greenMail} />
            <TextInput
              style={styles.inputText}
              placeholder="Correo Electrónico"
              keyboardtype="email-address"
              textContentType="emailAddress"
              paddingHorizontal="10%"
              placeholderTextColor={placeholderTextColor}
              textAlign="left"
              value={email}
              onChangeText={emailInput => this.setState({ email: emailInput })}
            />
          </View>
          <View style={styles.inputSection}>
            <Image style={styles.searchIcon} source={greenLock} />
            <TextInput
              style={styles.inputText}
              placeholder="Contraseña"
              secureTextEntry
              textContentType="password"
              paddingHorizontal="10%"
              placeholderTextColor={placeholderTextColor}
              textAlign="left"
              value={password}
              onChangeText={passwordInput =>
                this.setState({ password: passwordInput })
              }
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              width: "100%",
              height: 50,
              marginVertical: 10
            }}
          >
            <TouchableOpacity
              style={styles.hugeButton}
              onPress={() => this.onPressLoginButton()}
            >
              <Text style={{ color: mainColor, fontWeight: "bold" }}>
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.recoverPassword}
              // onPress={() => navigation.navigate('RecoverPass')}
            >
              <Text textAlign="center" style={{ color: strongColor }}>
                ¿Desea recuperar su contraseña?
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default graphql(
  gql`
    mutation signinUser(
      $login: String!
      $password: String!
      $pushToken: String
    ) {
      signIn(login: $login, password: $password, pushToken: $pushToken) {
        token
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      signinUser: (login, password, pushToken) =>
        mutate({ variables: { login, password, pushToken } })
    })
  }
)(LoginScreen);
