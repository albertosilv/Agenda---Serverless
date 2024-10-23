import { IAgendamento } from "../interface/IAgendamento";
export interface IAgendaentoService {
  createAgendamento(agendamentoData: IAgendamento): any;
  getAgendamentos(): IAgendamento[];
}
