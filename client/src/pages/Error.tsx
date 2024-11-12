import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  // Type guard to check if error has a message property
  const isErrorWithMessage = error instanceof Error && 'message' in error;

  return (
    <div>
      {isErrorWithMessage ? (
        <h1 title={(error as Error).message}>{(error as Error).message}</h1>
      ) : (
        <h1>An unexpected error occurred.</h1>
      )}
    </div>
  );
};

export default ErrorPage;
