export const RESPONSE_CONSTANTS = {
  'INVALID_FIELD': () => [`Invalid value for field`, 400],
  'UNAUTHORIZED': () => ['Unauthorized access', 401],
  'INCORRECT_PASSWORD': () => ['Incorrect password or email', 401],
  'INTERNAL_SERVER_ERROR': () => ['Internal Server Error', 500],
  'VALIDATION_ERROR': ()=>['Invalid', 400],
  'FORBIDDEN': ()=>['Forbidden Access', 403],
  'NOT_FOUND': ()=>['Not Found', 404],
  'USER_NOT_FOUND': ()=>['User not found or Does not exists', 404],
  'REQUIRED_FIELD': ()=> ['Fields are missing', 400],
  'ALREADY_EXISTS': ()=>['Resource Already Exists', 400],
  'INCORRECT_PASSWORD_LENGTH': ()=>['Password length must be 8 characters or more', 400]
}