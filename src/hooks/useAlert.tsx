import Swal from "sweetalert2";

export default function useAlert() {
  const handleOnFail = (message: string) => {
    Swal.fire({
      title: message,
      icon: "error",
      confirmButtonText: "Accept",
    });
  };

  const handleOnSuccess = (message: string) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: "Accept",
    });
  };

  return {
    handleOnSuccess,
    handleOnFail,
  };
}
