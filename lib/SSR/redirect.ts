export const redirectError = (error : Error | string | unknown) => {
    let errorMessage = "Error";
    console.log(error);
    if (typeof error === "string") {
      errorMessage = error;
    }
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      redirect: {
        destination: `/error?error=${errorMessage}`,
        permanent: false,
      },
    };
}