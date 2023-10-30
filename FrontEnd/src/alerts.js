import Swal from "sweetalert2";
import "./styles/swal.css";

const defaultProp = {
  showConfirmButton: false,
  color: "#0C1618",
  background: "#FAF8FF",
};

export const alertError = (title, msg) => {
  Swal.fire({
    ...defaultProp,
    icon: "error",
    title: title,
    text: msg,
  });
};

export const alertSuccess = (title) => {
  Swal.fire({
    ...defaultProp,
    timer: 2500,
    icon: "success",
    title: title,
  });
};

export const alertConfirm = (title, funcIfTrue) => {
  Swal.fire({
    ...defaultProp,
    icon: "question",
    title: title,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      funcIfTrue();
    }
  });
};
