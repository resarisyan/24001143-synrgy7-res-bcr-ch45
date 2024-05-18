import { EnumPaymnentStatus } from '../../enums/status-paymnet-enum';
import { PaymentModel } from '../../models/payment-model';
import { RentalModel } from '../../models/rentals-model';

export type PaymentResponse = {
  id: number;
  rental: RentalModel;
  amount: number;
  status: EnumPaymnentStatus;
};

export function toPaymentResponse(payment: PaymentModel): PaymentResponse {
  return {
    id: payment.id,
    rental: payment.rental,
    amount: payment.amount,
    status: payment.status,
  };
}
