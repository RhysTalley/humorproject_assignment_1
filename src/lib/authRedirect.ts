const POST_AUTH_REDIRECT_KEY = "post_auth_redirect";

export const storePostAuthRedirect = (path: string) => {
  try {
    window.sessionStorage.setItem(POST_AUTH_REDIRECT_KEY, path);
  } catch {
    // Ignore storage failures.
  }
};

export const loadPostAuthRedirect = () => {
  try {
    const path = window.sessionStorage.getItem(POST_AUTH_REDIRECT_KEY);
    if (!path || !path.startsWith("/")) {
      return "/";
    }
    return path;
  } catch {
    return "/";
  }
};

export const clearPostAuthRedirect = () => {
  try {
    window.sessionStorage.removeItem(POST_AUTH_REDIRECT_KEY);
  } catch {
    // Ignore storage failures.
  }
};
