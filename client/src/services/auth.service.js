import api from "./api";
import TokenService from "./token.service";

const register = ({ fotoDePerfil, base64, nombre, apellido, usuario, email, contraseña, dni, fechaDeNacimiento, direccion, numeroDeContacto, consentimientoWhatsapp, instructorado, especializacion, profesorado }) => {
  return api.post("/auth/signup", { fotoDePerfil, base64, nombre, apellido, usuario, email, contraseña, dni, fechaDeNacimiento, direccion, numeroDeContacto, consentimientoWhatsapp, instructorado, especializacion, profesorado });
};

const login = (usuario, contraseña) => {
  return api
    .post("/auth/signin", {
      usuario,
      contraseña
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;