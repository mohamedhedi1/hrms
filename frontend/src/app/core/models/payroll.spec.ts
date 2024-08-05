import { Payroll } from './payroll';

describe('Payroll', () => {
  it('should create an instance', () => {
    const payroll = new Payroll();
    expect(payroll).toBeTruthy();
  });
});
