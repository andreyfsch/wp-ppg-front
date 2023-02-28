import createAddressObject from './address-model.js';

export const createProgramObject = function (item) {
  return {
    id: item.IdPrograma,
    name: item.NomeOrgao,
    acronym: item.SiglaOrgao,
    startDate: item.DataInicio,
    knowledgeArea: item.NomeAreaConhecimento,
    capesId: item.CodCAPES,
    homepage: item.HomePage,
    lumeId: item.IdLUME,
    phone: item.Telefone,
    email: item.EMail,
    url: item.URLWeb,
    address: createAddressObject(item),
    selected: false
  };
};
