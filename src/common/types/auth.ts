export type { SignInNoRedirect };

type SignInNoRedirect = {
  /**
   * Will be different error codes,
   * depending on the type of error.
   */
  error: string | undefined;
  /**
   * HTTP status code,
   * hints the kind of error that happened.
   */
  status: number;
  /**
   * `true` if the signin was successful
   */
  ok: boolean;
  /**
   * `null` if there was an error,
   * otherwise the url the user
   * should have been redirected to.
   */
  url: string | null;
};
