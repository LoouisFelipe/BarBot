// Importa o SDK do Firebase Admin
const admin = require('firebase-admin');

// Inicializa o app Admin com as credenciais do seu projeto.
// IMPORTANTE: Para rodar este script localmente, você precisa ter o arquivo
// de credenciais da sua conta de serviço. Vá no Console do Firebase > 
// Configurações do Projeto > Contas de Serviço > Gerar nova chave privada.
// Salve o arquivo .json e aponte a variável de ambiente para ele:
// export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json"

const serviceAccount = require('./service-account-file.json'); // Adapte o caminho se necessário

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// --- DADOS A SEREM MODIFICADOS ---
const userEmail = "louisfelipecabral@gmail.com"; // <-- COLOQUE AQUI O E-MAIL DO USUÁRIO ADMIN
const userRole = "admin";                     // <-- COLOQUE AQUI O CARGO (role)
// ---------------------------------

async function setAdminRole() {
  try {
    // 1. Encontra o usuário pelo e-mail
    const user = await admin.auth().getUserByEmail(userEmail);

    // 2. Define o Custom Claim (o cargo) para o usuário
    await admin.auth().setCustomUserClaims(user.uid, { role: userRole });

    console.log(`Sucesso! O usuário ${userEmail} agora tem o cargo de ${userRole}.`);
    console.log(`UID do usuário: ${user.uid}`);
    console.log('Por favor, faça logout e login novamente na aplicação para que as alterações tenham efeito.');

  } catch (error) {
    console.error('Ocorreu um erro ao definir o cargo do usuário:', error.message);
    if (error.code === 'auth/user-not-found') {
      console.error(`O usuário com o e-mail "${userEmail}" não foi encontrado no Firebase Authentication.`);
    }
  }
}

setAdminRole();
