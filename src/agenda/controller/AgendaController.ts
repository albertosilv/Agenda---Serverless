import { APIGatewayEvent, Context } from "aws-lambda";
import { AgendamentoService } from "../../agendamento/service/AgendamentoService";
import { IAgendamentoService } from "../../agendamento/service/IAgendamentoService";
import medicos from "../../agendamento/mock/medicoMock";
import { getAllAgendaDTO } from "../dto/getAllAgendaDTO";
import { transformarDados } from "../util";

export class AgendaController {
  private agendaService: IAgendamentoService;

  constructor() {
    this.agendaService = new AgendamentoService();
  }

  public async getAgenda(event: APIGatewayEvent, context: Context) {
    const agenda = this.agendaService.getAgendamentos();
    const agendaTransform: getAllAgendaDTO = transformarDados(medicos, agenda);
    return {
      statusCode: 200,
      body: JSON.stringify(agendaTransform),
    };
  }
}
