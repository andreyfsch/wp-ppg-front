export default {
  createAddressObject: function (item) {
    return {
      street: item.Logradouro,
      streetNum: item.NrLogradouro,
      streetComplement: item.ComplementoLogradouro,
      zipCode: item.CEP,
      city: item.Cidade,
      state: item.UF
    };
  }
};
