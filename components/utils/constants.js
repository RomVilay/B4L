import { REACT_APP_URL_PROD,REACT_APP_URL_DEV, REACT_APP_URL_LOCAL } from '@env';

export const regexEmail = /^([\w-.]+)@(?:[\w-.]+)([a-zA-Z]{2,4})$/;
export const regexUsername = /^[\w-.@]{5,30}$/;
export const regexPassword = /^[\w\-éèàùç@.,:!%&#]{3,30}$/;
export const regexPrenom = /^[a-zA-Z\-éèêëàâäùûüìïØøƟɵòôöçñ ']{1,50}$/;
export const regexNom = /^[a-zA-Z\-éèêëàâäùûüìïØøƟɵòôöçñ ']{2,50}$/;
export const regexDateNaissance = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
export const regexTaille = /^([0-9]{1,4})$/;
export const regexPoids = /^([0-9]{1,3})(\,[0-9]{1,2}){0,1}$/;

export const URL =  process.env["API_KEY"] == "prod" ? REACT_APP_URL_PROD : process.env["API_KEY"] == "dev" ? REACT_APP_URL_DEV :  REACT_APP_URL_LOCAL ;
//export const URL = 'http://176.141.253.12'; url tablette url backend = 'http://195.154.107.195';
//export const PORT = ':3000';
export const PORT = ':5000';
export const BASE_URL = URL ;
export const TIMEOUTDELAY_DEFAULT = 10000;
export const TIMEOUTDELAY_LOGIN = 10000;
export const TIMEOUTDELAY_USER = 10000;
