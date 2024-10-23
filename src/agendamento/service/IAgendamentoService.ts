import { IAgendamento } from "../interface/IAgendamento";
export interface IAgendaService {
  createAgendamento(agendamentoData: any): any;
  getAgendamentos(): IAgendamento[];
}
