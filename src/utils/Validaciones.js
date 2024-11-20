export class Validate {
    //JSDocs
  /**
   * Valida un campo de texto para confirmar que este escrito en español sin contener números
   * @param {string} userName - El dato a validar
   * @param {string} fieldName - El nombre del campo que se esta validando
   * @return {string} - el texto validado que se retorna
   */

  static userName(userName, fieldName) {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÓÍÚñÑüÜ\s]+$/;
    if (!nameRegex.test(userName))
      throw new Error(`${fieldName} debe contener solo letras`);
    return userName;
  }

  /**
   * Valida un texto de producto que permite letras letras, número con hasta 255 carácteres
   * @param {string} text - Texto a validar
   * @param {string} fieldName - Nombre del campo que estamos validando
   * @returns {string} - dato que retorna la validación
   */

  static productText(text, fieldName) {
    const productText = /^[a-zA-Z0-9]{2,255}$/;
    if (!productText.test(text))
      throw new Error(`${fieldName} contiene valores invalidos`);
    return productText;
  }

  static email(email) {
    const emailRegex =
      /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    if (!emailRegex.test(email))
      throw new Error(`Correo electronico no válido`);
    return email;
  }

  static rol(rol, validRoles) {
    if (!validRoles.includes(rol)) throw new Error(`Rol no válido`);
    return rol;
  }

  static amount(value, fieldName) {
    if (typeof value !== "number" || value < 0)
      throw new Error(`${fieldName} debe ser un número mayor que 0`);
    return value;
  }
}