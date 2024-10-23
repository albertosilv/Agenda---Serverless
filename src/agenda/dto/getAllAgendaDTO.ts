interface IMedicoComHorarios {
  id: number;
  nome: string;
  especialidade: string;
  horarios_disponiveis: string[];
}

export interface getAllAgendaDTO {
  medicos: Array<IMedicoComHorarios>;
}
