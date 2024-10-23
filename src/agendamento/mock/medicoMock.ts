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

export default medicos;
