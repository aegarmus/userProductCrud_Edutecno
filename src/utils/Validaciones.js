import { ValidationError } from "../error/typesError.js";

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
      throw new ValidationError(`${fieldName} debe contener solo letras`, `Error al validar el regex ${nameRegex}`);
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
      throw new ValidationError(`${fieldName} contiene valores invalidos`, `Error al validar el regex ${productText}`);
    return productText;
  }

  static email(email) {
    const emailRegex =
      /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    if (!emailRegex.test(email))
      throw new ValidationError(
        `Correo electronico no válido`,`Error al validar el regex ${emailRegex}`
      );
    return email;
  }

  static rol(rol, validRoles) {
    if (!validRoles.includes(rol)) throw new ValidationError(`Rol no válido`, `Rol debe ser alguno de los siguientes ${validRoles}`);
    return rol;
  }

  static amount(value, fieldName) {
    if (typeof value !== "number" || value < 0)
      throw new ValidationError(`${fieldName} debe ser un número mayor que 0`, 'Verifica que sea un dato numerico y mayor que 0');
    return value;
  }

  static emailContent(subject, message, recipients) {
    if (!subject || !message || !recipients) throw new ValidationError('Todos los campos del email deben ser cubiertos')
    return { subject, message, to: recipients}
  }
}