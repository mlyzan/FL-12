import { TestBed } from '@angular/core/testing';

import { CreditCardService } from './credit-card.service';

describe('CreditCardService', () => {
  let service: CreditCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardService);
  });

  it('should create CreditCardService', async () => {
    expect(service).toBeTruthy();
  });

  it('should return "Credit card has a valid format" message', () => {
    expect(service.testCreditCard('4111 1111 1111 1111', 'Visa'))
      .toEqual(
        {isValid: true, message: 'Credit card has a valid format'}
      )
  });

  it('should return "Credit card has a valid format" message for VALID_CARD', () => {
    expect(service.testCreditCard('4111111111111111', 'Visa'))
      .toEqual(
        {isValid: true, message: 'Credit card has a valid format'}
      )
  });

  it('should return "Credit card number is invalid" message', () => {
    expect(service.testCreditCard('411177777777777', 'Visa'))
      .toEqual(
        {isValid: false, message: "Credit card number is invalid"}
      )
  });

  it('should return "Credit card number is in invalid format" message for INVALID_NUMBER_FORMAT', () => {
    expect(service.testCreditCard('4111 1111 1111', 'Visa'))
      .toEqual(
        {isValid: false, message: "Credit card number is in invalid format"}
      )
  });

  it('should return "Unknown card type" message for UNKNOWN_TYPE', () => {
    expect(service.testCreditCard("7777777777777", "Other"))
      .toEqual(
        {isValid: false, message: "Unknown card type"}
      )
  });

  it('should return "Credit card number has an inappropriate number of digits" message', () => {
    expect(service.testCreditCard('5500 0000 00 0004', 'MasterCard'))
      .toEqual(
        { isValid: false, message: 'Credit card number has an inappropriate number of digits' }
      )
  });

  it('should return "Warning! This credit card number is associated with a scam attempt" for SPAM_NUMBER', () => {
    expect(service.testCreditCard('5490997771092064', 'MasterCard'))
      .toEqual(
        { isValid: false, message: 'Warning! This credit card number is associated with a scam attempt' }
        )
  });

  it('should return "Credit card number has an inappropriate number of digits" message for INVALID_LENGTH', () => {
    expect(service.testCreditCard("5500 0000 00 0004", "MasterCard"))
      .toEqual(
        {isValid: false, message: "Credit card number has an inappropriate number of digits"}
      )
  });

});
