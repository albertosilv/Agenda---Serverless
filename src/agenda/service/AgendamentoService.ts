import { IAgendamentoService } from "./IAgendamentoService";
import { IAgendamento } from "../interface/IAgendamento";
import { agendamentos } from "../mock/agendamentoMock";
export class AgendamentoService implements IAgendamentoService {
  private agendamentos: IAgendamento[] = agendamentos;

  public createAgendamento(agendamentoData: IAgendamento) {
    this.agendamentos.push(agendamentoData);
    return agendamentoData;
  }

  public getAgendamentos() {
    return this.agendamentos;
  }
}
