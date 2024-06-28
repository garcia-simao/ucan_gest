const nome = document.getElementById('nome');
const bilhete = document.getElementById('bilhete');
const funcao = document.getElementById('funcao');
const tempoVida = document.getElementById('tempo-vida');
const estado = document.getElementById('estado');
const email = document.getElementById('email');

const camposComMaxLength = [nome, bilhete, funcao, email, tempoVida, estado];
const camposComLetras = [nome, funcao, estado];
const camposComNumerosELetras = [bilhete, tempoVida];

camposComMaxLength.forEach(campo => {
  if (campo) {
    campo.addEventListener('input', function () {
      campo.value = campo.value.slice(0, campo.maxlength);
      campo.value = campo.value.replace(/\s{2,}/g, ' '); 
      campo.value = campo.value.replace(/^\s+/g, ''); 
    });
  }
});

camposComLetras.forEach(campo => {
  if (campo) {
    campo.addEventListener('input', function () {
      campo.value = campo.value.replace(/[^a-zA-Z\s]/g, '');
      campo.value = campo.value.replace(/\s{2,}/g, ' '); 
      campo.value = campo.value.replace(/^\s+/g, ''); 
    });
  }
});

if (email) {
  email.addEventListener('input', function () {
    email.value = email.value.replace(/[^a-zA-Z0-9@.]/g, '');
    email.value = email.value.replace(/\s{2,}/g, ' '); 
    email.value = email.value.replace(/^\s+/g, ''); 
  });
}

camposComNumerosELetras.forEach(campo => {
  if (campo) {
    campo.addEventListener('input', function () {
      campo.value = campo.value.replace(/[^a-zA-Z0-9\s]/g, '');
      campo.value = campo.value.replace(/\s{2,}/g, ' '); 
      campo.value = campo.value.replace(/^\s+/g, ''); 
    });
  }
});