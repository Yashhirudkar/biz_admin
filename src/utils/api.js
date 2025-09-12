// API utility with automatic logout on 401
export const apiFetch = async (url, options = {}, dispatch) => {
  const response = await fetch(url, options);

  if (response.status === 401) {
    // Session expired, logout user
    if (dispatch) {
      dispatch({ type: 'login/logout' });
    }
    // Optionally, redirect to login can be handled in the component
  }

  return response;
};
