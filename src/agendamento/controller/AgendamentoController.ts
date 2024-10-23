// agendamento/controller/AgendamentoController.ts
import { APIGatewayEvent, Context } from "aws-lambda";
import { CreateAgendamentoDTO } from "../dto/CreateAgendamentoRequestDTO";
import { CreateAgendamentoResponseDTO } from "../dto/CreateAgendamentoResponseDTO";
import { IAgendaentoService } from "../service/IAgendamentoService";
import { AgendamentoService } from "../service/AgendamentoService";
export class AgendamentoController {
  private agendaService: IAgendaentoService;

  constructor() {
    this.agendaService = new AgendamentoService(); // Instância do serviço
  }

  public async createAgendamento(event: APIGatewayEvent, context: Context) {
    const agendamentoData: CreateAgendamentoDTO = JSON.parse(event.body!);

    const newAgendamento =
      this.agendaService.createAgendamento(agendamentoData);

    const response: CreateAgendamentoResponseDTO = {
      mensagem: "Agendamento realizado com sucesso",
      agendamento: {
        medico: "",
        paciente: agendamentoData.paciente,
        data_horario: newAgendamento.data_horario,
      },
    };

    return {
      statusCode: 201,
      body: JSON.stringify(response),
    };
  }

  public async getAgendamentos(event: APIGatewayEvent, context: Context) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        agendamentos: this.agendaService.getAgendamentos(),
      }), // Simulação
    };
  }
}
