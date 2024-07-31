import { Alert } from "react-native";

interface Errors {
  data: Record<string, string>;
  error: string;
  success: false;
}

export interface ErrorResponse {
  success: boolean;
  errors?: Record<string, string[]> | Record<string, string> | Errors;
  error?: string;
  detail?: string;
}

interface ErrorHandlingParams {
  error: { data: ErrorResponse; status: string };
  tryAgain?: boolean;
  onTryAgainPress?: () => void;
  onDismiss?: () => void;
  tryAgainText?: string;
  errorTitle?: string;
}

export function handleError({
  error,
  errorTitle,
  onDismiss,
  onTryAgainPress,
  tryAgain,
  tryAgainText,
}: ErrorHandlingParams): void {
  let errorMessage = "We encountered an error while processing your request.";
  const title = errorTitle;

  try {
    const { data } = error;
    console.log(error.data.errors);

    if (data.errors) {
      const errorKeys = Object.keys(data?.errors || {});

      switch (typeof data.errors) {
        case "string":
          errorMessage = data.errors;
          break;
        case "object":
          if (Array.isArray(data.errors)) {
            console.log("Error is an array");
            if (data.errors.length > 0) {
              errorMessage = data.errors[0];
            }
          } else if ("data" in data.errors) {
            errorMessage = Array.isArray(data.errors.error)
              ? data.errors.error?.[0] || ""
              : data.errors.error;
          } else {
            const firstErrorKey = errorKeys[0];
            let firstErrorValue = "";

            if (Array.isArray(data.errors?.[firstErrorKey || ""])) {
              console.log("Error is an array", errorKeys[0]);
              firstErrorValue =
                (data.errors as Record<string, string>)?.[
                  firstErrorKey || ""
                ]?.[0] || "";
            } else {
              console.log("Error is NOT an array", errorKeys[0]);
              firstErrorValue =
                (data.errors as Record<string, string>)?.[errorKeys[0] || ""] ||
                "";
            }

            errorMessage = firstErrorValue || "";
          }
          break;
      }
    } else if (data.detail) {
      errorMessage = data.detail;
    } else if (data.error) {
      errorMessage = data.error;
    }
  } catch (err) {
    console.warn("Unhandled Exception", err);
  }

  if (tryAgain) {
    Alert.alert(
      title ?? "",
      errorMessage.slice(0, 250),
      [
        {
          onPress: onDismiss,
          text: "Dismiss",
        },
        {
          onPress: onTryAgainPress,
          text: tryAgainText ?? "Try again",
        },
      ],
      { cancelable: false }
    );
  } else {
    Alert.alert(title ?? "", errorMessage.slice(0, 250), [
      {
        onPress: onDismiss,
        text: "Dismiss",
      },
    ]);
  }
}
