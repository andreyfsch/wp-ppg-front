export const createResearchObject = function (item) {
  return {
    concentrationArea: item.NomeAreaConcentracao,
    researchLine: item.NomeLinhaConsulta,
    description: item.Descricao,
    researcher: item.NomePesquisador,
    situation: item.Situacao,
    selected: false
  };
};
