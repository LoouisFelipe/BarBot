'use client';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebase'; // Supondo que 'functions' seja exportado do seu setup do firebase

export function useFunctions() {
  const callFunction = async (functionName: string, data: unknown) => {
    try {
      const func = httpsCallable(functions, functionName);
      const response = await func(data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error(`Erro ao chamar a função '${functionName}':`, error);
      return { success: false, error: error.message };
    }
  };

  return { callFunction };
}
