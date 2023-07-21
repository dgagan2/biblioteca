const expresiones = {
  txtPassword: /^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ0-9!@#$%^&*?_~/]{6,12}$/,
  txtEmail: /^[a-zA-Z0-9_\-.~]{2,}@[a-zA-Z0-9_\-.~]{2,}\.[a-zA-Z]{2,4}$/
}
export const validarEmail = (data) => {
  if (!expresiones.txtEmail.test(data)) return false
  return true
}
export const validarPassword = (data) => {
  let error = false
  if (expresiones.txtPassword.test(data)) {
    error = true
  }
  return error
}
