const createClassObject = function (classObj) {
  const {
    SubTitulo: caption,
    CodPesoa: teacherId,
    NomePessoa: teacherName,
    CodTurma: id,
    UltimoSemestreOferecimento: lastOffered,
    CargaHorSemTeorica: weeklyLoad,
    TipoAtividadeDocente: teachingRole
  } = classObj;
  return {
    caption: caption,
    teacherId: teacherId,
    teacherName: teacherName,
    id: id,
    lastOffered: lastOffered,
    weeklyLoad: weeklyLoad,
    teachingRole: teachingRole
  };
};

export const createSubjectObject = function (item) {
  return {
    acronym: item.Sigla,
    name: item.NomeDisciplina,
    credits: item.NrCreditos,
    summary: item.Sumula,
    objective: item.Objetivo,
    modality: item.DenominacaoModalidadeEnsino,
    level: item.NomeNivelCursoPG,
    levelAcronym: item.SiglaNivelCursoPG,
    programId: item.IdentificadorPrograma,
    program: item.item,
    classes: [...item.Professores].map(createClassObject),
    selected: false
  };
};
