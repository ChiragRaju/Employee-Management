
import { AddRequest, RemoveRequest, UpdateRequest, getAllRequestFail, getAllRequestSuccess, getbycodeSuccess, makeRequest } from "./Action"
import { toast } from "react-toastify";
import Api from '../ApiServices/Api'
export const GetAllEmployees = () => {
    return (dispatch) => {
      dispatch(makeRequest());
      setTimeout(() => {
        Api.getAllEmployeesApi()
          .then((res) => {
            const _list = res.data;
            dispatch(getAllRequestSuccess(_list));
          })
          .catch((err) => {
            dispatch(getAllRequestFail(err.message));
          });
      }, 1000);
    };
  };


export const GetEmployeeCode = (code) => {
    return (dispatch) => {
      Api.getEmployeeByCodeApi(code)
        .then((res) => {
          const _obj = res.data;
          dispatch(getbycodeSuccess(_obj));
        })
        .catch(() => {
         toast.error('Failed to fetch the data')
        });
    };
  };

export const CreateEmployee = (data) => {
    return (dispatch) => {
      Api.createEmployeeApi(data)
        .then(() => {
          dispatch(AddRequest(data));
          toast.success('Company created successfully.');
        })
        .catch((err) => {
          toast.error(`Failed to create company due to: ${err.message}`);
        });
    };
  };
  
  export const UpdateEmployee = (data) => {
    return (dispatch) => {
      Api.updateEmployeeApi(data)
        .then(() => {
          dispatch(UpdateRequest(data));
          toast.success('Company updated successfully.');
        })
        .catch((err) => {
          toast.error(`Failed to update company due to: ${err.message}`);
        });
    };
  };
  
  export const RemoveEmployee = (code) => {
    return (dispatch) => {
      Api.removeEmployeeApi(code)
        .then(() => {
          dispatch(RemoveRequest(code));
          toast.success('Company removed successfully.');
        })
        .catch((err) => {
          toast.error(`Failed to remove company due to: ${err.message}`);
        });
    };
  };