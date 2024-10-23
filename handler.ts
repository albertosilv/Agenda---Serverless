import { APIGatewayEvent, Context } from "aws-lambda";
import { AgendamentoController } from "./src/agendamento/controller/AgendamentoController";
import { AgendaController } from "./src/agenda/controller/AgendaController";

const agendamentoController = new AgendamentoController();
const agendaController = new AgendaController();

export const createAgendamento = async (
  event: APIGatewayEvent,
  context: Context
) => {
  return agendamentoController.createAgendamento(event, context);
};

export const gteetAgenda = async (event: APIGatewayEvent, context: Context) => {
  return agendaController.getAgenda(event, context);
};
