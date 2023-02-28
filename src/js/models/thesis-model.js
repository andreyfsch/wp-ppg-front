const createBoardExaminerItem = function (examinerObj) {
  const { NomeExaminador: examiner } = examinerObj;
  return examiner;
};

export const createThesisObject = function (item) {
  return {
    levelId: item.CodNivelCursoPG,
    level: item.NomeNivelCursoPG,
    defenderId: item.CodPessoa,
    defender: item.NomePessoa,
    advisorId: item.CodPessoaOrientador,
    advisor: item.NomeOrientador,
    serialNumStudent: item.NrSeqAlunoCursoPG,
    title: item.TituloTeseDissertacao,
    date: item.DataDefesa,
    concentrationArea: item.NomeAreaConcentracao,
    researchLine: item.LinhaPesquisa,
    examinationBoard: [...item.BancaExaminadora].map(
      createBoardExaminerItem
    ),
    selected: false
  };
};
