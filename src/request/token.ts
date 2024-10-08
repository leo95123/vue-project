// import { getEnvConfig, prodEnv } from '../constants/AppEnv'

export const parseAccountTokenOfUrl = () => {
  try {
    const urlScheme = new URL(location.href);
    const searchScheme = new URLSearchParams(urlScheme.search);
    localStorage.setItem("token", searchScheme.get("token") || "");
    return searchScheme.get("token");
  } catch (error) {
    console.error("[解析token失败]", error);
  }
};

// export const getAccountToken = () => {
//   return prodEnv ? localStorage.getItem('token') : getEnvConfig().token
// }
