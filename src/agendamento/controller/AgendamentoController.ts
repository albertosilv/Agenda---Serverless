// agendamento/controller/AgendamentoController.ts
import { APIGatewayEvent, Context } from "aws-lambda";
import { CreateAgendamentoDTO } from "../dto/CreateAgendamentoRequestDTO";
import { CreateAgendamentoResponseDTO } from "../dto/CreateAgendamentoResponseDTO";
import { IAgendamentoService } from "../service/IAgendamentoService";
import { AgendamentoService } from "../service/AgendamentoService";
import medicos from "../mock/medicoMock";

export class AgendamentoController {
  private agendaService: IAgendamentoService;

  constructor() {
    this.agendaService = new AgendamentoService(); // Instância do serviço
  }

  public async createAgendamento(event: APIGatewayEvent, context: Context) {
    const agendamentoData: CreateAgendamentoDTO = JSON.parse(event.body!);

    const medicoExistente = medicos.find(
      (medico) => medico.id === agendamentoData.medico_id
    );

    if (!medicoExistente) {
      return {
        statusCode: 400,
        body: JSON.stringify({ mensagem: "Médico não encontrado." }),
      };
    }

    const newAgendamento =
      this.agendaService.createAgendamento(agendamentoData);

    const response: CreateAgendamentoResponseDTO = {
      mensagem: "Agendamento realizado com sucesso",
      agendamento: {
        medico: medicoExistente.nome,
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
