export class Validate {
    static userName(userName, fieldName, regex) {
        const nameRegex = /^[a-zA-ZáéíóúÁÉÓÍÚñÑüÜ\s]+$/;
        if (!regex.test(userName)) throw new Error(`${fieldName} debe contener solo letras`)
        return (userName)
    }

    static email(email) {
        const emailRegex = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
        if(!emailRegex.test(email)) throw new Error(`Correo electronico no válido`)
        return
    }

    static rol(rol, validRoles) {
        if(!validRoles.includes(rol)) throw new Error(`Rol no válido`)
        return rol
    }
}