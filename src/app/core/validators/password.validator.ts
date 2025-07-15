import { Validators } from "@angular/forms";

export const passwordValidator = [
    Validators.required, Validators.minLength(6)
]