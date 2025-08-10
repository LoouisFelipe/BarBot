import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Import and re-export the Genkit flow
import "./genkit.conf";
export * from "./jokeFlow";

admin.initializeApp();

export const createUserWithRole = functions.https.onCall(async (data, context) => {
  // 1. Validação de segurança: Apenas admins podem chamar esta função.
  if (context.auth.token.role !== 'admin') {
    throw new functions.https.HttpsError(
      'permission-denied', 
      'Apenas administradores podem criar novos usuários.'
    );
  }

  // 2. Validação dos dados recebidos.
  const { email, password, role } = data;
  if (!email || !password || !role) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Por favor, forneça email, senha e um perfil válido.'
    );
  }

  try {
    // 3. Criar o usuário no Firebase Authentication.
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    // 4. Atribuir o perfil (role) usando Custom Claims.
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: role });

    return { 
      result: `Usuário ${email} criado com sucesso com o perfil de ${role}.` 
    };

  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw new functions.https.HttpsError(
      'internal', 
      'Ocorreu um erro interno ao criar o usuário.',
      (error as Error).message
    );
  }
});
