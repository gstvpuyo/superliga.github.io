import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Rules() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-950 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚽</span>
            <h1 className="text-xl font-bold text-white">Copa PES 2013</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-slate-800">Home</Button>
            </Link>
            <Link href="/standings">
              <Button variant="ghost" className="text-white hover:bg-slate-800">Classificação</Button>
            </Link>
            <Link href="/matches">
              <Button variant="ghost" className="text-white hover:bg-slate-800">Jogos</Button>
            </Link>
            <Link href="/clubs">
              <Button variant="ghost" className="text-white hover:bg-slate-800">Clubes</Button>
            </Link>
            <Link href="/rules">
              <Button variant="ghost" className="text-white hover:bg-slate-800 bg-slate-800">Regras</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-white mb-8">Regulamento Oficial</h2>

        <div className="space-y-6">
          {/* Section 1 */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">1. DISPOSIÇÕES GERAIS</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-3">
              <p><strong>Objetivo:</strong> Promover a competição e o entretenimento entre os participantes através do jogo Pro Evolution Soccer 2013 (PES 2013).</p>
              <p><strong>Plataforma:</strong> As partidas serão realizadas via nuvem utilizando o aplicativo PARSEC. Não é necessário ter o jogo instalado, apenas o aplicativo.</p>
              <p><strong>Inscrição:</strong> O valor da inscrição é de R$ 10,00 por participante.</p>
              <p><strong>Premiação:</strong> 100% do valor arrecadado nas inscrições (Total inicial: R$ 120,00) SOMADO a 100% da verba gerada nas janelas de transferências será destinado à premiação dos 3 primeiros colocados.</p>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">2. FORMATO DE DISPUTA</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-3">
              <p><strong>Sistema:</strong> Todos contra todos em turno único.</p>
              <p><strong>Classificação:</strong> Avançam para a fase eliminatória (Mata-Mata) os 8 melhores colocados.</p>
              <p><strong>Cronograma:</strong> A primeira rodada está prevista para a primeira semana de dezembro.</p>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">3. FORMAÇÃO DE ELENCOS (DRAFT)</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-3">
              <p>Os elencos serão formados via sorteio (Draft), respeitando a seguinte estrutura obrigatória para equilibrar a competição:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Capitão (Dono do Clube):</strong> 1 jogador criado inspirado no dono, com OVR 90.</li>
                <li><strong>Lenda:</strong> 1 jogador "Legend" histórico, com OVR 90.</li>
                <li><strong>Coringas:</strong> 3 jogadores com OVR entre 80 e 85.</li>
                <li><strong>Titulares Nível 1:</strong> 2 jogadores com OVR entre 77 e 80.</li>
                <li><strong>Titulares Nível 2:</strong> 4 jogadores com OVR entre 75 e 77.</li>
                <li><strong>Restante do Elenco:</strong> Autogerado/Padrão do jogo.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">4. MERCADO DE TRANSFERÊNCIAS</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-3">
              <p><strong>Janelas de Transferência:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Início: Antes da 1ª rodada.</li>
                <li>Meio: Na metade da fase de pontos corridos.</li>
                <li>Pré-Mata: Antes do início das quartas de final.</li>
              </ul>
              <p className="mt-4"><strong>Sistema Monetário (Pix):</strong> As transferências serão realizadas mediante pagamento via Pix, que será integralmente revertido para a premiação.</p>
              <p><strong>Custo Base:</strong> De R$ 1,00 a R$ 15,00 (variando proporcionalmente ao OVR do jogador).</p>
              <p><strong>Regra "Os Intocáveis":</strong> Lionel Messi e Cristiano Ronaldo possuem custo fixo de R$ 30,00.</p>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">5. FAIR PLAY FINANCEIRO</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-3">
              <p>Para evitar desequilíbrio financeiro, aplicam-se as seguintes regras por janela:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Limite de Contratações:</strong> Máximo de 3 jogadores por clube por janela.</li>
                <li><strong>Teto de Gastos:</strong> Máximo de R$ 20,00 gastos por janela.</li>
                <li><strong>Exceção:</strong> O teto sobe para R$ 30,00 exclusivamente no caso da compra de Messi ou Cristiano Ronaldo.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">6. AGENDAMENTO E W.O.</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-3">
              <p><strong>Prazo:</strong> Cada rodada terá um prazo estrito de 07 dias corridos para ser realizada.</p>
              <p><strong>Consenso:</strong> É responsabilidade dos adversários entrarem em consenso sobre o melhor horário dentro do prazo estipulado.</p>
              <p><strong>W.O.:</strong> O jogador que não comparecer no horário agendado, sem justificativa plausível ou aviso prévio, será declarado perdedor por W.O. (placar de 3x0).</p>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">7. DISPOSIÇÕES FINAIS E DISCIPLINARES</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-3">
              <p><strong>Desistências:</strong> O participante que abandonar o campeonato no meio da disputa estará sujeito a uma "SUMANTA" (punição física/moral a ser definida pelo grupo), sem alterações na amizade, mas com a honra manchada.</p>
              <p><strong>Premiação Final:</strong> O montante total (Inscrições + Transferências) será dividido entre o 1º, 2º e 3º colocados ao final do torneio.</p>
              <p><strong>Casos Omissos:</strong> Situações não previstas neste regulamento serão resolvidas pela organização do torneio de forma soberana.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-400">
          <p>Copa PES 2013 - Edição PARSEC © 2024</p>
        </div>
      </footer>
    </div>
  );
}
