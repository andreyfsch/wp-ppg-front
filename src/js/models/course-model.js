import createAddressObject from './address-model.js';

export const createCourseObject = function (item) {
  return {
    id: item.IdCurso,
    name: item.NomeCurso,
    unit: item.Unidade,
    program: item.Programa,
    phone: item.Telefone,
    email: item.EMail,
    url: item.URLWeb,
    knowledgeAreaId: item.CodAreaConhecimento,
    knowledgeArea: item.NomeAreaConhecimento,
    modality: item.ModalidadeEnsino,
    capesGrade: item.ConceitoCAPES,
    evaluationPeriod: item.PeriodoAvaliacao,
    address: createAddressObject(item),
    selected: false
  };
};
