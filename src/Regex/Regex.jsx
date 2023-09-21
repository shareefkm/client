export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;
export const NAME_REGEX = /^[A-Za-z]{4,20}$/;
export const PHONE_REGEX = /^[0-9]{10}$/;
export const POSTAL_CODE_REGEX = /^\d{6}$/;
export const IMAGE_REGEX = /\.(jpg|jpeg|png|gif)$/i;
export const PRICE_REGEX = /^(?!-)[1-9]\d*(\.\d+)?|0\.[1-9]\d*$/;