export const ACTION_GET_ALL_USERS = 'ACTION_GET_ALL_USERS';
export const ACTION_ADD_NEW_USER = 'ACTION_ADD_NEW_USER';
export const ACTION_EDIT_USER = 'ACTION_EDIT_USER';
export const ACTION_DELETE_USER = 'ACTION_DELETE_USER';
export const ACTION_SET_USER = 'ACTION_SET_USER';

export const initialState = {
  usersList: [
    {
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
    }
  ],
  user: {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  }
}

const getAllUsers = (state, action) => ({
  ...state,
  usersList: action.allUsers
});

const addUser = (state, action) => {
  return {
    ...state.usersList,
    usersList: state.usersList.concat(action.newUser)
  }
}

const editUser = (state, action) => {
  const userIndex = state.usersList.findIndex(x => x.id === action.editedUser.id);
  const newUsersList = [...state.usersList];
  let editUser = {...newUsersList[userIndex]};
  editUser = action.editedUser;
  newUsersList[userIndex] = {...editUser};
  return {
    ...state.usersList,
    usersList: newUsersList
  }
}

const deleteUser = (state, action) => {
  const userIndex = state.usersList.findIndex(x => x.id === action.deletedUser.id);
  const newUsersList = [...state.usersList];
  newUsersList.splice(userIndex, 1);
  return {
    ...state.usersList,
    usersList: newUsersList,
  }
}

const setUser = (state, action) => {
  return {
    ...state,
    user: action.user
  }
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case ACTION_GET_ALL_USERS:
      return getAllUsers(state, action);
    case ACTION_ADD_NEW_USER:
      return addUser(state, action);
    case ACTION_EDIT_USER:
      return editUser(state, action);
    case ACTION_DELETE_USER:
      return deleteUser(state, action);
    case ACTION_SET_USER:
      return setUser(state, action);
    default:
      return state;
  }
}