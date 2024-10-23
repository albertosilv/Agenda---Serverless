import { IAgendamento } from "../interface/IAgendamento";
export interface IAgendamentoService {
  createAgendamento(agendamentoData: IAgendamento): any;
  getAgendamentos(): IAgendamento[];
}
