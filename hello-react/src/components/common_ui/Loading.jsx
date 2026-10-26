/** @format */

export default function Loading({ isLoading, loadingMessage, children }) {
  if (isLoading) {
    return <>{loadingMessage}</>;
  }

  return <>{children}</>;
}
