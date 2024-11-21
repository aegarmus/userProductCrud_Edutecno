import AppError from "./AppError.js";


export class ValidationError extends AppError {
  /**
   * ValidationError se encarga de crear una instancia de Error para las validaciones devolviendo siempre un codigo de estado 400
   * @param {string} message - Mensaje que se desea enviar en el error
   * @param {object} [details] - detalles sobre el error que acaba de ocurrir
   */
  constructor(message, details) {
    super(message || "Error de Validación", 400, details);
  }
}

export class NotFoundError extends AppError {
    constructor(message, details, entity) {
        super(message || `${entity} No encontrado`, 404, details)
    }
}

export class YeisonError extends AppError {
    constructor(message, details) {
        super(message || 'Error en el JSON de datos', 500, details)
    }
}

export class InternalServerError extends AppError {
    constructor(message, details) {
        super(message || 'Error interno del Servidor', 500, details)
    }
}

