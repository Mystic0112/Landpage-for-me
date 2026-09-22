// Conteúdo extraído do currículo — centralizado para facilitar atualizações.

export const profile = {
  nome: 'Hélio Vinícius',
  cargo: 'Desenvolvedor PHP & Laravel',
  local: 'Parnaíba, PI',
  telefone: '(86) 9-9993-9584',
  telefoneLink: '+5586999939584',
  email: 'c9hesky@gmail.com',
  github: 'Mystic0112',
  githubUrl: 'https://github.com/Mystic0112',
  whatsappUrl: 'https://wa.me/qr/AQTLGHIWAIEUE1?s=v',
  objetivo:
    'Estudante do 4º período de Análise e Desenvolvimento de Sistemas, com formatura prevista para 2026, buscando posição Júnior como Desenvolvedor Backend.',
  objetivoComplemento:
    'Foco em PHP e Laravel, com experiência prática em arquitetura de software, integrações com Inteligência Artificial e sistemas multi-serviços, unindo técnica de programação sólida a uma visão orientada à escalabilidade e boas práticas.',
}

export const destaques = [
  { valor: '5-6', unidade: 'meses', label: 'de estágio em Software House' },
  { valor: '4º', unidade: 'período', label: 'de ADS na UNINASSAU' },
  { valor: '3', unidade: 'projetos', label: 'em produção e portfólio' },
  { valor: '2026', unidade: '', label: 'formatura prevista' },
]

export const qualificacoes = [
  {
    titulo: 'Stack',
    texto:
      'Domínio de PHP e Laravel, com sólida experiência em arquitetura de software.',
  },
  {
    titulo: 'IA',
    texto:
      'Integrações com IA, conexões via MCP (Model Context Protocol) e aplicação em sistemas de produção.',
  },
  {
    titulo: 'Infraestrutura',
    texto:
      'Docker, Kubernetes, Webhooks e Sockets para sistemas multi-serviços.',
  },
  {
    titulo: 'Formação',
    texto:
      'Cursando o 4º período de Análise e Desenvolvimento de Sistemas na UNINASSAU — formatura prevista para 2026.',
  },
]

export const skills = [
  { nome: 'PHP', grupo: 'Linguagem' },
  { nome: 'Laravel', grupo: 'Framework' },
  { nome: 'Arquitetura de Software', grupo: 'Engenharia' },
  { nome: 'Integrações com IA', grupo: 'IA' },
  { nome: 'MCP & Multi-serviços', grupo: 'IA' },
  { nome: 'Docker', grupo: 'Infra' },
  { nome: 'Kubernetes', grupo: 'Infra' },
  { nome: 'Webhooks & Sockets', grupo: 'Infra' },
  { nome: 'JavaScript', grupo: 'Linguagem' },
  { nome: 'TypeScript', grupo: 'Linguagem' },
  { nome: 'Git', grupo: 'Ferramenta' },
  { nome: 'GitHub', grupo: 'Ferramenta' },
]

export const projetos = [
  {
    id: 'coachkit',
    indice: '01',
    nome: 'CoachKit',
    tagline: 'Apoio à prescrição de treinos e dietas com IA',
    descricao:
      'Sistema em PHP/Laravel que usa IA como apoio à criação de treinos e dietas personalizados — uma ferramenta de auxílio ao profissional responsável, não um substituto de sua avaliação técnica.',
    etiqueta: 'Projeto principal',
    status: 'Repositório privado',
    link: null,
    tecnologias: ['PHP', 'Laravel', 'Integrações com IA', 'Arquitetura'],
  },
  {
    id: 'setup-definitivo',
    indice: '02',
    nome: 'Setup Definitivo de IA',
    tagline: 'Ambiente e configuração de IA no fluxo de desenvolvimento',
    descricao:
      'Ambiente e configuração para integração de IA no fluxo de desenvolvimento, reunindo ferramentas e boas práticas de produtividade.',
    etiqueta: 'Open source',
    status: 'github.com/Mystic0112/Setup-Definitivo',
    link: 'https://github.com/Mystic0112/Setup-Definitivo',
    tecnologias: ['IA', 'MCP', 'Produtividade', 'DX'],
  },
  {
    id: 'whatsapp-fallback',
    indice: '03',
    nome: 'API de WhatsApp com Fallback',
    tagline: 'Múltiplos números com troca automática, sem QR Code manual',
    descricao:
      'Gerencia múltiplos números de WhatsApp com fallback automático entre eles, eliminando o escaneamento manual de QR Code. Projeto interno da empresa onde estagia.',
    etiqueta: 'Projeto corporativo',
    status: 'Interno da empresa',
    link: null,
    tecnologias: ['API', 'Webhooks', 'Sockets', 'Multi-serviços'],
  },
]

export const trajetoria = [
  {
    periodo: 'Atualmente',
    titulo: 'Estagiário em Software House',
    detalhe:
      'Estágio há 5-6 meses atuando no dia a dia com PHP e Laravel, em sistemas de produção.',
  },
  {
    periodo: 'No estágio',
    titulo: 'Sistemas de webscraping do zero',
    detalhe:
      'Desenvolveu do zero sistemas de webscraping na empresa onde estagia.',
  },
  {
    periodo: 'Contínuo',
    titulo: 'Cursos intensivos',
    detalhe: 'Cursos intensivos em PHP, Laravel e arquitetura de software.',
  },
  {
    periodo: 'Contínuo',
    titulo: 'Estudos aplicados em IA e infraestrutura',
    detalhe:
      'Integrações de IA (LLMs, MCP) e infraestrutura com Docker e Kubernetes.',
  },
  {
    periodo: '2024 - 2026',
    titulo: 'Análise e Des. de Sistemas — UNINASSAU Parnaíba',
    detalhe: 'Graduação em andamento, formatura prevista para 2026.',
  },
  {
    periodo: 'Complementar',
    titulo: 'Educador Físico e Nutrição',
    detalhe:
      'Capacitação na área — base multidisciplinar que originou o CoachKit.',
  },
]

export const idiomas = [
  { nome: 'Português', nivel: 'Nativo', progresso: 100 },
  { nome: 'Inglês', nivel: 'Intermediário', progresso: 60 },
  { nome: 'Italiano', nivel: 'Intermediário', progresso: 60 },
]

export const softSkills = [
  'Comunicação',
  'Trabalho em Equipe',
  'Resolução de Problemas',
  'Criatividade',
  'Adaptabilidade',
]

export const secoes = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'stack', label: 'Stack' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'contato', label: 'Contato' },
]
