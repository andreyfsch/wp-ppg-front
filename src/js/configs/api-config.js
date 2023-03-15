import { LOCAL } from './env-config.js';

let apiUrl;
let codOrgao;

if (LOCAL) {
  apiUrl =
    'https://desenvolvimento.dsi/HomeSVN/andrey/dsi-ens-api/api/web/v2/pos-graduacao';
  apiUrl = 'https://api.dev.ufrgs.br/v2/pos-graduacao';
  codOrgao = 420;
} else {
  apiUrl = 'https://api.ufrgs.br/v2/pos-graduacao';
  codOrgao = undefined;
}

export const API_URL = apiUrl;
export const API_OPTIONS = {
  RESEARCHES: '/pesquisa',
  SUBJECTS: '/disciplinas',
  THESES: '/teses',
  PROFESSORS: '/docentes',
  STUDENTS: '/discentes',
  COURSES: '/cursos',
  PROGRAMS: '/programas'
};
export const API_PROGRAM_PARAM = '/programa/';
export const API_PAGE_PARAM = '&page=';
export const API_PER_PAGE_PARAM = '?per-page=';

export const TIMEOUT_SEC = 60;
export const ITEMS_PER_PAGE = 20;

export const DEFAULT_PAGE = 1;
export const DEFAULT_COD_ORGAO = codOrgao;
