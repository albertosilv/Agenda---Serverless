import { IMedico } from "../../agendamento/mock/medicoMock";
import { IAgendamento } from "../../agendamento/interface/IAgendamento";
import { getAllAgendaDTO } from "../dto/getAllAgendaDTO";
export function transformarDados(
  medicos: IMedico[],
  agendamentos: IAgendamento[]
): getAllAgendaDTO {
  return medicos
    .map((medico) => {
      const horarios = agendamentos
        .filter((agendamento) => agendamento.medico_id === medico.id)
        .map((agendamento) => agendamento.data_horario);

      return {
        id: medico.id,
        nome: medico.nome,
        especialidade: medico.cargo,
        horarios_disponiveis: horarios,
      };
    })
    .filter((medico) => medico.horarios_disponiveis.length > 0);
}
