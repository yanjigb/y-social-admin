export const UpdateUser = async (value: any) => async (dispatch: any) => {
  // dispatch(updateUserStart(updatedUser));

  // try {
  //   const res = await userService.updateUser(updatedUser);
  //   dispatch(updateUserSuccess(res.data));
  //   return res.data;
  // } catch (error) {
  //   dispatch(updateUserFailed());
  // }

  // const res = await user

  dispatch({
    type: "UpdateUser",
    payload: value
  })
};

export const ThemeChanger = (value: any) => async (dispatch: any) => {
  dispatch({
    type: "ThemeChanger",
    payload: value
  });
};