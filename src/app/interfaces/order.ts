import { Payment } from "./payment";
import { Show } from "./show";

export interface Order {
    id?: number | null,
    quantity?: number | null,
    price?: number | null,
    product?: Show | null,
    total?: number | null,
    payment: Payment,
    paymentMoment?: Date | null;
}
