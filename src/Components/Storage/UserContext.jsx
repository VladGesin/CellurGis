import React, { useState } from 'react';

function UserContext() {
  const [userState, setUserState] = useState({
    userName: '',
    userID: '',
    email: '',
    token: null,
    isAuth: false,
    loading: true,
  });

  return <div></div>;
}

export default UserContext;
