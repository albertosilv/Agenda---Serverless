import { APIGatewayEvent, Context } from "aws-lambda";
import { AgendamentoService } from "../src/agendamento/service/AgendamentoService";
import { AgendamentoController } from "../src/agendamento/controller/AgendamentoController";
describe("AgendamentoController", () => {
  let controller: AgendamentoController;
  let context: Context;

  beforeEach(() => {
    controller = new AgendamentoController();
    context = {} as Context;
  });

  test("deve retornar erro quando médico não existe", async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 999,
        paciente: "João",
        data_horario: "2024-10-05T09:00:00Z",
      }),
    } as any;

    const result = await controller.createAgendamento(event, context);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({
      mensagem: "Médico não encontrado.",
    });
  });

  test("deve criar agendamento com sucesso quando médico existe", async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 1,
        paciente: "João",
        data_horario: "2024-10-05T09:00:00Z",
      }),
    } as any;

    const result = await controller.createAgendamento(event, context);

    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toEqual({
      mensagem: "Agendamento realizado com sucesso",
      agendamento: {
        medico: "Dr. João Silva",
        paciente: "João",
        data_horario: "2024-10-05T09:00:00Z",
      },
    });
  });

  test("deve retornar erro quando o corpo da requisição está vazio", async () => {
    const event: APIGatewayEvent = {
      body: null,
    } as any;

    const result = await controller.createAgendamento(event, context);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({
      mensagem: "Dados do agendamento inválidos.",
    });
  });

  test("deve retornar erro quando paciente não é informado", async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({ medico_id: 1 }),
    } as any;

    const result = await controller.createAgendamento(event, context);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({
      mensagem: "Dados do agendamento inválidos.",
    });
  });

  test("deve retornar erro quando data/hora do agendamento está ausente", async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({ medico_id: 1, paciente: "João" }),
    } as any;

    const result = await controller.createAgendamento(event, context);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({
      mensagem: "Dados do agendamento inválidos.",
    });
  });

  test("deve retornar 500 quando ocorre um erro inesperado", async () => {
    const event: APIGatewayEvent = {
      body: JSON.stringify({
        medico_id: 1,
        paciente: "João",
        data_horario: "2024-10-05T09:00:00Z",
      }),
    } as any;

    AgendamentoService.prototype.createAgendamento = jest
      .fn()
      .mockImplementation(() => {
        throw new Error("Erro inesperado na criação do agendamento");
      });

    const result = await controller.createAgendamento(event, context);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({
      mensagem: "Erro ao criar agendamento.",
    });
  });
});
