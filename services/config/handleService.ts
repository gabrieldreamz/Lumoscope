import { handleError } from "../../utils/handleError";

interface HandleServiceProps<T> {
  mutation: { unwrap(): Promise<T> };
  onSuccess?: (data: T) => void;
  onError?: (error: T) => void;
}

export async function handleMutationService<T>({
  mutation,
  onError,
  onSuccess,
}: HandleServiceProps<T>) {
  return mutation
    .unwrap()
    .then((data) => {
      onSuccess?.(data);
    })
    .catch((error) => {
      console.log("🚀 ~ file: handleService.ts:20 ~ error:", error);
      if (onError) {
        onError(error);
      } else {
        handleError({ error });
      }
    });
}
