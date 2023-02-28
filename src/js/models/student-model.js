export const createStudentObject = function (item) {
  return {
    program: item.NomeCurso,
    level: item.NomeNivelCursoPG,
    id: item.CodPessoa,
    name: item.NomePessoa,
    entry: item.DataIngresso,
    cnpqId: item.IdCNPQ,
    selected: false
  };
};
