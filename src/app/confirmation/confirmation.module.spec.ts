import { ConfirmationModule } from './confirmation.module';

describe('ConfirmationModule', () => {
  let confirmationModule: ConfirmationModule;

  beforeEach(() => {
    confirmationModule = new ConfirmationModule();
  });

  it('should create an instance', () => {
    expect(confirmationModule).toBeTruthy();
  });
});
