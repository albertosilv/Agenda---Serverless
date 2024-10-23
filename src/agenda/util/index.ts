import { IAgendamento } from "../../agendamento/interface/IAgendamento";
import { IMedico } from "../../agendamento/mock/medicoMock";
import { getAllAgendaDTO, IMedicoComHorarios } from "../dto/getAllAgendaDTO";

export function transformarDados(
  medicos: IMedico[],
  agendamentos: IAgendamento[]
): getAllAgendaDTO {
  const agenda: IMedicoComHorarios[] = medicos
    .map((medico) => {
      const horarios = agendamentos
        .filter((agendamento) => agendamento.medico_id === medico.id)
        .map((agendamento) => agendamento.data_horario);

      // Retornar objeto do médico com horários disponíveis
      return {
        id: medico.id,
        nome: medico.nome,
        especialidade: medico.cargo, // Supondo que `cargo` seja a especialidade
        horarios_disponiveis: horarios,
      };
    })
    .filter((medico) => medico.horarios_disponiveis.length > 0); // Filtra médicos sem horários

  return { medicos: agenda }; // Retorna a estrutura correta
}
