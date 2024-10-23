import { APIGatewayEvent, Context } from "aws-lambda";
import { CreateAgendamentoDTO } from "../dto/CreateAgendamentoRequestDTO";
import { CreateAgendamentoResponseDTO } from "../dto/CreateAgendamentoResponseDTO";
import { IAgendamentoService } from "../service/IAgendamentoService";
import { AgendamentoService } from "../service/AgendamentoService";
import medicos from "../mock/medicoMock";

export class AgendamentoController {
  private agendaService: IAgendamentoService;

  constructor() {
    this.agendaService = new AgendamentoService();
  }

  public async createAgendamento(event: APIGatewayEvent, context: Context) {
    try {
      if (!event.body) {
        return {
          statusCode: 400,
          body: JSON.stringify({ mensagem: "Dados do agendamento inválidos." }),
        };
      }

      const agendamentoData: CreateAgendamentoDTO = JSON.parse(event.body);

      if (
        !agendamentoData.medico_id ||
        !agendamentoData.paciente ||
        !agendamentoData.data_horario
      ) {
        return {
          statusCode: 400,
          body: JSON.stringify({ mensagem: "Dados do agendamento inválidos." }),
        };
      }

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
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ mensagem: "Erro ao criar agendamento." }),
      };
    }
  }
}
