import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Zap, Calendar } from "lucide-react";

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-foreground">
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
              <Button variant="ghost" className="text-white hover:bg-slate-800">Regras</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Copa PES 2013 - Edição PARSEC</h2>
          <p className="text-xl text-slate-300 mb-8">Campeonato de Pro Evolution Soccer 2013 com 12 clubes participantes</p>
          <div className="flex gap-4 justify-center">
            <Link href="/standings">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Ver Classificação</Button>
            </Link>
            <Link href="/matches">
              <Button size="lg" variant="outline" className="border-slate-500 text-white hover:bg-slate-800">Próximos Jogos</Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Clubes Participantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">12</div>
              <p className="text-xs text-slate-500 mt-1">Times competindo</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Rodadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">11</div>
              <p className="text-xs text-slate-500 mt-1">Fase de pontos corridos</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Plataforma
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">PARSEC</div>
              <p className="text-xs text-slate-500 mt-1">Cloud gaming</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Inscrição
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">R$ 10</div>
              <p className="text-xs text-slate-500 mt-1">Por participante</p>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Sobre o Campeonato</CardTitle>
              <CardDescription className="text-slate-400">Informações gerais</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-4">
              <p>
                A Copa PES 2013 - Edição PARSEC é um torneio de Pro Evolution Soccer 2013 realizado via nuvem utilizando o aplicativo PARSEC. Não é necessário ter o jogo instalado, apenas o aplicativo.
              </p>
              <p>
                O campeonato segue um formato de pontos corridos em turno único, onde os 8 melhores colocados avançam para a fase eliminatória (Mata-Mata).
              </p>
              <p>
                A premiação é 100% do valor arrecadado nas inscrições somado a 100% da verba gerada nas janelas de transferências.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Próximas Etapas</CardTitle>
              <CardDescription className="text-slate-400">Calendário</CardDescription>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>1ª Rodada: Primeira semana de dezembro</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Janela de Transferências (Meio): Metade da fase</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Pré-Mata: Antes das quartas de final</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Final: Até março de 2025</span>
                </div>
              </div>
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
