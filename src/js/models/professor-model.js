const createAccreditationObject = function (item) {
  return {
    start: item.DataInicioCredenciamento,
    end: item.DataFimCredenciamento,
    scope: item.EscopoCredenciamento,
    bond: item.VinculoCredenciamento,
    bondId: item.CodTipoVinculoCredenciamento
  };
};

export const createProfessorObject = function (item) {
  return {
    name: item.NomePessoa,
    degree: item.Grau,
    programId: item.IdentificadorPrograma,
    program: item.NomeOrgao,
    cnpqId: item.IdCNPQ,
    lattesUrl: item.CurriculoLattes,
    accreditation: createAccreditationObject(item),
    selected: false
  };
};
