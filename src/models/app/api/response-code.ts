export enum ApiResponseCode {
  Success,
  UserNotVerified,
  UserEmailNotFound,
  UserOutOfLoginAttempts,
  PasswordDoesNotMatch,
  EmailValidationFailed,
  SchemaValidationFailed,
  PhoneValidationFailed,
  InternalServerError,
}
