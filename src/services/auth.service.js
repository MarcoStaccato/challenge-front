import axios from 'axios';

const API_URL = 'http://localhost.elpalomito.io:8080/api/v1/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.headers['authorization']) {
          localStorage.setItem('authorization', response.headers['authorization']);
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('userCookie');
  }
}

export default new AuthService();