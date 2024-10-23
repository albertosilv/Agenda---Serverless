import { IAgendaentoService } from "./IAgendamentoService";
import { IAgendamento } from "../interface/IAgendamento";
export class AgendamentoService implements IAgendaentoService {
  private agendamentos: IAgendamento[] = [];

  public createAgendamento(agendamentoData: IAgendamento) {
    this.agendamentos.push(agendamentoData);
    return agendamentoData;
  }

  public getAgendamentos() {
    return this.agendamentos;
  }
}
