const createAccreditationObject = function (item) {
  return {
    start: item.DataInicioCredenciamento,
    end: item.DataFimCredenciamento,
    scope: item.VinculoCredenciamento,
    bond: item.VinculoCredenciamento
  };
};

export const createProfessorObject = function (item) {
  return {
    name: item.NomePessoa,
    email: item.EMail,
    degree: item.Grau,
    programId: item.IdentificadorPrograma,
    program: item.NomeOrgao,
    cnpqId: item.IdCNPQ,
    lattesUrl: item.CurriculoLattes,
    accreditation: createAccreditationObject(item),
    selected: false
  };
};
