import { APIGatewayEvent, Context } from "aws-lambda";
import { AgendamentoController } from "./agendamento/controller/AgendamentoController";

const agendamentoController = new AgendamentoController();

export const createAgendamento = async (
  event: APIGatewayEvent,
  context: Context
) => {
  return agendamentoController.createAgendamento(event, context);
};

export const getAgendamentos = async (
  event: APIGatewayEvent,
  context: Context
) => {
  return agendamentoController.getAgendamentos(event, context);
};
