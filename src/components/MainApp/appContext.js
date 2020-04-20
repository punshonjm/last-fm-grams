import React from 'react';
import { getUserInfo } from '../../api';

/**
 * @typedef {Object} LastFMUser
 * @property {String} name
 * @property {String} playcount
 * @property {String} country
 * @property {String} url
 */

/**
 * @typedef {Object} AppContextValue
 * @property {LastFMUser} user
 * @property {function(LastFMUser): void} setUser
 */

export const AppContext = React.createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(undefined);

  /** @type {AppContextValue} */
  const context = {
    user,
    setUser: (u) => {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(u);
    },
  };

  const updateUserData = async () => {
    if (!user) return;
    const {
      data: { user: foundUser },
    } = await getUserInfo(user.name);

    const {
      playcount, name, url, country,
    } = foundUser;

    setUser({
      playcount, name, url, country,
    });
  };

  React.useEffect(() => {
    if (user === undefined) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          updateUserData();
          return;
        } catch (error) {
          setUser(undefined);
          return;
        }
      }
    } else {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
};

/** @returns {AppContextValue} */
export const useAppContext = () => React.useContext(AppContext);
