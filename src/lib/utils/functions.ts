export const handleServerError = (error: unknown) => {
    const customError = error as { response?: { data: { message: string } } };
    let alertMessage
    if (customError.response) {
        alertMessage = customError.response.data.message
    } else {
        alertMessage = "Le serveur ne répond pas"
    }
    return alertMessage
  };