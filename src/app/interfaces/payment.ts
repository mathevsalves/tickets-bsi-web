export interface Payment {
    id?: number | null,
    name: string,
    number: string,
    validated: string,
    cvv: string,
    cpf: string,
    email: string;
}
