"use client";

import { Session, sessionService } from "@/services/token.service";

interface UseSessionOutput {
  session: Session;
  isAdmin: boolean;
}

/**
 * TODO: Implementar contexto
 */
function useSession(): UseSessionOutput {
  const session = sessionService.findPayload();

  if (!session) {
    throw { 
      type: 'NOT_AUTH',
      message: "Usuário não autenticado" 
    };
  }

  return {
    session,
    isAdmin: session.role === "ADMIN",
  };
}

export { useSession };
