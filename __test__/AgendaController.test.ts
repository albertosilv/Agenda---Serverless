import { AgendaController } from "../src/agenda/controller/AgendaController";
import { APIGatewayEvent, Context } from "aws-lambda";
import { AgendamentoService } from "../src/agendamento/service/AgendamentoService";
import { transformarDados } from "../src/agenda/util";
import {
  getAllAgendaDTO,
  IMedicoComHorarios,
} from "../src/agenda/dto/getAllAgendaDTO";
import medicos from "../src/agendamento/mock/medicoMock"; // Importe seus dados mock
import { IMedico } from "../src/agendamento/mock/medicoMock";
import { IAgendamento } from "../src/agendamento/interface/IAgendamento";

describe("AgendaController", () => {
  let controller: AgendaController;
  let agendamentoService: AgendamentoService;

  beforeEach(() => {
    agendamentoService = new AgendamentoService();
    controller = new AgendaController();
  });

  test("deve retornar dados de agenda transformados", async () => {
    const agenda = agendamentoService.getAgendamentos(); // Obtém agendamentos
    const mockMedicosComHorarios = transformarDados(medicos, agenda); // Transforma dados

    const event = {} as APIGatewayEvent;
    const context = {} as Context;

    const result = await controller.getAgenda(event, context);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(mockMedicosComHorarios);
  });

  test("deve verificar que existem dados na agenda", async () => {
    const event = {} as APIGatewayEvent;
    const context = {} as Context;

    const result = await controller.getAgenda(event, context);

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body.medicos).toBeDefined();
    expect(body.medicos.length).toBeGreaterThan(0);
  });

  test("deve verificar que existe um médico com id 1 na agenda", async () => {
    const event = {} as APIGatewayEvent;
    const context = {} as Context;

    const result = await controller.getAgenda(event, context);

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body.medicos).toBeDefined();
    expect(body.medicos.length).toBeGreaterThan(0);

    const medicoComId1 = body.medicos.find(
      (medico: IMedicoComHorarios) => medico.id === 1
    );
    expect(medicoComId1).toBeDefined();
    expect(medicoComId1.nome).toBe("Dr. João Silva");
    expect(medicoComId1.especialidade).toBe("Cardiologista");
  });

  test("deve verificar que existe um médico com id 1 na agenda e que possui horários disponíveis", async () => {
    const event = {} as APIGatewayEvent;
    const context = {} as Context;

    const result = await controller.getAgenda(event, context);

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body.medicos).toBeDefined();
    expect(body.medicos.length).toBeGreaterThan(0);

    const medicoComId1 = body.medicos.find(
      (medico: IMedicoComHorarios) => medico.id === 1
    );
    expect(medicoComId1).toBeDefined();
    expect(medicoComId1.nome).toBe("Dr. João Silva");
    expect(medicoComId1.especialidade).toBe("Cardiologista");

    expect(medicoComId1.horarios_disponiveis).toBeDefined();
    expect(medicoComId1.horarios_disponiveis.length).toBeGreaterThan(0);
  });

  test("deve retornar agenda vazia quando não existem médicos", () => {
    const medicos: IMedico[] = [];
    const agendamentos: IAgendamento[] = [];

    const result = transformarDados(medicos, agendamentos);

    expect(result).toEqual({ medicos: [] });
  });

  test("deve retornar médicos sem horários quando não existem agendamentos", () => {
    const medicos: IMedico[] = [
      { id: 1, nome: "Dr. João Silva", cargo: "Cardiologista" },
      { id: 2, nome: "Dra. Maria Oliveira", cargo: "Pediatra" },
    ];
    const agendamentos: IAgendamento[] = [];

    const result = transformarDados(medicos, agendamentos);

    expect(result).toEqual({ medicos: [] });
  });
});
