import api from "./api";
import TokenService from "./token.service";

const userRegister = ({ nombre, apellido, password, email, imagen, fecha_nacimiento, pais, provincia, ciudad, celular }) => {
  return api.post("/auth/usuario/signup", { nombre, apellido, password, email, imagen, fecha_nacimiento, pais, provincia, ciudad, celular });
};

//Si el proveedor se crea con servicios agregarlo
const providerRegister = ({ nombre, apellido, password, email, imagen, fecha_nacimiento, pais, provincia, ciudad, celular }) => {
  return api.post("/auth/proveedor/signup", { nombre, apellido, password, email, imagen, fecha_nacimiento, pais, provincia, ciudad, celular });
};

const userLogin = ({email, password}) => {
  return api
    .post("/auth/usuario/signin", {
      email,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const providerLogin = ({email, password}) => {
  return api
    .post("/auth/proveedor/signin", {
      email,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};
const adminLogin = ({email, password}) => {
  return api
    .post("/auth/admin/signin", {
      email,
      password
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
  userRegister,
  providerRegister,
  userLogin,
  providerLogin,
  adminLogin,
  logout,
  getCurrentUser,
};

export default AuthService;