import { Validators } from "@angular/forms";


export const emailValidator = [
    Validators.required,
    Validators.email,
    Validators.minLength(2),
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
]