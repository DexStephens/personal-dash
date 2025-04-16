import { FallbackRenderProps } from "../types/types";

export function FallbackRender({
  error,
  resetErrorBoundary,
}: FallbackRenderProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
