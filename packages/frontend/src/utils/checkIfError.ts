export function isError<T>(response: T | { error: string }): response is { error: string } {
  return (response as { error: string }).error !== undefined;
}

export function checkIfError<T>(response: T | { error: string }): T | undefined {
  if (isError(response)) {
    // eslint-disable-next-line no-console
    console.error(response.error);
    return undefined;
  }

  return response;
}
