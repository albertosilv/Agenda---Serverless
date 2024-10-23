import { IAgendamento } from "../interface/IAgendamento";
export interface IAgendaentoService {
  createAgendamento(agendamentoData: any): any;
  getAgendamentos(): IAgendamento[];
}
