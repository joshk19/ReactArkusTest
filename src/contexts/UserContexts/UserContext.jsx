import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ACTION_GET_ALL_USERS,
  ACTION_ADD_NEW_USER,
  ACTION_DELETE_USER,
  ACTION_EDIT_USER,
  ACTION_SET_USER,
  userReducer,
  initialState
} from './UserReducer';
import mainAxios from '../../helpers/axiosInstance';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initialState);
  const location = useLocation();

  const getAllUsers = async () => {
    const url = `/api/users?per_page=${12}`;
    const response = await mainAxios.get(url);
    let allUsers = [];
    if (response.status === 200) {
      allUsers = response.data.data;
    }
    dispatch({
      type: ACTION_GET_ALL_USERS,
      allUsers
    });
  }

  const addNewUser = newUser => {
    dispatch({
      type: ACTION_ADD_NEW_USER,
      newUser
    })
  }

  const editUser = editedUser => {
    dispatch({
      type: ACTION_EDIT_USER,
      editedUser
    })
  }

  const deleteUser = deletedUser => {
    dispatch({
      type: ACTION_DELETE_USER,
      deletedUser
    })
  }

  const setUser = user => {
    dispatch({
      type: ACTION_SET_USER,
      user,
    });
  };

  useEffect(() => {
    if (location.pathname === '/' && user.usersList.length === 1) {
      getAllUsers();
    }
  }, [location, user.usersList])

  return (
    <UserContext.Provider
      value={{
        setUser,
        addNewUser,
        editUser,
        deleteUser,
        ...user
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export default useUser;