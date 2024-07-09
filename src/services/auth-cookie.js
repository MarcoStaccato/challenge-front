export default function authHeader() {
    let userCookie = localStorage.getItem('userCookie');
  
    if (userCookie) {
        return userCookie;
    } else {
      return {};
    }
  }