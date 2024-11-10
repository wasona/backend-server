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
  UserAlreadyExists,
  SendingEmailFailed,
  UserTokenNotFound,
  UserTokenExpired,
  UserTokenAlreadyUsed,
  CountryCodeValidationFailed,
  AuthenticationRequired,
  CourseNotFound,
}
