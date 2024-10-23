export interface IMedico {
  id: number;
  nome: string;
  cargo: string;
}

const medicos: IMedico[] = [
  { id: 1, nome: "Dr. João Silva", cargo: "Cardiologista" },
  { id: 2, nome: "Dra. Maria Oliveira", cargo: "Pediatra" },
  { id: 3, nome: "Dr. Pedro Santos", cargo: "Neurologista" },
  { id: 4, nome: "Dra. Ana Costa", cargo: "Dermatologista" },
  { id: 5, nome: "Dr. Lucas Ferreira", cargo: "Ortopedista" },
];

export const agendamento = {
  medicos: [
    {
      id: 1,
      nome: "Dr. João Silva",
      especialidade: "Cardiologista",
      horarios_disponiveis: [
        "2024-10-05 09:00",
        "2024-10-05 10:00",
        "2024-10-05 11:00",
      ],
    },
    {
      id: 2,
      nome: "Dra. Maria Souza",
      especialidade: "Dermatologista",
      horarios_disponiveis: ["2024-10-06 14:00", "2024-10-06 15:00"],
    },
  ],
};

export default medicos;
