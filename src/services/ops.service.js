import axios from 'axios';

const API_URL = 'http://localhost.elpalomito.io:8080/api/v1/operations/';

class OpsService {
  compute(operator, numerator, operation) {
    return axios.post(API_URL + 'compute', {
        operator: operator,
        numerator: numerator,
        operation: operation
      },
      {
        headers: {
            'Authorization': localStorage.getItem('authorization'),
            'MyCustomHeader2': '2'
        }
    })
      .then(response => {
          return response;
      });
  }
}

export default new OpsService();