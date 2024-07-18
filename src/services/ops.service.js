import axios from 'axios';

const API_URL = 'http://localhost.elpalomito.io:8080/api/v1/operations/';

class OpsService {
  compute(numerator, denominator) {

    const storedOp = localStorage.getItem('operation');

    var computeOp = "RANDOM_STRING";

    switch (storedOp) {
      case "addition":
        computeOp = "ADDITION"
        break;
      case "substraction":
        computeOp = "SUBSTRACTION"
        break;
      case "division":
        computeOp = "DIVISION"
        break;
      case "multiplication":
        computeOp = "MULTIPLICATION"
        break;
      case "sqrt":
        computeOp = "SQUARE_ROOT"
        break;
      case "random":
        computeOp = "RANDOM_STRING"
        break;
      default:
        //can't process that operation
        return;
    }

    return axios.post(API_URL + 'compute', {
        operator: numerator,
        numerator: denominator,
        operation: computeOp
      },
      {
        headers: {
          'Authorization': localStorage.getItem('authorization')
        }
    })
      .then(response => {
          return response;
      });
  }

  getSymbol(operation) {
    switch (operation) {
      case "addition":
        return "+";
      case "substraction":
        return "-";
      case "division":
        return "/"
      case "multiplication":
        return "x"
      case "sqrt":
        return "sqrt"
      case "random":
        return "random"
      default:
        //can't process that operation
        return ""
    }
  }

  getRecords(field, pageNumber, pageSize, sorting) {
    return axios.get(API_URL + 'records', {
      params: {
        field: field,
        pageNumber: pageNumber,
        pageSize: pageSize,
        sorting: sorting
      },
      headers: {
          'Authorization': localStorage.getItem('authorization')
      }
    })
    .then(response => {
      console.log(response)
        return response;
    });
  }
}

export default new OpsService();