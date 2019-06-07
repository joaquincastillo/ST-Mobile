import React from 'react';
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
} from 'react-native';

const {
  styles,
  strongColor,
  mainColor,
  placeholderTextColor,
  errorColor,
  imageHeight,
  imageHeightSmall
} = require('./styles');
const greenLogo = require('../../assets/images/st-computacion.png');
const greenMail = require('../../assets/images/mail.png');
const greenLock = require('../../assets/images/lock.png');

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.imageHeight = new Animated.Value(imageHeight);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  // Manejo de la aparición del teclado
  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }


  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: imageHeightSmall,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: imageHeight,
    }).start();
  };


  render() {
    const { navigation } = this.props;
    const {
      email, password
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: mainColor }}>

        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          <Image
            style={styles.logo}
            source={greenLogo}
            resizeMode="center"
          />

          <View style={styles.inputSection}>
            <Image
              style={styles.searchIcon}
              source={greenMail}
            />
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
            <Image
              style={styles.searchIcon}
              source={greenLock}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Contraseña"
              secureTextEntry
              textContentType="password"
              paddingHorizontal="10%"
              placeholderTextColor={placeholderTextColor}
              textAlign="left"
              value={password}
              onChangeText={passwordInput => this.setState({ password: passwordInput })}
            />
          </View>
          <View style={{
            justifyContent: 'center', width: '100%', height: 50, marginVertical: 10,
          }}
          >

            <TouchableOpacity
              style={styles.hugeButton}
              onPress={() => navigation.navigate('Orders')}
            >
              <Text style={{ color: mainColor, fontWeight: 'bold' }}>Iniciar Sesión</Text>
    
            </TouchableOpacity>

          </View>

          <View>
            <TouchableOpacity
              style={styles.recoverPassword}
              // onPress={() => navigation.navigate('RecoverPass')}
            >
              <Text textAlign="center" style={{ color: strongColor }}>¿Desea recuperar su contraseña?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}


export default LoginScreen;