import { PageRequest } from '../dto/request/page-request';
import { ResponseError } from '../handlers/response-error';
import { Validation } from '../validations';
import { PageValidation } from '../validations/page-validation';
import { Page } from 'objection';
import { PaymentModel } from '../models/payment-model';
import { EnumPaymnentStatus } from '../enums/status-paymnet-enum';
import {
  PaymentResponse,
  toPaymentResponse,
} from '../dto/response/payment-response';

export class PaymentService {
  static async getAll(req: PageRequest): Promise<Page<PaymentModel>> {
    const request = Validation.validate(PageValidation.PAGE, req);
    const payments = await PaymentModel.query()
      .page(request.page, request.size)
      .withGraphFetched('rental');
    if (payments.results.length === 0) {
      throw new ResponseError(404, 'Payments not found');
    }
    return payments;
  }

  static async getById(id: number): Promise<PaymentResponse> {
    const payment = await PaymentModel.query()
      .findById(id)
      .withGraphFetched('rental');
    if (!payment) {
      throw new ResponseError(404, 'Payment not found');
    }
    return toPaymentResponse(payment);
  }

  static async changeStatus(id: number): Promise<PaymentResponse> {
    const payment = await PaymentModel.query().findById(id);
    if (!payment) {
      throw new ResponseError(404, 'Car not found');
    }

    if (payment.status === EnumPaymnentStatus.PAID) {
      throw new ResponseError(400, 'Payment has been paid');
    }

    const updatePayment = await PaymentModel.query().updateAndFetchById(id, {
      status: EnumPaymnentStatus.PAID,
    });
    return toPaymentResponse(updatePayment);
  }
}
