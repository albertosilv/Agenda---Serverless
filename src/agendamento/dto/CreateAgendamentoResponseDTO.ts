export interface AgendamentoDetails {
  medico: string;
  paciente: string;
  data_horario: string;
}
export interface CreateAgendamentoResponseDTO {
  mensagem: string;
  agendamento: AgendamentoDetails;
}
